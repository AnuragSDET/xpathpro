import { Users, UserCheck, UserX, Crown } from 'lucide-react'

const stats = [
  {
    name: 'Total Users',
    value: '1,234',
    icon: Users,
    color: 'bg-blue-500',
  },
  {
    name: 'Active Users',
    value: '1,089',
    icon: UserCheck,
    color: 'bg-green-500',
  },
  {
    name: 'Inactive Users',
    value: '145',
    icon: UserX,
    color: 'bg-gray-500',
  },
  {
    name: 'Admins',
    value: '3',
    icon: Crown,
    color: 'bg-yellow-500',
  },
]

export default function UserStats() {
  const gradients = [
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600', 
    'from-gray-400 to-gray-600',
    'from-yellow-400 to-yellow-600'
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
              <div className={`p-3 rounded-lg bg-gradient-to-r ${gradients[index]}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}