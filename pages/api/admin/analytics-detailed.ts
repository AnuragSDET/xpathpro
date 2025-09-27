import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Get page views
    const { data: pageViews, error: pageViewsError } = await supabase
      .from('analytics')
      .select('*')
      .eq('event_type', 'page_view')

    // Get unique visitors
    const { data: visitors, error: visitorsError } = await supabase
      .from('analytics')
      .select('user_id')
      .eq('event_type', 'page_view')

    // Get top pages
    const { data: topPages, error: topPagesError } = await supabase
      .from('analytics')
      .select('page_url')
      .eq('event_type', 'page_view')

    // Get device stats
    const { data: deviceStats, error: deviceStatsError } = await supabase
      .from('analytics')
      .select('device_type')
      .not('device_type', 'is', null)

    // Get traffic sources
    const { data: trafficSources, error: trafficSourcesError } = await supabase
      .from('analytics')
      .select('referrer')
      .not('referrer', 'is', null)

    if (pageViewsError || visitorsError || topPagesError || deviceStatsError || trafficSourcesError) {
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch analytics data' 
      })
    }

    // Process unique visitors
    const uniqueVisitors = new Set(visitors?.map(v => v.user_id) || []).size

    // Process top pages
    const pageCount: { [key: string]: number } = {}
    topPages?.forEach(page => {
      const url = page.page_url || 'Unknown'
      pageCount[url] = (pageCount[url] || 0) + 1
    })
    const topPagesArray = Object.entries(pageCount)
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)

    // Process device stats
    const deviceCount: { [key: string]: number } = {}
    deviceStats?.forEach(device => {
      const type = device.device_type || 'unknown'
      deviceCount[type] = (deviceCount[type] || 0) + 1
    })
    const deviceStatsArray = Object.entries(deviceCount)
      .map(([device, count]) => ({ device, count }))

    // Process traffic sources
    const sourceCount: { [key: string]: number } = {}
    trafficSources?.forEach(source => {
      const ref = source.referrer || 'direct'
      sourceCount[ref] = (sourceCount[ref] || 0) + 1
    })
    const trafficSourcesArray = Object.entries(sourceCount)
      .map(([source, count]) => ({ source, count }))
      .slice(0, 5)

    // Calculate average session duration (placeholder)
    const avgSessionDuration = Math.floor(Math.random() * 300) + 120 // 2-7 minutes

    // Calculate bounce rate (placeholder)
    const bounceRate = Math.floor(Math.random() * 40) + 20 // 20-60%

    const data = {
      totalPageViews: pageViews?.length || 0,
      uniqueVisitors,
      avgSessionDuration,
      bounceRate,
      topPages: topPagesArray,
      deviceStats: deviceStatsArray,
      trafficSources: trafficSourcesArray
    }

    res.json({ success: true, data })
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch detailed analytics' })
  }
}