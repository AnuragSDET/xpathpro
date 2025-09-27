export function LoadingSpinner({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-slate-600 border-t-blue-500`} />
    </div>
  )
}

export function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 bg-slate-800/50 rounded-lg w-1/3"></div>
      <div className="space-y-3">
        <div className="h-4 bg-slate-800/50 rounded w-full"></div>
        <div className="h-4 bg-slate-800/50 rounded w-5/6"></div>
        <div className="h-4 bg-slate-800/50 rounded w-4/6"></div>
      </div>
    </div>
  )
}

export function LoadingCard() {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <LoadingSkeleton />
    </div>
  )
}