const fetch = require('node-fetch')

const BASE_URL = 'http://localhost:3000/api'

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n')

  // Test courses endpoint
  try {
    console.log('Testing GET /api/courses')
    const coursesResponse = await fetch(`${BASE_URL}/courses`)
    const courses = await coursesResponse.json()
    console.log('✅ Courses:', courses.length ? `${courses.length} courses found` : 'No courses yet')
  } catch (error) {
    console.log('❌ Courses API error:', error.message)
  }

  // Test search endpoint
  try {
    console.log('\nTesting GET /api/search?q=sdet')
    const searchResponse = await fetch(`${BASE_URL}/search?q=sdet`)
    const searchResults = await searchResponse.json()
    console.log('✅ Search:', `${searchResults.total || 0} results found`)
  } catch (error) {
    console.log('❌ Search API error:', error.message)
  }

  // Test analytics tracking
  try {
    console.log('\nTesting POST /api/analytics/track')
    const trackResponse = await fetch(`${BASE_URL}/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        properties: { page: '/test' },
        userId: 'test-user'
      })
    })
    const trackResult = await trackResponse.json()
    console.log('✅ Analytics tracking:', trackResult.success ? 'Event tracked' : 'Failed')
  } catch (error) {
    console.log('❌ Analytics API error:', error.message)
  }

  console.log('\n🏁 API testing complete!')
}

// Run tests
testAPI().catch(console.error)