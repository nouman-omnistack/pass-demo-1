// app/testButtonPage/page.js
'use client'

import PASSButtonLink from '../components/passButtonLink';

import { useState, useEffect } from 'react';

export default function TestPage() {

const [orderID, setOrderID] = useState("");

  useEffect(() => {
      
      if (orderID !== "") return;

      const today = new Date();
      const year  = today.getFullYear();
      let month = String(today.getMonth() + 1);
      const date  = today.getDate();
      const time  = today.getTime();

      if (parseInt(month) < 10){
          month = "0" + month;
      }
      const test_order_id = year + "" + month + "" + date + "" + time;
      setOrderID(test_order_id);
  }, [orderID]);

  return (
    <>
      {(orderID != "") && (
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
