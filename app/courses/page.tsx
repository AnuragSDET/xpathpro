import Link from 'next/link'
import { getCategories, getAllCourses } from '@/lib/sanity-queries'
import CategoryCard from '@/components/CategoryCard'

export const metadata = {
  title: 'Free SDET Courses - xPath Pro',
  description: 'Comprehensive SDET courses covering UI automation, API testing, mobile testing, and more. 100% free.',
}

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

export default async function CoursesPage() {
  const [categories, courses] = await Promise.all([
    getCategories(),
    getAllCourses()
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-6">
            Free SDET Courses
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Master software testing with our comprehensive curriculum. From UI automation to performance testing - all completely free.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 justify-items-center">
          {categories.map((category: any) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>

        {/* All Courses */}
        <div>
          <h2 className="text-3xl font-bold text-white mb-8">All Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course: any) => (
              <Link
                key={course._id}
                href={`/courses/${course.category.slug.current}/${course.slug.current}`}
                className="group bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`px-3 py-1 bg-gradient-to-r ${colorMap[course.category.color] || 'from-blue-500 to-cyan-500'} text-white text-xs rounded-full font-bold`}>
                    {course.category.title}
                  </div>
                  <div className="text-xs text-gray-400">
                    {course.duration}h • {course.lessonCount} lessons
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
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
    </div>
  )
}