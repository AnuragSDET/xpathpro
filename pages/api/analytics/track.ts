import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { event, properties, userId } = req.body

      const { error } = await supabase
        .from('analytics_events')
        .insert({
          event,
          properties,
          user_id: userId,
          timestamp: new Date().toISOString(),
          ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
          user_agent: req.headers['user-agent']
        })

      if (error) throw error

      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: 'Failed to track event' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}