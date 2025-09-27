import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { supabase } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get user from database
    const { data: user } = await supabase
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user progress
    const { data: progress } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);

    // Get user subscription
    const { data: subscription } = await supabase
      .from('user_subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    // Calculate stats
    const totalCourses = 5; // Mock data - replace with actual course count
    const totalLessons = 25; // Mock data - replace with actual lesson count
    const completedLessons = progress?.filter(p => p.completed).length || 0;
    const completedCourses = 2; // Mock data - calculate based on completed lessons per course
    const studyTime = 12; // Mock data - calculate from analytics

    // Mock recent progress data
    const recentProgress = [
      { title: 'SDET Fundamentals', progress: 75 },
      { title: 'Test Automation', progress: 45 },
      { title: 'API Testing', progress: 20 }
    ];

    const dashboardData = {
      totalCourses,
      completedCourses,
      totalLessons,
      completedLessons,
      studyTime,
      recentProgress,
      subscription: subscription?.plan || 'free'
    };

    res.status(200).json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}