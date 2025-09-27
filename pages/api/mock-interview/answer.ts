import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase';
import { GeminiClient } from '@/lib/gemini';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { interviewId, answer, currentQuestion } = req.body;
    const supabase = createClient();
    const gemini = new GeminiClient();

    // Get current interview
    const { data: interview, error: fetchError } = await supabase
      .from('mock_interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (fetchError) throw fetchError;

    // Evaluate answer
    const evaluation = await gemini.evaluateAnswer(currentQuestion.question, answer);

    // Generate next question
    const previousQuestions = interview.questions.map((q: any) => q.question);
    const nextQuestion = await gemini.generateInterviewQuestion(interview.interview_type, previousQuestions);

    // Update interview
    const updatedQuestions = [...interview.questions, nextQuestion];
    const updatedResponses = [...(interview.responses || []), {
      question: currentQuestion,
      answer,
      evaluation
    }];

    const { error: updateError } = await supabase
      .from('mock_interviews')
      .update({
        questions: updatedQuestions,
        responses: updatedResponses
      })
      .eq('id', interviewId);

    if (updateError) throw updateError;

    res.status(200).json({
      evaluation,
      nextQuestion
    });
  } catch (error) {
    console.error('Answer evaluation error:', error);
    res.status(500).json({ error: 'Failed to evaluate answer' });
  }
}