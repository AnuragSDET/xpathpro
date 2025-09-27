import AnalyticsCharts from '../../../components/admin/AnalyticsCharts'
import AnalyticsStats from '../../../components/admin/AnalyticsStats'

export const metadata = {
  title: 'Analytics - xPath Pro Admin',
  description: 'View website performance and user engagement metrics',
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Analytics Dashboard</h1>
          <p className="text-gray-300 mt-2 text-lg">Track website performance and user engagement</p>
        </div>
      </div>

      <AnalyticsStats />
      <AnalyticsCharts />
    </div>
  )
}