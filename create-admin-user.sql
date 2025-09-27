-- Insert admin user directly into the database
INSERT INTO users (email, name, role, status, provider) 
VALUES ('admin@xpath.pro', 'Admin User', 'admin', 'active', 'credentials')
ON CONFLICT (email) DO UPDATE SET 
  role = 'admin',
  status = 'active',
  updated_at = NOW();