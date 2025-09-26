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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Welcome back, Admin
        </div>
      </div>

      <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg" />}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
          <RecentActivity />
        </Suspense>
        
        <QuickActions />
      </div>
    </div>
  )
}