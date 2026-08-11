"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import CircularLoading from "../components/circular_loadinng";
import NewsCard from "../components/news_card";
import { getSerivcesData } from "@/app/admin/adminSlice/services/servicesGetSlice";

const SerivcesFeed = () => {
  const dispatch = useAppDispatch();
  const { getSerivces, loading } = useAppSelector((state) => state.getServices);

  useEffect(() => {
    dispatch(getSerivcesData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getSerivces || getSerivces.length === 0) {
    return <div className="text-center mt-10">No Serivces available.</div>;
  }

  return (
    <div>
      <CustomText
        text="Advertising & Services > Serivces"
        style="p-5 text-sm "
      />
      {getSerivces.map((Serivces, index) => (
        <NewsCard
          img={Serivces.image}
          key={index}
          date={Serivces.date}
          title={Serivces.title}
          link={Serivces.link}
          description={Serivces.descriptions}
        />
      ))}
    </div>
  );
};

export default SerivcesFeed;
