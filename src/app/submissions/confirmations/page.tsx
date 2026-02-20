"use client";
import { useAlert } from "@/app/(main)/components/AlertProvider";
import CustomButton from "@/app/(main)/components/custom_button";
import CustomText from "@/app/(main)/components/custom_text";
import LoadingSpinner from "@/app/(main)/components/loading_spannier";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { updateTab } from "@/app/api/providers/tab_bar";
import { uploadArticle } from "@/app/api/slice/articleSlice";
import {
  fetchTotalArticles,
  fetchPendingArticles,
  fetchApprovedArticles,
} from "@/app/api/slice/fetchArticaleCount";
import { fetchArticlesByUser } from "@/app/api/slice/getArticleSlice";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import { setProfileData } from "@/app/api/slice/profileStateSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";

const Page = () => {
  const dispatch = useAppDispatch();
  const begin = useAppSelector((state) => state.begin);
  const upload = useAppSelector((state) => state.upload);
  const meta = useAppSelector((state) => state.meta);
  const router = useRouter();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const Navigate = (route: string) => {
    setIsLoading(true);
    startTransition(() => {
      router.push(route);
    });
  };

  const goBack = () => {
    Navigate("/submissions/meta");
  };

  useEffect(() => {
    // ✅ This runs only when the page fully loads
    dispatch(updateTab("confirmations"));
  }, [dispatch]);

  return (
    <main
      className=" md:w-5xl   md:mx-auto flex flex-col  md:bg-white m-10 p-6 md:rounded-md justify-start items-center md:shadow-lg"
      style={{
        padding: 20,
        fontFamily: "system-ui, -apple-system, Roboto, 'Segoe UI', Arial",
        display: "flex",
        gap: 24,
      }}
    >
      <CustomText
        style={"font-normal text-black  "}
        text={
          "Your submission is prepared and ready to be uploaded. You can review or edit any details before proceeding. When you’re ready, click Finish Submission to continue."
        }
      />

      <div className=" lg:w-[740px] w-[290px] flex justify-end mt-4 gap-2">
        <CustomButton
          text="Back"
          rounded="rounded-[8px]"
          bgColor={"bg-[#671509]"}
          onClick={() => goBack()}
        />
        {isLoading || isPending ? (
          <LoadingSpinner />
        ) : (
          <CustomButton
            text="Finish Submission"
            rounded="rounded-[8px]"
            bgColor={"bg-[#671509]"}
            onClick={async () => {
              const token = localStorage.getItem("token");
              const email = localStorage.getItem("email");
              if (token && email) {
                const data = {
                  section: begin.section,
                  comment: begin.comment,
                  previousPublished: begin.previousPublished,
                  privacypolicy: begin.privacypolicy,
                  copyright: begin.copyright,
                  fileType: begin.fileType,
                  textStylic: begin.textStylic,
                  textStyle: begin.textStyle,
                  refrencedUrl: begin.refrencedUrl,
                  abstracts: meta.abstracts,
                  keywords: meta.keywords,
                  title: meta.title,
                  user: email,
                  crosspendingContact: "",
                  referenceText: meta.references,
                  prefix: meta.prefix,
                  subtitle: meta.subtitle,
                  createdAt: new Date().toISOString().split("T")[0], // ✅ assign value here
                  // createdAt: "2025-02-02", // ✅ assign value here
                };
                const pdfFile = upload.file as File;
                const contributors = meta.contributorsList;

                const datas = dispatch(
                  uploadArticle({ token, data, pdfFile, contributors }),
                );
                datas.finally(() => {
                  showAlert("Article submitted successfully!");
                  Navigate("/submissions/next");
                  dispatch(
                    fetchArticlesByUser({ userEmail: email, token: token }),
                  );
                  const data = dispatch(fetchUserByEmail());
                  data.then((V) => {
                    dispatch(setProfileData(V));
                  });
                  dispatch(fetchTotalArticles());
                  dispatch(fetchPendingArticles());
                  dispatch(fetchApprovedArticles());
                });
              }
            }}
          />
        )}
        <CustomButton
          text="Cancel"
          rounded="rounded-[8px]"
          textColor="black"
          bgColor={"bg-[#cccccc]"}
        />
      </div>
    </main>
  );
};

export default Page;
