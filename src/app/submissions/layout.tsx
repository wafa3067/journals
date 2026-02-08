"use client";
import { useRouter } from "next/navigation";
import HorizontalBar from "../(main)/components/horizontal_bar";
import React from "react";
import FirstHeader from "../(main)/pages/first_header";
import CustomText from "../(main)/components/custom_text";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineArrowBack } from "react-icons/md";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { updateTab } from "../api/providers/tab_bar";
import { checkAllBeginFieldsFilled } from "../api/slice/beginSlice";
import { AlertCircle } from "lucide-react";

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const tab = useAppSelector((state) => state.tab);
  const router = useRouter();

  const Navigate = (route: any) => {
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
