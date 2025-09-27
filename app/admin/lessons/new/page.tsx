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

interface Course {
  _id: string
  title: string
}

export default function NewLessonPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [courses, setCourses] = useState<Course[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    courseId: '',
    order: '1',
    duration: '10',
    videoUrl: '',
    resources: '',
    quiz: '',
    tags: '',
    featured: false,
    published: false
  })
  const [saveType, setSaveType] = useState<'draft' | 'publish'>('draft')

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/sanity/courses')
      const data = await response.json()
      if (data.success) {
        setCourses(data.courses)
      }
    } catch (error) {
      console.error('Error fetching courses:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent, type: 'draft' | 'publish') => {
    e.preventDefault()
    setLoading(true)
    setSaveType(type)

    try {
      const lessonData = {
        ...formData,
        published: type === 'publish',
        resources: formData.resources ? formData.resources.split(',').map(r => r.trim()) : [],
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : []
      }

      const response = await fetch('/api/sanity/lessons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(lessonData),
      })

      const result = await response.json()

      if (result.success) {
        alert(`Lesson ${type === 'publish' ? 'published' : 'saved as draft'} successfully!`)
        router.push('/admin/lessons')
      } else {
        alert('Error: ' + result.error)
      }
    } catch (error) {
      console.error('Error creating lesson:', error)
      alert('Failed to create lesson')
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
      title="Create New Lesson"
      description="Add a new lesson to a course"
      backUrl="/admin/lessons"
      backLabel="Back to Lessons"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Lesson Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Introduction to Test Planning"
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseId">Course *</Label>
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-800/50 text-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              <div>
                <Label htmlFor="duration">Duration (min) *</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="10"
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                  min="1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="testing, automation"
                  className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
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
                placeholder="Brief description of what students will learn..."
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                rows={2}
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Lesson Content *</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Main lesson content (supports markdown)..."
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                rows={6}
                required
              />
            </div>

            <SimpleImageUpload
              currentUrl={formData.videoUrl}
              onImageChange={(url) => setFormData({ ...formData, videoUrl: url })}
              label="Video/Thumbnail"
            />

            <div>
              <Label htmlFor="resources">Resources (URLs)</Label>
              <Textarea
                id="resources"
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                placeholder="https://example.com/resource1, https://example.com/resource2"
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="quiz">Quiz Questions (JSON)</Label>
              <Textarea
                id="quiz"
                name="quiz"
                value={formData.quiz}
                onChange={handleChange}
                placeholder='{"questions": [{"question": "What is SDET?", "options": ["A", "B", "C"], "correct": 0}]}'
                className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                rows={3}
              />
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
                {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Lesson'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}