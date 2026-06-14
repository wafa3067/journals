"use client";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { getPrivacyInsights } from "@/app/admin/adminSlice/privacy/getPrivacy";
const Page = () => {
  const dispatch = useAppDispatch();
  const { Privacy, loading, success } = useAppSelector(
    (state) => state.getPrivacy,
  );

  useEffect(() => {
    dispatch(getPrivacyInsights());
    // Fetch contact data when the component mounts
  }, []);

  if (loading && !success) {
    return <div>Loading...</div>;
  }
  if (Privacy.length === 0) {
    return (
      <div style={{ width: "100%" }} className=" p-5">
        <CustomText
          text="No data found"
          style="text-center text-lg font-bold"
        />
      </div>
    );
  }
  return (
    <div className="m-4 md:m-6">
      {Privacy.map((val, index) => (
        <div key={index}>
          <CustomText text={val.title} style="font-bold text-lg mb-2" />
          <CustomText text={val.descriptions} style=" mb-2" />
        </div>
      ))}
    </div>
  );
};

export default Page;
