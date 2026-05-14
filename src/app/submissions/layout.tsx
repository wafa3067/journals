"use client";
import { useRouter } from "next/navigation";
import HorizontalBar from "../(main)/components/horizontal_bar";
import React from "react";
import CustomText from "../(main)/components/custom_text";
import { MdOutlineArrowBack } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useAppSelector } from "../api/hooks/hooks";

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tab = useAppSelector((state) => state.tab);
  const router = useRouter();

  const Navigate = (route: string) => {
    router.push(route);
  };
  return (
    <div className="md:min-h-screen bg-gray-50 ">
      <div className="flex flex-col h-50">
        {/* dashboard header */}
        <div className=" p-5 flex flex-row justify-between items-center   pb-4 border-b border-gray-300 bg-[#00b4d8] mb-10 w-full">
          <div className="flex flex-row  items-center">
            <MdOutlineArrowBack
              color="white"
              size={40}
              onClick={() => Navigate("/dashboard")}
            />
          </div>
          <CustomText
            text={" Submit a New Article "}
            style={" text-sm md:text-3xl font-normal text-white"}
          />

          <TbLayoutDashboardFilled size={40} color="white" />
        </div>
        <div className="flex flex-row  items-center justify-center ">
          <HorizontalBar
            className="md:w-full md:max-w-5xl rounded-2xl "
            current={tab.selectedTab}
          />
        </div>
      </div>
      <div className="bg-gray-50 items-center justify-center ">{children}</div>
    </div>
  );
}
