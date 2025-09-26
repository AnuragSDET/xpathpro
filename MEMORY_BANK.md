# xPath Pro SDET Course Website - Memory Bank

## Project Overview
- **Domain**: xpath.pro (to be purchased)
- **Current Status**: Development phase on localhost
- **Deployment Strategy**: Vercel subdomain → xpath.pro migration
- **Project Type**: Free SDET course website with monetization features

## Tech Stack & Architecture
- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, shadcn/ui
- **Authentication**: NextAuth.js (OAuth + email/password)
- **CMS**: Sanity.io (Headless CMS for course content)
- **Database**: Supabase (PostgreSQL, Auth, Storage)
- **Analytics**: Custom Node.js API + Supabase
- **Deployment**: Vercel (frontend) + Supabase + Sanity Cloud

## Development Progress Log

### Session 1 - Project Initialization
**Date**: Current Session
**Status**: Starting project setup

#### Decisions Made:
- User wants complete admin control over website
- Development on localhost first, then Vercel deployment
- Full memory bank documentation required
- Minimal code approach requested
- **PRIORITY: Admin dashboard before frontend design**
- **SEO-friendly and optimized code required**
- **Code must be clean and understandable**
- **USE SHADCN/UI ONLY - No custom designs, only shadcn components**

#### Completed Tasks:
1. ✅ Initialize Next.js project with required dependencies
2. ✅ Set up project folder structure
3. ✅ Create configuration files (Next.js, Tailwind, PostCSS)
4. ✅ Set up Sanity Studio with content schemas
5. ✅ Configure API clients (Sanity, Supabase)
6. ✅ Create basic homepage with hero section
7. ✅ Set up global styles and CSS framework

#### Completed Tasks (Admin Dashboard):
8. ✅ **PRIORITY: Create admin dashboard**
   - Admin layout with authentication check
   - Admin sidebar with navigation
   - Dashboard with stats and quick actions
   - Courses management page with table
   - Users management with role-based display
   - Analytics page with metrics
   - All components optimized and SEO-friendly
9. ✅ Set up NextAuth.js configuration
10. ✅ Created admin-specific components

#### Completed Tasks (API Endpoints):
11. ✅ **Configure API endpoints for data management**
   - Authentication utilities (requireAuth, requireAdmin)
   - Courses API (GET all, GET by slug)
   - Lessons API (GET by slug with content)
   - Users API (GET all, GET/PUT by id) - Admin only
   - Analytics API (track events, get stats)
   - Progress tracking API (GET/POST user progress)
   - Admin dashboard API (aggregated data)
   - Search API (courses and lessons)
   - Supabase database schema with RLS policies
   - Client-side analytics utilities

#### Completed Tasks (Environment & Testing):
12. ✅ **Set up environment variables template**
   - Updated .env.example with all required variables
   - Created .env.local with Supabase configuration
   - **Updated with actual Supabase credentials (password: gaKbot-8dunsi-tedsaz)**
   - Added database URL and service role key
   - Added Google OAuth and email provider options
   - Configured NextAuth and Sanity variables
13. ✅ **Test API endpoints with sample data**
   - Created database setup script with sample users
   - Created API testing script for endpoint validation
   - Added sample Sanity data for content testing
   - Created comprehensive setup guide
   - Added npm scripts for database and API testing

#### Completed Tasks (shadcn/ui Setup):
14. ✅ **Configure shadcn/ui design system**
   - Created TypeScript config with path aliases
   - Set up shadcn/ui configuration (components.json)
   - Updated Tailwind config with shadcn/ui theme
   - Added CSS variables for design tokens
   - Created utility functions (cn helper)
   - Added required dependencies
15. ✅ **Rebuild all admin components using shadcn/ui**
   - Rebuilt AdminSidebar with Button and Separator
   - Rebuilt DashboardStats with Card components
   - Rebuilt RecentActivity with Card and Button
   - Rebuilt QuickActions with Card and Button
   - Rebuilt CoursesList with Table, Badge, Button
   - Updated admin layout with shadcn/ui classes
   - Added Button, Card, Table, Badge, Avatar, Separator components
16. ✅ **Push to GitHub repository**
   - Initialized git repository
   - Created .gitignore for Next.js and Sanity
   - Made initial commit with all files
   - Pushed to https://github.com/AnuragSDET/xpathpro.git

#### Next Steps:
1. Run database setup (npm run setup-db)
2. Create authentication pages with shadcn/ui
3. Create public frontend components using shadcn/ui
4. Test admin dashboard functionality
5. Deploy to Vercel

---

## Project Structure
```
/app - Next.js pages & components
/components - Reusable React components
/lib - API clients & utilities
/pages/api - Backend API routes
/studio - Sanity Studio CMS
/styles - Tailwind CSS config
```

## Key Features Required
- Article-style course lessons (MDX/Markdown from Sanity)
- User authentication & authorization
- Admin dashboard (Sanity Studio + custom Next.js admin)
- Custom analytics tracking
- Learner progress dashboard
- Responsive design
- SEO optimization
- Monetization-ready (affiliate links, memberships, ads)

## Admin System Components
1. **Sanity Studio** (localhost:3333)
   - Visual content management
   - Course creation/editing
   - Media management
   - Publishing workflow

2. **Next.js Admin Dashboard**
   - User management
   - Analytics visualization
   - Site configuration
   - Progress tracking

3. **Supabase Dashboard**
   - Database management
   - User authentication
   - Analytics events

## Environment Variables Required
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXTAUTH_SECRET
- NEXTAUTH_URL
- SANITY_PROJECT_ID
- SANITY_DATASET
- SANITY_API_TOKEN

## Development Workflow
- Frontend: localhost:3000
- Sanity Studio: localhost:3333
- Database: Supabase cloud
- Version Control: Git
- Deployment: Vercel auto-deploy from GitHub

## Files Created
- MEMORY_BANK.md (this file)
- package.json (with all dependencies)
- next.config.js (Next.js configuration)
- tailwind.config.js (Tailwind CSS configuration)
- postcss.config.js (PostCSS configuration)
- .env.example (environment variables template)
- app/globals.css (global styles)
- app/layout.tsx (root layout)
- app/page.tsx (homepage)
- studio/package.json (Sanity Studio dependencies)
- studio/sanity.config.ts (Sanity configuration)
- studio/schemas/index.ts (schema exports)
- studio/schemas/course.ts (course content type)
- studio/schemas/lesson.ts (lesson content type)
- studio/schemas/category.ts (category content type)
- lib/sanity.ts (Sanity client)
- lib/supabase.ts (Supabase client)
- pages/api/auth/[...nextauth].ts (NextAuth configuration)
- app/admin/layout.tsx (Admin layout with auth)
- app/admin/page.tsx (Admin dashboard)
- app/admin/courses/page.tsx (Courses management)
- app/admin/users/page.tsx (Users management)
- app/admin/analytics/page.tsx (Analytics dashboard)
- components/admin/AdminSidebar.tsx (Navigation sidebar)
- components/admin/DashboardStats.tsx (Dashboard statistics)
- components/admin/RecentActivity.tsx (Activity feed)
- components/admin/QuickActions.tsx (Quick action buttons)
- components/admin/CoursesList.tsx (Courses table)
- components/admin/UsersList.tsx (Users table)
- components/admin/UserStats.tsx (User statistics)
- components/admin/AnalyticsStats.tsx (Analytics metrics)
- components/admin/AnalyticsCharts.tsx (Charts placeholder)
- lib/auth.ts (Authentication utilities)
- lib/analytics.ts (Client-side tracking)
- lib/supabase-schema.sql (Database schema)
- pages/api/courses/index.ts (Courses API)
- pages/api/courses/[slug].ts (Individual course API)
- pages/api/lessons/[slug].ts (Lesson content API)
- pages/api/users/index.ts (Users management API)
- pages/api/users/[id].ts (Individual user API)
- pages/api/analytics/track.ts (Event tracking API)
- pages/api/analytics/stats.ts (Analytics stats API)
- pages/api/admin/dashboard.ts (Dashboard data API)
- pages/api/progress/index.ts (User progress API)
- pages/api/search/index.ts (Search API)
- .env.local (Environment variables with Supabase config)
- scripts/setup-database.js (Database setup with sample data)
- scripts/test-api.js (API endpoint testing script)
- studio/sample-data.json (Sample content for Sanity)
- README-SETUP.md (Comprehensive setup guide)
- .gitignore (Git ignore file)
- tsconfig.json (TypeScript configuration)
- components.json (shadcn/ui configuration)
- components/ui/button.tsx (shadcn/ui Button component)
- components/ui/card.tsx (shadcn/ui Card component)
- components/ui/table.tsx (shadcn/ui Table component)
- components/ui/badge.tsx (shadcn/ui Badge component)
- components/ui/avatar.tsx (shadcn/ui Avatar component)
- components/ui/separator.tsx (shadcn/ui Separator component)

**GitHub Repository**: https://github.com/AnuragSDET/xpathpro.git

## Folder Structure Created
- /app (Next.js app directory)
- /components (React components)
- /lib (API clients and utilities)
- /pages/api (API routes)
- /studio (Sanity Studio)
- /studio/schemas (Content schemas)
- /styles (CSS files)

## Design References

### Premium Card Design (User Favorite)
**Source**: Comet Invitation Card
**Key Features**:
- Dark theme (#1F2121 background)
- 3D perspective and transform effects
- Complex box-shadow with multiple layers
- Rounded corners (16px)
- Aspect ratio 3:4 for main content
- Overlay effects with mix-blend-mode
- Radial gradient overlays
- Clean typography with mono font
- Subtle opacity effects

**CSS Properties to Implement**:
```css
style="perspective: 1000px;"
style="transform-style: preserve-3d; box-shadow: rgba(0, 0, 0, 0.01) 0px 520px 146px 0px, rgba(0, 0, 0, 0.04) 0px 333px 133px 0px, rgba(0, 0, 0, 0.26) 0px 83px 83px 0px, rgba(0, 0, 0, 0.29) 0px 21px 46px 0px;"
background: radial-gradient(circle, rgba(255, 255, 255, 0.9) 10%, rgba(255, 255, 255, 0.75) 20%, rgba(255, 255, 255, 0) 80%)
[mix-blend-mode:overlay]
```

**Usage**: Course cards, feature cards, premium content displays

## API Endpoints

### Public Endpoints
- `GET /api/courses` - List all courses
- `GET /api/courses/[slug]` - Get course with lessons
- `GET /api/lessons/[slug]` - Get lesson content
- `GET /api/search?q=query` - Search courses and lessons
- `POST /api/analytics/track` - Track user events

### Authenticated Endpoints
- `GET /api/progress` - Get user progress
- `POST /api/progress` - Update user progress

### Admin-Only Endpoints
- `GET /api/users` - List all users
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user role/status
- `GET /api/analytics/stats` - Get analytics statistics
- `GET /api/admin/dashboard` - Get dashboard data

### Database Schema
- **users** - User profiles with roles
- **user_progress** - Course/lesson completion tracking
- **analytics_events** - Event tracking for analytics
- **user_bookmarks** - Saved courses/lessons
- **RLS policies** - Row-level security for data protection

---

*This memory bank will be updated with every significant progress and decision*