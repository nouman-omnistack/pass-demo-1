// ./api/pass-check-status/route.js

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {

  const cookieStore = await cookies(); 
  const token = cookieStore.get('pass-token')?.value;

  if (token != 'undefined') {
    return NextResponse.json({ token });
  } else {
    return NextResponse.json({ token: null });
  }
  
}