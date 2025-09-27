'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import AdminPageLayout from '@/components/admin/AdminPageLayout'
import SimpleImageUpload from '@/components/admin/SimpleImageUpload'

export default function NewCoursePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    overview: '',
    difficulty: 'beginner',
    duration: '',
    prerequisites: '',
    learningObjectives: '',
    tags: '',
    featuredImage: '',
    category: '',
    featured: false,
    published: false
  })
  const [categories, setCategories] = useState<any[]>([])
  const [saveType, setSaveType] = useState<'draft' | 'publish'>('draft')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/sanity/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent, type: 'draft' | 'publish') => {
    e.preventDefault()
    setLoading(true)
    setSaveType(type)

    try {
      const courseData = {
        ...formData,
        published: type === 'publish',
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
      }

      const response = await fetch('/api/sanity/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Course ${type === 'publish' ? 'published' : 'saved as draft'} successfully!`)
        router.push('/admin/courses')
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating course:', error)
      alert('Failed to create course')
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
      title="Create New Course"
      description="Add a new course to your curriculum"
      backUrl="/admin/courses"
      backLabel="Back to Courses"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Introduction to SDET"
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="duration">Duration (hrs) *</Label>
                  <Input
                    id="duration"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="8"
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                    min="1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
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
                  placeholder="Brief description of what students will learn..."
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="prerequisites">Prerequisites</Label>
                  <Input
                    id="prerequisites"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleChange}
                    placeholder="Basic programming, SDLC knowledge"
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="testing, automation, sdet"
                    className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="learningObjectives">Learning Objectives *</Label>
                <Textarea
                  id="learningObjectives"
                  name="learningObjectives"
                  value={formData.learningObjectives}
                  onChange={handleChange}
                  placeholder="Understand SDET role, Learn testing methodologies, Master test planning"
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  rows={2}
                  required
                />
              </div>

              <div>
                <Label htmlFor="overview">Course Overview</Label>
                <Textarea
                  id="overview"
                  name="overview"
                  value={formData.overview}
                  onChange={handleChange}
                  placeholder="Detailed overview of the course content and structure..."
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  rows={3}
                />
              </div>

              <SimpleImageUpload
                currentUrl={formData.featuredImage}
                onImageChange={(url) => setFormData({ ...formData, featuredImage: url })}
                label="Featured Image"
              />

              <div className="flex gap-4">
                <Button 
                  type="button" 
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, 'draft')}
                  variant="outline"
                  className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50 hover:text-white"
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
                  {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Course'}
                </Button>
              </div>
            </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}