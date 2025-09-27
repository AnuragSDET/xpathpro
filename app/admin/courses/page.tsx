import CoursesList from '../../../components/admin/CoursesList'

export const metadata = {
  title: 'Courses Management - xPath Pro Admin',
  description: 'Manage all courses in your SDET curriculum',
}

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Courses Management</h1>
          <p className="text-gray-300 mt-2 text-lg">Manage all courses in your SDET curriculum</p>
        </div>
      </div>
      <CoursesList />
    </div>
  )
}