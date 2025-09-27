'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="title" className="text-white">Category Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., SDET Fundamentals"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="order" className="text-white">Order *</Label>
            <Input
              id="order"
              name="order"
              type="number"
              value={formData.order}
              onChange={handleChange}
              placeholder="1"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
              min="1"
              required
            />
          </div>
          <div className="flex items-end">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({...formData, featured: !!checked})}
                className="border-slate-700 data-[state=checked]:bg-blue-600"
              />
              <Label htmlFor="featured" className="text-white">Featured</Label>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-white">Description *</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of this category..."
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            rows={2}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-white">Icon</Label>
            <Select value={formData.icon} onValueChange={(value) => setFormData({...formData, icon: value})}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="code" className="text-white hover:bg-slate-800">Code</SelectItem>
                <SelectItem value="test-tube" className="text-white hover:bg-slate-800">Test Tube</SelectItem>
                <SelectItem value="server" className="text-white hover:bg-slate-800">Server</SelectItem>
                <SelectItem value="bug" className="text-white hover:bg-slate-800">Bug</SelectItem>
                <SelectItem value="shield" className="text-white hover:bg-slate-800">Shield</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Color</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData({...formData, color: value})}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="blue" className="text-white hover:bg-slate-800">Blue</SelectItem>
                <SelectItem value="green" className="text-white hover:bg-slate-800">Green</SelectItem>
                <SelectItem value="purple" className="text-white hover:bg-slate-800">Purple</SelectItem>
                <SelectItem value="orange" className="text-white hover:bg-slate-800">Orange</SelectItem>
                <SelectItem value="red" className="text-white hover:bg-slate-800">Red</SelectItem>
                <SelectItem value="teal" className="text-white hover:bg-slate-800">Teal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button 
            type="button" 
            disabled={loading}
            onClick={(e) => handleSubmit(e, 'draft')}
            variant="outline"
            className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading && saveType === 'draft' ? 'Saving...' : 'Save as Draft'}
          </Button>
          <Button 
            type="button" 
            disabled={loading}
            onClick={(e) => handleSubmit(e, 'publish')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Save className="h-4 w-4 mr-2" />
            {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Category'}
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  )
}