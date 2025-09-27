import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { interviewId, duration } = req.body;
    const supabase = createClient();

    // Get interview data
    const { data: interview, error: fetchError } = await supabase
      .from('mock_interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (fetchError) throw fetchError;

    // Calculate overall score
    const responses = interview.responses || [];
    const totalScore = responses.reduce((sum: number, r: any) => sum + (r.evaluation?.score || 0), 0);
    const averageScore = responses.length > 0 ? Math.round(totalScore / responses.length) : 0;

    // Update interview as completed
    const { error: updateError } = await supabase
      .from('mock_interviews')
      .update({
        status: 'completed',
        score: averageScore,
        duration,
        completed_at: new Date().toISOString()
      })
      .eq('id', interviewId);

    if (updateError) throw updateError;

    res.status(200).json({
      score: averageScore,
      totalQuestions: responses.length,
      duration,
      responses
    });
  } catch (error) {
    console.error('Complete interview error:', error);
    res.status(500).json({ error: 'Failed to complete interview' });
  }
}