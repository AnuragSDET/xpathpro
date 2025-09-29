import { client } from './sanity'

export const getCategories = async () => {
  return await client.fetch(`
    *[_type == "category" && published == true] | order(order asc) {
      _id,
      title,
      slug,
      description,
      icon,
      color,
      order,
      "courseCount": count(*[_type == "course" && references(^._id) && published == true])
    }
  `)
}

export const getCoursesByCategory = async (categorySlug: string) => {
  return await client.fetch(`
    *[_type == "course" && published == true && category->slug.current == $categorySlug] | order(order asc) {
      _id,
      title,
      slug,
      description,
      difficulty,
      duration,
      prerequisites,
      learningObjectives,
      category->{title, slug, color},
      "lessonCount": count(*[_type == "lesson" && references(^._id)])
    }
  `, { categorySlug })
}

export const getCourse = async (categorySlug: string, courseSlug: string) => {
  return await client.fetch(`
    *[_type == "course" && slug.current == $courseSlug && category->slug.current == $categorySlug && published == true][0] {
      _id,
      title,
      slug,
      description,
      overview,
      difficulty,
      duration,
      prerequisites,
      learningObjectives,
      category->{title, slug, color},
      "lessons": *[_type == "lesson" && references(^._id)] | order(order asc) {
        _id,
        title,
        slug,
        description,
        duration,
        order
      }
    }
  `, { categorySlug, courseSlug })
}

export const getAllCourses = async () => {
  return await client.fetch(`
    *[_type == "course" && published == true] | order(category->order asc, order asc) {
      _id,
      title,
      slug,
      description,
      difficulty,
      duration,
      prerequisites,
      learningObjectives,
      category->{title, slug, color, order},
      "lessonCount": count(*[_type == "lesson" && references(^._id)])
    }
  `)
}