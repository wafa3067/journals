"use client";
import React from "react";
import AdminSidebar from "./components/adminsidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden font-inter bg-gray-50 text-gray-900 ">
      <div className="max-h-max  w-[300px]">
        <AdminSidebar />
      </div>
      <div className="w-full  ">{children}</div>
    </div>
  );
}
