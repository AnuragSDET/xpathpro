'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit, Trash2, Eye, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockCourses = [
  {
    id: 1,
    title: 'Introduction to SDET',
    description: 'Learn the fundamentals of Software Development Engineer in Test',
    lessons: 12,
    students: 234,
    status: 'published',
    createdAt: '2024-01-15',
  },
  {
    id: 2,
    title: 'API Testing Fundamentals',
    description: 'Master API testing with practical examples',
    lessons: 8,
    students: 156,
    status: 'draft',
    createdAt: '2024-01-10',
  },
  {
    id: 3,
    title: 'Test Automation with Selenium',
    description: 'Build robust automated test suites',
    lessons: 15,
    students: 89,
    status: 'published',
    createdAt: '2024-01-05',
  },
]

export default function CoursesList() {
  const [courses] = useState(mockCourses)

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Lessons</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{course.lessons}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={course.status === 'published' ? 'default' : 'secondary'}>
                    {course.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/courses/${course.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/courses/${course.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}