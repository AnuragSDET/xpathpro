import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Check if admin already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@xpath.pro')
      .maybeSingle();

    if (existingUser) {
      return NextResponse.json({ success: true, message: 'Admin user already exists', user: existingUser });
    }

    // Create admin user
    const { data: user, error } = await supabase
      .from('users')
      .insert({
        email: 'admin@xpath.pro',
        name: 'Admin User',
        role: 'admin',
        status: 'active',
        provider: 'credentials'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Admin user created', user });
  } catch (error) {
    console.error('Create admin error:', error);
    return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 });
  }
}