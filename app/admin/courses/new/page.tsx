'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import SimpleImageUpload from '@/components/admin/SimpleImageUpload'
import Link from 'next/link'

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
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" className="bg-gray-800/50 border-white/10 text-gray-300 hover:bg-gray-700/50 hover:text-white" asChild>
          <Link href="/admin/courses">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Create New Course</h1>
          <p className="text-gray-300 mt-2 text-lg">Add a new course to your curriculum</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-xl">Course Information</CardTitle>
          </CardHeader>
          <CardContent>
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
                    className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                    className="flex h-10 w-full rounded-md border border-white/10 bg-gray-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                    className="flex h-10 w-full rounded-md border border-white/10 bg-gray-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                    className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                    className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                  className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                  className="bg-gray-800/50 border-white/10 text-white placeholder:text-gray-400"
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
                  className="bg-gray-800/50 border-white/10 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading && saveType === 'draft' ? 'Saving...' : 'Save as Draft'}
                </Button>
                <Button 
                  type="button" 
                  disabled={loading}
                  onClick={(e) => handleSubmit(e, 'publish')}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Course'}
                </Button>
                <Button type="button" variant="outline" className="bg-gray-800/50 border-white/10 text-gray-300 hover:bg-gray-700/50 hover:text-white" asChild>
                  <Link href="/admin/courses">Cancel</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 backdrop-blur-xl border border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-xl">Course Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-300">
                Fill out the form above to create a new course. All course data will be saved automatically.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="bg-gray-800/50 border-white/10 text-gray-300 hover:bg-gray-700/50 hover:text-white" asChild>
                  <Link href="/admin/courses">
                    View All Courses
                  </Link>
                </Button>
                <Button variant="outline" className="bg-gray-800/50 border-white/10 text-gray-300 hover:bg-gray-700/50 hover:text-white" asChild>
                  <Link href="https://xpathpro.sanity.studio" target="_blank">
                    Advanced Editor
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}