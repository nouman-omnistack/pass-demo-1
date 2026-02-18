// app/testButtonPage/page.js
'use client'
import PASSButtonLink from '../components/passButtonLink';
import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from "next/link";

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
    <div style={{ display: "flex", width:'500px' }}>
      <div style={{ flex: 1, backgroundColor: "white", padding: "20px" }}>
        <Link href="/"><Image
          src="/slogo.png"
          alt="Storhub"
          width={100}
          height={55}
          priority
        /></Link>
      </div>
      <div style={{ flex: 1, backgroundColor: "white", padding: "20px" }}>
       <Image
          src="/plogo.png"
          alt="Storhub"
          width={100}
          height={40}
          priority
        />
      </div>
    </div>

      {(orderID != "") && (
        <div style={{ padding: '20px'}}>
    
        <p>Test with <b>Production/Live</b> Environment  variables</p><br></br>

        <PASSButtonLink 
          href="#" 
          text="Personal Verification (with PASS) "
          order_id={"" + orderID + ""}
          env={"prod"}
        />
          
        </div>
      )}
    </>
  );
}
