import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase';
import { GeminiClient } from '@/lib/gemini';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { userId, interviewType } = req.body;
    const supabase = createClient();
    const gemini = new GeminiClient();

    // Generate first question with enhanced parameters
    const firstQuestion = await gemini.generateInterviewQuestion(interviewType, [], 'intermediate');

    // Create video interview session
    const { data: interview, error } = await supabase
      .from('mock_interviews')
      .insert({
        user_id: userId,
        interview_type: interviewType,
        questions: [firstQuestion],
        responses: [],
        video_urls: [],
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      interviewId: interview.id,
      question: firstQuestion
    });
  } catch (error) {
    console.error('Start video interview error:', error);
    res.status(500).json({ error: 'Failed to start video interview' });
  }
}