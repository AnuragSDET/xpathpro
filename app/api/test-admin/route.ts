import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // Test database connection and check admin user
    const { data: adminUser, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', 'admin@xpath.pro')
      .maybeSingle();

    return NextResponse.json({
      connected: !error,
      adminExists: !!adminUser,
      adminUser: adminUser,
      error: error?.message || null
    });
  } catch (error) {
    return NextResponse.json({ 
      connected: false, 
      error: 'Connection failed' 
    });
  }
}