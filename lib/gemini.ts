export class GeminiClient {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY || '';
  }

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
}