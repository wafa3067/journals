"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchArchiveArticles } from "@/app/api/slice/archiveSlice";
import { selectArticles } from "@/app/api/selectors/archiveSelectors";
import CustomText from "@/app/(main)/components/custom_text";
import Articles from "@/app/(main)/components/article";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { GetSelectorArticle } from "../archive/[year]/[month]/page";

export default function CurrentMonthPage() {
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
    setFiltered(filteredArticles);
  }, [articles]);
  if (!filtered.length)
    return (
      <p className="p-6">
        No articles found for {2026}/{1}
      </p>
    );

  return (
    <div className="p-6">
      <div className=" shadow-sm rounded-2xl p-5">
        <Image
          className="h-[200px] w-[200px]"
          src={"/images/logoos.png"}
          height={100}
          width={70}
          objectFit="cover"
          alt={"no image"}
        />
        <h1 className="text-2xl font-bold mb-4">
          Vol {2026}/{1}
        </h1>
      </div>

      <ul className="space-y-4">
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
      </ul>
    </div>
  );
}
