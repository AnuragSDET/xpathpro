import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    if (error) {
      return res.status(500).json({ success: false, error: error.message })
    }

    res.json({ success: true, count: count || 0 })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user count' })
  }
}