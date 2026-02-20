"use client";
import React, { useEffect, useState } from "react";
import Articles from "../components/article";
import CustomText from "../components/custom_text";
import Journals from "../components/journals";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { selectArticles } from "@/app/api/selectors/archiveSelectors";
import { fetchArchiveArticles } from "@/app/api/slice/archiveSlice";
import { useRouter } from "next/navigation";
import { GetSelectorArticle } from "../archive/[year]/[month]/page";

const Page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const articles = useAppSelector(selectArticles);
  const [filtered, setFiltered] = useState<GetSelectorArticle[]>([]);

  // Fetch all articles if not loaded
  useEffect(() => {
    dispatch(fetchArchiveArticles());
  }, [dispatch]);

  // Filter articles for this year/month
  useEffect(() => {
    const filteredArticles = articles.filter((article) => {
      if (!article.createdAt) return false;
      const [y, m] = article.createdAt.split("-");
      return y === "2026" && m === "01";
    });
    console.log("Filtered articles for", filteredArticles);
    setFiltered(filteredArticles);
  }, [articles]);
  if (!filtered.length)
    return (
      <p className="p-6">
        No articles found for {2026}/{1}
      </p>
    );

  return (
    <div className="w-[100%]">
      <CustomText
        style={
          "text-gray-500 border-b-4 border-b-[#f7bc49] font-bold  text-2xl  m-2 w-fit mb-5"
        }
        text={"Current Issue"}
      />
      <CustomText
        style={"text-black  font-bold  text-2xl  m-2 w-fit"}
        text={"Vol. 18 No. 2 (2025): Vol18 No2 2025"}
      />
      <Journals
        img="/images/bg.jpg"
        date="15-12-2025"
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

            const encodedPdfData = encodeURIComponent(article.pdfUrl); // Encode the pdfData
            router.push(`/viewpdf/${encodedPdfData}`); // Navigate to the URL with encoded data
          }}
          pdfUrl={article.pdfUrl}
          key={article.id}
          style1={"font-bold text-[#4b7d92]"}
          style2={"text-black w-[90%]"}
          title1={article.title}
          title12={article.subtitle}
          // cited={"123-130"}
        />
      ))}
    </div>
  );
};

export default Page;
