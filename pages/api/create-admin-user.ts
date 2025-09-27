import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 12)
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        email: 'admin@xpath.pro',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        provider: 'credentials',
        password_hash: hashedPassword
      })
      .select()

    if (error) {
      return res.json({ error: 'Failed to create user', details: error })
    }

    res.json({ success: true, user: data })
  } catch (error) {
    res.json({ error: 'Creation failed', details: error instanceof Error ? error.message : 'Unknown error' })
  }
}