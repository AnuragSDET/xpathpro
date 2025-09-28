import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import curriculumData from '@/data/curriculum';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
  apiVersion: '2023-05-03'
});

function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const sharedLessons = new Map();
    const createdCategories = [];
    const createdCourses = [];
    const createdLessons = [];

    // Step 1: Create all unique lessons first (including shared ones)
    const allUniqueLessons = new Set();
    
    curriculumData.categories.forEach(category => {
      category.courses.forEach(course => {
        if (course.lessons && !course.shared) {
          course.lessons.forEach(lessonTitle => {
            allUniqueLessons.add(lessonTitle);
          });
        }
      });
    });

    // Create lessons in Sanity
    for (const lessonTitle of allUniqueLessons) {
      const lessonSlug = createSlug(lessonTitle);
      
      const lesson = {
        _type: 'lesson',
        title: lessonTitle,
        slug: { current: lessonSlug },
        content: `# ${lessonTitle}\n\nThis lesson covers the fundamentals of ${lessonTitle.toLowerCase()}.\n\n## Learning Objectives\n- Understand key concepts\n- Apply practical skills\n- Complete hands-on exercises\n\n## Content\nDetailed content will be added here.`,
        publishedAt: new Date().toISOString(),
        _id: `lesson-${lessonSlug}`
      };

      const createdLesson = await sanityClient.create(lesson);
      sharedLessons.set(lessonTitle, createdLesson._id);
      createdLessons.push(createdLesson);
    }

    // Step 2: Create categories
    for (const categoryData of curriculumData.categories) {
      const categorySlug = createSlug(categoryData.name);
      
      const category = {
        _type: 'category',
        name: categoryData.name,
        description: categoryData.description,
        slug: { current: categorySlug },
        _id: `category-${categorySlug}`
      };

      const createdCategory = await sanityClient.create(category);
      createdCategories.push(createdCategory);

      // Step 3: Create courses for this category
      for (const courseData of categoryData.courses) {
        const courseSlug = createSlug(courseData.title);
        
        let courseLessons = [];
        
        if (courseData.shared) {
          // Find the original course with lessons
          const originalCourse = curriculumData.categories
            .flatMap(cat => cat.courses)
            .find(c => c.title === courseData.title && c.lessons);
          
          if (originalCourse) {
            courseLessons = originalCourse.lessons.map(lessonTitle => ({
              _type: 'reference',
              _ref: sharedLessons.get(lessonTitle)
            }));
          }
        } else if (courseData.lessons) {
          courseLessons = courseData.lessons.map(lessonTitle => ({
            _type: 'reference',
            _ref: sharedLessons.get(lessonTitle)
          }));
        }

        const course = {
          _type: 'course',
          title: courseData.title,
          description: courseData.description,
          slug: { current: courseSlug },
          category: {
            _type: 'reference',
            _ref: createdCategory._id
          },
          lessons: courseLessons,
          publishedAt: new Date().toISOString(),
          _id: `course-${categorySlug}-${courseSlug}`
        };

        const createdCourse = await sanityClient.create(course);
        createdCourses.push(createdCourse);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Curriculum imported successfully',
      stats: {
        categories: createdCategories.length,
        courses: createdCourses.length,
        lessons: createdLessons.length
      },
      data: {
        categories: createdCategories,
        courses: createdCourses,
        lessons: createdLessons
      }
    });

  } catch (error) {
    console.error('Bulk import error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to import curriculum',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}