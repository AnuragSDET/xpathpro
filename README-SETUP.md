# xPath Pro Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
cd studio && npm install && cd ..
```

### 2. Environment Setup
1. Copy `.env.example` to `.env.local`
2. Update the following variables in `.env.local`:

**Required Supabase Keys:**
- Get your anon key from Supabase Dashboard → Settings → API
- Get your service role key (for admin operations)

**Required Sanity Keys:**
- Create a new project at sanity.io
- Get your project ID and dataset name
- Generate an API token with read/write permissions

**NextAuth Secret:**
- Generate a random string: `openssl rand -base64 32`

### 3. Database Setup
```bash
# Run the database schema in Supabase SQL Editor
# Copy content from lib/supabase-schema.sql

# Create sample data (optional)
npm run setup-db
```

### 4. Sanity Studio Setup
```bash
# Start Sanity Studio
npm run studio

# Visit http://localhost:3333
# Create sample content using studio/sample-data.json as reference
```

### 5. Start Development
```bash
# Start Next.js app
npm run dev

# Visit http://localhost:3000
# Admin dashboard: http://localhost:3000/admin
```

## Testing

### Test API Endpoints
```bash
npm run test-api
```

### Manual Testing
- **Public API**: `curl http://localhost:3000/api/courses`
- **Search**: `curl http://localhost:3000/api/search?q=sdet`
- **Analytics**: `curl -X POST http://localhost:3000/api/analytics/track -H "Content-Type: application/json" -d '{"event":"test","userId":"123"}'`

## Admin Access

1. Create an admin user in Supabase:
```sql
INSERT INTO users (email, name, role) 
VALUES ('admin@xpath.pro', 'Admin User', 'admin');
```

2. Sign in at `/admin` with your admin credentials

## Troubleshooting

- **Database errors**: Check Supabase connection and RLS policies
- **Sanity errors**: Verify project ID and API token
- **Auth errors**: Check NextAuth configuration and secret
- **API errors**: Ensure all environment variables are set

## Next Steps

1. Create content in Sanity Studio
2. Test admin dashboard functionality
3. Set up Google OAuth (optional)
4. Configure email provider (optional)
5. Deploy to Vercel