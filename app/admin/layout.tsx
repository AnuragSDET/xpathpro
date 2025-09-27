'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Skip auth check for signin page
    if (pathname === '/admin/auth/signin') {
      setLoading(false)
      return
    }

    // Check for admin session
    const adminUser = localStorage.getItem('adminUser')
    if (adminUser) {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/auth/signin')
    }
    setLoading(false)
  }, [pathname, router])

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-white">Loading...</div>
  }

  // Show signin page without sidebar
  if (pathname === '/admin/auth/signin') {
    return <>{children}</>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}