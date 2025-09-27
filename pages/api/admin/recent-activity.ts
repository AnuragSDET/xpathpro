import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: activities, error } = await supabase
      .from('user_activity')
      .select('id, user_name, action, target, created_at')
      .order('created_at', { ascending: false })
      .limit(10)

    if (error) {
      return res.status(500).json({ success: false, error: error.message })
    }

    res.json({ success: true, activities: activities || [] })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch recent activity' })
  }
}