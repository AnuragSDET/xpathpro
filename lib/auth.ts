import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

export async function requireAuth(req: NextRequest) {
  const session = await getServerSession()
  
  if (!session) {
    return { error: 'Unauthorized', status: 401 }
  }
  
  return { session }
}

export async function requireAdmin(req: NextRequest) {
  const { session, error } = await requireAuth(req)
  
  if (error) return { error, status: 401 }
  
  if (session?.user?.role !== 'admin') {
    return { error: 'Admin access required', status: 403 }
  }
  
  return { session }
}