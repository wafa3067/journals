"use client";
import React, { Component, useEffect } from "react";
import CustomText from "./custom_text";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/api/hooks/hooks";
import {
  fetchTotalArticles,
  fetchPendingArticles,
  fetchApprovedArticles,
} from "@/app/api/slice/fetchArticaleCount";

type Props = {};

const SideBar = (props: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTotalArticles());
    dispatch(fetchPendingArticles());
    dispatch(fetchApprovedArticles());
  }, [dispatch]);
  return (
    <div className="pl-10 gap-1 bg-gray-50 border-l-2 border-l-gray-200 ">
      <CustomText
        style={
          "text-black border-b-4 border-b-[#f7bc49] font-bold  text-2xl  m-2"
        }
        text={"INFORMATION"}
      />
      <CustomText style={"text-[#4b7d92] p-2"} text={"For Readers"} />
      <CustomText style={"text-[#4b7d92] p-2"} text={"For Authors"} />
      <CustomText style={"text-[#4b7d92] p-2"} text={"For Librarians"} />
      <CustomText
        style={
          "text-[#4b7d92] p-1 bg-[#000] hover:bg-amber-500 text-white rounded-sm  w-fit mt-20 cursor-pointer"
        }
        onTap={() => {
          router.push("/dashboard");
        }}
        text={"Make a submission"}
      />
    </div>
  );
};

export default SideBar;
