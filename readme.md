# SDET Free Course Website

## Overview

This project is a free SDET (Software Development Engineer in Test) course website built with modern technologies. It delivers article-style course content with user authentication, content management, and custom analytics in a full-stack Next.js app. The frontend is hosted on Vercel and backend services use Supabase and Sanity CMS.

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS  
- **Authentication:** NextAuth.js  
- **Content Management:** Sanity.io (Headless CMS)  
- **Database & Backend:** Supabase (PostgreSQL, Auth, Storage)  
- **Analytics:** Custom analytics backend using Node.js API and Supabase database  
- **Deployment:** Frontend on Vercel, Backend services on Supabase and Sanity  

---

## Features

- Article-style course lessons rendered with MDX/markdown from Sanity CMS  
- User authentication and authorization with NextAuth.js (OAuth & email/password)  
- Admin dashboard to create, edit, and organize course content in Sanity Studio  
- Custom analytics tracking user engagement, lesson views, and course progress  
- Learner dashboard to track progress and bookmarks (powered by Supabase)  
- Responsive design with Tailwind CSS for usability on all devices  
- SEO optimized with Next.js SSG/SSR  
- Monetization-ready architecture with affiliate links, memberships, and ads space

---

## Project Structure

- `/app` - Next.js application pages and components  
- `/components` - Reusable React components (Lesson, Layout, Navbar, etc.)  
- `/lib` - API clients and utilities (Sanity client, Supabase client, analytics API)  
- `/pages/api` - Next.js API routes for backend functions (authentication, analytics)  
- `/studio` - Sanity Studio code for content management  
- `/styles` - Tailwind CSS configuration and global styles  

---

## Setup and Installation

### Prerequisites

- Node.js (version 18 or above recommended)  
- npm or yarn package manager  
- Accounts on Vercel, Supabase, Sanity.io

### 1. Clone the repository

git clone <repository-url>
cd sdet-free-course-website


### 2. Install dependencies

npm install

or
yarn install


### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your credentials:


NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=http://localhost:3000
SANITY_PROJECT_ID=<your-sanity-project-id>
SANITY_DATASET=production
SANITY_API_TOKEN=<your-sanity-read-write-token>


### 4. Setup Sanity Studio


cd studio
npm install
npm run dev


This runs Sanity Studio locally at [http://localhost:3333](http://localhost:3333) where you can create and manage course content.

### 5. Setup Supabase Database

- Create Supabase project and configure tables for users, course progress, analytics events  
- Set up RLS policies for security  
- Get Supabase API keys and add them to `.env.local`

---

## Running the Project Locally

To run frontend and backend together:

npm run dev


- Open [http://localhost:3000](http://localhost:3000) to view the app  
- Admin panel runs at [http://localhost:3333](http://localhost:3333)

---

## Deployment

- Frontend deployed on Vercel (recommended: connect GitHub repo for automatic deployments)  
- Sanity Studio hosted on Sanity Cloud or deployed separately if needed  
- Supabase backend runs as a managed service  

---

## Analytics

- Custom analytics API collects user actions (page views, lesson completions)  
- Data stored in Supabase and visualized in the admin dashboard  
- Includes tracking endpoints in Next.js API routes for frontend calls  

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

---

## License

MIT License

---

## Contact

For more information, reach out at <anuragpatel786@hotmail.com>
// Force deployment 1759044317
