'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Dynamic Cursor */}
      <div 
        className="fixed w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `scale(${mousePosition.x > 0 ? 1.5 : 1})`
        }}
      />

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              background: `linear-gradient(45deg, 
                hsl(${Math.random() * 60 + 240}, 70%, 60%), 
                hsl(${Math.random() * 60 + 300}, 70%, 60%))`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          
          {/* Premium Badge with Pulsing Effect */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/50 backdrop-blur-xl mb-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="w-3 h-3 bg-emerald-400 rounded-full mr-3 animate-pulse shadow-lg shadow-emerald-400/50" />
            <span className="text-white font-semibold text-sm tracking-wide relative z-10">
              🚀 WORLD'S #1 SDET MASTERY PLATFORM
            </span>
          </div>

          {/* Main Headline with Gradient Animation */}
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white animate-gradient-x">
              MASTER
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 animate-gradient-x-reverse">
              SDET
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient-x">
              ELITE
            </span>
          </h1>

          {/* Subtitle with Typewriter Effect */}
          <div className="text-2xl md:text-3xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            <span className="text-purple-400 font-bold">AI-Powered</span> learning that adapts to you. 
            <br />
            Join <span className="text-yellow-400 font-bold animate-pulse">127,000+</span> professionals who 
            <span className="text-emerald-400 font-bold"> 10X'd their careers</span>.
          </div>

          {/* CTA Buttons with Magnetic Effect */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-110 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              <span className="relative z-10 flex items-center">
                START FREE JOURNEY
                <svg className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-500 -z-10" />
            </button>
            
            <button className="group relative px-12 py-6 border-2 border-purple-400/50 rounded-2xl text-white font-bold text-xl hover:bg-purple-600/20 hover:border-purple-400 transform hover:scale-110 transition-all duration-500 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center">
                <svg className="w-6 h-6 mr-2 group-hover:animate-spin" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12l-6-6 1.5-1.5L10 9l4.5-4.5L16 6z"/>
                </svg>
                WATCH DEMO
              </span>
            </button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: '127K+', label: 'Elite Students', color: 'from-purple-400 to-pink-400' },
              { number: '98.7%', label: 'Success Rate', color: 'from-emerald-400 to-cyan-400' },
              { number: '4.9★', label: 'Rating', color: 'from-yellow-400 to-orange-400' },
              { number: '$180K', label: 'Avg Salary', color: 'from-green-400 to-emerald-400' }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                <div className="text-center transform group-hover:scale-110 transition-all duration-500">
                  <div className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.color} mb-2 animate-pulse`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                    {stat.label}
                  </div>
                </div>
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 rounded-xl blur-xl transition-opacity duration-500 -z-10`} />
              </div>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full animate-bounce-slow backdrop-blur-sm" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-pink-500/10 rounded-full animate-bounce-slow animation-delay-2000 backdrop-blur-sm" />
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-yellow-500/10 rounded-full animate-pulse backdrop-blur-sm" />
      </section>

      {/* Features Section with 3D Cards */}
      <section className="relative py-32 px-4" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8">
              Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">xPath Pro</span>?
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Experience the future of SDET education with our revolutionary AI-powered platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🧠',
                title: 'AI-Powered Learning',
                description: 'Our advanced AI adapts to your learning style, providing personalized recommendations and real-time feedback.',
                gradient: 'from-purple-600 to-pink-600'
              },
              {
                icon: '👨‍💼',
                title: 'Industry Legends',
                description: 'Learn from top SDET professionals from Google, Microsoft, Amazon, and other tech giants.',
                gradient: 'from-blue-600 to-cyan-600'
              },
              {
                icon: '🎯',
                title: 'Guaranteed Results',
                description: '98.7% of our students land SDET roles within 6 months or get their money back.',
                gradient: 'from-emerald-600 to-teal-600'
              }
            ].map((feature, index) => (
              <div key={index} className="group relative">
                <div className="relative p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl border border-purple-500/30 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-700 transform hover:scale-105 hover:rotate-1 overflow-hidden">
                  
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  
                  <div className="relative z-10">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-500">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                  
                  {/* Glow Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 -z-10`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Teaser with Scarcity */}
      <section className="relative py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative p-16 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-3xl border border-yellow-500/50 backdrop-blur-xl overflow-hidden">
            
            {/* Animated Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-50 animate-gradient-x blur-sm" />
            <div className="absolute inset-[2px] bg-black/80 rounded-3xl" />
            
            <div className="relative z-10">
              {/* Scarcity Badge */}
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-600/30 to-orange-600/30 border border-red-500/50 mb-8 animate-pulse">
                <span className="w-3 h-3 bg-red-400 rounded-full mr-3 animate-ping" />
                <span className="text-red-300 text-sm font-bold tracking-wide">
                  ⚡ LIMITED TIME: 73% OFF PREMIUM
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 mb-6 animate-gradient-x">
                UNLOCK ELITE STATUS
              </h3>
              
              <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Get access to <span className="text-yellow-400 font-bold">AI mentorship</span>, 
                <span className="text-orange-400 font-bold"> mock interviews</span>, 
                <span className="text-red-400 font-bold"> resume builder</span>, and 
                <span className="text-purple-400 font-bold"> exclusive industry connections</span>.
              </p>

              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-8">
                {['23', '59', '47'].map((time, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-black text-white bg-gradient-to-br from-red-600 to-orange-600 rounded-lg px-4 py-2 mb-1">
                      {time}
                    </div>
                    <div className="text-xs text-gray-400 uppercase tracking-wide">
                      {['Hours', 'Minutes', 'Seconds'][index]}
                    </div>
                  </div>
                ))}
              </div>

              <button className="group relative px-16 py-6 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-2xl text-black font-black text-2xl shadow-2xl hover:shadow-yellow-500/50 transform hover:scale-110 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                <span className="relative z-10">
                  CLAIM 73% DISCOUNT NOW
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10" />
              </button>

              <p className="text-sm text-gray-500 mt-4">
                ⏰ Offer expires in 24 hours • Only 47 spots remaining
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-12">
            Trusted by professionals at
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            {['Google', 'Microsoft', 'Amazon', 'Meta', 'Netflix', 'Tesla'].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-white hover:text-purple-400 transition-colors duration-300 cursor-pointer">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}