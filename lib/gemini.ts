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

  async generateInterviewQuestion(type: string, previousQuestions: string[] = []): Promise<{
    question: string;
    category: string;
    difficulty: string;
  }> {
    const prompt = `Generate a ${type} SDET interview question. 
    Previous questions: ${previousQuestions.join(', ')}
    
    Return JSON format:
    {
      "question": "Your question here",
      "category": "technical/behavioral/system_design",
      "difficulty": "easy/medium/hard"
    }`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return {
        question: response,
        category: type,
        difficulty: 'medium'
      };
    }
  }

  async evaluateAnswer(question: string, answer: string): Promise<{
    score: number;
    feedback: string;
    suggestions: string[];
  }> {
    const prompt = `Evaluate this SDET interview answer:
    Question: ${question}
    Answer: ${answer}
    
    Return JSON format:
    {
      "score": 85,
      "feedback": "Your detailed feedback here",
      "suggestions": ["suggestion 1", "suggestion 2"]
    }`;

    const response = await this.generateContent(prompt);
    try {
      return JSON.parse(response);
    } catch {
      return {
        score: 70,
        feedback: response,
        suggestions: ['Practice more technical concepts']
      };
    }
  }
}