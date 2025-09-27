import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Lesson Title',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Lesson Description',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(300)
    }),
    defineField({
      name: 'content',
      title: 'Lesson Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'}
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'}
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url'
                  }
                ]
              }
            ]
          }
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {name: 'alt', type: 'string', title: 'Alternative text'},
            {name: 'caption', type: 'string', title: 'Caption'}
          ]
        },
        {
          type: 'code',
          options: {
            language: 'javascript',
            languageAlternatives: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'Python', value: 'python'},
              {title: 'Java', value: 'java'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              {title: 'SQL', value: 'sql'},
              {title: 'Shell', value: 'shell'},
              {title: 'JSON', value: 'json'},
              {title: 'XML', value: 'xml'}
            ],
            withFilename: true
          }
        }
      ],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'course',
      title: 'Course',
      type: 'reference',
      to: {type: 'course'},
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Lesson Order',
      type: 'number',
      description: 'Order of this lesson within the course',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'duration',
      title: 'Estimated Duration (minutes)',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or other video platform URL'
    }),
    defineField({
      name: 'resources',
      title: 'Additional Resources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Resource Title'},
            {name: 'url', type: 'url', title: 'Resource URL'},
            {name: 'description', type: 'text', title: 'Description', rows: 2}
          ]
        }
      ]
    }),
    defineField({
      name: 'quiz',
      title: 'Lesson Quiz',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Quiz Question',
          fields: [
            {name: 'question', type: 'string', title: 'Question'},
            {
              name: 'options',
              type: 'array',
              title: 'Answer Options',
              of: [{type: 'string'}],
              validation: Rule => Rule.min(2).max(4)
            },
            {
              name: 'correctAnswer',
              type: 'number',
              title: 'Correct Answer Index (0-based)',
              validation: Rule => Rule.min(0).max(3)
            },
            {name: 'explanation', type: 'text', title: 'Explanation', rows: 2}
          ]
        }
      ]
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'}
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      description: 'Only published lessons will be visible to users',
      initialValue: false
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm'
      }
    })
  ],
  orderings: [
    {
      title: 'Lesson Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    },
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      order: 'order',
      course: 'course.title',
      published: 'published'
    },
    prepare(selection) {
      const {title, subtitle, order, course, published} = selection
      return {
        title: `${order}. ${title}`,
        subtitle: `${course} • ${published ? 'Published' : 'Draft'}`,
      }
    }
  }
})