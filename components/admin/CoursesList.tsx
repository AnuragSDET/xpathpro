'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Course {
  _id: string
  title: string
  slug: { current: string }
  description: string
  difficulty: string
  duration: number
  prerequisites: string[]
  learningObjectives: string[]
  published: boolean
  featured: boolean
  _createdAt: string
}

export default function CoursesList() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/sanity/courses')
      const data = await response.json()
      
      if (data.success) {
        setCourses(data.courses)
      } else {
        setError(data.error || 'Failed to fetch courses')
      }
    } catch (err) {
      setError('Failed to fetch courses')
      console.error('Error fetching courses:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading courses...</div>
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
              onClick={fetchCourses} 
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
          <h2 className="text-2xl font-bold">All Courses</h2>
          <p className="text-muted-foreground">Manage your course content</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Link>
        </Button>
      </div>

      {courses.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">No courses yet</h3>
              <p className="text-muted-foreground">
                Create your first course to get started with content management.
              </p>
              <Button asChild>
                <Link href="/admin/courses/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Course
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {courses.map((course) => (
            <Card key={course._id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-muted-foreground line-clamp-2">
                      {course.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getDifficultyColor(course.difficulty)}>
                      {course.difficulty}
                    </Badge>
                    {course.published && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Published
                      </Badge>
                    )}
                    {course.featured && (
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
                    <span>{course.duration} hours</span>
                    <span>{course.prerequisites?.length || 0} prerequisites</span>
                    <span>{course.learningObjectives?.length || 0} objectives</span>
                    <span>Created {new Date(course._createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://xpathpro.sanity.studio/desk/course;${course._id}`} target="_blank">
                        <Eye className="h-4 w-4 mr-2" />
                        View in Studio
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`https://xpathpro.sanity.studio/desk/course;${course._id}`} target="_blank">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
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