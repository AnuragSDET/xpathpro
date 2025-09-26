import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { requireAuth } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authResult = await requireAuth(req, res)
  if (authResult.error) {
    return res.status(authResult.status).json({ error: authResult.error })
  }

  const userId = authResult.session?.user?.id
  if (!userId) {
    return res.status(401).json({ error: 'User ID not found' })
  }

  if (req.method === 'GET') {
    try {
      const { data: progress, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)

      if (error) throw error

      res.status(200).json(progress)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch progress' })
    }
  } else if (req.method === 'POST') {
    try {
      const { courseId, lessonId, completed, progress } = req.body

      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          course_id: courseId,
          lesson_id: lessonId,
          completed,
          progress,
          updated_at: new Date().toISOString()
        })
        .select()

      if (error) throw error

      // Track completion event
      if (completed) {
        await supabase
          .from('analytics_events')
          .insert({
            event: lessonId ? 'lesson_completed' : 'course_completed',
            properties: { courseId, lessonId },
            user_id: userId,
            timestamp: new Date().toISOString()
          })
      }

      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update progress' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}