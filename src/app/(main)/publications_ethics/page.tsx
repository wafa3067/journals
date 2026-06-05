"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import SubmissionsPage from "../aboutsubmissions/page";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { getPublicationInsights } from "@/app/admin/adminSlice/publications/getPublications";
import { RxValue } from "react-icons/rx";

const PublicationEthics = () => {
  const dispatch = useAppDispatch();
  const { publication, loading, success } = useAppSelector(
    (state) => state.getPublications,
  );
  useEffect(() => {
    dispatch(getPublicationInsights());
  }, []);
  const bulits = [
    "ensuring that all appropriate contributors are included as co-authors",
    "verifying that all co-authors have reviewed and approved the manuscript",
    "managing communication with the editorial office and reviewers",
    "ensuring compliance with journal policies on behalf of the author group",
  ];

  if (loading && !success) {
    return <div>Loading...</div>;
  }
  if (publication.length === 0) {
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
    <div style={{ width: "100%" }} className=" p-5">
      {publication.map((val, index) => (
        <div key={index}>
          <CustomText text={val.title} style="font-bold text-lg  mb-2 " />
          {val.bullets == true ? (
            <li className="mb-2 ml-5">{val.descriptions}</li>
          ) : (
            <CustomText text={val.descriptions} style="mb-2" />
          )}
        </div>
      ))}
    </div>
  );
};

export default PublicationEthics;
