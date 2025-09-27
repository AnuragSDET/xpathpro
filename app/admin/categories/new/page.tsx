'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import AdminLayout from '@/components/admin/AdminLayout'
import Link from 'next/link'

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
    <AdminLayout>
      <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/categories">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Category</h1>
          <p className="text-muted-foreground mt-1">Add a new course category</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Category Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., SDET Fundamentals"
                  required
                />
              </div>
              <div>
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="1"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of this category..."
                rows={3}
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

            <div className="flex items-center space-x-2 mb-6">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="rounded border-gray-300"
              />
              <Label htmlFor="featured">Featured Category</Label>
            </div>

            <div className="flex gap-4">
              <Button 
                type="button" 
                disabled={loading}
                onClick={(e) => handleSubmit(e, 'draft')}
                variant="outline"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading && saveType === 'draft' ? 'Saving...' : 'Save as Draft'}
              </Button>
              <Button 
                type="button" 
                disabled={loading}
                onClick={(e) => handleSubmit(e, 'publish')}
              >
                <Save className="h-4 w-4 mr-2" />
                {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Category'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/categories">Cancel</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  )
}