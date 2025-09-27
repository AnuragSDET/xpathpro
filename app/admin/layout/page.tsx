'use client'

import { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import AdminPageLayout from '../../../components/admin/AdminPageLayout'

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

export default function LayoutPage() {
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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/layout/navbar')
      const data = await res.json()
      if (data.success) {
        setSettings(data.settings)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const res = await fetch('/api/layout/navbar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings })
      })
      
      const data = await res.json()
      if (data.success) {
        setMessage('Settings saved successfully!')
      } else {
        setMessage(`Failed to save settings: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      setMessage('Error saving settings')
    } finally {
      setLoading(false)
    }
  }

  const addLink = () => {
    setSettings({
      ...settings,
      links: [...settings.links, { label: '', href: '' }]
    })
  }

  const removeLink = (index: number) => {
    setSettings({
      ...settings,
      links: settings.links.filter((_, i) => i !== index)
    })
  }

  const updateLink = (index: number, field: 'label' | 'href', value: string) => {
    const newLinks = [...settings.links]
    newLinks[index][field] = value
    setSettings({ ...settings, links: newLinks })
  }

  return (
    <AdminPageLayout
      title="Layout Settings"
      description="Configure website navigation and layout"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
          {/* Logo */}
          <div>
            <Label htmlFor="logo">Logo Text</Label>
            <Input
              id="logo"
              value={settings.logo}
              onChange={(e) => setSettings({ ...settings, logo: e.target.value })}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
            />
          </div>

          {/* Navigation Links */}
          <div>
            <Label>Navigation Links</Label>
            <div className="space-y-3 mt-2">
              {settings.links.map((link, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <Input
                    placeholder="Label"
                    value={link.label}
                    onChange={(e) => updateLink(index, 'label', e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <Input
                    placeholder="URL"
                    value={link.href}
                    onChange={(e) => updateLink(index, 'href', e.target.value)}
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeLink(index)}
                    className="bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/40"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button variant="outline" onClick={addLink} className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50">
                Add Link
              </Button>
            </div>
          </div>

          {/* CTA Button */}
          <div>
            <Label>Call-to-Action Button</Label>
            <div className="flex gap-3 mt-2">
              <Input
                placeholder="Button Text"
                value={settings.ctaButton.label}
                onChange={(e) => setSettings({
                  ...settings,
                  ctaButton: { ...settings.ctaButton, label: e.target.value }
                })}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
              <Input
                placeholder="Button URL"
                value={settings.ctaButton.href}
                onChange={(e) => setSettings({
                  ...settings,
                  ctaButton: { ...settings.ctaButton, href: e.target.value }
                })}
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center gap-4">
            <Button onClick={saveSettings} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
              {loading ? 'Saving...' : 'Save Settings'}
            </Button>
            <Button 
              variant="outline" 
              className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              onClick={async () => {
                try {
                  const res = await fetch('/api/setup-layout-table', { method: 'POST' })
                  const data = await res.json()
                  setMessage(data.success ? 'Table setup complete!' : `Setup failed: ${data.error}`)
                } catch (error) {
                  setMessage('Setup failed: Network error')
                }
              }}
            >
              Setup Table
            </Button>
            {message && (
              <span className={message.includes('success') || message.includes('complete') ? 'text-green-400' : 'text-red-400'}>
                {message}
              </span>
            )}
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}