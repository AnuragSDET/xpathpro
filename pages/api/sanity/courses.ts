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
      const { title, description, overview, difficulty, duration, prerequisites, learningObjectives, tags, featuredImage, category, featured, published } = req.body

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const course = {
        _type: 'course',
        title,
        slug: { current: slug },
        description,
        overview: overview || '',
        difficulty,
        duration: parseInt(duration) || 1,
        prerequisites: prerequisites ? prerequisites.split(',').map((p: string) => p.trim()).filter(Boolean) : [],
        learningObjectives: learningObjectives ? learningObjectives.split(',').map((o: string) => o.trim()).filter(Boolean) : ['Learn the basics'],
        tags: tags || [],
        featuredImage: featuredImage || '',
        category: category ? {
          _type: 'reference',
          _ref: category
        } : null,
        featured: featured || false,
        published: published || false,
        publishedAt: published ? new Date().toISOString() : null
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

  if (req.method === 'GET') {
    try {
      const courses = await client.fetch(`
        *[_type == "course"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          description,
          difficulty,
          duration,
          prerequisites,
          learningObjectives,
          published,
          featured,
          _createdAt
        }
      `)
      
      return res.status(200).json({ success: true, courses })
    } catch (error: any) {
      console.error('Error fetching courses:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to fetch courses'
      })
    }
  }

  if (req.method === 'PUT') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { _id, title, description, difficulty, duration, prerequisites, learningObjectives, published, featured } = req.body

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const updatedCourse = {
        _id,
        _type: 'course',
        title,
        slug: { current: slug },
        description,
        difficulty,
        duration: parseInt(duration) || 1,
        prerequisites: prerequisites ? prerequisites.split(',').map((p: string) => p.trim()).filter(Boolean) : [],
        learningObjectives: learningObjectives ? learningObjectives.split(',').map((o: string) => o.trim()).filter(Boolean) : ['Learn the basics'],
        published: published || false,
        featured: featured || false
      }

      const result = await writeClient.createOrReplace(updatedCourse)
      
      return res.status(200).json({ 
        success: true, 
        course: result,
        message: 'Course updated successfully'
      })
    } catch (error: any) {
      console.error('Error updating course:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to update course',
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
          error: 'Course ID is required' 
        })
      }

      await writeClient.delete(id as string)
      
      return res.status(200).json({ 
        success: true, 
        message: 'Course deleted successfully'
      })
    } catch (error: any) {
      console.error('Error deleting course:', error)
      return res.status(500).json({ 
        success: false, 
        error: error.message || 'Failed to delete course',
        details: error.toString()
      })
    }
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}