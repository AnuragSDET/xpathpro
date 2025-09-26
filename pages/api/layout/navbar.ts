import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('layout_settings')
        .select('value')
        .eq('key', 'navbar')
        .single()

      if (error || !data) {
        // Return default settings if not found
        return res.status(200).json({
          success: true,
          settings: {
            logo: 'xPath Pro',
            links: [
              { label: 'Home', href: '/' },
              { label: 'Courses', href: '/courses' },
              { label: 'About', href: '/about' },
              { label: 'Contact', href: '/contact' }
            ],
            ctaButton: { label: 'Get Started', href: '/courses' }
          }
        })
      }

      return res.status(200).json({
        success: true,
        settings: data.value
      })
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to fetch navbar settings' })
    }
  }

  if (req.method === 'PUT') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { settings } = req.body

      // First try to create the table if it doesn't exist
      const { error: createError } = await supabase.rpc('exec_sql', {
        sql: `
          CREATE TABLE IF NOT EXISTS layout_settings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            key VARCHAR(255) UNIQUE NOT NULL,
            value JSONB NOT NULL,
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
        `
      })

      // Now upsert the settings
      const { error } = await supabase
        .from('layout_settings')
        .upsert({
          key: 'navbar',
          value: settings,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' })

      if (error) {
        return res.status(500).json({ success: false, error: error.message })
      }

      return res.status(200).json({ success: true })
    } catch (error) {
      return res.status(500).json({ success: false, error: 'Failed to update navbar settings' })
    }
  }

  res.setHeader('Allow', ['GET', 'PUT'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}