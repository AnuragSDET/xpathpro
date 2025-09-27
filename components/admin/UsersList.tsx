'use client'

import { useState } from 'react'
import { Shield, User, Crown } from 'lucide-react'

// Mock data - replace with actual API call
const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    joinedAt: '2024-01-15',
    coursesCompleted: 3,
    status: 'active',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'admin',
    joinedAt: '2024-01-10',
    coursesCompleted: 8,
    status: 'active',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'user',
    joinedAt: '2024-01-05',
    coursesCompleted: 1,
    status: 'inactive',
  },
]

const getRoleIcon = (role: string) => {
  switch (role) {
    case 'admin':
      return <Crown className="h-4 w-4 text-yellow-500" />
    case 'moderator':
      return <Shield className="h-4 w-4 text-blue-500" />
    default:
      return <User className="h-4 w-4 text-gray-500" />
  }
}

export default function UsersList() {
  const [users] = useState(mockUsers)

  return (
    <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-lg">
      <div className="px-6 py-4 border-b border-white/10">
        <h3 className="text-lg font-medium text-white">All Users</h3>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-gray-800/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Courses Completed
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-white/10">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-800/30 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getRoleIcon(user.role)}
                    <span className="ml-2 text-sm text-gray-300 capitalize">
                      {user.role}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.coursesCompleted}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    user.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}