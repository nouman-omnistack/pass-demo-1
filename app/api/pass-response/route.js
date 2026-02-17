// 'use server';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request) {

  try {
  
    if (!request) {
      return NextResponse.json('Invalid request sent to server . . . ', { status: 400 });
    }

    const contentType = request.headers.get('content-type');
  
    let body;
    if (contentType?.includes('application/json')) {
      body = await request.json();
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      body = Object.fromEntries((await request.formData()).entries());
      console.log(' >>> wokring by application/x-www-form-urlencoded . . . ');
    } else if (contentType?.includes('multipart/form-data')) {
      body = await request.formData();
    } else {
      body = await request.text();
    }

    
    if (body.res_cd == '0000') {
      return NextResponse.json({ ok: true, res_cd: body.res_cd, res_msg: body.res_msg, response: body });
    } else {
      return NextResponse.json({ ok: false, res_cd: body.res_cd, res_msg: body.res_msg, response: body });
    }

  } catch (error) {
    console.error('Error:', error?.response?.data || error?.message)
    return NextResponse.json({api_res_msg: 'An error occurred while verifying ownership'}, { status: 500 });
  }
}


// export async function GET(request) {
 
//     const contentType = request.headers.get('content-type');
  
//     let body;
//     if (contentType?.includes('application/json')) {
//       body = await request.json();
//     } else if (contentType?.includes('application/x-www-form-urlencoded')) {
//       body = Object.fromEntries((await request.formData()).entries());
//       console.log(' >>> wokring by application/x-www-form-urlencoded . . . ');
//     } else if (contentType?.includes('multipart/form-data')) {
//       body = await request.formData();
//     } else {
//       body = await request.text();
//     }

//   return NextResponse.json({ callback_request: request, res_cd: body.res_cd, res_msg: body.res_msg, response: body });

// }