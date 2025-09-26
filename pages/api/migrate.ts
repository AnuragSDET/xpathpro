import { NextApiRequest, NextApiResponse } from 'next'
import { runMigrations } from '../../lib/migrations'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const result = await runMigrations()
    
    if (result.success) {
      return res.status(200).json({ 
        success: true, 
        message: 'Migrations completed successfully' 
      })
    } else {
      return res.status(500).json({ 
        success: false, 
        error: result.error 
      })
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      error: 'Migration failed' 
    })
  }
}