import { getServerSession } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from './supabase'

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

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        if (credentials.email === 'admin@xpath.pro' && credentials.password === 'password') {
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .single()

          if (error) {
            console.error('Supabase error:', error)
            return null
          }

          if (user && user.role === 'admin') {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          }
        }

        return null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

export async function requireAuth(req: NextApiRequest, res: NextApiResponse): Promise<AuthResult> {
  const session = await getServerSession(req, res, authOptions) as ExtendedSession | null
  
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