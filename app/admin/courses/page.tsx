import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import CoursesList from '../../../components/admin/CoursesList'

export const metadata = {
  title: 'Courses Management - xPath Pro Admin',
  description: 'Manage all courses in your SDET curriculum',
}

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage your course curriculum</p>
        </div>
        <Button asChild>
          <Link href="/admin/courses/new">
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Link>
        </Button>
      </div>

      <CoursesList />
    </div>
  )
}