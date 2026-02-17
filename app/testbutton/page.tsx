// app/testButtonPage/page.js
'use client'

import PASSButtonLink from '../components/passButtonLink';

import { useState, useEffect } from 'react';

export default function TestPage() {

const [orderID, setOrderID] = useState(0);

  useEffect(() => {
      
      if (orderID !== 0) return;

      var today = new Date();
      var year  = today.getFullYear();
      var month = today.getMonth() + 1;
      var date  = today.getDate();
      var time  = today.getTime();

      if (parseInt(month) < 10){
          month = "0" + month;
      }
      var test_order_id = year + "" + month + "" + date + "" + time;
      setOrderID(test_order_id);
  }, [orderID]);

  return (
    <>
      {(orderID != 0) && (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <PASSButtonLink 
            href="#" 
            text="Personal Verification (with PASS) "
            order_id={"" + orderID + ""}
          />
        </div>
      )}
    </>
  );
}
