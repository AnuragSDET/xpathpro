export class GeminiClient {
  private model: any;
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
    // Initialize model for compatibility
    this.model = {
      generateContent: (prompt: string) => this.generateContent(prompt)
    };
  }
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';



  async generateContent(prompt: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }]
        })
      });

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate AI response');
    }
  }

  async generateInterviewQuestion(type: string, previousQuestions: string[] = [], candidateLevel: string = 'intermediate'): Promise<{
    question: string;
    category: string;
    difficulty: string;
    expectedDuration: number;
    followUpHints: string[];
  }> {
    const prompt = `Generate a ${type} SDET interview question for ${candidateLevel} level candidate.
    Previous questions: ${previousQuestions.join(', ')}
    
    Create a realistic interview question that:
    - Tests practical SDET knowledge
    - Allows for detailed explanation
    - Has clear evaluation criteria
    - Is appropriate for video response
    
    Return JSON format:
    {
      "question": "Your detailed question here",
      "category": "technical/behavioral/system_design",
      "difficulty": "easy/medium/hard",
      "expectedDuration": 120,
      "followUpHints": ["hint1", "hint2"]
    }`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return {
        question: response,
        category: type,
        difficulty: 'medium',
        expectedDuration: 120,
        followUpHints: []
      };
    }
  }

  async evaluateVideoResponse(question: string, transcript: string, speechMetrics: any): Promise<{
    technicalScore: number;
    communicationScore: number;
    overallScore: number;
    feedback: string;
    suggestions: string[];
    speechAnalysis: any;
  }> {
    const prompt = `Evaluate this SDET video interview response:
    
    Question: ${question}
    Transcript: ${transcript}
    Speech Metrics: ${JSON.stringify(speechMetrics)}
    
    Analyze both technical content and communication skills:
    - Technical accuracy and depth
    - Communication clarity and confidence
    - Professional presentation
    - Speech pace and articulation
    
    Return JSON format:
    {
      "technicalScore": 85,
      "communicationScore": 78,
      "overallScore": 82,
      "feedback": "Detailed feedback on both technical and communication aspects",
      "suggestions": ["technical improvement", "communication tip"],
      "speechAnalysis": {
        "pace": "good",
        "clarity": "excellent",
        "confidence": "moderate",
        "fillerWords": 3
      }
    }`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return {
        technicalScore: 70,
        communicationScore: 75,
        overallScore: 72,
        feedback: response,
        suggestions: ['Practice technical explanations', 'Work on speaking confidence'],
        speechAnalysis: { pace: 'moderate', clarity: 'good', confidence: 'moderate' }
      };
    }
  }

  // Backward compatibility method
  async evaluateAnswer(question: string, answer: string): Promise<{
    score: number;
    feedback: string;
    suggestions: string[];
  }> {
    const speechMetrics = { duration: 0, wordsPerMinute: 0, fillerWords: 0, pace: 'moderate' };
    const result = await this.evaluateVideoResponse(question, answer, speechMetrics);
    return {
      score: result.overallScore,
      feedback: result.feedback,
      suggestions: result.suggestions
    };
  }

  // Resume optimization and ATS scoring
  async optimizeResume(resumeData: any, jobDescription?: string): Promise<{
    atsScore: number;
    optimizedSkills: string[];
    keywordMatches: string[];
    missingKeywords: string[];
    suggestions: {
      experience: string[];
      skills: string[];
      summary: string;
    };
    formattingIssues: string[];
    overallFeedback: string;
  }> {
    const prompt = `Analyze and optimize this resume for ATS compatibility:

Resume: ${JSON.stringify(resumeData)}
${jobDescription ? `Job Description: ${jobDescription}` : ''}

Provide optimization in JSON format:
{
  "atsScore": 85,
  "optimizedSkills": ["skill1", "skill2"],
  "keywordMatches": ["keyword1", "keyword2"],
  "missingKeywords": ["missing1", "missing2"],
  "suggestions": {
    "experience": ["suggestion1"],
    "skills": ["suggestion1"],
    "summary": "Optimized summary"
  },
  "formattingIssues": ["issue1"],
  "overallFeedback": "Detailed feedback"
}`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return {
        atsScore: 75,
        optimizedSkills: [],
        keywordMatches: [],
        missingKeywords: [],
        suggestions: { experience: [], skills: [], summary: '' },
        formattingIssues: [],
        overallFeedback: 'Unable to generate optimization at this time.'
      };
    }
  }

  // Cover letter generation
  async generateCoverLetter(resumeData: any, jobTitle: string, companyName: string, jobDescription: string): Promise<string> {
    const prompt = `Generate a professional cover letter:

Resume: ${JSON.stringify(resumeData)}
Job Title: ${jobTitle}
Company: ${companyName}
Job Description: ${jobDescription}

Create a compelling, personalized cover letter that:
- Highlights relevant experience
- Matches job requirements
- Shows enthusiasm
- Is ATS-friendly
- Is 3-4 paragraphs

Return only the cover letter content.`;

    return await this.generateContent(prompt);
  }
}
export const geminiClient = new GeminiClient();

// Resume templates
export const RESUME_TEMPLATES = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean, ATS-friendly design with modern typography',
    preview: '/templates/modern-preview.png'
  },
  classic: {
    id: 'classic',
    name: 'Classic Executive', 
    description: 'Traditional format preferred by corporate recruiters',
    preview: '/templates/classic-preview.png'
  },
  creative: {
    id: 'creative',
    name: 'Creative Designer',
    description: 'Stylish layout for creative and design roles',
    preview: '/templates/creative-preview.png'
  },
  tech: {
    id: 'tech',
    name: 'Tech Professional',
    description: 'Optimized for software engineering and tech roles',
    preview: '/templates/tech-preview.png'
  }
};