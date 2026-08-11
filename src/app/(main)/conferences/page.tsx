"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import CircularLoading from "../components/circular_loadinng";
import NewsCard from "../components/news_card";
import { getConferencesData } from "@/app/admin/adminSlice/conferences/conferencesGetSlice";

const ConferencesFeed = () => {
  const dispatch = useAppDispatch();
  const { getConferences, loading } = useAppSelector(
    (state) => state.getConferences,
  );

  useEffect(() => {
    dispatch(getConferencesData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getConferences || getConferences.length === 0) {
    return <div className="text-center mt-10">No Conferences available.</div>;
  }

  return (
    <div>
      <CustomText
        text="Professional Development > Conferences"
        style="p-5 text-sm "
      />
      {getConferences.map((Conferences, index) => (
        <NewsCard
          img={Conferences.image}
          key={index}
          date={Conferences.date}
          title={Conferences.title}
          link={Conferences.link}
          description={Conferences.descriptions}
        />
      ))}
    </div>
  );
};

export default ConferencesFeed;
