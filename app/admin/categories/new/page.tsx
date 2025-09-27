'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import AdminPageLayout from '@/components/admin/AdminPageLayout'

export default function NewCategoryPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'code',
    color: 'blue',
    order: '1',
    featured: false
  })
  const [saveType, setSaveType] = useState<'draft' | 'publish'>('draft')

  const handleSubmit = async (e: React.FormEvent, type: 'draft' | 'publish') => {
    e.preventDefault()
    setLoading(true)
    setSaveType(type)

    try {
      const categoryData = {
        ...formData,
        published: type === 'publish'
      }

      const response = await fetch('/api/sanity/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Category ${type === 'publish' ? 'published' : 'saved as draft'} successfully!`)
        router.push('/admin/categories')
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating category:', error)
      alert('Failed to create category')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <AdminPageLayout
      title="Create New Category"
      description="Add a new course category"
      backUrl="/admin/categories"
      backLabel="Back to Categories"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Category Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., SDET Fundamentals"
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="order">Order *</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="1"
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  min="1"
                  required
                />
              </div>
              <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of this category..."
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="icon">Icon</Label>
                <select
                  id="icon"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="code">Code</option>
                  <option value="test-tube">Test Tube</option>
                  <option value="server">Server</option>
                  <option value="bug">Bug</option>
                  <option value="shield">Shield</option>
                </select>
              </div>
              <div>
                <Label htmlFor="color">Color</Label>
                <select
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="purple">Purple</option>
                  <option value="orange">Orange</option>
                  <option value="red">Red</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                disabled={loading}
                onClick={(e) => handleSubmit(e, 'draft')}
                variant="outline"
                className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading && saveType === 'draft' ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button 
                type="button" 
                disabled={loading}
                onClick={(e) => handleSubmit(e, 'publish')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Category'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}