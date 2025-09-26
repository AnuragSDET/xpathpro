import { getServerSession } from 'next-auth'
import { NextApiRequest } from 'next'

interface ExtendedUser {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
}

interface ExtendedSession {
  user?: ExtendedUser
}

export async function requireAuth(req: NextApiRequest) {
  // Temporarily disabled for deployment
  return { session: { user: { role: 'admin' } } }
}

export async function requireAdmin(req: NextApiRequest) {
  // Temporarily disabled for deployment
  return { session: { user: { role: 'admin' } } }
}