-- =====================================================
-- SUPABASE MANUAL SETUP - Run this in SQL Editor
-- =====================================================

-- Step 1: Create Tables
-- ---------------------

-- Users table
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

-- Step 2: Create Indexes
-- ----------------------
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON analytics_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_bookmarks_user_id ON user_bookmarks(user_id);

-- Step 3: Create Admin User
-- -------------------------
INSERT INTO users (email, name, role) 
VALUES ('admin@xpath.pro', 'Admin User', 'admin')
ON CONFLICT (email) DO UPDATE SET role = 'admin';

-- Step 4: Add Sample Data
-- -----------------------
INSERT INTO users (email, name, role) VALUES 
('john@example.com', 'John Doe', 'user'),
('jane@example.com', 'Jane Smith', 'user'),
('mike@example.com', 'Mike Johnson', 'user')
ON CONFLICT (email) DO NOTHING;

-- Sample analytics events
INSERT INTO analytics_events (event, properties, timestamp) VALUES 
('page_view', '{"page": "/", "referrer": "google"}', NOW() - INTERVAL '1 day'),
('course_started', '{"course_id": "sdet-basics"}', NOW() - INTERVAL '2 hours'),
('lesson_completed', '{"lesson_id": "intro-to-testing"}', NOW() - INTERVAL '1 hour'),
('page_view', '{"page": "/admin", "referrer": "direct"}', NOW() - INTERVAL '30 minutes'),
('user_signup', '{"method": "email"}', NOW() - INTERVAL '3 days');

-- Step 5: Verify Setup
-- --------------------
SELECT 'Tables created:' as status;
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

SELECT 'Admin user:' as status;
SELECT email, name, role FROM users WHERE role = 'admin';

SELECT 'Total users:' as status;
SELECT COUNT(*) as user_count FROM users;

SELECT 'Recent analytics:' as status;
SELECT event, timestamp FROM analytics_events 
ORDER BY timestamp DESC LIMIT 5;

-- =====================================================
-- INSTRUCTIONS:
-- 1. Go to https://supabase.com/dashboard
-- 2. Select your project: mrevcgruyqculsioiefq
-- 3. Go to SQL Editor
-- 4. Paste this entire script
-- 5. Click "Run"
-- 6. Check the results at the bottom
--
-- ADMIN LOGIN:
-- Email: admin@xpath.pro
-- Password: password
-- URL: https://xpathpro.vercel.app/admin
-- =====================================================