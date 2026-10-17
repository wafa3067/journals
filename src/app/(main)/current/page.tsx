"use client";
import React, { useEffect, useState } from "react";
import Articles from "../components/article";
import CustomText from "../components/custom_text";
import Journals from "../components/journals";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { selectArticles } from "@/app/api/selectors/archiveSelectors";
import {
  ArchiveArticle,
  Contributor,
  fetchArchiveArticles,
} from "@/app/api/slice/archiveSlice";
import { useRouter } from "next/navigation";
import { GetSelectorArticle } from "../archive/[year]/[month]/page";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const articles = useAppSelector(selectArticles);
  const [filtered, setFiltered] = useState<ArchiveArticle[]>([]);

  // Fetch all articles if not loaded
  useEffect(() => {
    dispatch(fetchArchiveArticles());
  }, [dispatch]);
  const currentYear = new Date().getFullYear();
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

  const datePath = `${currentYear}/${currentMonth}/`; // Months are 0-indexed

  // Filter articles for this year/month
  useEffect(() => {
    const filteredArticles: ArchiveArticle[] = articles
      .filter((article) => article.createdAt) // must have createdAt
      .filter((article) => {
        const [y, m] = article.createdAt!.split("-");
        return y === `${currentYear}` && m === `${currentMonth}`;
      })
      .map((article) => article);

    setFiltered(filteredArticles);
  }, [articles, currentMonth, currentYear]);

  if (!filtered.length)
    return <p className="p-6">No articles found for {datePath}</p>;
  return (
    <div className="w-[100%]">
      <CustomText
        style={
          "text-gray-500 border-b-4 border-b-[#0096c7] font-bold  text-2xl  m-2 w-fit mb-5"
        }
        text={"Current Issue"}
      />
      <CustomText
        style={"text-black  font-bold  text-2xl  m-2 w-fit"}
        text={`Vol. ${currentMonth} No. ${currentMonth} (${currentYear})`}
      />
      <Journals
        img="/images/logoos.png"
        date={`${currentMonth} (${currentYear})`}
        image_style={"w-[250px]"}
      />
      <CustomText
        style={"text-gray-400  font-bold  text-2xl  m-2 w-fit"}
        text={"Articles"}
      />
      {filtered.map((article) => (
        <Articles
          onClick={() => {
            // Assuming the handleClick function is inside a component
            if (article.pdf != null) {
              const encodedPdfData = encodeURIComponent(article.pdf); // Encode the pdfData
              router.push(`/viewpdf/${encodedPdfData}`);
            }
            // Navigate to the URL with encoded data
          }}
          pdfUrl={article.pdf}
          key={article.id}
          style1={"font-bold text-[#4b7d92]"}
          style2={"text-black w-[90%]"}
          title1={article.title}
          title12={`${article.contributorsList.map((v) => `${v.name.toUpperCase()} ` + "")}`}

          // cited={"123-130"}
        />
      ))}
    </div>
  );
};

export default Page;
