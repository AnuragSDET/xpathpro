import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { supabase } from '../../../lib/supabase'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials')
          return null
        }

        // For admin@xpath.pro, check password directly
        if (credentials.email === 'admin@xpath.pro' && credentials.password === 'password') {
          try {
            // Try to get user from database
            const { data: user, error } = await supabase
              .from('users')
              .select('*')
              .eq('email', credentials.email)
              .single()

            if (user) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role || 'admin'
              }
            } else {
              // Create admin user if doesn't exist
              const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert({
                  email: 'admin@xpath.pro',
                  name: 'Admin User',
                  role: 'admin'
                })
                .select()
                .single()

              if (newUser) {
                return {
                  id: newUser.id,
                  email: newUser.email,
                  name: newUser.name,
                  role: newUser.role
                }
              }
            }
          } catch (dbError) {
            console.log('Database error, using fallback admin')
            // Fallback if database is not set up
            return {
              id: 'admin-fallback',
              email: 'admin@xpath.pro',
              name: 'Admin User',
              role: 'admin'
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
})