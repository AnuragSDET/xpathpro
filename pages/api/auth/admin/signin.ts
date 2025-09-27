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
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, password, status')
      .eq('email', email)
      .single()

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
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