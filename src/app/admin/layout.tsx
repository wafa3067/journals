"use client";
import { useRouter } from "next/navigation";
import HorizontalBar from "../(main)/components/horizontal_bar";
import React, { useEffect } from "react";
import CustomText from "../(main)/components/custom_text";
import { MdOutlineArrowBack } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
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
