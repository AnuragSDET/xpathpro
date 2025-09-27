'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'

interface NavLink {
  label: string
  href: string
}

interface NavbarSettings {
  logo: string
  links: NavLink[]
  ctaButton: {
    label: string
    href: string
  }
}

export default function Navbar() {
  const { data: session } = useSession()
  const [settings, setSettings] = useState<NavbarSettings>({
    logo: 'xPath Pro',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/courses' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ],
    ctaButton: { label: 'Get Started', href: '/courses' }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetch('/api/layout/navbar')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setSettings(data.settings)
        }
      })
      .catch(() => {
        // Use default settings if API fails
      })
  }, [])

  return (
    <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-white/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 rounded-lg" />
            <div className="relative text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              {settings.logo}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {settings.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative group text-gray-300 hover:text-white transition-all duration-300"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 rounded-lg" />
              </Link>
            ))}
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/dashboard"
                  className="relative group text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span className="relative z-10">Dashboard</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 rounded-lg" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="relative group text-gray-300 hover:text-white transition-all duration-300"
                >
                  <span className="relative z-10">Sign Out</span>
                  <div className="absolute -inset-2 bg-gradient-to-r from-red-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 rounded-lg" />
                </button>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-0 group-hover:opacity-50 blur transition-opacity duration-500 rounded-lg" />
                <Button asChild className="relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold border-0 hover:scale-105 transition-transform duration-300">
                  <Link href="/auth/signin">
                    Sign In
                  </Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-300 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {settings.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block py-2 text-gray-300 hover:text-white transition-colors w-full text-left"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Button asChild className="mt-4 w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold border-0">
                <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}