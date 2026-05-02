"use client";

import { AboutHomeGetPage } from "@/app/admin/adminSlice/home/GetHomeAboutSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect } from "react";

const AboutPage = () => {
  const dispatch = useAppDispatch();

  const { about, success } = useAppSelector((state) => state.homeGet);
  useEffect(() => {
    dispatch(AboutHomeGetPage());
  }, [AboutHomeGetPage, dispatch]);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 w-[100%]">
      {/* Breadcrumb */}

      {/* Content */}
      <div className="   space-y-8  ">
        {success === false ? (
          <p>Loading...</p>
        ) : (
          about.map((item, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {item.title}
              </h2>
              <p>{item.descriptions}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutPage;
