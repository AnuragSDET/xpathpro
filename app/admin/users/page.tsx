import AdminPageLayout from '../../../components/admin/AdminPageLayout'
import UsersList from '../../../components/admin/UsersList'
import UserStats from '../../../components/admin/UserStats'

export const metadata = {
  title: 'Users Management - xPath Pro Admin',
  description: 'Manage user accounts and permissions',
}

export default function UsersPage() {
  return (
    <AdminPageLayout
      title="Users Management"
      description="Manage user accounts and permissions"
    >
      <div className="space-y-6">
        <UserStats />
        <UsersList />
      </div>
    </AdminPageLayout>
  )
}