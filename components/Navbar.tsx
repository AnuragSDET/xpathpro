'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/20 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-gray-900">
            {settings.logo}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {settings.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button asChild>
              <Link href={settings.ctaButton.href}>
                {settings.ctaButton.label}
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/20">
            {settings.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-4 w-full">
              <Link href={settings.ctaButton.href} onClick={() => setIsOpen(false)}>
                {settings.ctaButton.label}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}