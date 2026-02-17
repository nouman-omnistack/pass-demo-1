// 'use server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

    const formData = await req.formData();
    const res_data = Object.fromEntries(formData);

    return new Response(JSON.stringify({ response_data_post: res_data }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    });
}
