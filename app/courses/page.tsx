import Link from 'next/link'
import { getCategories, getAllCourses } from '@/lib/sanity-queries'

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {categories.map((category: any) => (
            <div key={category._id} className="shrink-0" style={{perspective: '1000px'}}>
              <Link href={`/courses/${category.slug.current}`}>
                <div 
                  className="p-4 md:p-6 flex flex-col rounded-[16px] bg-[#1F2121] hover:scale-105 transition-all duration-500" 
                  style={{
                    width: '335px',
                    transformStyle: 'preserve-3d',
                    boxShadow: 'rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px',
                    transform: 'none',
                    transformOrigin: '50% 50% 0px',
                    opacity: 1
                  }}
                >
                  {/* Header */}
                  <div className="p-4 mb-4 flex shrink-0 items-center justify-between">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} flex items-center justify-center text-sm`}>
                      {category.icon === 'code' && '💻'}
                      {category.icon === 'api' && '🔌'}
                      {category.icon === 'mobile' && '📱'}
                      {category.icon === 'database' && '🗄️'}
                      {category.icon === 'performance' && '⚡'}
                      {category.icon === 'security' && '🔒'}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" color="currentColor" className="text-white" fill="currentColor" fillRule="evenodd">
                      <path d="M5.00226 5.710185C0.612577 10.215135 0.782 17.46045 5.22972 21.90795L6.481905 23.16015C6.601665 23.28 6.795615 23.28 6.915375 23.16015L8.793945 21.28155C8.913705 21.16185 8.913705 20.96775 8.793945 20.8482L7.42119 19.4751C3.690195 15.74415 3.65811 9.727305 7.34925 6.035955C10.71483 2.670375 16.0131 2.40102 19.75005 5.20743C19.89945 5.31963 19.91085 5.540355 19.7787 5.67258C19.66995 5.781315 19.4985 5.79357 19.37445 5.702625C16.29255 3.44289 12.064695 3.59229 9.424635 6.23256C6.491505 9.16569 6.629655 14.05935 9.73344 17.16285L11.106195 18.53595C11.225955 18.65565 11.420115 18.65565 11.539875 18.53595L13.418445 16.65735C13.538205 16.5375 13.538205 16.3434 13.418445 16.2237L12.04548 14.85087C9.96519 12.77058 10.04184 9.321015 12.21675 7.14609C14.02257 5.34027 16.70655 4.98201 18.7566 6.10278C18.9477 6.20742 18.98265 6.4686 18.8286 6.622695C18.73215 6.71916 18.585 6.74778 18.4611 6.68994C17.1153 6.05925 15.46275 6.29919 14.352825 7.413405C12.929595 8.84217 12.99969 11.18058 14.42559 12.606465L15.73065 13.911585C15.8502 14.031135 16.04445 14.031135 16.16415 13.911585L18.04275 12.032805C18.16245 11.913045 18.16245 11.719095 18.04275 11.599335L16.7097 10.266015C16.0938 9.65025 16.0209 8.64801 16.5954 7.99383C17.22525 7.27668 18.3183 7.250325 18.9822 7.91433L19.3761 8.30814C19.99185 8.92392 20.994 8.99688 21.64845 8.422185C22.36545 7.792515 22.3917 6.69954 21.72795 6.035535L21.2943 5.60208C16.7892 1.096925 9.46224 1.132893 5.00226 5.710185Z"></path>
                    </svg>
                  </div>

                  {/* Main Image Area */}
                  <div className="mx-4 flex-1">
                    <div className="relative w-full" style={{aspectRatio: '3 / 4'}}>
                      <div 
                        className={`absolute inset-0 size-full rounded-[16px] bg-gradient-to-br ${colorMap[category.color] || 'from-blue-500 to-cyan-500'} object-cover flex items-center justify-center text-6xl`}
                        style={{
                          boxShadow: 'rgba(0, 0, 0, 0.05) 0px 5px 6px 0px',
                          opacity: 1
                        }}
                      >
                        {category.icon === 'code' && '💻'}
                        {category.icon === 'api' && '🔌'}
                        {category.icon === 'mobile' && '📱'}
                        {category.icon === 'database' && '🗄️'}
                        {category.icon === 'performance' && '⚡'}
                        {category.icon === 'security' && '🔒'}
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-4 mt-4 flex shrink-0 items-center justify-between font-mono text-white">
                    <div className="text-xs">{category.title}</div>
                    <div className="text-xs opacity-50">{category.courseCount} courses</div>
                  </div>

                  {/* Overlay Effect */}
                  <div 
                    className="pointer-events-none absolute inset-0 rounded-[16px]" 
                    style={{
                      mixBlendMode: 'overlay',
                      background: 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)',
                      opacity: 0
                    }}
                  />
                </div>
              </Link>
            </div>
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