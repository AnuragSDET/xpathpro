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

    const { resumeId, jobTitle, companyName, jobDescription } = await request.json();

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

    // Generate cover letter with AI
    const content = await geminiClient.generateCoverLetter(
      resume,
      jobTitle,
      companyName,
      jobDescription
    );

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    return NextResponse.json({ error: 'Generation failed' }, { status: 500 });
  }
}