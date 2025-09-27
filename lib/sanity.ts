import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6q840ft7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-12-01',
  token: process.env.SANITY_API_READ_TOKEN,
})

// Client with write permissions for server-side operations
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '6q840ft7',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2023-12-01',
  token: process.env.SANITY_API_WRITE_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// GROQ queries for content fetching
export const queries = {
  // Get all published courses
  courses: `*[_type == "course" && published == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    description,
    featuredImage,
    category->{
      title,
      slug,
      color,
      icon
    },
    difficulty,
    duration,
    tags,
    featured,
    publishedAt,
    "lessonCount": count(lessons)
  }`,
  
  // Get single course with lessons
  courseBySlug: `*[_type == "course" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    description,
    overview,
    featuredImage,
    category->{
      title,
      slug,
      color,
      icon
    },
    difficulty,
    duration,
    prerequisites,
    learningObjectives,
    lessons[]->{
      _id,
      title,
      slug,
      description,
      order,
      duration,
      published
    } | order(order asc),
    tags,
    publishedAt
  }`,
  
  // Get single lesson
  lessonBySlug: `*[_type == "lesson" && slug.current == $slug && published == true][0] {
    _id,
    title,
    slug,
    description,
    content,
    course->{
      title,
      slug
    },
    order,
    duration,
    videoUrl,
    resources,
    quiz,
    tags,
    publishedAt
  }`,
  
  // Get all categories
  categories: `*[_type == "category"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    icon,
    color,
    order,
    featured,
    "courseCount": count(*[_type == "course" && references(^._id) && published == true])
  }`,
  
  // Get featured courses
  featuredCourses: `*[_type == "course" && featured == true && published == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    description,
    featuredImage,
    category->{
      title,
      color,
      icon
    },
    difficulty,
    duration,
    "lessonCount": count(lessons)
  }`
}