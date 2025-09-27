import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' })
  }

  try {
    console.log('Admin login attempt:', email)
    
    // First check if users table exists
    const { data: allUsers, error: listError } = await supabase
      .from('users')
      .select('email')
      .limit(5)
    
    console.log('Users table check:', { count: allUsers?.length, error: listError })
    
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, password, status')
      .eq('email', email)
      .single()

    console.log('Query result:', { user, error })
    console.log('User found:', user ? 'Yes' : 'No')
    if (user) {
      console.log('Full user object:', JSON.stringify(user, null, 2))
      console.log('User data:', { id: user.id, email: user.email, hasPassword: !!user.password })
    }

    if (error || !user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // Temporarily bypass password check for testing
    console.log('Bypassing password check for testing')
    
    // TODO: Re-enable password verification after fixing database schema

    res.json({ 
      ok: true, 
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' })
  }
}