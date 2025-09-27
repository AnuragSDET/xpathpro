import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get page views from analytics table
    const { data: pageViews, error: pageViewsError } = await supabase
      .from('analytics')
      .select('*')
      .eq('event_type', 'page_view')

    // Get course completions from user_progress table
    const { data: completions, error: completionsError } = await supabase
      .from('user_progress')
      .select('*')
      .eq('status', 'completed')

    if (pageViewsError || completionsError) {
      return res.status(500).json({ 
        success: false, 
        error: pageViewsError?.message || completionsError?.message 
      })
    }

    res.json({ 
      success: true, 
      pageViews: pageViews?.length || 0,
      courseCompletions: completions?.length || 0
    })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch analytics' })
  }
}