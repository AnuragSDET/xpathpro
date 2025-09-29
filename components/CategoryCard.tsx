'use client'

import Link from 'next/link'
import { useState } from 'react'

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-pink-500',
  orange: 'from-orange-500 to-red-500',
  red: 'from-red-500 to-pink-500',
  teal: 'from-teal-500 to-cyan-500',
  pink: 'from-pink-500 to-rose-500',
  indigo: 'from-indigo-500 to-purple-500',
}

const glowColorMap: Record<string, string> = {
  blue: 'rgba(59, 130, 246, 0.6)',
  green: 'rgba(34, 197, 94, 0.6)',
  purple: 'rgba(147, 51, 234, 0.6)',
  orange: 'rgba(249, 115, 22, 0.6)',
  red: 'rgba(239, 68, 68, 0.6)',
  teal: 'rgba(20, 184, 166, 0.6)',
  pink: 'rgba(236, 72, 153, 0.6)',
  indigo: 'rgba(99, 102, 241, 0.6)',
}

export default function CategoryCard({ category }: { category: any }) {
  const [transform, setTransform] = useState('')
  const [glowOpacity, setGlowOpacity] = useState(0)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 8
    const rotateY = (centerX - x) / 8

    const glowX = (x / rect.width) * 100
    const glowY = (y / rect.height) * 100

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowOpacity(0.4)
    setGlowPosition({ x: glowX, y: glowY })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlowOpacity(0)
    setGlowPosition({ x: 50, y: 50 })
  }

  return (
    <div className="shrink-0" style={{perspective: '1000px'}}>
      <Link href={`/courses/${category.slug.current}`}>
        <div 
          className="p-4 md:p-6 flex flex-col rounded-[16px] transition-all duration-200 ease-out cursor-pointer" 
          style={{
            width: '335px',
            transformStyle: 'preserve-3d',
            background: 'linear-gradient(145deg, #2a2d31, #1a1d21)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px, inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.5)',
            transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformOrigin: '50% 50% 0px',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >


          {/* Main Content Area */}
          <div className="mx-4 flex-1 mt-4">
            <div className="relative w-full rounded-[16px] p-6 overflow-hidden" style={{aspectRatio: '3 / 4', background: 'linear-gradient(145deg, #1a1d21, #0f1114)', border: '1px solid rgba(255, 255, 255, 0.05)', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 6px 0px, inset 0 1px 0 rgba(255, 255, 255, 0.05), inset 0 -1px 0 rgba(0, 0, 0, 0.8)'}}>
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} opacity-5`} />
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white opacity-5 -translate-y-10 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white opacity-5 translate-y-8 -translate-x-8" />
              
              <div className="relative z-10">
                {/* Category Header */}
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                    {category.icon === 'code' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9.4 16.6L4.8 12L9.4 7.4L8 6L2 12L8 18L9.4 16.6ZM14.6 16.6L19.2 12L14.6 7.4L16 6L22 12L16 18L14.6 16.6Z"/>
                      </svg>
                    )}
                    {category.icon === 'server' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 19C13 20.1 13.9 21 15 21H22V19H15V18H22V16H15C13.9 16 13 16.9 13 18V19ZM15 10V12H22V10H15ZM15 4V6H22V4H15ZM11 19V21H2V19H11ZM11 12V14H2V12H11ZM11 4V6H2V4H11ZM15 7C16.1 7 17 7.9 17 9V15C17 16.1 16.1 17 15 17H13V15H15V9H13V7H15Z"/>
                      </svg>
                    )}
                    {category.icon === 'test-tube' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17 1H7C6.45 1 6 1.45 6 2S6.45 3 7 3H8V7.5L3.5 12C2.57 12.93 2.57 14.43 3.5 15.36S5.93 16.29 6.86 15.36L11 11.22V3H13V11.22L17.14 15.36C18.07 16.29 18.07 14.79 17.14 13.86L12.64 9.36C12.45 9.17 12.45 8.87 12.64 8.68L17 4.32V3H17C17.55 3 18 2.55 18 2S17.55 1 17 1ZM7 19C7 20.1 7.9 21 9 21S11 20.1 11 19V17H7V19ZM15 17V19C15 20.1 15.9 21 17 21S19 20.1 19 19V17H15Z"/>
                      </svg>
                    )}
                    {category.icon === 'bug' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 8H17.19C16.74 7.22 16.12 6.55 15.37 6.04L17 4.41L15.59 3L13.42 5.17C12.96 5.06 12.49 5 12 5S11.04 5.06 10.59 5.17L8.41 3L7 4.41L8.62 6.04C7.88 6.55 7.26 7.22 6.81 8H4V10H6.09C6.04 10.33 6 10.66 6 11V12H4V14H6V15C6 15.34 6.04 15.67 6.09 16H4V18H6.81C7.85 19.79 9.78 21 12 21S16.15 19.79 17.19 18H20V16H17.91C17.96 15.67 18 15.34 18 15V14H20V12H18V11C18 10.66 17.96 10.33 17.91 10H20V8ZM16 15C16 16.66 14.66 18 13 18H11C9.34 18 8 16.66 8 15V11C8 9.34 9.34 8 11 8H13C14.66 8 16 9.34 16 11V15Z"/>
                      </svg>
                    )}
                    {category.icon === 'shield' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 7C13.4 7 14.8 8.6 14.8 10V11.5C15.4 11.5 16 12.1 16 12.7V16.2C16 16.8 15.4 17.4 14.8 17.4H9.2C8.6 17.4 8 16.8 8 16.2V12.7C8 12.1 8.6 11.5 9.2 11.5V10C9.2 8.6 10.6 7 12 7ZM12 8.2C11.2 8.2 10.5 8.9 10.5 9.7V11.5H13.5V9.7C13.5 8.9 12.8 8.2 12 8.2Z"/>
                      </svg>
                    )}
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{category.title}</h3>
                  <div className={`inline-block px-3 py-1 bg-gradient-to-r ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} text-white text-xs rounded-full font-bold mb-3`}>
                    {category.courseCount} Courses
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-gray-300">100% Free Content</div>
                  <div className="text-sm text-gray-300">Hands-on Projects</div>
                  <div className="text-sm text-gray-300">Industry Standards</div>
                  <div className="text-sm text-gray-300">Career Ready Skills</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 mt-4 flex shrink-0 items-center justify-between font-mono text-white">
            <div className="text-xs">Start Learning</div>
            <div className="text-xs opacity-50">#{category.slug.current.toUpperCase()}</div>
          </div>

          {/* Dynamic Colored Glow Effect */}
          <div 
            className="pointer-events-none absolute inset-0 rounded-[16px] transition-all duration-200" 
            style={{
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColorMap[category.color] || 'rgba(59, 130, 246, 0.6)'} 0%, transparent 50%)`,
              opacity: glowOpacity
            }}
          />
          {/* Additional Glow Layer */}
          <div 
            className="pointer-events-none absolute -inset-2 rounded-[20px] transition-all duration-200 blur-md" 
            style={{
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColorMap[category.color] || 'rgba(59, 130, 246, 0.6)'} 0%, transparent 70%)`,
              opacity: glowOpacity * 0.5
            }}
          />
        </div>
      </Link>
    </div>
  )
}