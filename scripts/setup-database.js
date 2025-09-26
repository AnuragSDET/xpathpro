const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://mrevcgruyqculsioiefq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXZjZ3J1eXFjdWxzaW9pZWZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDk3Mjg3NCwiZXhwIjoyMDUwNTQ4ODc0fQ.gaKbot-8dunsi-tedsaz'

const supabase = createClient(supabaseUrl, supabaseKey)

async function setupDatabase() {
  console.log('Setting up database...')

  // Create sample users
  const users = [
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      email: 'admin@xpath.pro',
      name: 'Admin User',
      role: 'admin',
      status: 'active'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      email: 'john@example.com',
      name: 'John Doe',
      role: 'user',
      status: 'active'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      email: 'jane@example.com',
      name: 'Jane Smith',
      role: 'user',
      status: 'active'
    }
  ]

  // Insert users
  const { error: usersError } = await supabase
    .from('users')
    .upsert(users)

  if (usersError) {
    console.error('Error creating users:', usersError)
  } else {
    console.log('✅ Users created successfully')
  }

  // Create sample progress data
  const progressData = [
    {
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      course_id: 'intro-to-sdet',
      lesson_id: 'lesson-1',
      completed: true,
      progress: 100
    },
    {
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      course_id: 'intro-to-sdet',
      lesson_id: 'lesson-2',
      completed: false,
      progress: 50
    },
    {
      user_id: '550e8400-e29b-41d4-a716-446655440003',
      course_id: 'api-testing',
      lesson_id: 'lesson-1',
      completed: true,
      progress: 100
    }
  ]

  const { error: progressError } = await supabase
    .from('user_progress')
    .upsert(progressData)

  if (progressError) {
    console.error('Error creating progress data:', progressError)
  } else {
    console.log('✅ Progress data created successfully')
  }

  // Create sample analytics events
  const analyticsEvents = [
    {
      event: 'page_view',
      properties: { page: '/courses/intro-to-sdet' },
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    },
    {
      event: 'lesson_completed',
      properties: { courseId: 'intro-to-sdet', lessonId: 'lesson-1' },
      user_id: '550e8400-e29b-41d4-a716-446655440002',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    },
    {
      event: 'course_started',
      properties: { courseId: 'api-testing' },
      user_id: '550e8400-e29b-41d4-a716-446655440003',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
    }
  ]

  const { error: analyticsError } = await supabase
    .from('analytics_events')
    .insert(analyticsEvents)

  if (analyticsError) {
    console.error('Error creating analytics events:', analyticsError)
  } else {
    console.log('✅ Analytics events created successfully')
  }

  console.log('Database setup complete!')
}

setupDatabase().catch(console.error)