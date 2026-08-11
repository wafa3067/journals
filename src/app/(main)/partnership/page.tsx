"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import CircularLoading from "../components/circular_loadinng";
import NewsCard from "../components/news_card";
import { getPartnershipData } from "@/app/admin/adminSlice/partnership/partnershipGetSlice";

const PartnershipFeed = () => {
  const dispatch = useAppDispatch();
  const { getPartnership, loading } = useAppSelector(
    (state) => state.getPartnership,
  );

  useEffect(() => {
    dispatch(getPartnershipData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getPartnership || getPartnership.length === 0) {
    return <div className="text-center mt-10">No Partnership available.</div>;
  }

  return (
    <div>
      <CustomText
        text="Partnership & Services > Partnership"
        style="p-5 text-sm "
      />
      {getPartnership.map((Partnership, index) => (
        <NewsCard
          img={Partnership.image}
          key={index}
          date={Partnership.date}
          title={Partnership.title}
          link={Partnership.link}
          description={Partnership.descriptions}
        />
      ))}
    </div>
  );
};

export default PartnershipFeed;
