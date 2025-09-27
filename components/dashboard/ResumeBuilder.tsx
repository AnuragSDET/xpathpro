'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';
import { geminiClient, RESUME_TEMPLATES } from '@/lib/gemini';

interface ResumeData {
  id?: string;
  title: string;
  template_id: string;
  personal_info: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
  }>;
  certifications: string[];
  ats_score?: number;
  ai_suggestions?: any;
}

export default function ResumeBuilder() {
  const { data: session } = useSession();
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const [currentResume, setCurrentResume] = useState<ResumeData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [atsAnalysis, setAtsAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      loadResumes();
    }
  }, [session]);

  const loadResumes = async () => {
    const { data } = await supabase
      .from('user_resumes')
      .select('*')
      .eq('user_id', session?.user?.id)
      .order('updated_at', { ascending: false });
    
    setResumes(data || []);
  };

  const createNewResume = () => {
    const newResume: ResumeData = {
      title: 'New Resume',
      template_id: 'modern',
      personal_info: {
        name: '',
        email: session?.user?.email || '',
        phone: '',
        location: '',
        linkedin: '',
        summary: ''
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    };
    setCurrentResume(newResume);
    setIsEditing(true);
  };

  const saveResume = async () => {
    if (!currentResume || !session?.user?.id) return;
    
    setLoading(true);
    try {
      const resumeData = {
        ...currentResume,
        user_id: session.user.id,
        updated_at: new Date().toISOString()
      };

      if (currentResume.id) {
        await supabase
          .from('user_resumes')
          .update(resumeData)
          .eq('id', currentResume.id);
      } else {
        const { data } = await supabase
          .from('user_resumes')
          .insert(resumeData)
          .select()
          .single();
        setCurrentResume({ ...currentResume, id: data.id });
      }
      
      await loadResumes();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving resume:', error);
    }
    setLoading(false);
  };

  const analyzeATS = async () => {
    if (!currentResume) return;
    
    setLoading(true);
    try {
      const analysis = await geminiClient.optimizeResume(currentResume);
      setAtsAnalysis(analysis);
      
      // Update resume with ATS score
      await supabase
        .from('user_resumes')
        .update({ 
          ats_score: analysis.atsScore,
          ai_suggestions: analysis
        })
        .eq('id', currentResume.id);
    } catch (error) {
      console.error('Error analyzing ATS:', error);
    }
    setLoading(false);
  };

  const addExperience = () => {
    if (!currentResume) return;
    setCurrentResume({
      ...currentResume,
      experience: [...currentResume.experience, {
        company: '',
        position: '',
        duration: '',
        description: ''
      }]
    });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    if (!currentResume) return;
    const updated = [...currentResume.experience];
    updated[index] = { ...updated[index], [field]: value };
    setCurrentResume({ ...currentResume, experience: updated });
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please sign in to access Resume Builder</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Resume Builder Pro
          </h1>
          <button
            onClick={createNewResume}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-2 rounded-lg font-medium transition-all"
          >
            Create New Resume
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resume List */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
            <div className="space-y-3">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  onClick={() => setCurrentResume(resume)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    currentResume?.id === resume.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <h3 className="font-medium">{resume.title}</h3>
                  <p className="text-sm text-gray-400">{RESUME_TEMPLATES[resume.template_id as keyof typeof RESUME_TEMPLATES]?.name}</p>
                  {resume.ats_score && (
                    <div className="mt-2">
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                        ATS Score: {resume.ats_score}%
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Resume Editor */}
          <div className="lg:col-span-2">
            {currentResume ? (
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <input
                    type="text"
                    value={currentResume.title}
                    onChange={(e) => setCurrentResume({ ...currentResume, title: e.target.value })}
                    className="text-xl font-semibold bg-transparent border-none outline-none text-white"
                    disabled={!isEditing}
                  />
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={analyzeATS}
                          disabled={loading}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {loading ? 'Analyzing...' : 'ATS Analysis'}
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={saveResume}
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

                {/* Template Selection */}
                {isEditing && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Template</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {Object.values(RESUME_TEMPLATES).map((template) => (
                        <div
                          key={template.id}
                          onClick={() => setCurrentResume({ ...currentResume, template_id: template.id })}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            currentResume.template_id === template.id
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-gray-700 hover:border-gray-600'
                          }`}
                        >
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-400">{template.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Personal Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={currentResume.personal_info.name}
                      onChange={(e) => setCurrentResume({
                        ...currentResume,
                        personal_info: { ...currentResume.personal_info, name: e.target.value }
                      })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      disabled={!isEditing}
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={currentResume.personal_info.email}
                      onChange={(e) => setCurrentResume({
                        ...currentResume,
                        personal_info: { ...currentResume.personal_info, email: e.target.value }
                      })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={currentResume.personal_info.phone}
                      onChange={(e) => setCurrentResume({
                        ...currentResume,
                        personal_info: { ...currentResume.personal_info, phone: e.target.value }
                      })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      disabled={!isEditing}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={currentResume.personal_info.location}
                      onChange={(e) => setCurrentResume({
                        ...currentResume,
                        personal_info: { ...currentResume.personal_info, location: e.target.value }
                      })}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                      disabled={!isEditing}
                    />
                  </div>
                  <textarea
                    placeholder="Professional Summary"
                    value={currentResume.personal_info.summary}
                    onChange={(e) => setCurrentResume({
                      ...currentResume,
                      personal_info: { ...currentResume.personal_info, summary: e.target.value }
                    })}
                    className="w-full mt-4 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-24"
                    disabled={!isEditing}
                  />
                </div>

                {/* Experience */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Experience</h3>
                    {isEditing && (
                      <button
                        onClick={addExperience}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                      >
                        + Add Experience
                      </button>
                    )}
                  </div>
                  {currentResume.experience.map((exp, index) => (
                    <div key={index} className="mb-4 p-4 bg-gray-700 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateExperience(index, 'company', e.target.value)}
                          className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                          disabled={!isEditing}
                        />
                        <input
                          type="text"
                          placeholder="Position"
                          value={exp.position}
                          onChange={(e) => updateExperience(index, 'position', e.target.value)}
                          className="bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                          disabled={!isEditing}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Duration (e.g., Jan 2020 - Present)"
                        value={exp.duration}
                        onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                        className="w-full mb-3 bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white"
                        disabled={!isEditing}
                      />
                      <textarea
                        placeholder="Job description and achievements"
                        value={exp.description}
                        onChange={(e) => updateExperience(index, 'description', e.target.value)}
                        className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white h-20"
                        disabled={!isEditing}
                      />
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Skills</h3>
                  <textarea
                    placeholder="Enter skills separated by commas"
                    value={currentResume.skills.join(', ')}
                    onChange={(e) => setCurrentResume({
                      ...currentResume,
                      skills: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white h-20"
                    disabled={!isEditing}
                  />
                </div>

                {/* ATS Analysis Results */}
                {atsAnalysis && (
                  <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">ATS Analysis Results</h3>
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm">ATS Score:</span>
                        <div className={`px-3 py-1 rounded text-sm font-medium ${
                          atsAnalysis.atsScore >= 80 ? 'bg-green-500/20 text-green-400' :
                          atsAnalysis.atsScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {atsAnalysis.atsScore}%
                        </div>
                      </div>
                    </div>
                    
                    {atsAnalysis.keywordMatches.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-green-400 mb-1">Keyword Matches:</h4>
                        <div className="flex flex-wrap gap-1">
                          {atsAnalysis.keywordMatches.map((keyword: string, index: number) => (
                            <span key={index} className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {atsAnalysis.missingKeywords.length > 0 && (
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-red-400 mb-1">Missing Keywords:</h4>
                        <div className="flex flex-wrap gap-1">
                          {atsAnalysis.missingKeywords.map((keyword: string, index: number) => (
                            <span key={index} className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-300">
                      <p>{atsAnalysis.overallFeedback}</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h2 className="text-xl font-medium mb-4">Select a resume to edit or create a new one</h2>
                <button
                  onClick={createNewResume}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg font-medium transition-all"
                >
                  Create Your First Resume
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}