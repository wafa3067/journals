"use client";
import { useEffect } from "react";
import MainBody from "./pages/main_body";
import TokenChecker from "./components/token_checker";

export default function Home() {
  useEffect;
  return (
    <div>
      <TokenChecker />
      <MainBody />;
    </div>
  );
}
