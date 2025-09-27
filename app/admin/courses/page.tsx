import AdminPageLayout from '../../../components/admin/AdminPageLayout'
import CoursesList from '../../../components/admin/CoursesList'

export const metadata = {
  title: 'Courses Management - xPath Pro Admin',
  description: 'Manage all courses in your SDET curriculum',
}

export default function CoursesPage() {
  return (
    <AdminPageLayout
      title="Courses Management"
      description="Manage all courses in your SDET curriculum"
      actionUrl="/admin/courses/new"
      actionLabel="New Course"
    >
      <CoursesList />
    </AdminPageLayout>
  )
}