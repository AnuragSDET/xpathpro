import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, name, email, role, status, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      return res.status(500).json({ success: false, error: error.message })
    }

    res.json({ success: true, users: users || [] })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' })
  }
}