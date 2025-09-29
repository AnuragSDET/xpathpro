'use client';

import { useEffect, useState } from 'react';
import { usePricing } from '@/lib/pricing';
import TestimonialsSection from '@/components/TestimonialsSection';

export default function NewHeroPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { plans, loading: pricingLoading } = usePricing();
  
  const mentorshipPrice = plans.find(plan => plan.name.includes('Mentorship'))?.current_price || 1299;

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative">
      
      {/* New Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        {/* Clean Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900" />
        
        {/* Floating Tool Logos */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Selenium */}
          <div className="absolute top-20 left-20 w-16 h-16 opacity-10 animate-float" style={{ animationDelay: '0s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          
          {/* Java */}
          <div className="absolute top-32 right-24 w-12 h-12 opacity-10 animate-float" style={{ animationDelay: '1s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-orange-500">
              <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218"/>
            </svg>
          </div>
          
          {/* RestAssured */}
          <div className="absolute bottom-32 left-32 w-14 h-14 opacity-10 animate-float" style={{ animationDelay: '2s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-blue-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          
          {/* Jenkins */}
          <div className="absolute bottom-20 right-20 w-12 h-12 opacity-10 animate-float" style={{ animationDelay: '3s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-red-400">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
          
          {/* TestNG */}
          <div className="absolute top-40 left-1/3 w-10 h-10 opacity-10 animate-float" style={{ animationDelay: '4s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-yellow-400">
              <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7l2-7z"/>
            </svg>
          </div>
          
          {/* Appium */}
          <div className="absolute bottom-40 right-1/3 w-12 h-12 opacity-10 animate-float" style={{ animationDelay: '5s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-purple-400">
              <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v16H7V4z"/>
            </svg>
          </div>
          
          {/* GitHub */}
          <div className="absolute top-1/2 right-16 w-14 h-14 opacity-10 animate-float" style={{ animationDelay: '6s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-gray-400">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          
          {/* Cucumber */}
          <div className="absolute top-1/2 left-16 w-10 h-10 opacity-10 animate-float" style={{ animationDelay: '7s' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-green-500">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </div>
        </div>

        <div className={`relative z-10 max-w-6xl mx-auto text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Trust Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-emerald-500/20 border border-emerald-400/30 rounded-full mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse" />
            <span className="text-emerald-300 font-bold text-sm">100% Free Core Content</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
            Master QA Automation &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              SDET Skills
            </span><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
              From Zero to Hired
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Free comprehensive learning path, hands-on practice, and interview prep.<br />
            <span className="text-blue-300 font-semibold">Join 10,000+ testers advancing their careers.</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <a href="/courses" className="group relative px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Start Learning Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </a>
            
            <a href="/courses" className="group relative px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-lg rounded-xl hover:bg-white/20 transition-all duration-300">
              View Learning Path
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <span>📚</span>
              <span>32 Courses</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🎯</span>
              <span>6 Specializations</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>💼</span>
              <span>500+ Job Placements</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>🆓</span>
              <span>Always Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* Keep all other sections identical to original homepage */}
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
      
      {/* All other sections remain identical... */}
    </div>
  );
}