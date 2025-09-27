import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Check connection and get database info
    const { data, error } = await supabase
      .from('users')
      .select('count', { count: 'exact', head: true })

    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    res.json({ 
      supabaseUrl: url?.substring(0, 30) + '...', 
      hasKey: !!key,
      keyLength: key?.length,
      error: error?.message,
      userCount: data
    })
  } catch (error) {
    res.json({ error: 'Debug failed', details: error instanceof Error ? error.message : 'Unknown error' })
  }
}