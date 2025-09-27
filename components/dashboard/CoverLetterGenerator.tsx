'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';
import { geminiClient } from '@/lib/gemini';

interface CoverLetter {
  id?: string;
  title: string;
  company_name: string;
  job_title: string;
  job_description: string;
  content: string;
  resume_id?: string;
}

interface Resume {
  id: string;
  title: string;
  personal_info: any;
  experience: any;
  skills: any;
}

export default function CoverLetterGenerator() {
  const { data: session } = useSession();
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentLetter, setCurrentLetter] = useState<CoverLetter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      loadCoverLetters();
      loadResumes();
    }
  }, [session]);

  const loadCoverLetters = async () => {
    const { data } = await supabase
      .from('cover_letters')
      .select('*')
      .eq('user_id', session?.user?.id)
      .order('updated_at', { ascending: false });
    
    setCoverLetters(data || []);
  };

  const loadResumes = async () => {
    const { data } = await supabase
      .from('user_resumes')
      .select('id, title, personal_info, experience, skills')
      .eq('user_id', session?.user?.id);
    
    setResumes(data || []);
  };

  const createNewLetter = () => {
    const newLetter: CoverLetter = {
      title: 'New Cover Letter',
      company_name: '',
      job_title: '',
      job_description: '',
      content: ''
    };
    setCurrentLetter(newLetter);
    setIsEditing(true);
  };

  const generateWithAI = async () => {
    if (!currentLetter || !currentLetter.resume_id) return;
    
    setLoading(true);
    try {
      const selectedResume = resumes.find(r => r.id === currentLetter.resume_id);
      if (!selectedResume) return;

      const generatedContent = await geminiClient.generateCoverLetter(
        selectedResume,
        currentLetter.job_title,
        currentLetter.company_name,
        currentLetter.job_description
      );

      setCurrentLetter({
        ...currentLetter,
        content: generatedContent
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
    }
    setLoading(false);
  };

  const saveLetter = async () => {
    if (!currentLetter || !session?.user?.id) return;
    
    setLoading(true);
    try {
      const letterData = {
        ...currentLetter,
        user_id: session.user.id,
        ai_generated: true,
        updated_at: new Date().toISOString()
      };

      if (currentLetter.id) {
        await supabase
          .from('cover_letters')
          .update(letterData)
          .eq('id', currentLetter.id);
      } else {
        const { data } = await supabase
          .from('cover_letters')
          .insert(letterData)
          .select()
          .single();
        setCurrentLetter({ ...currentLetter, id: data.id });
      }
      
      await loadCoverLetters();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving cover letter:', error);
    }
    setLoading(false);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please sign in to access Cover Letter Generator</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            AI Cover Letter Generator
          </h1>
          <button
            onClick={createNewLetter}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-6 py-2 rounded-lg font-medium transition-all"
          >
            Create New Letter
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cover Letters List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Your Cover Letters</h2>
            <div className="space-y-3">
              {coverLetters.map((letter) => (
                <div
                  key={letter.id}
                  onClick={() => setCurrentLetter(letter)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    currentLetter?.id === letter.id
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <h3 className="font-medium">{letter.title}</h3>
                  <p className="text-sm text-gray-400">{letter.company_name}</p>
                  <p className="text-xs text-gray-500">{letter.job_title}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cover Letter Editor */}
          <div className="lg:col-span-2">
            {currentLetter ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <input
                    type="text"
                    value={currentLetter.title}
                    onChange={(e) => setCurrentLetter({ ...currentLetter, title: e.target.value })}
                    className="text-xl font-semibold bg-transparent border-none outline-none text-white"
                    disabled={!isEditing}
                  />
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Edit
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={saveLetter}
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          onClick={() => setIsEditing(false)}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      value={currentLetter.company_name}
                      onChange={(e) => setCurrentLetter({ ...currentLetter, company_name: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      disabled={!isEditing}
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Job Title</label>
                    <input
                      type="text"
                      value={currentLetter.job_title}
                      onChange={(e) => setCurrentLetter({ ...currentLetter, job_title: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      disabled={!isEditing}
                      placeholder="Enter job title"
                    />
                  </div>
                </div>

                {/* Resume Selection */}
                {isEditing && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Select Resume</label>
                    <select
                      value={currentLetter.resume_id || ''}
                      onChange={(e) => setCurrentLetter({ ...currentLetter, resume_id: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="">Select a resume</option>
                      {resumes.map((resume) => (
                        <option key={resume.id} value={resume.id}>
                          {resume.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Job Description */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Job Description</label>
                  <textarea
                    value={currentLetter.job_description}
                    onChange={(e) => setCurrentLetter({ ...currentLetter, job_description: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-32"
                    disabled={!isEditing}
                    placeholder="Paste the job description here for better AI generation"
                  />
                </div>

                {/* AI Generation Button */}
                {isEditing && currentLetter.resume_id && (
                  <div className="mb-6">
                    <button
                      onClick={generateWithAI}
                      disabled={loading || !currentLetter.company_name || !currentLetter.job_title}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Generating with AI...' : '✨ Generate with AI'}
                    </button>
                    <p className="text-sm text-gray-400 mt-2">
                      AI will create a personalized cover letter based on your resume and job details
                    </p>
                  </div>
                )}

                {/* Cover Letter Content */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Cover Letter Content</label>
                  <textarea
                    value={currentLetter.content}
                    onChange={(e) => setCurrentLetter({ ...currentLetter, content: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-96 font-mono text-sm leading-relaxed"
                    disabled={!isEditing}
                    placeholder="Your cover letter content will appear here..."
                  />
                </div>

                {/* Preview */}
                {currentLetter.content && !isEditing && (
                  <div className="bg-white text-black p-8 rounded-lg">
                    <div className="whitespace-pre-wrap font-serif leading-relaxed">
                      {currentLetter.content}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-xl font-medium mb-4">Create your first AI-powered cover letter</h2>
                <p className="text-gray-400 mb-6">
                  Generate personalized cover letters that match your resume and target job requirements
                </p>
                <button
                  onClick={createNewLetter}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Create Your First Cover Letter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}