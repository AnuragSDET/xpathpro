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

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    const { data: plans, error } = await supabase
      .from('pricing_plans')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ plans });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, base_price, current_price, billing_period, features } = await request.json();
    const supabase = getSupabaseClient();

    const { data: plan, error } = await supabase
      .from('pricing_plans')
      .insert({
        name,
        description,
        base_price,
        current_price,
        billing_period,
        features
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ plan });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create pricing plan' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json();
    const supabase = getSupabaseClient();

    const { data: plan, error } = await supabase
      .from('pricing_plans')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ plan });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update pricing plan' }, { status: 500 });
  }
}