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
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-700/50 rounded w-1/3"></div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-700/50 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="text-center text-red-400">
          Error: {error}
          <Button 
            onClick={fetchLessons} 
            variant="outline" 
            size="sm" 
            className="ml-4 bg-slate-800/50 border-slate-600 text-slate-300"
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {lessons.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
          <div className="space-y-4">
            <BookOpen className="h-12 w-12 mx-auto text-slate-400" />
            <h3 className="text-lg font-semibold text-white">No lessons yet</h3>
            <p className="text-slate-400">
              Create your first lesson to start building course content.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/admin/lessons/new">
                <Plus className="h-4 w-4 mr-2" />
                Create First Lesson
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4">
          {lessons.map((lesson) => (
            <div key={lesson._id} className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-white">{lesson.title}</h3>
                  <p className="text-slate-400 line-clamp-2">
                    {lesson.description}
                  </p>
                  {lesson.course && (
                    <div className="flex items-center gap-2 text-sm">
                      <BookOpen className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-400">Course:</span>
                      <Badge variant="outline" className="bg-slate-800/50 border-slate-600 text-slate-300">{lesson.course.title}</Badge>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {lesson.published && (
                    <Badge variant="outline" className="bg-green-900/50 border-green-700 text-green-400">
                      Published
                    </Badge>
                  )}
                  {lesson.featured && (
                    <Badge variant="outline" className="bg-blue-900/50 border-blue-700 text-blue-400">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-slate-400">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.duration} min</span>
                  </div>
                  <span>Order: {lesson.order}</span>
                  {lesson.videoUrl && (
                    <Badge variant="outline" className="bg-purple-900/50 border-purple-700 text-purple-400">
                      Video
                    </Badge>
                  )}
                  <span>Created {new Date(lesson._createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50" asChild>
                    <Link href={`https://xpathpro.sanity.studio/desk/lesson;${lesson._id}`} target="_blank">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-600 text-slate-300 hover:bg-slate-700/50" asChild>
                    <Link href={`https://xpathpro.sanity.studio/desk/lesson;${lesson._id}`} target="_blank">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => deleteLesson(lesson._id, lesson.title)}
                    className="bg-red-900/20 border-red-700 text-red-400 hover:bg-red-900/40"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}