"use client";

import StageComplete from "@/app/admin/components/StageComplete";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { setTab } from "@/app/api/slice/viewSlice";
import React, { useEffect } from "react";

export default function ProductionPage() {
  const { article } = useAppSelector((state) => state.getArticleById);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTab("Production"));
  }, [dispatch]);
  return article?.status == "Production" ? (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Production Stage
      </h1>

      <div className="space-y-3">
        <p>
          <strong>Paper Title:</strong> {article?.title}
        </p>
        <p>
          <strong>Author:</strong> {user?.givenName} {user?.familyName}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`px-2 py-1 rounded ${
              article?.status === "Production"
                ? "bg-yellow-200 text-yellow-900"
                : "bg-green-200 text-green-900"
            }`}
          >
            {article?.status}
          </span>
        </p>
        <p>
          <strong>DOI:</strong> {article?.doi}
        </p>

        <p>
          <strong>Production Notes:</strong> {article?.productionNotes}
        </p>

        <a
          href={article?.pdf}
          className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          View Proof PDF
        </a>
      </div>
    </div>
  ) : article?.status === "Approved" ? (
    <StageComplete stage={"Production"} />
  ) : (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        No Stage intiated
      </h1>
    </div>
  );
}
