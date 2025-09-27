'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ImageUpload from '@/components/admin/ImageUpload'
import Link from 'next/link'

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/lessons">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Lessons
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Lesson</h1>
          <p className="text-muted-foreground mt-1">Add a new lesson to a course</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lesson Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Lesson Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Introduction to Test Planning"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseId">Course</Label>
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of what students will learn in this lesson..."
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="content">Lesson Content</Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Main lesson content (supports markdown)..."
                rows={8}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="order">Lesson Order</Label>
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
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="10"
                  min="1"
                  required
                />
              </div>
              <div>
                <ImageUpload
                  currentUrl={formData.videoUrl}
                  onImageChange={(url) => setFormData({ ...formData, videoUrl: url })}
                  folder="lessons"
                  label="Video/Thumbnail"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="resources">Resources (comma-separated URLs)</Label>
              <Textarea
                id="resources"
                name="resources"
                value={formData.resources}
                onChange={handleChange}
                placeholder="https://example.com/resource1, https://example.com/resource2"
                rows={2}
              />
            </div>

            <div>
              <Label htmlFor="quiz">Quiz Questions (JSON format)</Label>
              <Textarea
                id="quiz"
                name="quiz"
                value={formData.quiz}
                onChange={handleChange}
                placeholder='{"questions": [{"question": "What is SDET?", "options": ["A", "B", "C"], "correct": 0}]}'
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="testing, automation, basics"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="rounded border-gray-300"
              />
              <Label htmlFor="featured">Featured Lesson</Label>
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
                {loading && saveType === 'publish' ? 'Publishing...' : 'Publish Lesson'}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/lessons">Cancel</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}