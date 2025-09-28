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
    const { step } = await request.json();
    const adminUser = request.headers.get('x-admin-user');
    
    if (!adminUser) {
      return NextResponse.json({
        success: false,
        error: 'Admin access required'
      }, { status: 401 });
    }

    if (step === 'lessons') {
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

      const createdLessons = [];
      for (const lessonTitle of Array.from(allUniqueLessons)) {
        const lessonSlug = createSlug(lessonTitle);
        
        const lesson = {
          _type: 'lesson',
          title: lessonTitle,
          slug: { current: lessonSlug },
          content: `# ${lessonTitle}\\n\\nThis lesson covers ${lessonTitle.toLowerCase()}.`,
          publishedAt: new Date().toISOString(),
          _id: `lesson-${lessonSlug}`
        };

        const createdLesson = await sanityClient.createOrReplace(lesson);
        createdLessons.push(createdLesson);
      }

      return NextResponse.json({
        success: true,
        message: `Created ${createdLessons.length} lessons`,
        count: createdLessons.length
      });
    }

    if (step === 'categories') {
      const createdCategories = [];
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

        const createdCategory = await sanityClient.createOrReplace(category);
        createdCategories.push(createdCategory);
      }

      return NextResponse.json({
        success: true,
        message: `Created ${createdCategories.length} categories`,
        count: createdCategories.length
      });
    }

    if (typeof step === 'number') {
      const categoryIndex = step;
      const categoryData = curriculumData.categories[categoryIndex];
      
      if (!categoryData) {
        return NextResponse.json({
          success: false,
          error: 'Category not found'
        }, { status: 404 });
      }

      const categorySlug = createSlug(categoryData.name);
      const categoryId = `category-${categorySlug}`;

      const createdCourses = [];
      for (const courseData of categoryData.courses) {
        const courseSlug = createSlug(courseData.title);
        
        let courseLessons: Array<{_type: string, _ref: string}> = [];
        
        if ((courseData as any).shared) {
          const originalCourse = curriculumData.categories
            .flatMap(cat => cat.courses as any[])
            .find((c: any) => c.title === courseData.title && c.lessons);
          
          if (originalCourse && originalCourse.lessons) {
            courseLessons = originalCourse.lessons.map((lessonTitle: string) => ({
              _type: 'reference',
              _ref: `lesson-${createSlug(lessonTitle)}`
            }));
          }
        } else if (courseData.lessons) {
          courseLessons = courseData.lessons.map((lessonTitle: string) => ({
            _type: 'reference',
            _ref: `lesson-${createSlug(lessonTitle)}`
          }));
        }

        // Ensure minimum 3 learning objectives
        let objectives = Array.isArray((courseData as any).learningObjectives) 
          ? (courseData as any).learningObjectives 
          : [(courseData as any).learningObjectives || 'Complete the course successfully'];
        
        while (objectives.length < 3) {
          objectives.push(`Additional learning objective ${objectives.length + 1}`);
        }

        // Format overview as objects for rich text
        let overviewBlocks = [];
        const overviewData = Array.isArray((courseData as any).overview) 
          ? (courseData as any).overview 
          : [(courseData as any).overview || 'Comprehensive course content'];
        
        overviewData.forEach((text: string) => {
          overviewBlocks.push({
            _type: 'block',
            _key: `block-${Math.random().toString(36).substr(2, 9)}`,
            style: 'normal',
            children: [{
              _type: 'span',
              _key: `span-${Math.random().toString(36).substr(2, 9)}`,
              text: text,
              marks: []
            }]
          });
        });

        // Add _key to lessons
        const lessonsWithKeys = courseLessons.map(lesson => ({
          ...lesson,
          _key: `lesson-${Math.random().toString(36).substr(2, 9)}`
        }));

        const course = {
          _type: 'course',
          title: courseData.title,
          description: courseData.description,
          slug: { current: `${categorySlug}-${courseSlug}` },
          category: {
            _type: 'reference',
            _ref: categoryId
          },
          lessons: lessonsWithKeys,
          difficulty: (courseData as any).difficulty || 'beginner',
          duration: parseInt((courseData as any).duration || '10'),
          prerequisites: Array.isArray((courseData as any).prerequisites) 
            ? (courseData as any).prerequisites 
            : [(courseData as any).prerequisites || 'No prerequisites'],
          learningObjectives: objectives,
          overview: overviewBlocks,
          tags: (courseData as any).tags && (courseData as any).tags.length > 0 
            ? (courseData as any).tags 
            : ['programming', 'testing', 'automation'],
          featured: (courseData as any).featured || false,
          published: true,
          publishedAt: new Date().toISOString(),
          _id: `course-${categorySlug}-${courseSlug}`
        };

        const createdCourse = await sanityClient.createOrReplace(course);
        createdCourses.push(createdCourse);
      }

      return NextResponse.json({
        success: true,
        message: `Created ${createdCourses.length} courses for ${categoryData.name}`,
        count: createdCourses.length,
        category: categoryData.name
      });
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid step parameter'
    }, { status: 400 });

  } catch (error) {
    console.error('Step import error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to import step',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}