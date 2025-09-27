import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const newHash = await bcrypt.hash('admin123', 12)
    
    const { data, error } = await supabase
      .from('users')
      .update({ password_hash: newHash })
      .eq('email', 'admin@xpath.pro')
      .select()

    if (error) {
      return res.json({ error: 'Update failed', details: error })
    }

    // Test the new hash
    const isValid = await bcrypt.compare('admin123', newHash)

    res.json({ success: true, newHashWorks: isValid, user: data })
  } catch (error) {
    res.json({ error: 'Failed', details: error instanceof Error ? error.message : 'Unknown error' })
  }
}