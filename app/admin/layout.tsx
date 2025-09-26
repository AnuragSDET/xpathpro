import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import AdminSidebar from '../../components/admin/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()
  if (!session || session.user?.role !== 'admin') {
    redirect('/auth/signin')
  }

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}