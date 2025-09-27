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

    if (!user.password) {
      console.log('No password found for user')
      return res.status(401).json({ error: 'No password set' })
    }

    let isValidPassword = false
    try {
      // Check if password is already hashed or plain text
      if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$')) {
        isValidPassword = await bcrypt.compare(password, user.password)
      } else {
        // Plain text comparison for testing
        isValidPassword = password === user.password
      }
      console.log('Password valid:', isValidPassword)
    } catch (bcryptError) {
      console.log('Bcrypt error:', bcryptError)
      return res.status(500).json({ error: 'Password verification failed' })
    }
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' })
    }

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