# Vercel Environment Variables Setup

## CRITICAL: Add these to Vercel Dashboard → Project Settings → Environment Variables

### Required for Authentication (CRITICAL)
```
NEXTAUTH_SECRET=xpath-pro-secret-key-2024
NEXTAUTH_URL=https://xpathpro.vercel.app
```

### Required for Database (CRITICAL)
```
NEXT_PUBLIC_SUPABASE_URL=https://mrevcgruyqculsioiefq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXZjZ3J1eXFjdWxzaW9pZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI4NzQsImV4cCI6MjA1MDU0ODg3NH0.gaKbot-8dunsi-tedsaz
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXZjZ3J1eXFjdWxzaW9pZWZxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNDk3Mjg3NCwiZXhwIjoyMDUwNTQ4ODc0fQ.gaKbot-8dunsi-tedsaz
DATABASE_URL=postgresql://postgres:gaKbot-8dunsi-tedsaz@db.mrevcgruyqculsioiefq.supabase.co:5432/postgres
```

## Steps to Fix the Error:

1. Go to https://vercel.com/dashboard
2. Select your xpathpro project
3. Go to Settings → Environment Variables
4. Add ALL the variables above
5. Redeploy the project

## Current Error Cause:
The admin layout is failing because NextAuth can't initialize without NEXTAUTH_SECRET and database connection variables.

## After Adding Variables:
- Admin login will work: admin@xpath.pro + any password
- Database connections will be established
- All API endpoints will function properly