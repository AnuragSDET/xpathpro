import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from('users')
      .select('email, role')
      .limit(5)

    if (error) {
      return res.status(500).json({
        connected: false,
        error: error.message,
        details: error
      })
    }

    // Check if admin user exists
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@xpath.pro')
      .single()

    return res.status(200).json({
      connected: true,
      users: data,
      adminExists: !!adminUser,
      adminUser: adminUser,
      adminError: adminError?.message
    })

  } catch (error) {
    return res.status(500).json({
      connected: false,
      error: 'Connection failed',
      details: error
    })
  }
}