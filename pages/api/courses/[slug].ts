import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../lib/sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (req.method === 'GET') {
    try {
      const course = await client.fetch(`
        *[_type == "course" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          category->{title, slug, color},
          lessons[]->{
            _id,
            title,
            slug,
            excerpt,
            duration,
            order,
            publishedAt
          } | order(order asc),
          featured,
          publishedAt
        }
      `, { slug })

      if (!course) {
        return res.status(404).json({ error: 'Course not found' })
      }

      res.status(200).json(course)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch course' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}