import UsersList from '../../../components/admin/UsersList'
import UserStats from '../../../components/admin/UserStats'

export const metadata = {
  title: 'Users Management - xPath Pro Admin',
  description: 'Manage user accounts and permissions',
}

export default function UsersPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Users Management</h1>
          <p className="text-gray-300 mt-2 text-lg">Manage user accounts and permissions</p>
        </div>
      </div>

      <UserStats />
      <UsersList />
    </div>
  )
}