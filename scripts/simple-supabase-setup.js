const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://mrevcgruyqculsioiefq.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXZjZ3J1eXFjdWxzaW9pZWZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDk3Mjg3NCwiZXhwIjoyMDUwNTQ4ODc0fQ.gaKbot-8dunsi-tedsaz'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupData() {
  console.log('🚀 Setting up Supabase data...')

  try {
    // Create admin user directly
    const { data: adminUser, error: adminError } = await supabase
      .from('users')
      .upsert({
        email: 'admin@xpath.pro',
        name: 'Admin User',
        role: 'admin'
      }, { onConflict: 'email' })
      .select()

    if (adminError) {
      console.error('❌ Admin user creation failed:', adminError)
    } else {
      console.log('✅ Admin user created:', adminUser)
    }

    // Create sample users
    const { data: sampleUsers, error: sampleError } = await supabase
      .from('users')
      .upsert([
        { email: 'john@example.com', name: 'John Doe', role: 'user' },
        { email: 'jane@example.com', name: 'Jane Smith', role: 'user' },
        { email: 'mike@example.com', name: 'Mike Johnson', role: 'user' }
      ], { onConflict: 'email' })
      .select()

    if (sampleError) {
      console.error('❌ Sample users failed:', sampleError)
    } else {
      console.log('✅ Sample users created:', sampleUsers?.length || 0)
    }

    // Create sample analytics
    const { data: analytics, error: analyticsError } = await supabase
      .from('analytics_events')
      .insert([
        { event: 'page_view', properties: { page: '/', referrer: 'google' } },
        { event: 'course_started', properties: { course_id: 'sdet-basics' } },
        { event: 'lesson_completed', properties: { lesson_id: 'intro-to-testing' } }
      ])
      .select()

    if (analyticsError) {
      console.error('❌ Analytics failed:', analyticsError)
    } else {
      console.log('✅ Sample analytics created:', analytics?.length || 0)
    }

    // Test connection
    const { data: testData, error: testError } = await supabase
      .from('users')
      .select('email, role')
      .limit(5)

    if (testError) {
      console.error('❌ Database test failed:', testError)
    } else {
      console.log('✅ Database connection test passed')
      console.log('📊 Current users:', testData)
    }

    console.log('\n🎉 Database setup complete!')
    console.log('👤 Admin login: admin@xpath.pro (any password)')
    console.log('🌐 Test at: https://xpathpro.vercel.app/admin')

  } catch (error) {
    console.error('❌ Setup failed:', error)
  }
}

setupData()