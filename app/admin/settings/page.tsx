'use client'

import { useState } from 'react'
import { Save, Globe, Mail, Shield, Palette, Bell, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import AdminPageLayout from '@/components/admin/AdminPageLayout'

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [settings, setSettings] = useState({
    // Site Settings
    siteName: 'xPath Pro',
    siteDescription: 'Transform into Elite SDET - Master Software Testing & Automation',
    siteUrl: 'https://xpathpro.vercel.app',
    logoUrl: '',
    faviconUrl: '',
    
    // SEO Settings
    metaTitle: 'xPath Pro - Elite SDET Training Platform',
    metaDescription: 'Join 150,000+ professionals who achieved 6-figure salaries. Transform into an Elite SDET with AI-powered mentorship and guaranteed job placement.',
    metaKeywords: 'SDET, software testing, automation, QA engineer, test automation',
    
    // Contact Settings
    contactEmail: 'admin@xpath.pro',
    supportEmail: 'support@xpath.pro',
    phoneNumber: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    
    // Social Media
    twitterUrl: 'https://twitter.com/xpathpro',
    linkedinUrl: 'https://linkedin.com/company/xpathpro',
    githubUrl: 'https://github.com/xpathpro',
    youtubeUrl: 'https://youtube.com/@xpathpro',
    
    // Analytics
    googleAnalyticsId: '',
    facebookPixelId: '',
    hotjarId: '',
    
    // Features
    enableRegistration: true,
    enableComments: true,
    enableNewsletter: true,
    enableDarkMode: true,
    maintenanceMode: false,
    
    // Email Settings
    smtpHost: '',
    smtpPort: '587',
    smtpUser: '',
    smtpPassword: '',
    
    // Course Settings
    defaultCourseDuration: '8',
    maxStudentsPerCourse: '100',
    certificateEnabled: true,
    
    // Pricing
    currency: 'USD',
    taxRate: '8.5',
    
    // Theme
    primaryColor: '#3B82F6',
    secondaryColor: '#8B5CF6',
    accentColor: '#06B6D4'
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      alert('Settings saved successfully!')
    } catch (error) {
      alert('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (field: string, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const settingSections = [
    {
      title: 'Site Configuration',
      icon: Globe,
      fields: [
        { key: 'siteName', label: 'Site Name', type: 'text', required: true },
        { key: 'siteDescription', label: 'Site Description', type: 'textarea' },
        { key: 'siteUrl', label: 'Site URL', type: 'url' },
        { key: 'logoUrl', label: 'Logo URL', type: 'url' },
        { key: 'faviconUrl', label: 'Favicon URL', type: 'url' }
      ]
    },
    {
      title: 'SEO & Meta',
      icon: Shield,
      fields: [
        { key: 'metaTitle', label: 'Meta Title', type: 'text' },
        { key: 'metaDescription', label: 'Meta Description', type: 'textarea' },
        { key: 'metaKeywords', label: 'Meta Keywords', type: 'text' }
      ]
    },
    {
      title: 'Contact Information',
      icon: Mail,
      fields: [
        { key: 'contactEmail', label: 'Contact Email', type: 'email' },
        { key: 'supportEmail', label: 'Support Email', type: 'email' },
        { key: 'phoneNumber', label: 'Phone Number', type: 'tel' },
        { key: 'address', label: 'Address', type: 'text' }
      ]
    },
    {
      title: 'Social Media',
      icon: Bell,
      fields: [
        { key: 'twitterUrl', label: 'Twitter URL', type: 'url' },
        { key: 'linkedinUrl', label: 'LinkedIn URL', type: 'url' },
        { key: 'githubUrl', label: 'GitHub URL', type: 'url' },
        { key: 'youtubeUrl', label: 'YouTube URL', type: 'url' }
      ]
    },
    {
      title: 'Analytics & Tracking',
      icon: Database,
      fields: [
        { key: 'googleAnalyticsId', label: 'Google Analytics ID', type: 'text' },
        { key: 'facebookPixelId', label: 'Facebook Pixel ID', type: 'text' },
        { key: 'hotjarId', label: 'Hotjar ID', type: 'text' }
      ]
    },
    {
      title: 'Theme & Appearance',
      icon: Palette,
      fields: [
        { key: 'primaryColor', label: 'Primary Color', type: 'color' },
        { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
        { key: 'accentColor', label: 'Accent Color', type: 'color' }
      ]
    }
  ]

  return (
    <AdminPageLayout
      title="Website Settings"
      description="Configure your website settings and preferences"
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600/20 rounded-lg">
                <section.icon className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{section.title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label className="text-white">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </Label>
                  {field.type === 'textarea' ? (
                    <Textarea
                      value={settings[field.key as keyof typeof settings] as string}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
                      rows={3}
                    />
                  ) : field.type === 'color' ? (
                    <div className="flex gap-2">
                      <Input
                        type="color"
                        value={settings[field.key as keyof typeof settings] as string}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="w-16 h-10 bg-slate-900 border-slate-700"
                      />
                      <Input
                        type="text"
                        value={settings[field.key as keyof typeof settings] as string}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                        className="flex-1 bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
                      />
                    </div>
                  ) : (
                    <Input
                      type={field.type}
                      value={settings[field.key as keyof typeof settings] as string}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Feature Toggles */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-600/20 rounded-lg">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Feature Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { key: 'enableRegistration', label: 'Enable User Registration' },
              { key: 'enableComments', label: 'Enable Comments' },
              { key: 'enableNewsletter', label: 'Enable Newsletter' },
              { key: 'enableDarkMode', label: 'Enable Dark Mode' },
              { key: 'certificateEnabled', label: 'Enable Certificates' },
              { key: 'maintenanceMode', label: 'Maintenance Mode' }
            ].map((toggle) => (
              <div key={toggle.key} className="flex items-center space-x-3">
                <Checkbox
                  id={toggle.key}
                  checked={settings[toggle.key as keyof typeof settings] as boolean}
                  onCheckedChange={(checked) => handleChange(toggle.key, !!checked)}
                  className="border-slate-700 data-[state=checked]:bg-blue-600"
                />
                <Label htmlFor={toggle.key} className="text-white text-sm">
                  {toggle.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Course Settings */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-600/20 rounded-lg">
              <Database className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Course & Business Settings</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label className="text-white">Default Course Duration (hours)</Label>
              <Input
                type="number"
                value={settings.defaultCourseDuration}
                onChange={(e) => handleChange('defaultCourseDuration', e.target.value)}
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Max Students Per Course</Label>
              <Input
                type="number"
                value={settings.maxStudentsPerCourse}
                onChange={(e) => handleChange('maxStudentsPerCourse', e.target.value)}
                className="bg-slate-900 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleChange('currency', value)}>
                <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="USD" className="text-white hover:bg-slate-800">USD ($)</SelectItem>
                  <SelectItem value="EUR" className="text-white hover:bg-slate-800">EUR (€)</SelectItem>
                  <SelectItem value="GBP" className="text-white hover:bg-slate-800">GBP (£)</SelectItem>
                  <SelectItem value="INR" className="text-white hover:bg-slate-800">INR (₹)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6">
          <Button 
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-8"
          >
            <Save className="w-4 h-4 mr-2" />
            {loading ? 'Saving...' : 'Save All Settings'}
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  )
}