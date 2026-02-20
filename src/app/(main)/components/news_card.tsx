import React from "react";

interface NewsCardProps {
  date: string;
  title: string;
  description: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ date, title, description }) => {
  return (
    <div className=" p-6   w-full mx-auto mb-1">
      <div className="text-gray-600 text-sm mb-2">{date}</div>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h2>
      <p className="text-gray-700">{description}</p>

      <a
        href="http://www.google.com"
        className="text-blue-500 hover:underline mt-4 inline-block"
      >
        Read more
      </a>
    </div>
  );
};

export default NewsCard;
