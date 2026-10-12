import React from "react";
import Sidebar from "./dashboard/sidebar";

export default function RecevierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen ">
      <div className="w-64 q">
        <Sidebar />
      </div>

      <main className="min-w-0 flex-1 bg-[#f8fafc] mr-[200px]">{children}</main>
    </div>
  );
}
