import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const { data: user, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password: hashedPassword,
          role: 'user',
          status: 'active'
        }
      ])
      .select()
      .single()

    if (error) {
      return res.status(500).json({ error: 'Failed to create user' })
    }

    res.status(201).json({ success: true, message: 'User created successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}