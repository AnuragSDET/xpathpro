import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('email, name, role, status, password_hash')

    if (error) {
      return res.json({ error: 'Query failed', details: error })
    }

    res.json({ users, count: users?.length || 0 })
  } catch (error) {
    res.json({ error: 'Failed', details: error instanceof Error ? error.message : 'Unknown error' })
  }
}