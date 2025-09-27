import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: bookings, error } = await supabase
      .from('mentorship_bookings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Bookings error:', error)
      return res.status(500).json({ success: false, error: 'Failed to fetch bookings' })
    }

    res.json({ success: true, bookings: bookings || [] })
  } catch (error) {
    console.error('API error:', error)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}