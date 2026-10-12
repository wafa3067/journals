// app/admin/review/page.tsx
"use client";

import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";

import QuillViewer from "@/app/(main)/components/rectquilviwer";
import { useAlert } from "@/app/(main)/components/AlertProvider";
import { useEffect } from "react";
import { getAssignedArticles } from "@/app/admin/adminSlice/assigned/assignedSlice";

export default function UnderReviewPage() {
  const dispatch = useAppDispatch();

  const { assignments, loading } = useAppSelector((state) => state.assigned);

  // Filter articles that are currently "Under Review"
  const underReviewArticles = assignments.filter(
    (a) => a.status === "ACCEPTED",
  );

  useEffect(() => {
    dispatch(getAssignedArticles(5));
  }, [dispatch]);
  return (
    <main>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className=" md:bg-[#00b4d8] p-5 flex justify-center items-center ">
          <h1 className="text-sm font-semibold flex items-center gap-2 text-black md:text-white">
            Review Articles
          </h1>
        </header>

        {loading ? (
          <p>Loading...</p>
        ) : underReviewArticles.length === 0 ? (
          <div className="text-center p-4 bg-[#00b4d8] text-white m-8 rounded">
            No articles currently under review.
          </div>
        ) : (
          <div className=" overflow-scroll h-[calc(100vh-50px)]">
            {underReviewArticles.map((article) => (
              <div
                key={article.article.id}
                className="bg-white rounded-xl shadow p-6 m-8 mb-6 transition-transform hover:-translate-y-1  "
              >
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-lg font-semibold text-[#0096c7]">
                    {article.article.title}
                  </h5>
                </div>

                <p>Abstract:</p>
                <QuillViewer value={article.article.abstracts ?? ""} />

                <p>
                  <strong>Reviewer:</strong> {article.article.reviewerAssigned}
                </p>
                <p>
                  <strong>Submitted On:</strong> {article.article.createdAt}
                </p>
                <p>
                  <strong>Review Started:</strong>{" "}
                  {article.article.reviewStartDate}
                </p>
                <p>
                  <strong>Review Deadline:</strong>{" "}
                  {article.article.reviewEndDate}
                </p>
                <p>
                  <strong>PDF:</strong>{" "}
                  <a
                    href={`/uploads/${article.article.pdf}`}
                    target="_blank"
                    className="#00b4d8"
                    rel="noreferrer"
                  >
                    View PDF
                  </a>
                </p>

                {/* {successMessage && (
                  <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
