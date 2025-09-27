import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase';
import { GeminiClient } from '@/lib/gemini';
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable();
    const [fields, files] = await form.parse(req);
    
    const interviewId = Array.isArray(fields.interviewId) ? fields.interviewId[0] : fields.interviewId;
    const transcript = Array.isArray(fields.transcript) ? fields.transcript[0] : fields.transcript;
    const questionIndex = parseInt(Array.isArray(fields.questionIndex) ? fields.questionIndex[0] : fields.questionIndex || '0');
    const duration = parseInt(Array.isArray(fields.duration) ? fields.duration[0] : fields.duration || '0');

    const supabase = createClient();
    const gemini = new GeminiClient();

    // Get current interview
    const { data: interview, error: fetchError } = await supabase
      .from('mock_interviews')
      .select('*')
      .eq('id', interviewId)
      .single();

    if (fetchError) throw fetchError;

    // Analyze speech metrics (simplified for demo)
    const speechMetrics = {
      duration,
      wordsPerMinute: transcript ? Math.round((transcript.split(' ').length / duration) * 60) : 0,
      fillerWords: (transcript?.match(/\b(um|uh|like|you know)\b/gi) || []).length,
      pace: duration > 0 ? (duration < 60 ? 'fast' : duration > 180 ? 'slow' : 'good') : 'unknown'
    };

    // Get current question
    const currentQuestion = interview.questions[questionIndex];
    
    // Evaluate response with AI
    const evaluation = await gemini.evaluateVideoResponse(
      currentQuestion.question,
      transcript || '',
      speechMetrics
    );

    // Update interview with response
    const updatedResponses = [...(interview.responses || []), {
      questionIndex,
      question: currentQuestion,
      transcript,
      duration,
      speechMetrics,
      evaluation
    }];

    // Generate next question if not the last one
    let nextQuestion = null;
    if (questionIndex < 4) {
      const previousQuestions = interview.questions.map((q: any) => q.question);
      nextQuestion = await gemini.generateInterviewQuestion(
        interview.interview_type, 
        previousQuestions, 
        'intermediate'
      );
      
      const updatedQuestions = [...interview.questions, nextQuestion];
      
      await supabase
        .from('mock_interviews')
        .update({
          questions: updatedQuestions,
          responses: updatedResponses
        })
        .eq('id', interviewId);
    } else {
      // Final question - just update responses
      await supabase
        .from('mock_interviews')
        .update({
          responses: updatedResponses
        })
        .eq('id', interviewId);
    }

    res.status(200).json({
      evaluation,
      nextQuestion
    });
  } catch (error) {
    console.error('Process video response error:', error);
    res.status(500).json({ error: 'Failed to process video response' });
  }
}