import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Hash the admin password
    const hashedPassword = await bcrypt.hash('admin123', 12)

    // Create or update admin user
    const { data, error } = await supabase
      .from('users')
      .upsert({
        email: 'admin@xpath.pro',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        provider: 'credentials',
        password_hash: hashedPassword
      }, {
        onConflict: 'email'
      })
      .select()

    if (error) {
      console.error('Database error:', error)
      return res.status(500).json({ error: 'Failed to create admin user', details: error.message })
    }

    res.status(200).json({ 
      success: true, 
      message: 'Admin user created successfully with database authentication',
      credentials: {
        email: 'admin@xpath.pro',
        password: 'admin123'
      },
      user: data
    })
  } catch (error) {
    console.error('Setup error:', error)
    res.status(500).json({ 
      error: 'Setup failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    })
  }
}