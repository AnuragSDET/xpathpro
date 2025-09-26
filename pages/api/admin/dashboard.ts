import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { client } from '../../../lib/sanity'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await requireAdmin(req)
  if (authResult.error) {
    return res.status(authResult.status).json({ error: authResult.error })
  }

  if (req.method === 'GET') {
    try {
      // Get courses count
      const courses = await client.fetch(`count(*[_type == "course"])`)
      
      // Get users count
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })

      // Get active users (last 30 days)
      const { count: activeUsers } = await supabase
        .from('analytics_events')
        .select('user_id', { count: 'exact', head: true })
        .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

      // Get recent activity
      const { data: recentActivity } = await supabase
        .from('analytics_events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(10)

      const dashboardData = {
        stats: {
          totalCourses: courses,
          totalUsers: usersCount || 0,
          activeUsers: activeUsers || 0,
          pageViews: 45678 // Replace with actual calculation
        },
        recentActivity: recentActivity || []
      }

      res.status(200).json(dashboardData)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch dashboard data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}