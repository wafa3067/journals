"use client";
import React, { useEffect } from "react";
import NewsCard from "../components/news_card";
import CustomText from "../components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { getNewsData } from "@/app/admin/adminSlice/news/newsGetSlice";
import CircularLoading from "../components/circular_loadinng";

const NewsFeed = () => {
  const dispatch = useAppDispatch();
  const { getNews, loading } = useAppSelector((state) => state.getNews);

  useEffect(() => {
    dispatch(getNewsData());
  }, [dispatch]);

  if (loading) {
    return <CircularLoading />;
  }

  if (!getNews || getNews.length === 0) {
    return <div className="text-center mt-10">No news available.</div>;
  }

  return (
    <div>
      <CustomText
        text="Professional Development > Awards"
        style="p-5 text-sm "
      />
      {getNews.map((news, index) => (
        <NewsCard
          img={news.image}
          key={index}
          date={news.date}
          title={news.title}
          link={news.link}
          description={news.descriptions}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
