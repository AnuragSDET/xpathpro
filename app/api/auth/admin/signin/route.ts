import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Admin signin test endpoint',
    timestamp: new Date().toISOString(),
    note: 'This endpoint is working'
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  return NextResponse.json({
    message: 'Admin signin POST test',
    received: body,
    timestamp: new Date().toISOString(),
    note: 'Bypassing password check for testing'
  });
}