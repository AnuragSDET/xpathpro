import { Suspense } from 'react'
import DashboardStats from '../../components/admin/DashboardStats'
import RecentActivity from '../../components/admin/RecentActivity'
import QuickActions from '../../components/admin/QuickActions'

export const metadata = {
  title: 'Admin Dashboard - xPath Pro',
  description: 'Manage your SDET course website',
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Admin Dashboard</h1>
          <div className="text-lg text-gray-300 font-medium">
            Welcome back, Admin ⚡
          </div>
        </div>

        <Suspense fallback={<div className="animate-pulse bg-gray-800/50 h-32 rounded-2xl" />}>
          <DashboardStats />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Suspense fallback={<div className="animate-pulse bg-gray-800/50 h-64 rounded-2xl" />}>
            <RecentActivity />
          </Suspense>
          
          <QuickActions />
        </div>
      </div>
    </div>
  )
}