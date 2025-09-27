'use client'

import { useState, useEffect } from 'react'
import { BookOpen, Users, Eye, TrendingUp } from 'lucide-react'

interface Stats {
  totalCourses: number
  activeUsers: number
  pageViews: number
  courseCompletions: number
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({ totalCourses: 0, activeUsers: 0, pageViews: 0, courseCompletions: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [coursesRes, usersRes, analyticsRes] = await Promise.all([
        fetch('/api/sanity/courses'),
        fetch('/api/admin/users-count'),
        fetch('/api/admin/analytics')
      ])
      
      const coursesData = await coursesRes.json()
      const usersData = await usersRes.json()
      const analyticsData = await analyticsRes.json()
      
      setStats({
        totalCourses: coursesData.success ? coursesData.courses.length : 0,
        activeUsers: usersData.success ? usersData.count : 0,
        pageViews: analyticsData.success ? analyticsData.pageViews : 0,
        courseCompletions: analyticsData.success ? analyticsData.courseCompletions : 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    {
      name: 'Total Courses',
      value: stats.totalCourses.toString(),
      icon: BookOpen,
      color: 'text-cyan-400',
      gradient: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: Users,
      color: 'text-emerald-400',
      gradient: 'from-emerald-400 to-green-500'
    },
    {
      name: 'Page Views',
      value: stats.pageViews.toLocaleString(),
      icon: Eye,
      color: 'text-purple-400',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      name: 'Course Completions',
      value: stats.courseCompletions.toString(),
      icon: TrendingUp,
      color: 'text-yellow-400',
      gradient: 'from-yellow-400 to-orange-500'
    }
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
              <div className="h-8 bg-slate-700/50 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {statsData.map((stat, index) => (
        <div key={stat.name} className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl`} />
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">
                {stat.name}
              </h3>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <p className="text-sm text-slate-400">
              Real-time data
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}