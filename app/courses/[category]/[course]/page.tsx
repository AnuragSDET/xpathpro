import Link from 'next/link'
import { getCourse } from '@/lib/sanity-queries'
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

export default async function CoursePage({ params }: { params: { category: string, course: string } }) {
  const course = await getCourse(params.category, params.course)
  
  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <div className="max-w-7xl mx-auto px-4 py-20">
        
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
          <span>/</span>
          <Link href={`/courses/${params.category}`} className="hover:text-white transition-colors">
            {course.category.title}
          </Link>
          <span>/</span>
          <span className="text-white">{course.title}</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r ${colorMap[course.category.color] || 'from-blue-500 to-cyan-500'} text-white text-sm rounded-full font-bold mb-6`}>
                {course.category.title}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                {course.description}
              </p>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{course.duration} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📚</span>
                  <span>{course.lessons?.length || 0} lessons</span>
                </div>
                <div className={`px-2 py-1 text-xs rounded ${
                  course.difficulty === 'beginner' ? 'bg-green-900/50 text-green-400' :
                  course.difficulty === 'intermediate' ? 'bg-yellow-900/50 text-yellow-400' :
                  'bg-red-900/50 text-red-400'
                }`}>
                  {course.difficulty}
                </div>
              </div>
            </div>

            {/* Overview */}
            {course.overview && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
                <div className="text-gray-300 prose prose-invert max-w-none">
                  {course.overview}
                </div>
              </div>
            )}

            {/* Learning Objectives */}
            {course.learningObjectives?.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">What You'll Learn</h2>
                <ul className="space-y-3">
                  {course.learningObjectives.map((objective: string, index: number) => (
                    <li key={index} className="flex items-start gap-3 text-gray-300">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites */}
            {course.prerequisites?.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Prerequisites</h2>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map((prereq: string, index: number) => (
                    <span key={index} className="px-3 py-2 bg-gray-800 text-gray-300 rounded-lg text-sm">
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              
              {/* Start Course CTA */}
              <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 mb-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400 mb-2">
                    100% FREE
                  </div>
                  <p className="text-gray-300 text-sm">
                    No hidden costs, no subscriptions
                  </p>
                </div>
                
                <button className="w-full bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 text-white font-bold py-4 px-6 rounded-xl hover:scale-105 transition-all duration-300 mb-4">
                  Start Learning Now
                </button>
                
                <div className="text-center text-xs text-gray-400">
                  Join 10,000+ students already learning
                </div>
              </div>

              {/* Course Lessons */}
              {course.lessons?.length > 0 && (
                <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Course Content</h3>
                  <div className="space-y-3">
                    {course.lessons.map((lesson: any, index: number) => (
                      <div key={lesson._id} className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-sm text-gray-300">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{lesson.title}</div>
                          <div className="text-gray-400 text-xs">{lesson.duration} min</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}