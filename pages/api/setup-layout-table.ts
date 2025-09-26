import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import { requireAdmin } from '../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const authResult = await requireAdmin(req, res)
  if (authResult.error) {
    return res.status(authResult.status).json({ error: authResult.error })
  }

  try {
    // Create the layout_settings table by inserting a record
    // This will fail if table doesn't exist, so we handle it
    const { error: insertError } = await supabase
      .from('layout_settings')
      .upsert({
        key: 'navbar',
        value: {
          logo: 'xPath Pro',
          links: [
            { label: 'Home', href: '/' },
            { label: 'Courses', href: '/courses' },
            { label: 'About', href: '/about' },
            { label: 'Contact', href: '/contact' }
          ],
          ctaButton: { label: 'Get Started', href: '/courses' }
        }
      }, { onConflict: 'key' })

    if (insertError) {
      return res.status(500).json({ 
        success: false, 
        error: 'Table does not exist. Please create the layout_settings table manually in Supabase SQL Editor using the provided script.',
        details: insertError.message
      })
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Layout settings table is ready and default navbar settings have been created.' 
    })

  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Failed to setup layout table',
      details: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}