'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })
      
      if (result?.ok) {
        window.location.href = '/admin'
      } else {
        alert('Login failed. Please check your credentials.')
        console.error('Sign in failed:', result?.error)
      }
    } catch (error) {
      console.error('Sign in error:', error)
      alert('Login error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-400/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-30 blur rounded-2xl" />
        <Card className="relative w-full max-w-md bg-gray-900/90 backdrop-blur-xl border border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Admin Sign In</CardTitle>
            <CardDescription className="text-gray-300 text-lg">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 font-medium">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800/50 border-white/20 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold py-3 hover:scale-105 transition-transform duration-300" 
                disabled={loading}
              >
                {loading ? '⚡ Signing in...' : '🚀 Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => signIn('google')}
                className="w-full bg-gray-800/50 border-white/20 text-gray-300 hover:text-white hover:bg-gray-700/50"
              >
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}