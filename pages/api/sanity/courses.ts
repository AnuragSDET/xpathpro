import { NextApiRequest, NextApiResponse } from 'next'
import { writeClient } from '../../../lib/sanity'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { title, description, difficulty, duration, prerequisites, learningObjectives } = req.body

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const course = {
        _type: 'course',
        title,
        slug: { current: slug },
        description,
        difficulty,
        duration: parseInt(duration) || 1,
        prerequisites: prerequisites ? prerequisites.split(',').map((p: string) => p.trim()).filter(Boolean) : [],
        learningObjectives: learningObjectives ? learningObjectives.split(',').map((o: string) => o.trim()).filter(Boolean) : ['Learn the basics'],
        published: false,
        featured: false
      }

      const result = await writeClient.create(course)
      
      return res.status(201).json({ 
        success: true, 
        course: result,
        message: 'Course created successfully'
      })
    } catch (error: any) {
      console.error('Error creating course:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to create course',
        details: error.toString()
      })
    }
  }

  res.setHeader('Allow', ['POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}