import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../lib/sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const courses = await client.fetch(`
        *[_type == "course"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          description,
          category->{title, slug, color},
          "lessonsCount": count(*[_type == "lesson" && references(^._id)]),
          featured,
          publishedAt
        }
      `)
      
      res.status(200).json(courses)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch courses' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}