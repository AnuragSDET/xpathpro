import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  const authResult = await requireAdmin(req)
  
  if (authResult.error) {
    return res.status(authResult.status).json({ error: authResult.error })
  }

  if (req.method === 'GET') {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' })
    }
  } else if (req.method === 'PUT') {
    try {
      const { role, status } = req.body
      
      const { data: user, error } = await supabase
        .from('users')
        .update({ role, status, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      res.status(200).json(user)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}