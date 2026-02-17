import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server'
import { createPrivateKeyObject } from '../../utilities/funUtilities' 

export async function POST(request) {
  try {

    if (!request) {
        return NextResponse.json('Invalid request sent to server . . . ', { status: 400 });
    }

    if (request.method == 'POST') {

        const body = await request.json();

        console.log('body: ', body)

        var site_cd    = (body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_SITE_CD : process.env.KR_OB_PASS_SITE_CD;
        var web_siteid = (body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_WEB_SITEID : process.env.KR_OB_PASS_WEB_SITEID;
        var web_siteid_hashYN = (body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_WEB_SITEID_HASHYN : process.env.KR_OB_PASS_WEB_SITEID_HASHYN;
        
        console.log('site_cd: ', site_cd)

        var ct_type    = "HAS";
        var ordr_idxx  = body.order_id;

        //up_hash creation signature data
        var hash_data = site_cd + "^" + ct_type + "^" + body.datetime; 

        const privateKeyObj = createPrivateKeyObject(
            (body.env == 'dev') ? process.env.TEMP_KR_OB_PASS_PVT_CERT : process.env.KR_OB_PASS_PVT_CERT ,
            (body.env == 'dev') ? process.env.TEMP_KR_OB_PASS_PVT_CERT_KEY_PASS : process.env.KR_OB_PASS_PVT_CERT_KEY_PASS ,
        )

        // Generate signature data using KeyObject
        const signer = crypto.createSign('sha256')
        signer.update(hash_data)
        signer.end()
        const kcp_sign_data = signer.sign(privateKeyObj, 'base64')

        // Required data for up_hash creation process refer to KCP API document page# 13/27 
        var req_data = {
                  site_cd: site_cd,
            kcp_cert_info: (body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_PUB_CERT : process.env.KR_OB_PASS_PUB_CERT,
                ordr_idxx: ordr_idxx,
                  ct_type: ct_type,
               web_siteid: web_siteid,
              make_req_dt: body.datetime,
            kcp_sign_data: kcp_sign_data
        };

        console.log('req_data: ', req_data)

        // UpHash Key (up_hash) Creation 
        const response = await fetch((body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_CERT_URL : process.env.KR_OB_PASS_CERT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(req_data),
        });

        if (!response.ok) {
            console.error('HTTP error! status: ', response.status);
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            console.log("\n\nPersonal Verification API Data: " + JSON.stringify(data) + "\n\n");
            if (data) {
                return NextResponse.json({
                    api_res_cd: data.res_cd,
                    api_res_msg: data.res_msg,
                    site_cd: site_cd,
                    ordr_idxx: ordr_idxx,
                    req_tx: "cert",
                    cert_method: "01",
                    api_res_up_hash: data.up_hash,
                    cert_otp_use: "Y",
                    web_siteid_hashYN: web_siteid_hashYN,
                    web_siteid: web_siteid,
                    param_opt_1: "opt1",
                    param_opt_2: "opt2",
                    param_opt_3: "opt3",
                    web_site_return_url: (body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_CALLBACK_URL_KR : process.env.KR_OB_PASS_CALLBACK_URL_KR,
                    cert_enc_use_ext: "Y",
                    api_res_kcp_merchant_time: data.kcp_merchant_time,
                    api_res_kcp_cert_lib_ver: data.kcp_cert_lib_ver,
                    kcp_page_submit_yn: "Y",
                    pass_form_url: (body.env.trim() === 'dev') ? process.env.TEMP_KR_OB_PASS_FORM_URL : process.env.KR_OB_PASS_FORM_URL
                }, { status: 200 });
            } else {
                return NextResponse.json({ api_res_msg: 'NotFound' }, { status: 200 });
            }
        }
    }
  } catch (error) {
    console.error('Error:', error?.response?.data || error?.message)
    console.log(error);
    return NextResponse.json({api_res_msg: 'An error occurred while verifying ownership'}, { status: 500 });
  }
}

