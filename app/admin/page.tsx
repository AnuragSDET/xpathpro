import { Suspense } from 'react'
import AdminPageLayout from '../../components/admin/AdminPageLayout'
import DashboardStats from '../../components/admin/DashboardStats'
import RecentActivity from '../../components/admin/RecentActivity'
import QuickActions from '../../components/admin/QuickActions'

export const metadata = {
  title: 'Admin Dashboard - xPath Pro',
  description: 'Manage your SDET course website',
}

export default function AdminDashboard() {
  return (
    <AdminPageLayout
      title="Dashboard"
      description="Overview of your SDET course platform"
    >
      <div className="space-y-8">
        <Suspense fallback={<div className="animate-pulse bg-slate-800/50 h-32 rounded-xl" />}>
          <DashboardStats />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={<div className="animate-pulse bg-slate-800/50 h-64 rounded-xl" />}>
            <RecentActivity />
          </Suspense>
          
          <QuickActions />
        </div>
      </div>
    </AdminPageLayout>
  )
}