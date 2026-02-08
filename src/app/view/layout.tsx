"use client";
import { VscPreview } from "react-icons/vsc";
import CustomText from "../(main)/components/custom_text";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { setTab } from "../api/slice/viewSlice";
import { fetchArticlesByUser } from "../api/slice/getArticleSlice";

export default function ViewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = ["Submission", "Review", "Copyediting", "Production"];
  const router = useRouter();
  const { tab } = useAppSelector((state) => state.view);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const Navigate = (route: string) => {
    setIsLoading(true);
    startTransition(() => {
      router.push(route);
    });
  };

  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector((state) => state.token);

  useEffect(() => {
    dispatch(setTab("Submission"));
    dispatch(fetchArticlesByUser({ userEmail: user, token: token }));
  }, [dispatch, token, user]);
  const handleTab = (tb: string) => {
    if (tb === "Submission") {
      Navigate("/view/submission_page");
    } else if (tb === "Review") {
      Navigate("/view/review");
    } else if (tb === "Copyediting") {
      Navigate("/view/copy_edit");
    } else if (tb === "Production") {
      Navigate("/view/production");
    }
  };
  return (
    <div>
      <div className=" flex flex-row justify-between items-center mb-5 p-4 bg-[#f3f4f6] ">
        <div className="flex gap-2">
          <IoArrowBackSharp
            onClick={() => router.push("/")}
            className="text-3xl"
          />
          <CustomText text={"Echos Quantum"} style={"font-bold text-2xl"} />
        </div>

        <div className=" flex flex-row gap-4 text-2xl">
          <VscPreview />
        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 justify-center">
        {tabs.map((tb) => (
          <button
            key={tb}
            onClick={() => handleTab(tb)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200
            ${
              tab === tb
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tb}
          </button>
        ))}
      </div>
      <div className="min-h-screen bg-gray-50 ">{children}</div>;
    </div>
  );
}
