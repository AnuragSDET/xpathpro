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
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`)
    setGlowOpacity(0.3)
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlowOpacity(0)
  }

  return (
    <div className="shrink-0" style={{perspective: '1000px'}}>
      <Link href={`/courses/${category.slug.current}`}>
        <div 
          className="p-4 md:p-6 flex flex-col rounded-[16px] bg-[#1F2121] transition-all duration-300 cursor-pointer" 
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
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" color="currentColor" className="text-white" fill="currentColor" fillRule="evenodd">
              <path d="M5.00226 5.710185C0.612577 10.215135 0.782 17.46045 5.22972 21.90795L6.481905 23.16015C6.601665 23.28 6.795615 23.28 6.915375 23.16015L8.793945 21.28155C8.913705 21.16185 8.913705 20.96775 8.793945 20.8482L7.42119 19.4751C3.690195 15.74415 3.65811 9.727305 7.34925 6.035955C10.71483 2.670375 16.0131 2.40102 19.75005 5.20743C19.89945 5.31963 19.91085 5.540355 19.7787 5.67258C19.66995 5.781315 19.4985 5.79357 19.37445 5.702625C16.29255 3.44289 12.064695 3.59229 9.424635 6.23256C6.491505 9.16569 6.629655 14.05935 9.73344 17.16285L11.106195 18.53595C11.225955 18.65565 11.420115 18.65565 11.539875 18.53595L13.418445 16.65735C13.538205 16.5375 13.538205 16.3434 13.418445 16.2237L12.04548 14.85087C9.96519 12.77058 10.04184 9.321015 12.21675 7.14609C14.02257 5.34027 16.70655 4.98201 18.7566 6.10278C18.9477 6.20742 18.98265 6.4686 18.8286 6.622695C18.73215 6.71916 18.585 6.74778 18.4611 6.68994C17.1153 6.05925 15.46275 6.29919 14.352825 7.413405C12.929595 8.84217 12.99969 11.18058 14.42559 12.606465L15.73065 13.911585C15.8502 14.031135 16.04445 14.031135 16.16415 13.911585L18.04275 12.032805C18.16245 11.913045 18.16245 11.719095 18.04275 11.599335L16.7097 10.266015C16.0938 9.65025 16.0209 8.64801 16.5954 7.99383C17.22525 7.27668 18.3183 7.250325 18.9822 7.91433L19.3761 8.30814C19.99185 8.92392 20.994 8.99688 21.64845 8.422185C22.36545 7.792515 22.3917 6.69954 21.72795 6.035535L21.2943 5.60208C16.7892 1.096925 9.46224 1.132893 5.00226 5.710185Z"></path>
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
            className="pointer-events-none absolute inset-0 rounded-[16px] transition-opacity duration-300" 
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