import AnalyticsCharts from '../../../components/admin/AnalyticsCharts'
import AnalyticsStats from '../../../components/admin/AnalyticsStats'

export const metadata = {
  title: 'Analytics - xPath Pro Admin',
  description: 'View website performance and user engagement metrics',
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600 mt-1">Track website performance and user engagement</p>
        </div>
      </div>

      <AnalyticsStats />
      <AnalyticsCharts />
    </div>
  )
}