import UsersList from '../../../components/admin/UsersList'
import UserStats from '../../../components/admin/UserStats'

export const metadata = {
  title: 'Users Management - xPath Pro Admin',
  description: 'Manage user accounts and permissions',
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
        </div>
      </div>

      <UserStats />
      <UsersList />
    </div>
  )
}