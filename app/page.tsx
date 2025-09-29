'use client';

import { useEffect, useState, useRef } from 'react';
import { usePricing } from '@/lib/pricing';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function Home() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { plans, loading: pricingLoading } = usePricing();
  
  const mentorshipPrice = plans.find(plan => plan.name.includes('Mentorship'))?.current_price || 1299;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden relative">
      
      {/* Dynamic Mesh Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)] animate-pulse-slow" />
        <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(59,130,246,0.1)_60deg,transparent_120deg)] animate-spin-ultra-slow" />
        
        {/* Morphing Shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full animate-morph-1" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-purple-400/20 to-pink-400/20 animate-morph-2" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
        <div className="absolute bottom-32 left-40 w-28 h-28 bg-gradient-to-r from-emerald-400/20 to-teal-400/20 animate-morph-3" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }} />
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-gradient-to-r from-orange-400/20 to-red-400/20 rounded-full animate-morph-4" />
      </div>

      {/* Interactive Grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-flow" />
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Floating Status Badge */}
          <div className="relative inline-block mb-12">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur opacity-30 animate-pulse" />
            <div className="relative flex items-center px-8 py-4 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                  <div className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full" />
                </div>
                <span className="text-white font-bold text-sm tracking-wider">
                  ⚡ NEXT-GEN SDET MASTERY
                </span>
                <div className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs rounded-full font-black animate-pulse">
                  LIVE
                </div>
              </div>
            </div>
          </div>

          {/* Revolutionary Headline */}
          <div className="relative mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight">
              <div className="relative inline-block">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200 animate-text-shimmer">
                  TRANSFORM INTO
                </span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 blur-xl animate-pulse" />
              </div>
              <div className="relative mt-4">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-flow">
                  ELITE SDET
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 blur-2xl animate-pulse-slow" />
              </div>
            </h1>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-4 h-4 bg-cyan-400 rounded-full animate-float-random-1" />
            <div className="absolute -top-4 -right-12 w-3 h-3 bg-purple-500 rounded-full animate-float-random-2" />
            <div className="absolute -bottom-6 left-16 w-2 h-2 bg-blue-400 rounded-full animate-float-random-3" />
          </div>

          {/* Dynamic Subtitle */}
          <div className="relative mb-16">
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 font-black">100% FREE</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 to-green-400/20 blur animate-pulse" />
              </span> comprehensive SDET courses + 
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-black">Elite 1-on-1 Mentorship</span>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur animate-pulse" />
              </span> for career transformation
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span>Courses: <span className="text-emerald-400 font-bold">100% FREE</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Success: <span className="text-blue-400 font-bold">97.8% job rate</span></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span>Mentorship: <span className="text-purple-400 font-bold">${mentorshipPrice}/month</span></span>
              </div>
            </div>
          </div>

          {/* Revolutionary CTA */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <a href="/courses" className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-110 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/30 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-600 opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
              <span className="relative z-10 flex items-center">
                <span className="mr-3">🎓</span>
                START FREE COURSES
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
            
            <a href="/mentorship" className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/30 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-600 opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
              <span className="relative z-10 flex items-center">
                <span className="mr-3">🚀</span>
                GET MENTORSHIP
                <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </a>
          </div>

          {/* Interactive Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { number: 'FREE', label: 'All Courses', icon: '🎓', gradient: 'from-emerald-400 to-green-500', bg: 'from-emerald-500/10 to-green-500/10' },
              { number: '97.8%', label: 'Success Rate', icon: '🎯', gradient: 'from-blue-400 to-cyan-500', bg: 'from-blue-500/10 to-cyan-500/10' },
              { number: '4 Mo', label: 'Mentorship', icon: '👨🏫', gradient: 'from-purple-400 to-pink-500', bg: 'from-purple-500/10 to-pink-500/10' },
              { number: '$185K', label: 'Avg Salary', icon: '💎', gradient: 'from-yellow-400 to-orange-500', bg: 'from-yellow-500/10 to-orange-500/10' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className="group relative cursor-pointer"
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl`} />
                <div className={`relative bg-gradient-to-br ${stat.bg} backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transform hover:scale-110 hover:-rotate-2 transition-all duration-500`}>
                  <div className="text-4xl mb-4 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">{stat.icon}</div>
                  <div className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} mb-2 group-hover:animate-pulse`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-bold tracking-wide">
                    {stat.label}
                  </div>
                  {activeCard === index && (
                    <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl animate-pulse" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Cursor Effects */}
        <div 
          className="fixed w-24 h-24 pointer-events-none z-50 transition-all duration-300 ease-out"
          style={{
            left: mousePos.x - 48,
            top: mousePos.y - 48,
            transform: `scale(${mousePos.x > 0 ? 1 : 0})`,
            opacity: mousePos.x > 0 ? 0.9 : 0,
            mixBlendMode: 'difference'
          }}
        >
          <div className="absolute inset-0 bg-white rounded-full animate-ping" />
          <div className="absolute inset-6 bg-white rounded-full" />
        </div>

      {/* Floating Action Elements */}
      <div className="fixed bottom-8 right-8 z-40">
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur opacity-40 animate-pulse" />
          <button className="relative bg-gray-900/90 backdrop-blur-xl border border-white/20 rounded-full p-4 text-white hover:scale-110 transition-all duration-300 shadow-2xl">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      </div>
      </section>

      {/* Revolutionary Features Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="relative inline-block mb-8">
              <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-purple-200">
                THE FUTURE IS
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-purple-600/10 blur-2xl animate-pulse-slow" />
            </div>
            <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-8">
              HERE
            </h3>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Revolutionary technology meets elite education. Experience learning like never before.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                icon: '🤖',
                title: 'AI Neural Learning',
                description: 'Advanced AI adapts to your learning patterns, creating personalized pathways that evolve with your progress.',
                gradient: 'from-cyan-400 to-blue-500',
                bgGradient: 'from-cyan-500/5 to-blue-500/5',
                borderGradient: 'from-cyan-400/30 to-blue-500/30'
              },
              {
                icon: '✨',
                title: 'Quantum Mentorship',
                description: 'Connect with industry titans through our exclusive network of FAANG+ senior engineers and architects.',
                gradient: 'from-purple-400 to-pink-500',
                bgGradient: 'from-purple-500/5 to-pink-500/5',
                borderGradient: 'from-purple-400/30 to-pink-500/30'
              },
              {
                icon: '🔥',
                title: 'Reality Simulation',
                description: 'Practice in hyper-realistic environments that mirror actual enterprise testing scenarios.',
                gradient: 'from-orange-400 to-red-500',
                bgGradient: 'from-orange-500/5 to-red-500/5',
                borderGradient: 'from-orange-400/30 to-red-500/30'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 blur transition-opacity duration-700 rounded-3xl`} />
                <div className={`relative bg-gradient-to-br ${feature.bgGradient} backdrop-blur-xl rounded-3xl p-10 border border-white/5 shadow-2xl hover:shadow-4xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 overflow-hidden`}>
                  
                  {/* Animated Background Pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)] animate-pulse-slow" />
                  </div>
                  
                  {/* Floating Orb */}
                  <div className={`absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse`} />
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-8 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
                      {feature.icon}
                    </div>
                    <h3 className={`text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} group-hover:animate-pulse`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      {feature.description}
                    </p>
                    
                    {/* Interactive Element */}
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700`} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite Access Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Holographic Border Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 opacity-30 blur-2xl animate-gradient-flow rounded-3xl" />
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/50 via-blue-500/50 via-purple-500/50 to-pink-500/50 opacity-50 blur animate-gradient-flow rounded-3xl" />
            
            <div className="relative bg-gray-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Animated Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] animate-grid-flow" />
              
              <div className="relative z-10 p-16 text-center">
                {/* Elite Badge */}
                <div className="relative inline-block mb-12">
                  <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-40 blur animate-pulse rounded-full" />
                  <div className="relative flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-xl border border-yellow-400/30 rounded-full">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
                        <div className="absolute inset-0 w-4 h-4 bg-yellow-400 rounded-full" />
                      </div>
                      <span className="text-yellow-200 font-black text-sm tracking-widest">
                        🔥 ELITE ACCESS - 80% OFF
                      </span>
                      <div className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full font-black animate-pulse">
                        ENDING SOON
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-5xl md:text-7xl font-black mb-8">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-text-shimmer">
                    ELITE
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-flow">
                    MENTORSHIP
                  </span>
                </h3>
                
                <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-black">1-on-1 expert mentorship</span> for 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-black">4 months</span> with 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 font-black">guaranteed career transformation</span> and 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black">job placement support</span>.
                </p>

                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-12">
                  <button className="group relative px-16 py-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-black text-2xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transform hover:scale-110 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-white/40 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 opacity-0 group-hover:opacity-60 blur transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center">
                      👨🏫 GET ELITE MENTOR
                    </span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
                      ${mentorshipPrice}/month
                    </div>
                    <div className="text-sm text-gray-400">
                      🔥 4-month transformation program
                    </div>
                  </div>
                </div>

                {/* Countdown Timer Effect */}
                <div className="flex justify-center space-x-8 text-center">
                  {['23', '14', '07', '42'].map((time, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-400 to-pink-500 opacity-30 blur rounded-lg" />
                      <div className="relative bg-gray-800/80 backdrop-blur-xl border border-red-400/20 rounded-lg px-4 py-3">
                        <div className="text-2xl font-black text-red-400">{time}</div>
                        <div className="text-xs text-gray-400">
                          {['HRS', 'MIN', 'SEC', 'MS'][index]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Network */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 mb-4">
              ELITE NETWORK
            </h3>
            <p className="text-gray-500 text-lg">
              Our graduates now lead teams at the world's most innovative companies
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center">
            {[
              { name: 'Google', gradient: 'from-blue-400 to-green-400' },
              { name: 'Microsoft', gradient: 'from-blue-500 to-cyan-400' },
              { name: 'Amazon', gradient: 'from-orange-400 to-yellow-400' },
              { name: 'Meta', gradient: 'from-blue-600 to-purple-500' },
              { name: 'Netflix', gradient: 'from-red-500 to-pink-500' },
              { name: 'Apple', gradient: 'from-gray-400 to-gray-600' }
            ].map((company, index) => (
              <div key={index} className="group relative cursor-pointer">
                <div className={`absolute -inset-2 bg-gradient-to-r ${company.gradient} opacity-0 group-hover:opacity-20 blur transition-opacity duration-500 rounded-xl`} />
                <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/5 rounded-xl p-6 hover:border-white/20 transition-all duration-500 transform hover:scale-110">
                  <div className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${company.gradient} group-hover:animate-pulse`}>
                    {company.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Career Transformation Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 opacity-20 blur-3xl animate-pulse-slow rounded-3xl" />
            <div className="relative bg-gray-900/95 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl p-12">
              
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-6xl font-black mb-6">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">
                    Break Into IT
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                    in Just 4 Months!
                  </span>
                </h2>
              </div>

              <div className="max-w-4xl mx-auto text-center space-y-8">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                  Dreaming of a high-paying IT career but don't know where to start? The fastest and easiest path is through becoming a 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500 font-black"> QA Automation Engineer / SDET</span> — and you don't need any prior coding experience to begin.
                </p>

                <p className="text-lg text-gray-400">
                  With our <span className="text-purple-400 font-bold">4-Month Mentorship Program</span>, we'll take you step by step from beginner to job-ready professional, no matter your background.
                </p>

                <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 my-12">
                  <p className="text-2xl text-white mb-6">
                    For just <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 font-black text-3xl">${mentorshipPrice}/month</span>, you'll get everything you need to succeed:
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 text-left">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2" />
                        <span className="text-gray-300">Learn automation skills from scratch — no coding experience required</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
                        <span className="text-gray-300">Work on hands-on projects that build a real portfolio</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                        <span className="text-gray-300">1-on-1 mentorship to keep you on track</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2" />
                        <span className="text-gray-300">Complete interview coaching and mock sessions</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-pink-400 rounded-full mt-2" />
                        <span className="text-gray-300">Direct job application support — we'll apply to companies for you</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-xl text-gray-300">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black">Imagine this:</span> in 4 months, you could be working in IT with a stable, well-paying career.
                  </p>
                  
                  <p className="text-lg text-red-400 font-semibold">
                    Seats are limited and demand is high — don't wait another month to change your future.
                  </p>
                </div>

                <div className="pt-8">
                  <button className="group relative px-16 py-6 bg-gradient-to-r from-emerald-500 via-blue-600 to-purple-600 text-white font-black text-2xl rounded-2xl shadow-2xl hover:shadow-emerald-500/25 transform hover:scale-110 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-white/30 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />
                    <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
                    <span className="relative z-10 flex items-center">
                      👉 Apply Now & Start Your Career Transformation Today!
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">Everything you need to know about our mentorship program</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                q: "Do I need prior coding experience to join this program?",
                a: "No. Our mentorship starts from the very basics, so even if you've never written a line of code before, you'll be able to follow along and learn step by step."
              },
              {
                q: "What is QA Automation / SDET, and why is it the easiest way into IT?",
                a: "QA Automation & SDET roles focus on testing and automation of software applications. They require less prior technical background compared to pure developer roles, making it the fastest and most accessible entry point into IT."
              },
              {
                q: "How long is the program and what's the cost?",
                a: "The mentorship runs for 4 months at $1299/month, giving you complete training + job support."
              },
              {
                q: "What will I learn during the mentorship?",
                a: "You'll learn basics of coding, automation frameworks, test scripting, API testing, database testing, interview preparation, and everything you need to become job-ready."
              },
              {
                q: "Will you help me find a job after training?",
                a: "Yes. Unlike many courses, we don't just train — we actively apply to companies on your behalf and support you through the hiring process."
              },
              {
                q: "What's the average salary of a QA Automation Engineer / SDET?",
                a: "Entry-level SDETs in the US can earn anywhere between $70,000 to $100,000 per year, and the skill demand is growing rapidly worldwide."
              },
              {
                q: "Can I join if I'm from a non-IT background?",
                a: "Absolutely! Many of our students come from finance, healthcare, retail, or even non-technical backgrounds. The program is designed for career changers."
              },
              {
                q: "What if I can't keep up with the course?",
                a: "Our mentorship includes 1-on-1 support sessions, doubt-clearing calls, and extra resources to ensure you don't fall behind."
              },
              {
                q: "Is this program online or in-person?",
                a: "It's 100% online, so you can join no matter where you live. You just need a laptop and internet connection."
              },
              {
                q: "How soon can I expect results?",
                a: "Most of our students finish training and land interviews within 4 months. Your effort + our mentorship = a clear path into IT."
              },
              {
                q: "What if I don't get a job after 4 months?",
                a: "Our commitment doesn't end after training — we continue supporting you with interview prep, resume updates, and fresh company applications until you succeed. Our goal is your career transformation, not just a course completion."
              },
              {
                q: "How is your mentorship different from cheaper online courses?",
                a: "Unlike generic courses, we offer personalized guidance, hands-on projects, real interview coaching, and actively apply to jobs on your behalf. It's a complete career-changing experience, not just video lessons."
              },
              {
                q: "Is the investment really worth it?",
                a: "Absolutely. Graduates often land roles with starting salaries that quickly cover their investment. A stable IT career sets you up for long-term financial growth and new opportunities."
              },
              {
                q: "What if I'm working full-time or busy — can I manage the workload?",
                a: "The program is designed to be flexible. Course materials and mentorship calls are accessible whenever you're free, so you can learn at your own pace and balance your current commitments."
              },
              {
                q: "I've tried learning online before and found it too confusing. How do you make things easier?",
                a: "We break everything down to simple, actionable steps and offer 1-on-1 mentor sessions whenever you need help. You're never alone — we help you overcome every technical hurdle."
              },
              {
                q: "Are tech jobs safe from layoffs and recession?",
                a: "The demand for automation and testing professionals remains high because every company strives for quality products. SDETs and QA engineers are considered vital, even in tough times."
              },
              {
                q: "Will I get a certificate or proof of completion?",
                a: "Yes. Upon successfully completing the program, you'll receive a recognized certificate and a portfolio of projects to showcase to employers."
              },
              {
                q: "Can I cancel anytime if I'm not satisfied?",
                a: "We're confident in our program, but if you feel it's not working for you, reach out anytime and we'll work to resolve your concerns. Your satisfaction is important to us."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                <h3 className="text-lg font-bold text-white mb-4">{faq.q}</h3>
                <p className="text-gray-300 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl animate-pulse-slow rounded-full" />
            <div className="relative">
              <h2 className="text-6xl md:text-8xl font-black mb-8">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-200">
                  YOUR TIME
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-flow">
                  IS NOW
                </span>
              </h2>
              
              <p className="text-2xl text-gray-300 mb-16 max-w-3xl mx-auto">
                Don't let another day pass wondering "what if". 
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 font-black">
                  Transform your career today.
                </span>
              </p>

              <button className="group relative px-20 py-8 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-black text-3xl rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-110 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white/30 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 skew-x-12" />
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 blur transition-opacity duration-500" />
                <span className="relative z-10 flex items-center">
                  🚀 BEGIN TRANSFORMATION
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}