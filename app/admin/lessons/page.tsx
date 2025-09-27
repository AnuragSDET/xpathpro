import AdminPageLayout from '../../../components/admin/AdminPageLayout'
import LessonsList from '../../../components/admin/LessonsList'

export const metadata = {
  title: 'Lessons Management - xPath Pro Admin',
  description: 'Manage course lessons',
}

export default function LessonsPage() {
  return (
    <AdminPageLayout
      title="Lessons Management"
      description="Manage individual course lessons"
      actionUrl="/admin/lessons/new"
      actionLabel="New Lesson"
    >
      <LessonsList />
    </AdminPageLayout>
  )
}