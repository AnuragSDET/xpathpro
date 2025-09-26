import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../lib/sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { q } = req.query
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: 'Search query required' })
      }

      const courses = await client.fetch(`
        *[_type == "course" && (
          title match $query + "*" ||
          description match $query + "*"
        )] {
          _id,
          title,
          slug,
          description,
          category->{title, color}
        }
      `, { query: q })

      const lessons = await client.fetch(`
        *[_type == "lesson" && (
          title match $query + "*" ||
          excerpt match $query + "*"
        )] {
          _id,
          title,
          slug,
          excerpt,
          "course": *[_type == "course" && references(^._id)][0]{
            title,
            slug
          }
        }
      `, { query: q })

      res.status(200).json({
        courses,
        lessons,
        total: courses.length + lessons.length
      })
    } catch (error) {
      res.status(500).json({ error: 'Search failed' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}