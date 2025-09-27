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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <div key={stat.name} className="relative group">
          <div className={`absolute -inset-1 bg-gradient-to-r ${gradients[index]} opacity-0 group-hover:opacity-30 blur transition-opacity duration-500 rounded-2xl`} />
          <div className="relative bg-gray-900/50 backdrop-blur-xl border border-white/10 p-6 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-300">{stat.name}</p>
                <p className="text-3xl font-bold text-white">{stat.value}</p>
              </div>
              <div className={`p-3 bg-gradient-to-r ${gradients[index]} rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}