"use client";

import { FaFilePdf } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { useEffect } from "react";
import { setTab } from "@/app/api/slice/viewSlice";

export default function SubmissionPage() {
  const dispatch = useAppDispatch();
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
          <button className="text-sm font-medium text-blue-600 hover:underline"></button>
        </div>

        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-3">
            <FaFilePdf className="text-red-600" size={20} />
            <span className="font-semibold text-gray-800">
              {article?.id.toString() || "N/A"}
            </span>
            <span className="text-blue-600 hover:underline cursor-pointer">
              {article?.pdf || "N/A"}
            </span>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <span>{article?.createdAt}</span>
          </div>
        </div>

        <div className="flex justify-end px-4 py-2">
          <button className="text-sm font-medium text-blue-600 hover:underline">
            Download All Files
          </button>
        </div>
      </div>

      {/* Pre-Review Discussions */}
      {/* <div className="bg-white border rounded-lg shadow-sm">
        <div className="flex justify-between items-center border-b px-4 py-2">
          <h2 className="font-semibold text-gray-700">
            Pre-Review Discussions
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            Add discussion
          </button>
        </div>

        <div className="p-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-2">Name</th>
                <th className="pb-2">From</th>
                <th className="pb-2">Last Reply</th>
                <th className="pb-2">Replies</th>
                <th className="pb-2">Closed</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 border-b">
                <td className="py-2 text-blue-600 hover:underline cursor-pointer">
                  {discussion.name}
                </td>
                <td className="py-2">{discussion.from}</td>
                <td className="py-2 text-gray-400">-</td>
                <td className="py-2">{discussion.replies}</td>
                <td className="py-2 text-center">
                  <input type="checkbox" checked={discussion.closed} readOnly />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
