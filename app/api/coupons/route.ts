import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables');
  }
  
  return createClient(url, key);
}

// Generate random coupon code
function generateCouponCode(prefix = 'XPATH'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = prefix;
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data: coupons, error } = await supabase
      .from('coupon_codes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ coupons });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { 
      name, 
      description, 
      discount_type, 
      discount_value, 
      max_uses, 
      valid_until,
      applicable_plans 
    } = await request.json();

    const code = generateCouponCode();
    const supabase = getSupabaseClient();

    const { data: coupon, error } = await supabase
      .from('coupon_codes')
      .insert({
        code,
        name,
        description,
        discount_type,
        discount_value,
        max_uses,
        valid_until,
        applicable_plans,
        created_by: 'admin@xpath.pro'
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ coupon });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabaseClient();

    const { data: coupon, error } = await supabase
      .from('coupon_codes')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ coupon });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update coupon' }, { status: 500 });
  }
}