import Link from 'next/link'
import { getCoursesByCategory } from '@/lib/sanity-queries'
import { notFound } from 'next/navigation'

const colorMap: Record<string, string> = {
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  purple: 'from-purple-500 to-pink-500',
  orange: 'from-orange-500 to-red-500',
  red: 'from-red-500 to-pink-500',
  teal: 'from-teal-500 to-cyan-500',
  pink: 'from-pink-500 to-rose-500',
  indigo: 'from-indigo-500 to-purple-500',
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const courses = await getCoursesByCategory(params.category)
  
  if (!courses || courses.length === 0) {
    notFound()
  }

  const category = courses[0]?.category

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-white">{category?.title}</span>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className={`w-20 h-20 bg-gradient-to-r ${colorMap[category?.color] || 'from-blue-500 to-cyan-500'} rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl`}>
            {category?.title?.includes('UI') && '💻'}
            {category?.title?.includes('API') && '🔌'}
            {category?.title?.includes('Mobile') && '📱'}
            {category?.title?.includes('Database') && '🗄️'}
            {category?.title?.includes('Performance') && '⚡'}
            {category?.title?.includes('Security') && '🔒'}
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
            {category?.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {courses.length} courses to master {category?.title.toLowerCase()}
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course: any, index: number) => (
            <Link
              key={course._id}
              href={`/courses/${params.category}/${course.slug.current}`}
              className="group bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-sm text-gray-400">
                  Course {index + 1}
                </div>
                <div className="text-xs text-gray-400">
                  {course.duration}h • {course.lessonCount} lessons
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                {course.description}
              </p>
              
              <div className="space-y-3 mb-6">
                {course.prerequisites?.length > 0 && (
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Prerequisites:</div>
                    <div className="flex flex-wrap gap-1">
                      {course.prerequisites.slice(0, 2).map((prereq: string, i: number) => (
                        <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                          {prereq}
                        </span>
                      ))}
                      {course.prerequisites.length > 2 && (
                        <span className="text-xs text-gray-400">+{course.prerequisites.length - 2} more</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className={`px-2 py-1 text-xs rounded ${
                  course.difficulty === 'beginner' ? 'bg-green-900/50 text-green-400' :
                  course.difficulty === 'intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {course.difficulty}
                </div>
                <div className="text-cyan-400 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                  Start Course →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}