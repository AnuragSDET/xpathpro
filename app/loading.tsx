export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
        
        {/* Text */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-white">Loading...</h2>
          <p className="text-slate-400">Please wait while we prepare your content</p>
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse w-3/5" />
        </div>
      </div>
    </div>
  )
}