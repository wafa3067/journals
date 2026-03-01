// "use client";

// import { useEffect, useState } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
// import { fetchArchiveArticles } from "@/app/api/slice/archiveSlice";
// import { selectArticles } from "@/app/api/selectors/archiveSelectors";
// import CustomText from "@/app/(main)/components/custom_text";
// import Articles from "@/app/(main)/components/article";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// export interface GetSelectorArticle {
//   id: number;
//   section: string;
//   previousPublished: string;
//   fileType: string;
//   refrencedUrl: string;
//   textStyle: string;
//   textStylic: string;
//   comment: string;
//   copyright: string;
//   privacypolicy: string;
//   pdf: string;
//   status: string;
//   user: string;
//   approvedBy: string;
//   prefix: string;
//   title: string;
//   subtitle: string;
//   underReviewComments: string;
//   abstracts: string;
//   keywords: string;
//   userComments: string;
//   referenceText: string;
//   userProductionComments: string;
//   productionComments: string;
//   createdAt: string;
//   modifyCopyEditor: boolean;
//   modifyProduction: boolean;
//   finalFile: string | null;
//   pdfUrl: string;
// }

// export default function ArchiveMonthPage({
//   params,
// }: {
//   params?: { [key: string]: string };
// }) {
//   const year = params?.year ?? "";
//   const month = params?.month ?? "";
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const articles = useAppSelector(selectArticles);

//   const [filtered, setFiltered] = useState<GetSelectorArticle[]>([]);
//   // const [filtered, setFiltered] = useState<any[]>([]);

//   // Fetch all articles if not loaded
//   useEffect(() => {
//     dispatch(fetchArchiveArticles());
//   }, [dispatch]);

//   // Filter articles for this year/month
//   useEffect(() => {
//     const filteredArticles = articles
//       .filter((article) => article.createdAt) // must have createdAt
//       .filter((article) => {
//         const [y, m] = article.createdAt!.split("-");
//         return y === year && m === month;
//       })
//       .map(
//         (article): GetSelectorArticle => ({
//           id: article.id,
//           section: article.section ?? "",
//           previousPublished: article.previousPublished ?? "",
//           fileType: article.fileType ?? "",
//           refrencedUrl: article.refrencedUrl ?? "",
//           textStyle: article.textStyle ?? "",
//           textStylic: article.textStylic ?? "",
//           comment: article.comment ?? "",
//           copyright: article.copyright ?? "",
//           privacypolicy: article.privacypolicy ?? "",
//           pdf: article.pdf ?? "",
//           pdfUrl: article.pdfUrl ?? "",
//           finalFile: article.finalFile ?? null,
//           status: article.status ?? "",
//           user: article.user ?? "",
//           approvedBy: article.approvedBy ?? "",
//           prefix: article.prefix ?? "",
//           title: article.title ?? "",
//           subtitle: article.subtitle ?? "",
//           underReviewComments: article.underReviewComments ?? "",
//           abstracts: article.abstracts ?? "",
//           keywords: article.keywords ?? "",
//           userComments: article.userComments ?? "",
//           referenceText: article.referenceText ?? "",
//           userProductionComments: article.userProductionComments ?? "",
//           productionComments: article.productionComments ?? "",
//           createdAt: article.createdAt!, // we already filtered undefined
//           modifyCopyEditor: article.modifyCopyEditor,
//           modifyProduction: article.modifyProduction,
//         }),
//       );

//     setFiltered(filteredArticles);
//   }, [articles, year, month]);

//   if (!filtered.length)
//     return (
//       <p className="p-6">
//         No articles found for {year}/{month}
//       </p>
//     );

//   return (
//     <div className="p-6">
//       <div className=" shadow-sm rounded-2xl p-5">
//         <Image
//           className="h-[200px] w-[200px]"
//           src={"/images/logoos.png"}
//           height={100}
//           width={70}
//           objectFit="cover"
//           alt={"no image"}
//         />
//         <h1 className="text-2xl font-bold mb-4">
//           Vol {year}/{month}
//         </h1>
//       </div>

//       <ul className="space-y-4">
//         <CustomText
//           style={"text-gray-400  font-bold  text-2xl  m-2 w-fit"}
//           text={"Articles"}
//         />

//         {filtered.map((article) => (
//           <Articles
//             onClick={() => {
//               // Assuming the handleClick function is inside a component

//               const encodedPdfData = encodeURIComponent(article.pdfUrl); // Encode the pdfData
//               router.push(`/viewpdf/${encodedPdfData}`); // Navigate to the URL with encoded data
//             }}
//             pdfUrl={article.pdfUrl}
//             key={article.id}
//             style1={"font-bold text-[#4b7d92]"}
//             style2={"text-black w-[90%]"}
//             title1={article.title}
//             title12={article.subtitle}
//             // cited={"123-130"}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchArchiveArticles } from "@/app/api/slice/archiveSlice";
import { selectArticles } from "@/app/api/selectors/archiveSelectors";
import CustomText from "@/app/(main)/components/custom_text";
import Articles from "@/app/(main)/components/article";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

export interface GetSelectorArticle {
  id: number;
  section: string;
  previousPublished: string;
  fileType: string;
  refrencedUrl: string;
  textStyle: string;
  textStylic: string;
  comment: string;
  copyright: string;
  privacypolicy: string;
  pdf: string;
  status: string;
  user: string;
  approvedBy: string;
  prefix: string;
  title: string;
  subtitle: string;
  underReviewComments: string;
  abstracts: string;
  keywords: string;
  userComments: string;
  referenceText: string;
  userProductionComments: string;
  productionComments: string;
  createdAt: string;
  modifyCopyEditor: boolean;
  modifyProduction: boolean;
  finalFile: string | null;
  pdfUrl: string;
}

export default function ArchiveMonthPage() {
  const params = useParams(); // ✅ Use Next.js hook instead of props
  const year = params?.year ?? "";
  const month = params?.month ?? "";

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
    const filteredArticles = articles
      .filter((article) => article.createdAt)
      .filter((article) => {
        const [y, m] = article.createdAt!.split("-");
        return y === year && m === month;
      })
      .map(
        (article): GetSelectorArticle => ({
          id: article.id,
          section: article.section ?? "",
          previousPublished: article.previousPublished ?? "",
          fileType: article.fileType ?? "",
          refrencedUrl: article.refrencedUrl ?? "",
          textStyle: article.textStyle ?? "",
          textStylic: article.textStylic ?? "",
          comment: article.comment ?? "",
          copyright: article.copyright ?? "",
          privacypolicy: article.privacypolicy ?? "",
          pdf: article.pdf ?? "",
          pdfUrl: article.pdfUrl ?? "",
          finalFile: article.finalFile ?? null,
          status: article.status ?? "",
          user: article.user ?? "",
          approvedBy: article.approvedBy ?? "",
          prefix: article.prefix ?? "",
          title: article.title ?? "",
          subtitle: article.subtitle ?? "",
          underReviewComments: article.underReviewComments ?? "",
          abstracts: article.abstracts ?? "",
          keywords: article.keywords ?? "",
          userComments: article.userComments ?? "",
          referenceText: article.referenceText ?? "",
          userProductionComments: article.userProductionComments ?? "",
          productionComments: article.productionComments ?? "",
          createdAt: article.createdAt!,
          modifyCopyEditor: article.modifyCopyEditor,
          modifyProduction: article.modifyProduction,
        }),
      );

    setFiltered(filteredArticles);
  }, [articles, year, month]);

  if (!filtered.length)
    return (
      <p className="p-6">
        No articles found for {year}/{month}
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
          alt={"no image"}
        />
        <h1 className="text-2xl font-bold mb-4">
          Vol {year}/{month}
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
              const encodedPdfData = encodeURIComponent(article.pdfUrl);
              router.push(`/viewpdf/${encodedPdfData}`);
            }}
            pdfUrl={article.pdfUrl}
            key={article.id}
            style1={"font-bold text-[#4b7d92]"}
            style2={"text-black w-[90%]"}
            title1={article.pdfUrl}
            title12={article.subtitle}
          />
        ))}
      </ul>
    </div>
  );
}
