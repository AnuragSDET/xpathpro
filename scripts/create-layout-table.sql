-- Create layout_settings table for navbar configuration
CREATE TABLE IF NOT EXISTS layout_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default navbar settings
INSERT INTO layout_settings (key, value) VALUES 
('navbar', '{
  "logo": "xPath Pro",
  "links": [
    {"label": "Home", "href": "/"},
    {"label": "Courses", "href": "/courses"},
    {"label": "About", "href": "/about"},
    {"label": "Contact", "href": "/contact"}
  ],
  "ctaButton": {
    "label": "Get Started",
    "href": "/courses"
  }
}')
ON CONFLICT (key) DO NOTHING;

-- Verify table creation
SELECT 'Layout settings table created successfully' as status;
SELECT * FROM layout_settings WHERE key = 'navbar';