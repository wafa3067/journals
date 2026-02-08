// import React from "react";
// import CustomText from "../components/custom_text";
// import ArchiveComponent from "../components/archive_component";
// import { CgArrowRightO, CgArrowRight } from "react-icons/cg";

// type Props = {};

// const Page = (props: Props) => {

//   const data2 = [
//     { image: "/images/bg.png", title: "Vol18 No2 2022", main: "2002" },
//     { image: "/images/flutter.png", title: " Vol18 No2 2021", main: "2002" },
//   ];
//   return (
//     <div className="w-[100%] p-5 gap-4">
//       <CustomText text={"Archives"} style={"font-bold text-2xl"} />
//       <ArchiveComponent data={data} main="2002" />
//       <ArchiveComponent data={data2} main="2012" />
//       <ArchiveComponent data={data} main="2022" />
//       <ArchiveComponent data={data} main="2032" />
//       <div className="flex flex-row  gap-2 items-end justify-end">
//         <CustomText text={"1-25 of 57"} />
//         <div className="flex flex-row">
//           <CustomText text={"NEXT"} style={"font-bold text-[#4b7d92]"} />
//           <CgArrowRight size={25} color="green" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchArchiveArticles } from "@/app/api/slice/archiveSlice";
import { selectArchiveFlat } from "@/app/api/selectors/archiveSelectors";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ArchivePage() {
  const dispatch = useAppDispatch();
  const archive = useAppSelector(selectArchiveFlat);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchArchiveArticles());
  }, [dispatch]);

  const handleClick = (year: string, month: string) => {
    router.push(`/archive/${year}/${month}`);
  };

  return (
    <div className="p-6 ">
      {Object.entries(archive).map(([year, months]) => (
        <div key={year} className="mb-2 flex flex-col ">
          <span className="font-bold">{year} </span>{" "}
          <div className="flex flex-row gap-5 mt-3">
            {months.map((month) => (
              <div key={month}>
                <Image
                  className=" rounded-sm"
                  src="/images/logo1.jpg"
                  alt="archive image"
                  width={200}
                  height={120}
                />
                <span
                  key={month}
                  className="ml-2 cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleClick(year, month)}
                >
                  Vol {month} {year}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
