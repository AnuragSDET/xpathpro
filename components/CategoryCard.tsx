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

export default function CategoryCard({ category }: { category: any }) {
  const [transform, setTransform] = useState('')
  const [glowOpacity, setGlowOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 8
    const rotateY = (centerX - x) / 8

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`)
    setGlowOpacity(0.2)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlowOpacity(0)
  }

  return (
    <div className="shrink-0" style={{perspective: '1000px'}}>
      <Link href={`/courses/${category.slug.current}`}>
        <div 
          className="p-4 md:p-6 flex flex-col rounded-[16px] bg-[#1F2121] transition-all duration-200 ease-out cursor-pointer" 
          style={{
            width: '335px',
            transformStyle: 'preserve-3d',
            boxShadow: 'rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px',
            transform: transform || 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
            transformOrigin: '50% 50% 0px',
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="p-4 mb-4 flex shrink-0 items-center justify-between">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-sm`}>
              {category.icon === 'code' && '💻'}
              {category.icon === 'api' && '🔌'}
              {category.icon === 'mobile' && '📱'}
              {category.icon === 'database' && '🗄️'}
              {category.icon === 'performance' && '⚡'}
              {category.icon === 'security' && '🔒'}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" className="text-white" fill="currentColor">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" opacity="0.8"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <path d="M12 1C12.55 1 13 1.45 13 2V4C13 4.55 12.55 5 12 5S11 4.55 11 4V2C11 1.45 11.45 1 12 1Z" opacity="0.6"/>
              <path d="M12 19C12.55 19 13 19.45 13 20V22C13 22.55 12.55 23 12 23S11 22.55 11 22V20C11 19.45 11.45 19 12 19Z" opacity="0.6"/>
              <path d="M22 11C22.55 11 23 11.45 23 12S22.55 13 22 13H20C19.45 13 19 12.55 19 12S19.45 11 20 11H22Z" opacity="0.6"/>
              <path d="M5 12C5 11.45 4.55 11 4 11H2C1.45 11 1 11.45 1 12S1.45 13 2 13H4C4.55 13 5 12.55 5 12Z" opacity="0.6"/>
            </svg>
          </div>

          {/* Main Content Area */}
          <div className="mx-4 flex-1">
            <div className="relative w-full bg-black rounded-[16px] p-6" style={{aspectRatio: '3 / 4', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 6px 0px'}}>
              {/* Category Icon */}
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">
                  {category.icon === 'code' && '💻'}
                  {category.icon === 'api' && '🔌'}
                  {category.icon === 'mobile' && '📱'}
                  {category.icon === 'database' && '🗄️'}
                  {category.icon === 'performance' && '⚡'}
                  {category.icon === 'security' && '🔒'}
                </div>
                <h3 className="text-white text-lg font-bold mb-2">{category.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{category.description}</p>
              </div>
              
              {/* Stats */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Courses:</span>
                  <span className="text-white font-semibold">{category.courseCount}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Level:</span>
                  <span className="text-green-400 font-semibold">All Levels</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Price:</span>
                  <span className="text-emerald-400 font-bold">FREE</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className={`bg-gradient-to-r ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} h-2 rounded-full`} style={{width: '0%'}}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Ready to start</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 mt-4 flex shrink-0 items-center justify-between font-mono text-white">
            <div className="text-xs">{category.title}</div>
            <div className="text-xs opacity-50">#{category.slug.current.toUpperCase()}</div>
          </div>

          {/* Glow Overlay Effect */}
          <div 
            className="pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-200" 
            style={{
              mixBlendMode: 'overlay',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)',
              opacity: glowOpacity
            }}
          />
        </div>
      </Link>
    </div>
  )
}