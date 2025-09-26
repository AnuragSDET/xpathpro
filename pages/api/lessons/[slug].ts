import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../lib/sanity'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug } = req.query

  if (req.method === 'GET') {
    try {
      const lesson = await client.fetch(`
        *[_type == "lesson" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          content,
          excerpt,
          duration,
          order,
          publishedAt,
          "course": *[_type == "course" && references(^._id)][0]{
            title,
            slug
          }
        }
      `, { slug })

      if (!lesson) {
        return res.status(404).json({ error: 'Lesson not found' })
      }

      res.status(200).json(lesson)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch lesson' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}