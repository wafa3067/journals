import React from "react";
import Sidebar from "./sidebar/sidebar";

export default function RecevierLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden font-inter bg-gray-50 text-gray-900 flex-col md:flex-row ">
      <div className="md:max-h-max  md:w-75">
        <Sidebar />
      </div>
      <div className="w-full  ">{children}</div>
    </div>
  );
}
