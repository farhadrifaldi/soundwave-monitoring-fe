import { NextResponse } from 'next/server';

// Replace with your actual backend API URL
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:4000/api/anomalies';

export async function GET() {
  try {
    const res = await fetch(BACKEND_API_URL + '/anomalies', {
      headers: {
        'x-api-key': process.env.BACKEND_API_KEY || ''
      }
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch anomalies' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
