import { NextApiRequest, NextApiResponse } from 'next'
import { writeClient, client } from '../../../lib/sanity'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { title, description, content, courseId, order, duration, videoUrl } = req.body

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const lesson = {
        _type: 'lesson',
        title,
        slug: { current: slug },
        description,
        content,
        course: {
          _type: 'reference',
          _ref: courseId
        },
        order: parseInt(order) || 1,
        duration: parseInt(duration) || 5,
        videoUrl: videoUrl || '',
        published: false,
        featured: false
      }

      const result = await writeClient.create(lesson)
      
      return res.status(201).json({ 
        success: true, 
        lesson: result,
        message: 'Lesson created successfully'
      })
    } catch (error: any) {
      console.error('Error creating lesson:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to create lesson',
        details: error.toString()
      })
    }
  }

  if (req.method === 'GET') {
    try {
      const lessons = await client.fetch(`
        *[_type == "lesson"] | order(order asc) {
          _id,
          title,
          slug,
          description,
          content,
          course->{
            _id,
            title,
            slug
          },
          order,
          duration,
          videoUrl,
          published,
          featured,
          _createdAt
        }
      `)
      
      return res.status(200).json({ success: true, lessons })
    } catch (error: any) {
      console.error('Error fetching lessons:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to fetch lessons'
      })
    }
  }

  if (req.method === 'PUT') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { _id, title, description, content, courseId, order, duration, videoUrl, published, featured } = req.body

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const updatedLesson = {
        _id,
        _type: 'lesson',
        title,
        slug: { current: slug },
        description,
        content,
        course: {
          _type: 'reference',
          _ref: courseId
        },
        order: parseInt(order) || 1,
        duration: parseInt(duration) || 5,
        videoUrl: videoUrl || '',
        published: published || false,
        featured: featured || false
      }

      const result = await writeClient.createOrReplace(updatedLesson)
      
      return res.status(200).json({ 
        success: true, 
        lesson: result,
        message: 'Lesson updated successfully'
      })
    } catch (error: any) {
      console.error('Error updating lesson:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to update lesson',
        details: error.toString()
      })
    }
  }

  if (req.method === 'DELETE') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { id } = req.query
      
      if (!id) {
        return res.status(400).json({ 
          success: false, 
          error: 'Lesson ID is required' 
        })
      }

      await writeClient.delete(id as string)
      
      return res.status(200).json({ 
        success: true, 
        message: 'Lesson deleted successfully'
      })
    } catch (error: any) {
      console.error('Error deleting lesson:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to delete lesson',
        details: error.toString()
      })
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}