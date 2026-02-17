// app/testButtonPage/page.js
'use client'

import PASSButtonLink from '../components/passButtonLink';

import { useState, useEffect } from 'react';

export default function TestPage() {

const [selected, setSelected] = useState("dev");
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
        <div style={{ padding: '20px'}}>

        <div className="flex justify-center space-x-4">
          <div className="bg-blue-300 p-6"><input type="radio" value="dev" checked={selected === "dev"} onChange={(e) => setSelected(e.target.value)} /> DEV </div>
          <div className="bg-green-300 p-6"><input type="radio" value="live" checked={selected === "live"} onChange={(e) => setSelected(e.target.value)} /> Live/STAG </div>
        </div>

        <br/><p>Selected: {selected}</p><br/><br/>

        <PASSButtonLink 
          href="#" 
          text="Personal Verification (with PASS) "
          order_id={"" + orderID + ""}
          env={"" + selected + ""}
        />
          
        </div>
      )}
    </>
  );
}
