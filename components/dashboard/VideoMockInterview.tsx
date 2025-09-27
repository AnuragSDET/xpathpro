'use client';

import { useState, useRef, useEffect } from 'react';

interface Question {
  question: string;
  category: string;
  difficulty: string;
  expectedDuration: number;
  followUpHints: string[];
}

interface VideoResponse {
  questionId: number;
  videoBlob: Blob;
  transcript: string;
  duration: number;
}

interface Evaluation {
  technicalScore: number;
  communicationScore: number;
  overallScore: number;
  feedback: string;
  suggestions: string[];
  speechAnalysis: any;
}

export default function VideoMockInterview({ userId }: { userId: string }) {
  const [isActive, setIsActive] = useState(false);
  const [interviewId, setInterviewId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startInterview = async (type: string) => {
    try {
      const response = await fetch('/api/video-interview/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, interviewType: type })
      });
      
      const data = await response.json();
      setInterviewId(data.interviewId);
      setCurrentQuestion(data.question);
      setIsActive(true);
      setStartTime(Date.now());
      setQuestionIndex(0);
      
      await setupCamera();
    } catch (error) {
      console.error('Failed to start interview:', error);
      alert('Failed to start interview. Please try again.');
    }
  };

  const setupCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      // Setup speech recognition
      if ('webkitSpeechRecognition' in window) {
        const recognition = new (window as any).webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event: any) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript) {
            setTranscript(prev => prev + finalTranscript + ' ');
          }
        };
        
        recognitionRef.current = recognition;
      }
    } catch (error) {
      console.error('Camera setup failed:', error);
      alert('Camera access required for video interview');
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;

    recordedChunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.start();
    setIsRecording(true);
    setRecordingTime(0);
    setTranscript('');
    
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  const stopRecording = async () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);
    
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    mediaRecorderRef.current.onstop = async () => {
      const videoBlob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
      await processVideoResponse(videoBlob);
    };
  };

  const processVideoResponse = async (videoBlob: Blob) => {
    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('video', videoBlob);
      formData.append('transcript', transcript);
      formData.append('interviewId', interviewId!);
      formData.append('questionIndex', questionIndex.toString());
      formData.append('duration', recordingTime.toString());

      const response = await fetch('/api/video-interview/process', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setEvaluation(data.evaluation);
      
      // Get next question or complete interview
      if (questionIndex < 4) { // 5 questions total
        setCurrentQuestion(data.nextQuestion);
        setQuestionIndex(prev => prev + 1);
        setEvaluation(null);
      }
    } catch (error) {
      console.error('Failed to process response:', error);
      alert('Failed to process response. Please try again.');
    }
    
    setIsProcessing(false);
  };

  const completeInterview = async () => {
    try {
      const response = await fetch('/api/video-interview/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          interviewId, 
          duration: Math.floor((Date.now() - (startTime || 0)) / 1000)
        })
      });

      const data = await response.json();
      alert(`🎉 Video Interview Completed!

Overall Score: ${data.overallScore}/100
Technical Score: ${data.technicalScore}/100  
Communication Score: ${data.communicationScore}/100

Questions Answered: ${questionIndex + 1}
Total Duration: ${Math.floor(data.duration/60)}m ${data.duration%60}s`);

      // Cleanup
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setIsActive(false);
      setInterviewId(null);
      setCurrentQuestion(null);
      setEvaluation(null);
      setQuestionIndex(0);
    } catch (error) {
      console.error('Failed to complete interview:', error);
    }
  };

  if (!isActive) {
    return (
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-20 blur rounded-2xl" />
        <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-4">
            🎥 AI Video Interview
          </h3>
          <p className="text-gray-300 mb-8 text-lg">
            Experience realistic video interviews with AI-powered evaluation of both technical skills and communication
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { type: 'technical', icon: '💻', desc: 'Technical Skills & Problem Solving', gradient: 'from-cyan-400 to-blue-500' },
              { type: 'behavioral', icon: '🧠', desc: 'Communication & Soft Skills', gradient: 'from-purple-400 to-pink-500' },
              { type: 'system_design', icon: '🏗️', desc: 'Architecture & System Design', gradient: 'from-emerald-400 to-green-500' }
            ].map(({ type, icon, desc, gradient }) => (
              <div key={type} className="relative group">
                <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-xl`} />
                <button
                  onClick={() => startInterview(type)}
                  className="relative w-full p-6 bg-gray-800/50 border border-white/10 rounded-xl hover:border-white/30 transition-all duration-300 group-hover:scale-105"
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
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              🎥 Video Interview in Progress
            </h3>
            <p className="text-gray-400 mt-2">Question {questionIndex + 1} of 5</p>
          </div>
          <button
            onClick={completeInterview}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300"
          >
            End Interview
          </button>
        </div>

        {/* Video Preview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-64 bg-gray-800 rounded-xl object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
              <span className="text-white text-sm font-medium">
                {isRecording ? `Recording ${Math.floor(recordingTime/60)}:${(recordingTime%60).toString().padStart(2, '0')}` : 'Ready'}
              </span>
            </div>
          </div>

          {/* Question Display */}
          {currentQuestion && (
            <div className="bg-gray-800/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-400/30 text-blue-300 text-sm rounded-full font-medium">
                  {currentQuestion.category}
                </span>
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 text-sm rounded-full font-medium">
                  {currentQuestion.difficulty}
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-4 leading-relaxed">
                {currentQuestion.question}
              </h4>
              <p className="text-gray-400 text-sm">
                Expected duration: ~{currentQuestion.expectedDuration}s
              </p>
            </div>
          )}
        </div>

        {/* Recording Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          {!isRecording ? (
            <button
              onClick={startRecording}
              disabled={isProcessing}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50"
            >
              🎬 Start Recording Answer
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-lg hover:scale-105 transition-transform duration-300"
            >
              ⏹️ Stop & Submit
            </button>
          )}
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="text-center py-8">
            <div className="inline-flex items-center space-x-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
              <span className="text-cyan-400 font-medium">Processing your response with AI...</span>
            </div>
          </div>
        )}

        {/* Evaluation Results */}
        {evaluation && (
          <div className="mb-8 p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-400/30 rounded-xl backdrop-blur-sm">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  {evaluation.technicalScore}/100
                </div>
                <div className="text-sm text-gray-400">Technical</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  {evaluation.communicationScore}/100
                </div>
                <div className="text-sm text-gray-400">Communication</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                  {evaluation.overallScore}/100
                </div>
                <div className="text-sm text-gray-400">Overall</div>
              </div>
            </div>
            <p className="text-gray-300 mb-3">{evaluation.feedback}</p>
            {evaluation.suggestions.length > 0 && (
              <ul className="text-sm text-gray-400 space-y-1">
                {evaluation.suggestions.map((suggestion, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-emerald-400 mr-2">💡</span>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Live Transcript */}
        {transcript && (
          <div className="bg-gray-800/30 rounded-lg p-4">
            <h5 className="text-sm font-medium text-gray-400 mb-2">Live Transcript:</h5>
            <p className="text-gray-300 text-sm">{transcript}</p>
          </div>
        )}
      </div>
    </div>
  );
}