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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setInterviewId(data.interviewId);
      setCurrentQuestion(data.question);
      setIsActive(true);
      setStartTime(Date.now());
    } catch (error) {
      console.error('Failed to start interview:', error);
      alert('Failed to start interview. Please try again.');
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      setEvaluation(data.evaluation);
      setCurrentQuestion(data.nextQuestion);
      setAnswer('');
    } catch (error) {
      console.error('Failed to submit answer:', error);
      alert('Failed to submit answer. Please try again.');
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
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      alert(`🎉 Interview completed!\n\nFinal Score: ${data.score}/100\nQuestions Answered: ${data.totalQuestions}\nDuration: ${Math.floor(duration/60)}m ${duration%60}s`);
      setIsActive(false);
      setInterviewId(null);
      setCurrentQuestion(null);
      setEvaluation(null);
      setStartTime(null);
    } catch (error) {
      console.error('Failed to complete interview:', error);
      alert('Failed to complete interview. Please try again.');
    }
  };

  if (!isActive) {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-20 blur rounded-2xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">🤖 AI Mock Interview</h3>
          <p className="text-gray-300 mb-8 text-lg">Practice with AI-powered interviews</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: 'technical', icon: '💻', desc: 'Coding & Testing', gradient: 'from-cyan-400 to-blue-500' },
              { type: 'behavioral', icon: '🧠', desc: 'Soft Skills', gradient: 'from-purple-400 to-pink-500' },
              { type: 'system_design', icon: '🏢', desc: 'Architecture', gradient: 'from-emerald-400 to-green-500' }
            ].map(({ type, icon, desc, gradient }) => (
              <div key={type} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-xl`} />
                <button
                  onClick={() => startInterview(type)}
                  disabled={loading}
                  className="relative w-full p-6 bg-gray-800/50 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300 disabled:opacity-50 group-hover:scale-105"
                >
                  <div className="text-4xl mb-3">{icon}</div>
                  <div className={`text-xl font-bold capitalize text-transparent bg-clip-text bg-gradient-to-r ${gradient} mb-2`}>
                    {type.replace('_', ' ')}
                  </div>
                  <div className="text-sm text-gray-400">{desc}</div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-20 blur rounded-2xl" />
      <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">🤖 AI Interview in Progress</h3>
          <button
            onClick={completeInterview}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300"
          >
            End Interview
          </button>
        </div>

        {evaluation && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-400/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Score: {evaluation.score}/100</span>
            </div>
            <p className="text-gray-300 mb-3 text-lg">{evaluation.feedback}</p>
            {evaluation.suggestions.length > 0 && (
              <ul className="text-sm text-gray-400 space-y-1">
                {evaluation.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-400 mr-2">•</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {currentQuestion && (
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-sm rounded-full font-medium">
                {currentQuestion.category}
              </span>
              <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 text-sm rounded-full font-medium">
                {currentQuestion.difficulty}
              </span>
            </div>
            <h4 className="text-xl font-bold text-white mb-6 leading-relaxed">{currentQuestion.question}</h4>
            
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              className="w-full h-40 p-4 bg-gray-800/50 border border-white/20 rounded-xl text-white placeholder-gray-400 resize-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
            />
            
            <button
              onClick={submitAnswer}
              disabled={loading || !answer.trim()}
              className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? '⚙️ Processing...' : '🚀 Submit Answer'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}