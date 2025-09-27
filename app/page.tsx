'use client';

import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    setIsVisible(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-pink-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-200/20 to-blue-200/20 rounded-full blur-2xl animate-spin-slow" />
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-gradient-to-r from-blue-300/40 to-purple-300/40 rounded-full animate-float-gentle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-blue-200/50 shadow-lg mb-8 hover:shadow-xl transition-all duration-300 group">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse" />
            <span className="text-slate-700 font-semibold text-sm tracking-wide">
              🚀 World's Most Advanced SDET Platform
            </span>
            <div className="ml-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full font-bold">
              NEW
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 animate-gradient-x">
              Master SDET
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient-x-reverse">
              Like Never Before
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join <span className="font-bold text-blue-600">150,000+</span> professionals who transformed their careers with our 
            <span className="font-bold text-purple-600"> AI-powered</span> learning platform.
            <br />
            <span className="text-lg text-slate-500">Average salary increase: <span className="font-bold text-green-600">$45,000</span></span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10 flex items-center">
                Start Learning FREE
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-10 py-5 bg-white/80 backdrop-blur-sm border-2 border-blue-200 text-slate-700 font-bold text-lg rounded-2xl hover:bg-white hover:border-blue-300 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z"/>
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '150K+', label: 'Students', icon: '👥', color: 'from-blue-500 to-cyan-500' },
              { number: '97.8%', label: 'Success Rate', icon: '🎯', color: 'from-green-500 to-emerald-500' },
              { number: '4.9★', label: 'Rating', icon: '⭐', color: 'from-yellow-500 to-orange-500' },
              { number: '$185K', label: 'Avg Salary', icon: '💰', color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Elements */}
        <div 
          className="absolute w-4 h-4 bg-gradient-to-r from-blue-400/60 to-purple-400/60 rounded-full pointer-events-none transition-all duration-200 ease-out z-50"
          style={{
            left: mousePos.x - 8,
            top: mousePos.y - 8,
            transform: `scale(${mousePos.x > 0 ? 1 : 0.8})`,
            opacity: mousePos.x > 0 ? 0.7 : 0
          }}
        />
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">xPath Pro</span>?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Experience the future of SDET education with cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Learning',
                description: 'Personalized learning paths that adapt to your pace and style.',
                gradient: 'from-blue-500 to-cyan-500',
                bgGradient: 'from-blue-50 to-cyan-50'
              },
              {
                icon: '🎯',
                title: 'Industry Experts',
                description: 'Learn from top SDET professionals at leading tech companies.',
                gradient: 'from-purple-500 to-pink-500',
                bgGradient: 'from-purple-50 to-pink-50'
              },
              {
                icon: '🚀',
                title: 'Guaranteed Results',
                description: '97.8% job placement rate within 6 months or money back.',
                gradient: 'from-green-500 to-emerald-500',
                bgGradient: 'from-green-50 to-emerald-50'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className={`relative p-8 bg-gradient-to-br ${feature.bgGradient} rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 overflow-hidden`}>
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="relative z-10">
                    <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200/50 shadow-2xl overflow-hidden">
            
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 opacity-20 animate-gradient-x blur-sm" />
            <div className="absolute inset-[2px] bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl" />
            
            <div className="relative z-10">
              {/* Premium Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300/50 mb-8">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-3 animate-pulse" />
                <span className="text-amber-800 text-sm font-bold tracking-wide">
                  ⚡ LIMITED TIME: 70% OFF PREMIUM
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 mb-6">
                Unlock Your Potential
              </h3>
              
              <p className="text-xl text-slate-700 mb-8 max-w-3xl mx-auto">
                Get access to <span className="font-bold text-amber-600">AI mentorship</span>, 
                <span className="font-bold text-orange-600"> mock interviews</span>, 
                <span className="font-bold text-red-600"> resume builder</span>, and 
                <span className="font-bold text-purple-600"> exclusive content</span>.
              </p>

              <button className="group relative px-12 py-6 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-black text-xl rounded-2xl shadow-2xl hover:shadow-amber-500/25 transform hover:scale-110 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">
                  Claim 70% Discount
                </span>
              </button>

              <p className="text-sm text-slate-500 mt-4">
                ⏰ Offer expires soon • Limited spots available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-slate-700 mb-8">
            Trusted by professionals at
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Apple'].map((company, index) => (
              <div key={index} className="text-xl font-bold text-slate-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}