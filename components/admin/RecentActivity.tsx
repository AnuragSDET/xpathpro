'use client'

import { useState, useEffect } from 'react'
import { Clock, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ActivityItem {
  id: string
  user_name: string
  action: string
  target: string
  created_at: string
}

export default function RecentActivity() {
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentActivity()
  }, [])

  const fetchRecentActivity = async () => {
    try {
      const response = await fetch('/api/admin/recent-activity')
      const data = await response.json()
      
      if (data.success) {
        setActivities(data.activities)
      }
    } catch (error) {
      console.error('Error fetching recent activity:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <Clock className="h-5 w-5 text-blue-400" />
        </div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-start space-x-3 p-3">
              <div className="w-3 h-3 bg-slate-700/50 rounded-full mt-2"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                <div className="h-3 bg-slate-700/50 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
        <Clock className="h-5 w-5 text-blue-400" />
      </div>
      
      {activities.length === 0 ? (
        <div className="text-center py-8">
          <Activity className="h-12 w-12 mx-auto text-slate-400 mb-4" />
          <h4 className="text-lg font-medium text-white mb-2">No recent activity</h4>
          <p className="text-slate-400">User activities will appear here as they happen.</p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">
                    <span className="font-medium text-white">{activity.user_name}</span>{' '}
                    {activity.action}{' '}
                    <span className="font-medium text-blue-400">{activity.target}</span>
                  </p>
                  <p className="text-xs text-slate-500">{formatTimeAgo(activity.created_at)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="link" className="mt-6 p-0 h-auto text-blue-400 hover:text-blue-300 font-medium" asChild>
            <Link href="/admin/analytics">
              View all activity →
            </Link>
          </Button>
        </>
      )}
    </div>
  )
}