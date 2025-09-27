import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get total users
    const { count: totalUsers, error: totalError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })

    // Get active users
    const { count: activeUsers, error: activeError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active')

    // Get inactive users
    const { count: inactiveUsers, error: inactiveError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'inactive')

    // Get admin users
    const { count: adminUsers, error: adminError } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'admin')

    if (totalError || activeError || inactiveError || adminError) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch user statistics' 
      })
    }

    const stats = {
      total: totalUsers || 0,
      active: activeUsers || 0,
      inactive: inactiveUsers || 0,
      admins: adminUsers || 0
    }

    res.json({ success: true, stats })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user stats' })
  }
}