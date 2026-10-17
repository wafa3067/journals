"use client";

import { FaFilePdf } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { useEffect } from "react";
import { setTab } from "@/app/api/slice/viewSlice";
import { fetchArticleById } from "@/app/api/slice/getArticleByIdSlice";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/api/actions/articleActions";

export default function SubmissionPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { article } = useAppSelector((state) => state.getArticleById);
  useEffect(() => {
    dispatch(setTab("Submission"));
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Submission Files */}
      <div className="bg-white border rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="font-semibold text-gray-700">Submission Files</h2>
          <button className="text-sm font-medium #00b4d8 hover:underline"></button>
        </div>

        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <FaFilePdf className="text-red-600" size={20} />
            <span className="font-semibold text-gray-800">
              {article?.id.toString() || "N/A"}
            </span>
            <span className="#00b4d8 hover:underline cursor-pointer">
              {"Download"}
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>{article?.createdAt}</span>
          </div>
        </div>

        <div className="flex justify-end px-4 py-2">
          {article && (
            <a
              href={`${BACKEND_URL}${article.pdfUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className=" disabled"
            >
              <button className="text-sm font-medium #00b4d8 hover:underline">
                Download File
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
