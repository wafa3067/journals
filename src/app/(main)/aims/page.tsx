"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { GetAims } from "@/app/admin/adminSlice/aims/getAims";

function Aims() {
  const dispatch = useAppDispatch();
  const { aims, loading, success } = useAppSelector((state) => state.getAims);
  useEffect(() => {
    dispatch(GetAims());
  }, [dispatch]);
  if (loading && !success) {
    return <div>Loading...</div>;
  }
  if (aims.length === 0) {
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
    <div className=" p-8  ">
      {aims.map((contact) => (
        <div key={contact.id}>
          <CustomText text={contact.title} style="font-bold text-lg mb-2" />
          {contact.bulletsPoints == true ? (
            <li className="ml-5 mb-0 p-0">{contact.descriptions}</li>
          ) : (
            <CustomText style="mb-2" text={contact.descriptions} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Aims;
