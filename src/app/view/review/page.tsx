"use client";

import StageComplete from "@/app/admin/components/StageComplete";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { setTab } from "@/app/api/slice/viewSlice";
import { useEffect } from "react";

export default function PaperReviewPage() {
  const { article } = useAppSelector((state) => state.getArticleById);
  const { user } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTab("Review"));
  }, []);
  return article?.status == "Under Review" ? (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {article?.title ?? "N/A"}
      </h1>

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Author:</strong> {user?.givenName ?? ""}{" "}
          {user?.familyName ?? ""}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              article?.status === "Under Review"
                ? "bg-yellow-100 text-yellow-700"
                : article?.status === "Reviewed"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-500"
            }`}
          >
            {article?.status}
          </span>
        </p>
        <p>
          <strong>Reviewer Assigned:</strong>{" "}
          {article?.reviewerAssigned ?? "N/A"}
        </p>
        <p>
          <strong>Submitted On:</strong> {article?.createdAt ?? "N/A"}
        </p>
        <p>
          <strong>Review Started:</strong> {article?.reviewStarted ?? "N/A"}
        </p>
        <p>
          <strong>Review Deadline:</strong> {article?.reviewDeadline}
        </p>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Abstract</h2>
        <p className="text-gray-600 leading-relaxed">
          {article?.abstracts ?? ""}
        </p>
      </div>

      <div className="mt-6 p-4 border-t border-gray-200">
        {article?.status === "Under Review" ? (
          <p className="text-sm text-yellow-700">
            📄 This article? is currently under review by{" "}
            {article?.reviewerAssigned}. The review is expected to complete by{" "}
            {article?.reviewDeadline}.
          </p>
        ) : article?.status === "Reviewed" ? (
          <p className="text-sm text-green-700">
            ✅ This article? has been reviewed by {article?.reviewerAssigned}.
            Awaiting editor decision.
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            ⏳ Review completed. Final decision pending.
          </p>
        )}
      </div>
    </div>
  ) : article?.status === "Copy Editor" ||
    article?.status === "Production" ||
    article?.status === "Approved" ? (
    <StageComplete stage={"Review"} />
  ) : (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        No Stage intiated
      </h1>
    </div>
  );
}
