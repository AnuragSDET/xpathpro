'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AdminSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/auth/admin/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      const result = await response.json()
      
      if (result?.ok) {
        window.location.href = '/admin'
      } else {
        alert('Admin login failed. Please check your credentials.')
      }
    } catch (error) {
      alert('Login error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-xl p-8 backdrop-blur-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p className="text-slate-400">Sign in to access the admin dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300 font-medium">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3" 
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Admin Sign In'}
          </Button>
        </form>
      </div>
    </div>
  )
}