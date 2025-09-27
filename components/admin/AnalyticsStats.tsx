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
  const iconColors = ['text-cyan-400', 'text-emerald-400', 'text-purple-400', 'text-yellow-400'];
  const gradients = [
    'from-cyan-400 to-blue-500',
    'from-emerald-400 to-green-500', 
    'from-purple-400 to-pink-500',
    'from-yellow-400 to-orange-500'
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={stat.name} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-200 h-32">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-400 leading-tight">
              {stat.name}
            </h3>
            <stat.icon className={`h-5 w-5 ${iconColors[index]}`} />
          </div>
          <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
          <p className="text-sm text-slate-400">
            <span className={stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'}>
              {stat.change}
            </span> from last month
          </p>
        </div>
      ))}
    </div>
  )
}