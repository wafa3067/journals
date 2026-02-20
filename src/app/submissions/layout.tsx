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
      <div className="items-center justify-center flex flex-col h-[200px]">
        {/* dashboard header */}
        <div className=" p-5 flex flex-row justify-between items-center  pt-4 pb-4 border-b border-gray-300 bg-white mb-10 w-full">
          <div className="flex flex-row  items-center">
            <MdOutlineArrowBack
              size={40}
              onClick={() => Navigate("/dashboard")}
            />
          </div>
          <CustomText
            text={" Submit a New Article "}
            style={"md:text-3xl font-normal "}
          />
          <TbLayoutDashboardFilled size={40} />
        </div>
        <HorizontalBar
          className="md:w-full md:max-w-5xl rounded-2xl "
          current={tab.selectedTab}
        />
      </div>
      <div className="bg-gray-50">{children}</div>
    </div>
  );
}
