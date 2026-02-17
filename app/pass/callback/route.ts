// 'use server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    console.log('here-GET');
    const { searchParams } = new URL(req.url);

    const responseData = Object.fromEntries(searchParams.entries());

    return NextResponse.json({ response_data: responseData });
}

export async function POST(req: NextRequest) {
console.log('here-POST');
    const formData = await req.formData();
    const res_data = Object.fromEntries(formData);

    return new Response(JSON.stringify({ response_data: res_data }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    });
}
