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

export async function POST(request: NextRequest) {
  try {
    const { code, planId } = await request.json();
    const supabase = getSupabaseClient();

    // Get coupon details
    const { data: coupon, error } = await supabase
      .from('coupon_codes')
      .select('*')
      .eq('code', code.toUpperCase())
      .eq('is_active', true)
      .single();

    if (error || !coupon) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Invalid coupon code' 
      }, { status: 400 });
    }

    // Check if coupon is expired
    if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Coupon has expired' 
      }, { status: 400 });
    }

    // Check usage limit
    if (coupon.max_uses && coupon.used_count >= coupon.max_uses) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Coupon usage limit reached' 
      }, { status: 400 });
    }

    // Check if applicable to plan
    if (coupon.applicable_plans.length > 0 && !coupon.applicable_plans.includes(planId)) {
      return NextResponse.json({ 
        valid: false, 
        error: 'Coupon not applicable to this plan' 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      valid: true, 
      coupon: {
        id: coupon.id,
        code: coupon.code,
        name: coupon.name,
        discount_type: coupon.discount_type,
        discount_value: coupon.discount_value
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to validate coupon' }, { status: 500 });
  }
}