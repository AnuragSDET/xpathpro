'use client'

import { useState, useEffect } from 'react'
import { Users, UserCheck, UserX, Crown } from 'lucide-react'

interface UserStats {
  total: number
  active: number
  inactive: number
  admins: number
}

export default function UserStats() {
  const [stats, setStats] = useState<UserStats>({ total: 0, active: 0, inactive: 0, admins: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserStats()
  }, [])

  const fetchUserStats = async () => {
    try {
      const response = await fetch('/api/admin/user-stats')
      const data = await response.json()
      
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error('Error fetching user stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    {
      name: 'Total Users',
      value: stats.total.toLocaleString(),
      icon: Users,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Active Users',
      value: stats.active.toLocaleString(),
      icon: UserCheck,
      gradient: 'from-green-400 to-green-600',
    },
    {
      name: 'Inactive Users',
      value: stats.inactive.toLocaleString(),
      icon: UserX,
      gradient: 'from-gray-400 to-gray-600',
    },
    {
      name: 'Admins',
      value: stats.admins.toLocaleString(),
      icon: Crown,
      gradient: 'from-yellow-400 to-yellow-600',
    },
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
          <div className="relative bg-white/5 border border-white/10 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.gradient}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}