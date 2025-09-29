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


          {/* Main Content Area */}
          <div className="mx-4 flex-1 mt-4">
            <div className="relative w-full bg-black rounded-[16px] p-6 overflow-hidden" style={{aspectRatio: '3 / 4', boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 6px 0px'}}>
              {/* Background Pattern */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} opacity-5`} />
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white opacity-5 -translate-y-10 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white opacity-5 translate-y-8 -translate-x-8" />
              
              <div className="relative z-10">
                {/* Category Header */}
                <div className="text-center mb-6">
                  <div className="text-5xl mb-3">
                    {category.icon === 'code' && '💻'}
                    {category.icon === 'api' && '🔌'}
                    {category.icon === 'mobile' && '📱'}
                    {category.icon === 'database' && '🗄️'}
                    {category.icon === 'performance' && '⚡'}
                    {category.icon === 'security' && '🔒'}
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