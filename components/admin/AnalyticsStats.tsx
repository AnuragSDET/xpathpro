import { Eye, Clock, TrendingUp, Target } from 'lucide-react'

const stats = [
  {
    name: 'Page Views',
    value: '45,678',
    change: '+12%',
    changeType: 'positive',
    icon: Eye,
  },
  {
    name: 'Avg. Session Duration',
    value: '4m 32s',
    change: '+8%',
    changeType: 'positive',
    icon: Clock,
  },
  {
    name: 'Bounce Rate',
    value: '32.4%',
    change: '-5%',
    changeType: 'positive',
    icon: TrendingUp,
  },
  {
    name: 'Conversion Rate',
    value: '2.8%',
    change: '+15%',
    changeType: 'positive',
    icon: Target,
  },
]

export default function AnalyticsStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <stat.icon className="h-6 w-6 text-primary-600" />
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium ${
              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change} from last month
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}