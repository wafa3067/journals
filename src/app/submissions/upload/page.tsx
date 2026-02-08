"use client";
import CustomButton from "@/app/(main)/components/custom_button";
import CustomText from "@/app/(main)/components/custom_text";
import LoadingSpinner from "@/app/(main)/components/loading_spannier";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { updateTab } from "@/app/api/providers/tab_bar";
import {
  updateFile,
  updateName,
  updatePdf,
  updateSize,
  updateType,
} from "@/app/api/slice/uploadSlice";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect, useTransition } from "react";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const research = useAppSelector((state) => state.upload);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const Navigate = (route: string) => {
    setIsLoading(true);
    startTransition(() => {
      router.push(route);
    });
  };
  const goBack = () => {
    Navigate("/submissions/begin");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    dispatch(updateName(f.name));
    dispatch(updateType(f.type));
    dispatch(updateSize(f.size));
    dispatch(updateFile(f));
  };

  useEffect(() => {
    // ✅ This runs only when the page fully loads
    dispatch(updateTab("upload-documents"));
  }, [dispatch]);

  const openFileDialog = () => {
    inputRef.current?.click();
    setError("");
  };

  const handleUpload = () => {
    if (!research.file) {
      setError("Please upload a File");
      return;
    }

    const formData = new FormData();
    formData.append("file", research.file);
    Navigate("/submissions/meta");

    // Example dispatch to Redux
    dispatch(updatePdf(research.file as File));
  };

  return (
    <div className="bg-gray-50 w-full p-6">
      <div className="w-full max-w-5xl mx-auto md:shadow-lg md:rounded-lg md:bg-white p-6 ">
        <h2 className="text-center font-bold md:text-xl">Add Document</h2>

        <div
          className="mt-5 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-600 text-center"
          style={{ height: 160 }}
        >
          <input
            ref={inputRef}
            type="file"
            accept=".doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
            onChange={handleChange}
            style={{ display: "none" }}
          />

          {!research.file ? (
            <>
              <div className="md:text-lg font-medium">
                Add a document to your submission
              </div>
              <button
                type="button"
                onClick={openFileDialog}
                className="mt-3 px-4 py-2 rounded border border-gray-500 bg-white hover:bg-gray-100 cursor-pointer"
              >
                Upload
              </button>
            </>
          ) : (
            <div
              className="w-full p-3 text-gray-800 sm:text-[10px]"
              onClick={openFileDialog}
            >
              <strong>{research.name}</strong> ({research.type || "unknown"},{" "}
              {research.size} bytes)
            </div>
          )}
        </div>
        {error && <CustomText text={error} style={"text-red-400"} />}
        <div className="flex justify-end mt-6 gap-3">
          <CustomButton
            text="Back"
            bgColor="bg-[#000]"
            hoverEffect="hover:bg-[#f7bc49]"
            rounded="8px"
            onClick={() => goBack()}
          />
          {isLoading || isPending ? (
            <LoadingSpinner />
          ) : (
            <CustomButton
              text="Next"
              bgColor="bg-[#000]"
              hoverEffect="hover:bg-[#f7bc49]"
              rounded="8px"
              onClick={handleUpload}
            />
          )}
          <CustomButton
            onClick={() => Navigate("/dashboard")}
            text="Cancel"
            rounded="rounded-[8px]"
            textColor="black"
            bgColor="bg-[#cccccc]"
          />
        </div>
      </div>
    </div>
  );
}
