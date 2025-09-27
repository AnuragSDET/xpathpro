import { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../../../lib/sanity'
import { requireAdmin } from '../../../lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const authResult = await requireAdmin(req, res)
    if (authResult.error) {
      return res.status(authResult.status).json({ error: authResult.error })
    }

    try {
      const { title, description, icon, color, order } = req.body

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

      const category = {
        _type: 'category',
        title,
        slug: { current: slug },
        description,
        icon,
        color,
        order: parseInt(order),
        featured: false
      }

      const result = await client.create(category)
      
      return res.status(201).json({ 
        success: true, 
        category: result,
        message: 'Category created successfully'
      })
    } catch (error) {
      console.error('Error creating category:', error)
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to create category' 
      })
    }
  }

  if (req.method === 'GET') {
    try {
      const categories = await client.fetch(`
        *[_type == "category"] | order(order asc) {
          _id,
          title,
          slug,
          description,
          icon,
          color,
          order,
          featured
        }
      `)
      
      return res.status(200).json({ success: true, categories })
    } catch (error) {
      console.error('Error fetching categories:', error)
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to fetch categories' 
      })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}