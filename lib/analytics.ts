export async function trackEvent(event: string, properties?: any, userId?: string) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        properties,
        userId,
      }),
    })
  } catch (error) {
    console.error('Failed to track event:', error)
  }
}

export const events = {
  PAGE_VIEW: 'page_view',
  LESSON_START: 'lesson_start',
  LESSON_COMPLETE: 'lesson_complete',
  COURSE_START: 'course_start',
  COURSE_COMPLETE: 'course_complete',
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
}