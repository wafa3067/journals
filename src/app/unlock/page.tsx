"use client";

import { useEffect } from "react";
import { BACKEND_URL } from "../api/actions/articleActions";

export default function UnlockPage() {
  const unlockSite = async () => {
    await fetch(`${BACKEND_URL}/api/system/unlock`, {
      method: "POST",
    });

    window.location.href = "/";
  };

  useEffect(() => {
    unlockSite();
  }, []);
  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      <h1>🔓 Unlock Website</h1>

      <button onClick={unlockSite}>Unlock Global Access</button>
    </div>
  );
}
