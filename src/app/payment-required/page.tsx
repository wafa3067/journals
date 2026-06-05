"use client";

import { use, useEffect } from "react";
import { BACKEND_URL } from "../api/actions/articleActions";

export default function PaymentRequired() {
  const lockSite = async () => {
    const res = await fetch(`${BACKEND_URL}/api/system/lock`, {
      method: "POST",
    });
  };

  useEffect(() => {
    lockSite();
  }, []);
  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>🚫 Payment Required</h1>
      <p>Site will be locked globally when activated.</p>

      <button onClick={lockSite}>Activate Global Lock</button>
    </div>
  );
}
