export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-primary-600">xPath Pro</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Master Software Development Engineer in Test (SDET) skills with our comprehensive free course
          </p>
          <div className="space-x-4">
            <button className="btn-primary text-lg px-8 py-3">
              Start Learning
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Browse Courses
            </button>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Free Content</h3>
            <p className="text-gray-600">Access all course materials completely free</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Expert-Led</h3>
            <p className="text-gray-600">Learn from industry professionals</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Practical Focus</h3>
            <p className="text-gray-600">Hands-on projects and real-world examples</p>
          </div>
        </div>
      </div>
    </main>
  )
}