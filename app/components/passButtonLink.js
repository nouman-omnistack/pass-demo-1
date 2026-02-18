// app/components/passButtonLink.js
'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCurrentDate, authTypeCheck } from '../utilities/funUtilities';

export default  function PASSButtonLink({ href, text, order_id, env }) {

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isPASS, setIsPASS] = useState(false);
  const [formData, setRequestFormData] = useState({
                site_cd: "",
              ordr_idxx: "",
                 req_tx: "cert",
            cert_method: "01",
                up_hash: "",
           cert_otp_use: "Y",
      web_siteid_hashYN: "",
             web_siteid: "",
            param_opt_1: "opt1",
            param_opt_2: "opt2",
            param_opt_3: "opt3",
                ret_url: "",
       cert_enc_use_ext: "Y",
      kcp_merchant_time: "",
       kcp_cert_lib_ver: "",
     kcp_page_submit_yn: "",
                 res_cd: "",
                res_msg: "",
          pass_form_url: ""
  });

  // Update input values as user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Get current date-time as Request DateTime
  var current_datetime = getCurrentDate();
    
  // Function to fetch data from the API route
  const fetchData = async () => {
    try {
      // Make a POST request to the API route with Order ID and Request DateTime
      const apiResp = await fetch('/api/get-pass-uphash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id: order_id, datetime: current_datetime, env: env }),
      }); 

      console.log('apiResp.status: ', apiResp.status)
      // Parse the response
      if (apiResp.status == 500) {

          const resData = await apiResp.json();
          setError(resData.api_res_msg);

      } else if (apiResp.status == 200) {

          const resData = await apiResp.json();
          if (resData.api_res_msg == "NotFound") {
              setError("Alert! Personal Verification Data Not Found.");
          } else {

            console.log('resData: ', resData)

            setResponse('[ SiteCode: ' + resData.site_cd + ' ] - ' + resData.api_res_cd + ' - ' + resData.api_res_msg);

            if (resData.api_res_cd == "0000" && resData.api_res_up_hash != "") {
                setError(null);

                setRequestFormData({
                             res_cd: resData.api_res_cd,
                            res_msg: resData.api_res_msg,
                            site_cd: resData.site_cd,
                          ordr_idxx: resData.ordr_idxx,
                             req_tx: resData.req_tx,
                        cert_method: resData.cert_method,
                            up_hash: resData.api_res_up_hash,
                       cert_otp_use: resData.cert_otp_use,
                  web_siteid_hashYN: resData.web_siteid_hashYN,
                         web_siteid: resData.web_siteid,
                        param_opt_1: resData.param_opt_1,
                        param_opt_2: resData.param_opt_2,
                        param_opt_3: resData.param_opt_3,
                            ret_url: resData.web_site_return_url,
                   cert_enc_use_ext: resData.cert_enc_use_ext,
                  kcp_merchant_time: resData.api_res_kcp_merchant_time,
                   kcp_cert_lib_ver: resData.api_res_kcp_cert_lib_ver,
                 kcp_page_submit_yn: resData.kcp_page_submit_yn,
                      pass_form_url: resData.pass_form_url
                });

               setTimeout(() => {
                  authTypeCheck();
               }, 500);
            }
          }
        
      } else {
        console.log("API Resp: " , apiResp);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
 
  const styles = {
    button: {
      display: 'inline-block',
      padding: '20px 30px',
      backgroundColor: isPASS ? '#00AA3A' : '#FF3A4A', 
      color: '#fff',
      borderRadius: '5px',
      textAlign: 'center',
      textDecoration: 'none',
      fontSize: '18px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    }
  };

  return (
    <>
      <Link 
        href={href} 
        style={styles.button}
        onClick={() => { fetchData(); }}     // Fetch data on click
      >
        {text}
      </Link>

      {error && (
        <div style={{ color: 'red',  padding: '10px' }}> { error } </div>
      )}

      {response && (
        <div>
         <br/><br/>
         <div style={{ padding: '10px' }}>
          <h3>API Response: </h3>
          <p>{response} </p>
         </div>

         <form name="form_auth" method="post" action={formData.pass_form_url}>
            <input type="text" name="ordr_idxx" value={formData.ordr_idxx} onChange={handleChange} />
            <input type="text" name="up_hash" value={formData.up_hash} onChange={handleChange} />
            <input type="text" name="req_tx" value={formData.req_tx} onChange={handleChange} />

            {/* Request Classification */}
            <input type="text" name="cert_method" value={formData.cert_method} onChange={handleChange} />
            <input type="text" name="web_siteid" value={formData.web_siteid} onChange={handleChange} /> 
            <input type="text" name="site_cd" value={formData.site_cd} onChange={handleChange} />
            <input type="text" name="Ret_URL" value={formData.ret_url} onChange={handleChange} />

            {/* cert_otp_use required (refer to the manual) Y : Personal verification + OTP verification */}
            <input type="text" name="cert_otp_use" value={formData.cert_otp_use} onChange={handleChange} />
			
            {/* Enhanced return encryption */}
            <input type="text" name="cert_enc_use_ext" value={formData.cert_enc_use_ext} onChange={handleChange} />
            <input type="text" name="res_cd" value={formData.res_cd} onChange={handleChange} />
            <input type="text" name="res_msg" value={formData.res_msg} onChange={handleChange} />
			
            {/* web_siteid verification */}
            <input type="text" name="web_siteid_hashYN" value={formData.web_siteid_hashYN} onChange={handleChange} />
		        <input type="text" name="kcp_merchant_time" value={formData.kcp_merchant_time} onChange={handleChange} /> 
            <input type="text" name="kcp_cert_lib_ver" value={formData.kcp_cert_lib_ver} onChange={handleChange} />
            
            {/* Merchant optional parameters k(returned upon authentication completion) */}
            <input type="text" name="param_opt_1" value={formData.param_opt_1} onChange={handleChange} /> 
            <input type="text" name="param_opt_2" value={formData.param_opt_2} onChange={handleChange} /> 
            <input type="text" name="param_opt_3" value={formData.param_opt_3} onChange={handleChange} />
			
			      {/* Page transition method Y/N */}
            <input type="text" name="kcp_page_submit_yn" value={formData.kcp_page_submit_yn} onChange={handleChange} />
        </form>

        </div>
      )}

    </>
  );
}
