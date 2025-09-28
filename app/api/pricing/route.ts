import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
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