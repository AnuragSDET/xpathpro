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

      // Try to upsert the settings directly
      const { error } = await supabase
        .from('layout_settings')
        .upsert({
          key: 'navbar',
          value: settings,
          updated_at: new Date().toISOString()
        }, { onConflict: 'key' })

      if (error) {
        // If table doesn't exist, return specific error message
        if (error.message.includes('relation "layout_settings" does not exist')) {
          return res.status(500).json({ 
            success: false, 
            error: 'Database table not created. Please run the migration first by visiting /api/migrate or create the table manually in Supabase.' 
          })
        }
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