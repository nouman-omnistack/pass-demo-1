// 'use server';
import { NextRequest, NextResponse } from 'next/server';

//export async function GET(request: NextRequest) {
export async function GET(req: NextRequest) {
console.log('here-GET');
    const formData = await req.formData();
    const res_data = Object.fromEntries(formData);

    return new Response(JSON.stringify({ response_data: res_data }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    });
}

//export async function GET(request: NextRequest) {
export async function POST(req: NextRequest) {
console.log('here-POST');
    const formData = await req.formData();
    const res_data = Object.fromEntries(formData);

    return new Response(JSON.stringify({ response_data: res_data }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    });
}
