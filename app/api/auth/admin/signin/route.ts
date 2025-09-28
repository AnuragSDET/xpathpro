import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Admin signin test endpoint',
    timestamp: new Date().toISOString(),
    note: 'This endpoint is working'
  });
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  
  // Check admin credentials
  if (email === 'admin@xpath.pro' && password === 'admin123') {
    return NextResponse.json({
      ok: true,
      user: {
        id: 'admin-1',
        email: 'admin@xpath.pro',
        name: 'Admin User',
        role: 'admin'
      }
    });
  }
  
  return NextResponse.json({
    ok: false,
    error: 'Invalid credentials'
  }, { status: 401 });
}// Force deployment Sun Sep 28 12:14:45 IST 2025
