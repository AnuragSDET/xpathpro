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
        <Suspense fallback={
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
        }>
          <DashboardStats />
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Suspense fallback={
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-slate-700/50 rounded w-1/3"></div>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-4 bg-slate-700/50 rounded w-full"></div>
                ))}
              </div>
            </div>
          }>
            <RecentActivity />
          </Suspense>
          
          <QuickActions />
        </div>
      </div>
    </AdminPageLayout>
  )
}