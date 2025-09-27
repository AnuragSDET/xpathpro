-- Add password_hash field to users table
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Create admin user with hashed password
-- Password: admin123 (hashed with bcrypt)
INSERT INTO users (email, name, role, status, provider, password_hash) 
VALUES (
  'admin@xpath.pro', 
  'Admin User', 
  'admin', 
  'active', 
  'credentials',
  '$2a$12$LQv3c1yqBw2fyuPiHn5jNe7vNfNvnUnuMsqpM8nh7wNFiDeHd4f3a'
)
ON CONFLICT (email) DO UPDATE SET 
  role = 'admin',
  status = 'active',
  password_hash = '$2a$12$LQv3c1yqBw2fyuPiHn5jNe7vNfNvnUnuMsqpM8nh7wNFiDeHd4f3a',
  updated_at = NOW();

-- Update RLS policies to allow password authentication
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (
  auth.uid() = id OR 
  (role = 'admin' AND EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'))
);