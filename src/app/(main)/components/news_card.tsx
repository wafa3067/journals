import { BACKEND_URL } from "@/app/api/actions/articleActions";
import React from "react";

interface NewsCardProps {
  date: string;
  img?: string;
  title: string;
  description: string;
  link?: string;
  deleteHandler?: () => void;
  deleteButton?: boolean;
}

const NewsCard: React.FC<NewsCardProps> = ({
  date,
  title,
  description,
  link,
  deleteButton = false,
  deleteHandler,
  img,
}) => {
  const safeLink = link
    ? link.startsWith("http")
      ? link
      : `https://${link}`
    : "https://www.google.com";

  return (
    <div className="w-full mx-auto mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-md md:p-6">
      <div className="flex flex-col-reverse gap-5 md:flex-row md:items-start md:gap-8">
        {/* Left Side: Content */}
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="mb-3 text-sm font-medium text-blue-800">{date}</p>

          <h2 className="mb-3 text-xl font-bold leading-snug text-gray-900 md:text-2xl">
            {title}
          </h2>

          <p className="text-sm leading-7 text-gray-600 md:text-base">
            {description}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href={safeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-lg bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
            >
              Read more
              <span className="ml-2" aria-hidden="true">
                →
              </span>
            </a>

            {deleteButton && (
              <button
                type="button"
                onClick={deleteHandler}
                className="rounded-lg border border-red-200 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Image */}

        {/* Right Side: Image */}
        {img && (
          <div className="shrink-0 md:w-64 lg:w-72 ">
            <img
              src={`${BACKEND_URL}${img}`}
              alt={title}
              className="h-48 w-full rounded-lg object-cover md:h-44 lg:h-48"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
