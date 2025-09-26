import { BookOpen, Users, Eye, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    name: 'Total Courses',
    value: '12',
    change: '+2 this month',
    changeType: 'positive',
    icon: BookOpen,
  },
  {
    name: 'Active Users',
    value: '1,234',
    change: '+12% from last month',
    changeType: 'positive',
    icon: Users,
  },
  {
    name: 'Page Views',
    value: '45,678',
    change: '+8% from last month',
    changeType: 'positive',
    icon: Eye,
  },
  {
    name: 'Course Completions',
    value: '89',
    change: '+15% from last month',
    changeType: 'positive',
    icon: TrendingUp,
  },
]

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.name}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.name}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}