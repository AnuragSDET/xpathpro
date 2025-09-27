'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Eye, BookOpen, Clock, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Lesson {
  _id: string
  title: string
  slug: { current: string }
  description: string
  content: string
  course: {
    _id: string
    title: string
    slug: { current: string }
  }
  order: number
  duration: number
  videoUrl: string
  published: boolean
  featured: boolean
  _createdAt: string
}

export default function LessonsList() {
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchLessons()
  }, [])

  const fetchLessons = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/sanity/lessons')
      const data = await response.json()
      
      if (data.success) {
        setLessons(data.lessons)
      } else {
        setError(data.error || 'Failed to fetch lessons')
      }
    } catch (err) {
      setError('Failed to fetch lessons')
      console.error('Error fetching lessons:', err)
    } finally {
      setLoading(false)
    }
  }

  const deleteLesson = async (lessonId: string, lessonTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${lessonTitle}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/sanity/lessons?id=${lessonId}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      
      if (data.success) {
        alert('Lesson deleted successfully!')
        fetchLessons() // Refresh the list
      } else {
        alert('Error: ' + data.error)
      }
    } catch (err) {
      alert('Failed to delete lesson')
      console.error('Error deleting lesson:', err)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading lessons...</div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            Error: {error}
            <Button 
              onClick={fetchLessons} 
              variant="outline" 
              size="sm" 
              className="ml-4"
            >
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Lessons</h1>
          <p className="text-muted-foreground mt-1">Manage course lessons and content</p>
        </div>
        <Button asChild>
          <Link href="/admin/lessons/new">
            <Plus className="h-4 w-4 mr-2" />
            New Lesson
          </Link>
        </Button>
      </div>

      {lessons.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="text-lg font-semibold">No lessons yet</h3>
              <p className="text-muted-foreground">
                Create your first lesson to start building course content.
              </p>
              <Button asChild>
                <Link href="/admin/lessons/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Lesson
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{lesson.title}</CardTitle>
                    <p className="text-muted-foreground line-clamp-2">
                      {lesson.description}
                    </p>
                    {lesson.course && (
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4" />
                        <span className="text-muted-foreground">Course:</span>
                        <Badge variant="outline">{lesson.course.title}</Badge>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {lesson.published && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Published
                      </Badge>
                    )}
                    {lesson.featured && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        Featured
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{lesson.duration} min</span>
                    </div>
                    <span>Order: {lesson.order}</span>
                    {lesson.videoUrl && (
                      <Badge variant="outline" className="bg-purple-50 text-purple-700">
                        Video
                      </Badge>
                    )}
                    <span>Created {new Date(lesson._createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://xpathpro.sanity.studio/desk/lesson;${lesson._id}`} target="_blank">
                        <Eye className="h-4 w-4 mr-2" />
                        View in Studio
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://xpathpro.sanity.studio/desk/lesson;${lesson._id}`} target="_blank">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteLesson(lesson._id, lesson.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}