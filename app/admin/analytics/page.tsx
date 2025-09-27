'use client'

import { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, Users, Eye, Clock, Globe, Smartphone, Monitor } from 'lucide-react'
import AdminPageLayout from '@/components/admin/AdminPageLayout'

interface AnalyticsData {
  totalPageViews: number
  uniqueVisitors: number
  avgSessionDuration: number
  bounceRate: number
  topPages: Array<{ page: string; views: number }>
  deviceStats: Array<{ device: string; count: number }>
  trafficSources: Array<{ source: string; count: number }>
  userActivity: Array<{ id: string; user_name: string; action: string; target: string; created_at: string }>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalPageViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    topPages: [],
    deviceStats: [],
    trafficSources: [],
    userActivity: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const [analyticsRes, activityRes] = await Promise.all([
        fetch('/api/admin/analytics-detailed'),
        fetch('/api/admin/recent-activity?limit=20')
      ])
      
      const analyticsData = await analyticsRes.json()
      const activityData = await activityRes.json()
      
      if (analyticsData.success && activityData.success) {
        setData({
          ...analyticsData.data,
          userActivity: activityData.activities
        })
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
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
      <AdminPageLayout
        title="Analytics Dashboard"
        description="Comprehensive website analytics and user insights"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-slate-700/50 rounded w-2/3"></div>
                  <div className="h-8 bg-slate-700/50 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AdminPageLayout>
    )
  }

  return (
    <AdminPageLayout
      title="Analytics Dashboard"
      description="Comprehensive website analytics and user insights"
    >
      <div className="space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Total Page Views</h3>
              <Eye className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{data.totalPageViews.toLocaleString()}</div>
            <p className="text-sm text-slate-400">All time</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Unique Visitors</h3>
              <Users className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{data.uniqueVisitors.toLocaleString()}</div>
            <p className="text-sm text-slate-400">This month</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Avg Session Duration</h3>
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{formatDuration(data.avgSessionDuration)}</div>
            <p className="text-sm text-slate-400">Per session</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">Bounce Rate</h3>
              <TrendingUp className="h-5 w-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{data.bounceRate}%</div>
            <p className="text-sm text-slate-400">Exit rate</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Pages */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Top Pages</h3>
            <div className="space-y-4">
              {data.topPages.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No page data available</p>
              ) : (
                data.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-blue-400" />
                      <span className="text-white">{page.page}</span>
                    </div>
                    <span className="text-slate-400">{page.views.toLocaleString()} views</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Device Stats */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-6">Device Breakdown</h3>
            <div className="space-y-4">
              {data.deviceStats.length === 0 ? (
                <p className="text-slate-400 text-center py-8">No device data available</p>
              ) : (
                data.deviceStats.map((device, index) => {
                  const total = data.deviceStats.reduce((sum, d) => sum + d.count, 0)
                  const percentage = total > 0 ? Math.round((device.count / total) * 100) : 0
                  const icon = device.device === 'mobile' ? Smartphone : Monitor
                  const IconComponent = icon
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4 text-green-400" />
                        <span className="text-white capitalize">{device.device}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white">{percentage}%</span>
                        <div className="text-xs text-slate-400">{device.count} users</div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Real-time User Activity</h3>
          <div className="space-y-3">
            {data.userActivity.length === 0 ? (
              <p className="text-slate-400 text-center py-8">No recent activity</p>
            ) : (
              data.userActivity.map((activity) => (
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
              ))
            )}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.trafficSources.length === 0 ? (
              <p className="text-slate-400 text-center py-8 col-span-3">No traffic source data available</p>
            ) : (
              data.trafficSources.map((source, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg text-center">
                  <div className="text-2xl font-bold text-white mb-2">{source.count}</div>
                  <div className="text-sm text-slate-400 capitalize">{source.source}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminPageLayout>
  )
}