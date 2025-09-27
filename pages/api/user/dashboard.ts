import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get courses count (placeholder until Sanity integration)
    const totalCourses = 12

    // Get user progress
    const { data: userProgress, error: progressError } = await supabase
      .from('user_progress')
      .select('*')

    if (progressError) {
      console.error('Progress error:', progressError)
    }

    const completedCourses = userProgress?.filter(p => p.status === 'completed').length || 0
    const totalLessons = 50 // Placeholder
    const completedLessons = userProgress?.length || 0
    const studyTime = Math.floor(completedLessons * 2.5) // Estimate 2.5 hours per lesson

    // Mock recent progress data
    const recentProgress = [
      { title: 'SDET Fundamentals', progress: 85 },
      { title: 'Test Automation', progress: 60 },
      { title: 'API Testing', progress: 40 }
    ]

    const data = {
      totalCourses,
      completedCourses,
      totalLessons,
      completedLessons,
      studyTime,
      recentProgress,
      subscription: 'free'
    }

    res.json({ success: true, data })
  } catch (error) {
    console.error('Dashboard API error:', error)
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' })
  }
}