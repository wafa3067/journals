// Example usage in a parent component

import React from "react";
import NewsCard from "../components/news_card";
import CustomText from "../components/custom_text";

const NewsFeed: React.FC = () => {
  const newsData = [
    {
      date: "3 February 2017",
      title: "Join the Physics community on Mendeley!",
      description:
        "Exchange knowledge and resources with the Physics community by having deeper level conversations on the two new discussion forums on Mendeley.",
    },
    {
      date: "5 February 2017",
      title: "New Research in Quantum Physics Released!",
      description:
        "A groundbreaking paper on quantum entanglement and its implications on modern computing has just been released.",
    },
  ];

  return (
    <div className="">
      <CustomText text={"News"} style={"pl-5 text-2xl font-bold"} />
      {newsData.map((news, index) => (
        <NewsCard
          key={index}
          date={news.date}
          title={news.title}
          description={news.description}
        />
      ))}
    </div>
  );
};

export default NewsFeed;
