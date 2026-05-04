"use client";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect } from "react";
import QuillViewer from "../components/rectquilviwer";
import { GetAuthors } from "@/app/admin/adminSlice/author/getAuthorSlice";
import CustomButton from "../components/custom_button";
import { useRouter } from "next/navigation";
import Loading from "../loading";

function Page() {
  const dispatch = useAppDispatch();
  const { getAuthors } = useAppSelector((state) => state.getAuthorSlice);
  useEffect(() => {
    dispatch(GetAuthors());
  }, []);
  const router = useRouter();
  if (getAuthors.length == 0) {
    return <Loading />;
  }
  return (
    <div>
      {getAuthors.length > 0 ? (
        getAuthors.map((author, index) => (
          <QuillViewer value={author.descriptions ?? ""} key={index} />
        ))
      ) : (
        <p>No author information available.</p>
      )}
      <div className="justify-end content-center flex m-10">
        <CustomButton
          text="Submit An Article"
          rounded="rounded-sm "
          bgColor="bg-black"
          hoverEffect="hover:bg-gray-800"
          textColor="text-white"
          fontSize="text-lg"
          onClick={() => router.push("/submissions/begin")}
        />
      </div>
    </div>
  );
}

export default Page;
