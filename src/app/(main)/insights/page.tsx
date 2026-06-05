"use client";
import React, { use, useEffect } from "react";
import Aims from "../aims/page";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { getJournals } from "@/app/admin/adminSlice/journals/getJournals";
import CustomText from "../components/custom_text";

function Page() {
  const dispatch = useAppDispatch();
  const { insight, loading, success } = useAppSelector(
    (state) => state.getJournals,
  );
  useEffect(() => {
    dispatch(getJournals());
  }, [dispatch]);
  if (loading && !success) {
    return <div>Loading...</div>;
  }
  if (insight.length === 0) {
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
    <div className="p-5">
      {insight.map((contact) => (
        <div key={contact.id} className="">
          <CustomText style="font-bold text-lg mb-2" text={contact.title} />
          {contact.bulletsPoints == true ? (
            <li className="mb-2 ml-5">{contact.descriptions}</li>
          ) : (
            <CustomText style="mb-2" text={contact.descriptions} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Page;
