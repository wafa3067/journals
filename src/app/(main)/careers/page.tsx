"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import CircularLoading from "../components/circular_loadinng";
import { getCareersData } from "@/app/admin/adminSlice/careers/careersGetSlice";
import NewsCard from "../components/news_card";

const CareersFeed = () => {
  const dispatch = useAppDispatch();
  const { getCareers, loading } = useAppSelector((state) => state.getCareers);

  useEffect(() => {
    dispatch(getCareersData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getCareers || getCareers.length === 0) {
    return <div className="text-center mt-10">No Careers available.</div>;
  }

  return (
    <div>
      <CustomText
        text="Professional Development > Careers"
        style="p-5 text-sm "
      />
      {getCareers.map((Careers, index) => (
        <NewsCard
          img={Careers.image}
          key={index}
          date={Careers.date}
          title={Careers.title}
          link={Careers.link}
          description={Careers.descriptions}
        />
      ))}
    </div>
  );
};

export default CareersFeed;
