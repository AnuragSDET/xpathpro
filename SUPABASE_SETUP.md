# Supabase Database Setup

## Step 1: Run Database Schema

Go to your Supabase Dashboard → SQL Editor and run this:

```sql
-- Users table (extends NextAuth users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  image TEXT,
  role VARCHAR(50) DEFAULT 'user',
  status VARCHAR(50) DEFAULT 'active',
  provider VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id VARCHAR(255) NOT NULL,
  lesson_id VARCHAR(255),
  completed BOOLEAN DEFAULT FALSE,
  progress INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id, lesson_id)
);

-- Analytics events
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event VARCHAR(255) NOT NULL,
  properties JSONB,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- User bookmarks
CREATE TABLE IF NOT EXISTS user_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_id VARCHAR(255),
  lesson_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, course_id, lesson_id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON user_bookmarks(user_id);
```

## Step 2: Create Admin User

Run this to create the admin user:

```sql
INSERT INTO users (email, name, role) 
VALUES ('admin@xpath.pro', 'Admin User', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';
```

## Step 3: Add Sample Data (Optional)

```sql
-- Sample users
INSERT INTO users (email, name, role) VALUES 
('john@example.com', 'John Doe', 'user'),
('jane@example.com', 'Jane Smith', 'user'),
('mike@example.com', 'Mike Johnson', 'user')
ON CONFLICT (email) DO NOTHING;

-- Sample analytics events
INSERT INTO analytics_events (event, properties, timestamp) VALUES 
('page_view', '{"page": "/", "referrer": "google"}', NOW() - INTERVAL '1 day'),
('course_started', '{"course_id": "sdet-basics"}', NOW() - INTERVAL '2 hours'),
('lesson_completed', '{"lesson_id": "intro-to-testing"}', NOW() - INTERVAL '1 hour');
```

## Step 4: Verify Setup

Check if tables were created:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

Check admin user:
```sql
SELECT * FROM users WHERE role = 'admin';
```

## Database URL
Your database is already configured:
- URL: https://mrevcgruyqculsioiefq.supabase.co
- Password: gaKbot-8dunsi-tedsaz

## Next Steps
1. Run the schema in Supabase SQL Editor
2. Create the admin user
3. Test admin login at xpathpro.vercel.app/admin
4. Login with: admin@xpath.pro + password: password