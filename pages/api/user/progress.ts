import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get user progress from database
    const { data: progress, error } = await supabase
      .from('user_progress')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Progress error:', error)
    }

    const progressData = {
      coursesCompleted: progress?.filter(p => p.status === 'completed').length || 0,
      totalCourses: 12,
      lessonsCompleted: progress?.length || 0,
      totalLessons: 48,
      studyTime: Math.floor((progress?.length || 0) * 2.5),
      overallProgress: Math.round(((progress?.length || 0) / 48) * 100),
      recentProgress: progress?.slice(0, 5) || []
    }

    res.json({ success: true, progress: progressData })
  } catch (error) {
    console.error('Progress API error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch progress' })
  }
}