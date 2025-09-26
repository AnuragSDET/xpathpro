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
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}