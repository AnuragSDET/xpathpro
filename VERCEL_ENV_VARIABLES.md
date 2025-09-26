# Vercel Environment Variables Setup

## Required Variables in Vercel Dashboard

Go to: **Vercel Dashboard → xpathpro → Settings → Environment Variables**

### Core Authentication
```
NEXTAUTH_SECRET=xpath-pro-secret-key-2024
NEXTAUTH_URL=https://xpathpro.vercel.app
```

### Supabase (Primary)
```
SUPABASE_URL=https://mrevcgruyqculsioiefq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZXZjZ3J1eXFjdWxzaW9pZWZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NzI4NzQsImV4cCI6MjA1MDU0ODg3NH0.gaKbot-8dunsi-tedsaz
SUPABASE_JWT_SECRET=your-jwt-secret
```

### Postgres (Vercel Integration)
```
POSTGRES_URL=your-postgres-url
POSTGRES_URL_NON_POOLING=your-postgres-url-non-pooling
POSTGRES_PRISMA_URL=your-postgres-prisma-url
POSTGRES_USER=your-postgres-user
POSTGRES_HOST=your-postgres-host
POSTGRES_PASSWORD=your-postgres-password
POSTGRES_DATABASE=your-postgres-database
```

## Code Updates Made

1. **Updated Supabase client** to use new environment variables
2. **Added fallback support** for legacy variables
3. **Updated environment templates** with new structure

## Testing Database Connection

After adding variables, test at:
`https://xpathpro.vercel.app/api/test-db`

Should return:
```json
{
  "connected": true,
  "adminExists": true,
  "adminUser": {
    "email": "admin@xpath.pro",
    "role": "admin"
  }
}
```

## Admin Login
- Email: admin@xpath.pro
- Password: password
- URL: https://xpathpro.vercel.app/admin