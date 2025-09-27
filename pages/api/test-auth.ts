import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, name, role, password_hash, status')
      .eq('email', 'admin@xpath.pro')
      .eq('status', 'active')
      .single()

    if (error || !user) {
      return res.json({ error: 'User not found', details: error })
    }

    const isValidPassword = await bcrypt.compare('admin123', user.password_hash)
    
    res.json({ 
      user: { ...user, password_hash: '***' }, 
      passwordValid: isValidPassword,
      hasPasswordHash: !!user.password_hash
    })
  } catch (error) {
    res.json({ error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' })
  }
}