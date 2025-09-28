import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import curriculumData from '@/data/curriculum';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_API_PROJECT_ID || 'dummy',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_API_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN || 'dummy',
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
    // Check if user is admin (simple check for now)
    const adminUser = request.headers.get('x-admin-user');
    if (!adminUser) {
      return NextResponse.json({
        success: false,
        error: 'Admin access required'
      }, { status: 401 });
    }

    // Check Sanity configuration
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_API_PROJECT_ID;
    const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_READ_TOKEN;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_API_DATASET || 'production';
    
    console.log('Sanity Config:', { projectId: projectId?.substring(0, 8) + '...', hasToken: !!token, dataset });
    
    if (!projectId || !token || projectId === 'dummy') {
      return NextResponse.json({
        success: false,
        error: `Sanity CMS not configured. ProjectId: ${!!projectId}, Token: ${!!token}`
      }, { status: 500 });
    }

    // Test Sanity connection
    try {
      await sanityClient.fetch('*[_type == "lesson"][0]');
      console.log('Sanity connection test successful');
    } catch (testError) {
      console.error('Sanity connection test failed:', testError);
      return NextResponse.json({
        success: false,
        error: `Sanity connection failed: ${testError instanceof Error ? testError.message : 'Unknown error'}`
      }, { status: 500 });
    }

    // Clear existing curriculum data in correct order (courses -> categories -> lessons)
    console.log('Clearing existing data...');
    
    // Delete courses first (they reference lessons and categories)
    const existingCourses = await sanityClient.fetch('*[_type == "course"][0...50]._id');
    if (existingCourses.length > 0) {
      await sanityClient.delete({ query: `*[_type == "course" && _id in [${existingCourses.map((id: string) => `"${id}"`).join(',')}]]` });
      console.log(`Deleted ${existingCourses.length} courses`);
    }
    
    // Delete categories second (they might be referenced)
    const existingCategories = await sanityClient.fetch('*[_type == "category"][0...20]._id');
    if (existingCategories.length > 0) {
      await sanityClient.delete({ query: `*[_type == "category" && _id in [${existingCategories.map((id: string) => `"${id}"`).join(',')}]]` });
      console.log(`Deleted ${existingCategories.length} categories`);
    }
    
    // Delete lessons last (they were referenced by courses)
    const existingLessons = await sanityClient.fetch('*[_type == "lesson"][0...50]._id');
    if (existingLessons.length > 0) {
      await sanityClient.delete({ query: `*[_type == "lesson" && _id in [${existingLessons.map((id: string) => `"${id}"`).join(',')}]]` });
      console.log(`Deleted ${existingLessons.length} lessons`);
    }
    
    console.log('Cleared existing data');

    const sharedLessons = new Map();
    const createdCategories = [];
    const createdCourses = [];
    const createdLessons = [];

    // Step 1: Create all unique lessons first (including shared ones)
    const allUniqueLessons = new Set<string>();
    
    curriculumData.categories.forEach(category => {
      category.courses.forEach(course => {
        if (course.lessons && !(course as any).shared) {
          course.lessons.forEach(lessonTitle => {
            allUniqueLessons.add(lessonTitle);
          });
        }
      });
    });

    // Create lessons in Sanity (batch create)
    console.log(`Creating ${allUniqueLessons.size} lessons...`);
    const lessonPromises = Array.from(allUniqueLessons).map(async (lessonTitle) => {
      const lessonSlug = createSlug(lessonTitle);
      
      const lesson = {
        _type: 'lesson',
        title: lessonTitle,
        slug: { current: lessonSlug },
        content: `# ${lessonTitle}\n\nThis lesson covers the fundamentals of ${lessonTitle.toLowerCase()}.`,
        publishedAt: new Date().toISOString(),
        _id: `lesson-${lessonSlug}`
      };

      const createdLesson = await sanityClient.create(lesson);
      sharedLessons.set(lessonTitle, createdLesson._id);
      return createdLesson;
    });
    
    const createdLessonsResults = await Promise.all(lessonPromises);
    createdLessons.push(...createdLessonsResults);
    console.log(`Created ${createdLessons.length} lessons`);

    // Step 2: Create categories in order
    console.log(`Creating ${curriculumData.categories.length} categories...`);
    for (const categoryData of curriculumData.categories) {
      const categorySlug = createSlug(categoryData.name);
      
      const category = {
        _type: 'category',
        title: categoryData.name,
        name: categoryData.name,
        description: categoryData.description,
        slug: { current: categorySlug },
        order: categoryData.order || 999,
        icon: categoryData.icon || 'code',
        color: categoryData.color || 'blue',
        featured: categoryData.featured || false,
        published: true,
        _id: `category-${categorySlug}`
      };

      const createdCategory = await sanityClient.create(category);
      createdCategories.push(createdCategory);

      // Step 3: Create courses for this category
      console.log(`Creating ${categoryData.courses.length} courses for ${categoryData.name}...`);
      for (const courseData of categoryData.courses) {
        const courseSlug = createSlug(courseData.title);
        
        let courseLessons: Array<{_type: string, _ref: string}> = [];
        
        if ((courseData as any).shared) {
          // Find the original course with lessons
          const originalCourse = curriculumData.categories
            .flatMap(cat => cat.courses as any[])
            .find((c: any) => c.title === courseData.title && c.lessons);
          
          if (originalCourse && originalCourse.lessons) {
            courseLessons = originalCourse.lessons.map((lessonTitle: string) => ({
              _type: 'reference',
              _ref: sharedLessons.get(lessonTitle)
            }));
          }
        } else if (courseData.lessons) {
          courseLessons = courseData.lessons.map((lessonTitle: string) => ({
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
          order: courseData.order || 999,
          difficulty: (courseData as any).difficulty || 'beginner',
          duration: (courseData as any).duration || '10',
          prerequisites: (courseData as any).prerequisites || '',
          learningObjectives: (courseData as any).learningObjectives || '',
          overview: (courseData as any).overview || '',
          tags: (courseData as any).tags || [],
          featured: (courseData as any).featured || false,
          published: true,
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