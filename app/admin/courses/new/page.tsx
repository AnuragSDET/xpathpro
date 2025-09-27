'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="title" className="text-white">Course Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Introduction to SDET"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
              required
            />
          </div>
          <div className="space-y-2">
            <Label className="text-white">Difficulty *</Label>
            <Select value={formData.difficulty} onValueChange={(value) => setFormData({...formData, difficulty: value})}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                <SelectItem value="beginner" className="text-white hover:bg-slate-800">Beginner</SelectItem>
                <SelectItem value="intermediate" className="text-white hover:bg-slate-800">Intermediate</SelectItem>
                <SelectItem value="advanced" className="text-white hover:bg-slate-800">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Label htmlFor="duration" className="text-white">Duration (hrs) *</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
              placeholder="8"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
              min="1"
              required
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label className="text-white">Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-slate-700">
                {categories.map((cat) => (
                  <SelectItem key={cat._id} value={cat._id} className="text-white hover:bg-slate-800">
                    {cat.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            placeholder="Brief description of what students will learn..."
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            rows={2}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="prerequisites" className="text-white">Prerequisites</Label>
            <Input
              id="prerequisites"
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleChange}
              placeholder="Basic programming, SDLC knowledge"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags" className="text-white">Tags</Label>
            <Input
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="testing, automation, sdet"
              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="learningObjectives" className="text-white">Learning Objectives *</Label>
          <Textarea
            id="learningObjectives"
            name="learningObjectives"
            value={formData.learningObjectives}
            onChange={handleChange}
            placeholder="Understand SDET role, Learn testing methodologies, Master test planning"
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="overview" className="text-white">Course Overview</Label>
          <Textarea
            id="overview"
            name="overview"
            value={formData.overview}
            onChange={handleChange}
            placeholder="Detailed overview of the course content and structure..."
            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-400"
            rows={3}
          />
        </div>

        <SimpleImageUpload
          currentUrl={formData.featuredImage}
          onImageChange={(url) => setFormData({ ...formData, featuredImage: url })}
          label="Featured Image"
        />

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
            {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Course'}
          </Button>
        </div>
      </div>
    </AdminPageLayout>
  )
}