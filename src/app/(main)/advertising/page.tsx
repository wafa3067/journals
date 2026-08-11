"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import CircularLoading from "../components/circular_loadinng";
import NewsCard from "../components/news_card";
import { getAdvertisingData } from "@/app/admin/adminSlice/advertising/advertisingGetSlice";

const AdvertisingFeed = () => {
  const dispatch = useAppDispatch();
  const { getAdvertising, loading } = useAppSelector(
    (state) => state.getAdvertising,
  );

  useEffect(() => {
    dispatch(getAdvertisingData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getAdvertising || getAdvertising.length === 0) {
    return <div className="text-center mt-10">No Advertising available.</div>;
  }

  return (
    <div>
      <CustomText
        text="Advertising & Services > Advertising"
        style="p-5 text-sm "
      />
      {getAdvertising.map((Advertising, index) => (
        <NewsCard
          img={Advertising.image}
          key={index}
          date={Advertising.date}
          title={Advertising.title}
          link={Advertising.link}
          description={Advertising.descriptions}
        />
      ))}
    </div>
  );
};

export default AdvertisingFeed;
