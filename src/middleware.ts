import { NextRequest, NextResponse } from "next/server";
import { BACKEND_URL } from "./app/api/actions/articleActions";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // allow system routes
  if (
    url.pathname === "/payment-required" ||
    url.pathname === "/unlock" ||
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  // 🔥 call Spring Boot
  const res = await fetch(`${BACKEND_URL}/api/system/status`, {
    cache: "no-store",
  });

  const data = await res.json(); // ✅ FIX


  // ✅ correct check
  if (data.locked === true) {
    return NextResponse.redirect(
      new URL("/payment-required", req.url)
    );
  }

  return NextResponse.next();
}