export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="loading-skeleton w-64 h-8 mb-4 mx-auto"></div>
        <div className="loading-skeleton w-96 h-4 mb-8 mx-auto"></div>
        <div className="flex gap-4 justify-center">
          <div className="loading-skeleton w-32 h-12"></div>
          <div className="loading-skeleton w-32 h-12"></div>
        </div>
      </div>
    </div>
  )
}