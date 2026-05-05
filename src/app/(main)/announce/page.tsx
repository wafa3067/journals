// Example usage in a parent component
"use client";
import React, { useEffect } from "react";
import NewsCard from "../components/news_card";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { getAnnouncementData } from "@/app/admin/adminSlice/announcement/getAnnouncementSlice";
import CircularLoading from "../components/circular_loadinng";

const NewsFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { getAnnounce, loading } = useAppSelector(
    (state) => state.getAnnouncement,
  );

  useEffect(() => {
    dispatch(getAnnouncementData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getAnnounce || getAnnounce.length === 0) {
    return <div className="text-center mt-10">No announcements available.</div>;
  }
  return (
    <div className="space-y-6">
      <CustomText
        text={"Announcements"}
        style={"pl-5 text-2xl font-bold pt-5"}
      />
      {getAnnounce.map((announce, index) => (
        <NewsCard
          key={index}
          date={announce.date}
          link={announce.link}
          title={announce.title}
          description={announce.descriptions}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
