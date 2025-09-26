import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

interface ExtendedUser {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

interface ExtendedSession {
  user?: ExtendedUser
}

export async function requireAuth(req: NextRequest) {
  const session = await getServerSession() as ExtendedSession | null
  
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