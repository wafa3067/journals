"use client";

import StageComplete from "@/app/admin/components/StageComplete";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { setTab } from "@/app/api/slice/viewSlice";
import { useEffect, useState } from "react";

export default function CopyEditorPage() {
  const { article } = useAppSelector((state) => state.getArticleById);
  const { user } = useAppSelector((state) => state.user);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [comment, setComment] = useState("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTab("Copyediting"));
  }, [dispatch]);
  return article?.status == "Copy Editor" ? (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Copyediting Assignment
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Paper ID:</strong> #{article?.id}
        </p>
        <p>
          <strong>Title:</strong> {article?.title}
        </p>
        <p>
          <strong>Author:</strong> {user?.givenName} {user?.familyName}
        </p>
        <p>
          <strong>Copyeditor:</strong> {article?.copyeditor}
        </p>
        <p>
          <strong>Submitted:</strong> {article?.createdAt}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              article?.status === "Copy Editor"
                ? "bg-yellow-100 text-yellow-700"
                : article?.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
            }`}
          >
            {article?.status}
          </span>
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Manuscript Files
        </h2>
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md border border-gray-200">
          <p>{article?.pdf}</p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Download
          </button>
        </div>

        <div className="mt-4">
          <label className="block mb-2 font-medium text-gray-700">
            Upload Edited Version:
          </label>
          <input
            type="file"
            className="border border-gray-300 rounded-md p-2 w-full"
            onChange={() => setFileUploaded(true)}
          />
          {fileUploaded && (
            <p className="mt-2 text-sm text-green-600">
              ✅ File uploaded successfully!
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Copyeditor Notes
        </h2>
        <p className="text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
          {article?.copyeditorNotes}
        </p>
      </div>

      <div className="mt-6 border-t border-gray-200 pt-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Message to Author / Editor
        </h2>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Write a message or note..."
        />
        <button
          onClick={() => {
            alert("Message sent!");
            setComment("");
          }}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Send Message
        </button>
      </div>
    </div>
  ) : article?.status === "Production" || article?.status === "Approved" ? (
    <StageComplete stage={"Copy Editor"} />
  ) : (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        No Stage intiated
      </h1>
    </div>
  );
}
