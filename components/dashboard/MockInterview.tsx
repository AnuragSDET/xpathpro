'use client';

import { useState } from 'react';

interface Question {
  question: string;
  category: string;
  difficulty: string;
}

interface Evaluation {
  score: number;
  feedback: string;
  suggestions: string[];
}

export default function MockInterview({ userId }: { userId: string }) {
  const [isActive, setIsActive] = useState(false);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const startInterview = async (type: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/mock-interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, interviewType: type })
      });
      
      const data = await response.json();
      setInterviewId(data.interviewId);
      setCurrentQuestion(data.question);
      setIsActive(true);
      setStartTime(Date.now());
    } catch (error) {
      console.error('Failed to start interview:', error);
    }
    setLoading(false);
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !currentQuestion || !interviewId) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/mock-interview/answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          interviewId,
          answer,
          currentQuestion
        })
      });
      
      const data = await response.json();
      setEvaluation(data.evaluation);
      setCurrentQuestion(data.nextQuestion);
      setAnswer('');
    } catch (error) {
      console.error('Failed to submit answer:', error);
    }
    setLoading(false);
  };

  const completeInterview = async () => {
    if (!interviewId || !startTime) return;
    
    const duration = Math.floor((Date.now() - startTime) / 1000);
    
    try {
      const response = await fetch('/api/mock-interview/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interviewId, duration })
      });
      
      const data = await response.json();
      alert(`Interview completed! Score: ${data.score}/100`);
      setIsActive(false);
      setInterviewId(null);
      setCurrentQuestion(null);
      setEvaluation(null);
    } catch (error) {
      console.error('Failed to complete interview:', error);
    }
  };

  if (!isActive) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h3 className="text-2xl font-bold mb-4">🤖 AI Mock Interview</h3>
        <p className="text-gray-600 mb-6">Practice with AI-powered interviews</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {['technical', 'behavioral', 'system_design'].map((type) => (
            <button
              key={type}
              onClick={() => startInterview(type)}
              disabled={loading}
              className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 disabled:opacity-50"
            >
              <div className="text-lg font-semibold capitalize">{type.replace('_', ' ')}</div>
              <div className="text-sm text-gray-500 mt-1">
                {type === 'technical' && 'Coding & Testing'}
                {type === 'behavioral' && 'Soft Skills'}
                {type === 'system_design' && 'Architecture'}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">🤖 AI Interview in Progress</h3>
        <button
          onClick={completeInterview}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          End Interview
        </button>
      </div>

      {evaluation && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold">Score: {evaluation.score}/100</span>
          </div>
          <p className="text-gray-700 mb-2">{evaluation.feedback}</p>
          {evaluation.suggestions.length > 0 && (
            <ul className="text-sm text-gray-600">
              {evaluation.suggestions.map((suggestion, i) => (
                <li key={i}>• {suggestion}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {currentQuestion && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {currentQuestion.category}
            </span>
            <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">
              {currentQuestion.difficulty}
            </span>
          </div>
          <h4 className="text-lg font-semibold mb-4">{currentQuestion.question}</h4>
          
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          <button
            onClick={submitAnswer}
            disabled={loading || !answer.trim()}
            className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Submit Answer'}
          </button>
        </div>
      )}
    </div>
  );
}