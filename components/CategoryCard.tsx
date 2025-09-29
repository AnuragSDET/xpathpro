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
                        <path d="M8.5 12L5.5 9L8.5 6L7 4.5L2.5 9L7 13.5L8.5 12ZM15.5 12L18.5 9L15.5 6L17 4.5L21.5 9L17 13.5L15.5 12ZM12 2L10 22H14L16 2H12Z"/>
                      </svg>
                    )}
                    {category.icon === 'server' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4 1C2.9 1 2 1.9 2 3V7C2 8.1 2.9 9 4 9H20C21.1 9 22 8.1 22 7V3C22 1.9 21.1 1 20 1H4ZM4 11C2.9 11 2 11.9 2 13V17C2 18.1 2.9 19 4 19H20C21.1 19 22 18.1 22 17V13C22 11.9 21.1 11 20 11H4ZM4 21C2.9 21 2 21.9 2 23V27C2 28.1 2.9 29 4 29H20C21.1 29 22 28.1 22 27V23C22 21.9 21.1 21 20 21H4ZM6 5H8V7H6V5ZM10 5H12V7H10V5ZM6 15H8V17H6V15ZM10 15H12V17H10V15ZM6 25H8V27H6V25ZM10 25H12V27H10V25Z"/>
                      </svg>
                    )}
                    {category.icon === 'test-tube' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 2V4H9V7.5L2.5 14C1.5 15 1.5 16.5 2.5 17.5S5 18.5 6 17.5L12.5 11H16V4H18V2H7ZM9 6H14V9H11.5L9 11.5V6ZM6.5 14C7.3 14 8 14.7 8 15.5S7.3 17 6.5 17 5 16.3 5 15.5 5.7 14 6.5 14ZM19 12V22H21V12H19ZM15 16V22H17V16H15Z"/>
                      </svg>
                    )}
                    {category.icon === 'bug' && (
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 3C13 2.45 12.55 2 12 2S11 2.45 11 3V4.08C9.84 4.3 8.8 4.83 8 5.58L6.41 4L5 5.41L6.58 7C5.83 7.8 5.3 8.84 5.08 10H4C3.45 10 3 10.45 3 11S3.45 12 4 12H5.08C5.3 13.16 5.83 14.2 6.58 15L5 16.59L6.41 18L8 16.42C8.8 17.17 9.84 17.7 11 17.92V19C11 19.55 11.45 20 12 20S13 19.55 13 19V17.92C14.16 17.7 15.2 17.17 16 16.42L17.59 18L19 16.59L17.42 15C18.17 14.2 18.7 13.16 18.92 12H20C20.55 12 21 11.55 21 11S20.55 10 20 10H18.92C18.7 8.84 18.17 7.8 17.42 7L19 5.41L17.59 4L16 5.58C15.2 4.83 14.16 4.3 13 4.08V3ZM12 6C14.21 6 16 7.79 16 10V14C16 16.21 14.21 18 12 18S8 16.21 8 14V10C8 7.79 9.79 6 12 6Z"/>
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