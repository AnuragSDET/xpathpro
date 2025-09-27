import LessonsList from '../../../components/admin/LessonsList'

export const metadata = {
  title: 'Lessons Management - xPath Pro Admin',
  description: 'Manage course lessons',
}

export default function LessonsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Lessons Management</h1>
          <p className="text-gray-300 mt-2 text-lg">Manage individual course lessons</p>
        </div>
      </div>
      <LessonsList />
    </div>
  )
}