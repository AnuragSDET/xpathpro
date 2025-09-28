import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Admin auth test',
    timestamp: new Date().toISOString(),
    commit: '1b90ee2',
    working: true
  });
}