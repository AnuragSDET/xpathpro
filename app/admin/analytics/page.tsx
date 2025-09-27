import AdminPageLayout from '../../../components/admin/AdminPageLayout'
import AnalyticsCharts from '../../../components/admin/AnalyticsCharts'
import AnalyticsStats from '../../../components/admin/AnalyticsStats'

export const metadata = {
  title: 'Analytics - xPath Pro Admin',
  description: 'View website performance and user engagement metrics',
}

export default function AnalyticsPage() {
  return (
    <AdminPageLayout
      title="Analytics Dashboard"
      description="Track website performance and user engagement"
    >
      <div className="space-y-6">
        <AnalyticsStats />
        <AnalyticsCharts />
      </div>
    </AdminPageLayout>
  )
}