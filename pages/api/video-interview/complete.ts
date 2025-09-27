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

    const responses = interview.responses || [];
    
    // Calculate scores
    const technicalScores = responses.map((r: any) => r.evaluation?.technicalScore || 0);
    const communicationScores = responses.map((r: any) => r.evaluation?.communicationScore || 0);
    const overallScores = responses.map((r: any) => r.evaluation?.overallScore || 0);

    const avgTechnicalScore = technicalScores.length > 0 
      ? Math.round(technicalScores.reduce((a: number, b: number) => a + b, 0) / technicalScores.length)
      : 0;
    
    const avgCommunicationScore = communicationScores.length > 0
      ? Math.round(communicationScores.reduce((a: number, b: number) => a + b, 0) / communicationScores.length)
      : 0;
    
    const avgOverallScore = overallScores.length > 0
      ? Math.round(overallScores.reduce((a: number, b: number) => a + b, 0) / overallScores.length)
      : 0;

    // Aggregate speech analysis
    const speechAnalysis = {
      totalDuration: responses.reduce((sum: number, r: any) => sum + (r.duration || 0), 0),
      avgWordsPerMinute: responses.length > 0 
        ? Math.round(responses.reduce((sum: number, r: any) => sum + (r.speechMetrics?.wordsPerMinute || 0), 0) / responses.length)
        : 0,
      totalFillerWords: responses.reduce((sum: number, r: any) => sum + (r.speechMetrics?.fillerWords || 0), 0),
      overallPace: 'moderate' // Could be calculated based on individual responses
    };

    // Update interview as completed
    const { error: updateError } = await supabase
      .from('mock_interviews')
      .update({
        status: 'completed',
        score: avgOverallScore,
        technical_score: avgTechnicalScore,
        communication_score: avgCommunicationScore,
        speech_analysis: speechAnalysis,
        duration,
        completed_at: new Date().toISOString()
      })
      .eq('id', interviewId);

    if (updateError) throw updateError;

    res.status(200).json({
      overallScore: avgOverallScore,
      technicalScore: avgTechnicalScore,
      communicationScore: avgCommunicationScore,
      totalQuestions: responses.length,
      duration,
      speechAnalysis,
      responses
    });
  } catch (error) {
    console.error('Complete video interview error:', error);
    res.status(500).json({ error: 'Failed to complete video interview' });
  }
}