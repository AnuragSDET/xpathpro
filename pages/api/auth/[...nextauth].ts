import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '../../../lib/supabase'

export const authOptions: NextAuthOptions = {
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

        // Check admin credentials
        if (credentials.email === 'admin@xpath.pro' && credentials.password === 'admin123') {
          console.log('Admin credentials matched, checking database...')
          // Get user from database
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .maybeSingle()

          console.log('Database query result:', { user, error })

          if (error) {
            console.error('Supabase error:', error)
            return null
          }

          if (user && user.role === 'admin') {
            console.log('Admin user found, returning user object')
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role
            }
          } else {
            console.log('User not found or not admin:', user)
          }
        } else {
          console.log('Credentials do not match admin account')
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
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}

export default NextAuth(authOptions)