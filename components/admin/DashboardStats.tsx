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
  const iconColors = ['text-cyan-400', 'text-emerald-400', 'text-purple-400', 'text-yellow-400'];
  const gradients = [
    'from-cyan-400 to-blue-500',
    'from-emerald-400 to-green-500', 
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={stat.name} className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl`} />
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-slate-400">
                {stat.name}
              </h3>
              <stat.icon className={`h-6 w-6 ${iconColors[index]}`} />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
            <p className="text-sm text-slate-400">
              {stat.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}