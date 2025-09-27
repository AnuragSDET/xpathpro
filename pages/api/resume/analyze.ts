import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { supabase } from '@/lib/supabase';
import { geminiClient } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { resumeId, jobDescription } = await request.json();

    // Get resume data
    const { data: resume } = await supabase
      .from('user_resumes')
      .select('*')
      .eq('id', resumeId)
      .eq('user_id', session.user.id)
      .single();

    if (!resume) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Analyze with AI
    const analysis = await geminiClient.optimizeResume(resume, jobDescription);

    // Update resume with analysis
    await supabase
      .from('user_resumes')
      .update({
        ats_score: analysis.atsScore,
        ai_suggestions: analysis,
        updated_at: new Date().toISOString()
      })
      .eq('id', resumeId);

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
  }
}