import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'

interface ExtendedUser {
  name?: string | null
  email?: string | null
  image?: string | null
  role?: string
  id?: string
}

interface ExtendedSession {
  user?: ExtendedUser
}

type AuthResult = 
  | { session: ExtendedSession; error?: never; status?: never }
  | { error: string; status: number; session?: never }

export async function requireAuth(req: NextApiRequest, res: NextApiResponse): Promise<AuthResult> {
  const session = await getServerSession() as ExtendedSession | null
  
  if (!session) {
    return { error: 'Unauthorized', status: 401 }
  }
  
  return { session }
}

export async function requireAdmin(req: NextApiRequest, res: NextApiResponse): Promise<AuthResult> {
  const authResult = await requireAuth(req, res)
  
  if (authResult.error) {
    return authResult
  }
  
  if (authResult.session?.user?.role !== 'admin') {
    return { error: 'Admin access required', status: 403 }
  }
  
  return authResult
}