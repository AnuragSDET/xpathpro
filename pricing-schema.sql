-- Pricing Management Tables
CREATE TABLE pricing_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  current_price DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  billing_period VARCHAR(20) DEFAULT 'monthly', -- monthly, yearly, one-time
  is_active BOOLEAN DEFAULT true,
  features JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Codes Table
CREATE TABLE coupon_codes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  discount_type VARCHAR(20) NOT NULL, -- percentage, fixed_amount
  discount_value DECIMAL(10,2) NOT NULL,
  max_uses INTEGER DEFAULT NULL, -- NULL = unlimited
  used_count INTEGER DEFAULT 0,
  valid_from TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  valid_until TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN DEFAULT true,
  applicable_plans JSONB DEFAULT '[]', -- array of plan IDs
  created_by VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coupon Usage Tracking
CREATE TABLE coupon_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coupon_id UUID REFERENCES coupon_codes(id) ON DELETE CASCADE,
  user_email VARCHAR(255),
  used_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  original_price DECIMAL(10,2),
  discount_amount DECIMAL(10,2),
  final_price DECIMAL(10,2)
);

-- Insert default mentorship pricing
INSERT INTO pricing_plans (name, description, base_price, current_price, billing_period, features) VALUES 
(
  'Elite 1-on-1 Mentorship',
  'Personalized SDET mentorship with industry expert',
  1299.00,
  1299.00,
  'monthly',
  '["Weekly 1-on-1 sessions", "Resume review & optimization", "Mock interview practice", "Career guidance", "Industry insights", "Job referrals", "24/7 support"]'
);

-- Create indexes for performance
CREATE INDEX idx_coupon_codes_code ON coupon_codes(code);
CREATE INDEX idx_coupon_codes_active ON coupon_codes(is_active);
CREATE INDEX idx_coupon_usage_coupon_id ON coupon_usage(coupon_id);
CREATE INDEX idx_pricing_plans_active ON pricing_plans(is_active);