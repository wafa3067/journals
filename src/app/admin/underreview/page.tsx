// app/admin/review/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";
import { Article } from "../adminSlice/pending";
import {
  assignCopyEditor,
  fetchUnderReview,
} from "../adminSlice/underreviewSlice";
import { sendArticleEmail } from "../adminSlice/emailSlice";
import AlertInputDialog from "../components/alert_input";
import { rejectArticleStatus } from "../adminSlice/rejectArticalStatusSlice";
import { useAlert } from "@/app/(main)/components/AlertProvider";
import { addNotification } from "../adminSlice/notificationSlice";
import QuillViewer from "@/app/(main)/components/rectquilviwer";

export default function UnderReviewPage() {
  const dispatch = useAppDispatch();
  const { articles, loading } = useAppSelector((state) => state.underreview);
  const [reviewInputs, setReviewInputs] = useState<
    Record<
      number,
      { reviewer: string; start: string; end: string; comments: string }
    >
  >({});

  const [successMessage, setSuccessMessage] = useState<string>("");
  useEffect(() => {
    dispatch(fetchUnderReview());
  }, [dispatch]);

  // Filter articles that are currently "Under Review"
  const underReviewArticles = articles.filter(
    (a) => a.status === "Under Review",
  );

  const handleInputChange = (
    articleId: number,
    field: "reviewer" | "start" | "end" | "comments",
    value: string,
  ) => {
    setReviewInputs((prev) => ({
      ...prev,
      [articleId]: {
        ...prev[articleId],
        [field]: value,
      },
    }));
  };

  const handleInput = (value: string, article: Article) => {
    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Rejected",
        body: `
<html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#b91c1c; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.5px;">
                  Decision on Your Article Submission
                </h1>
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                Dear <strong>${article.givenName} ${article.familyName}</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.6;">
                <p style="margin:0 0 12px 0;">
                  We regret to inform you that after careful consideration, your submitted article has not been accepted for publication in our journal.
                </p>
                <p style="margin:0 0 12px 0;">
                  Our editorial team and reviewers provided detailed feedback regarding your submission:
                </p>
                <blockquote style="margin:15px 0; padding:15px 20px; background-color:#fef2f2; border-left:4px solid #ef4444; border-radius:8px; color:#7f1d1d;">
                  ${value}
                </blockquote>
                <p style="margin:12px 0 0 0;">
                  We encourage you to review the comments and consider revising your work for future submissions. We truly appreciate the time and effort you devoted to your research.
                </p>
              </td>
            </tr>

            <!-- Article Info -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 15px 0; color:#b91c1c; font-size:18px;">Article Summary</h3>
                <table cellpadding="6" cellspacing="0" width="100%" style="color:#374151; font-size:14px;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Title:</td>
                    <td>${article.title}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Status:</td>
                    <td style="color:#b91c1c; font-weight:600;">${article.status}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Closing -->
            <tr>
              <td align="center" style="padding:25px 35px 15px 35px; font-size:14px; color:#6b7280; line-height:1.6;">
                Thank you for considering our journal for your work.<br>
                <strong>The Editorial Board</strong>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="font-size:12px; color:#9ca3af; padding:15px 35px 30px 35px;">
                © 2025 Journal Name. All rights reserved.<br>
                1234 Street, City, Country
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`,
      }),
    );
    dispatch(
      rejectArticleStatus({
        id: article.id,
        comments: value,
        status: "Rejected",
      }),
    ).then((response) => {
      dispatch(
        addNotification({
          title: article.title,
          message: `Your Article has been rejected .`,
          email: article.email,
          status: "Rejected",
        }),
      );
      dispatch(fetchUnderReview());
      setSuccessMessage("Reject Article Response:" + response);
    });
  };
  const { showAlert } = useAlert();

  const handleAssignReviewer = (article: Article) => {
    const input = reviewInputs[article.id] || {};
    if (!input.reviewer) {
      alert("Please fill all fields");
      return;
    }
    dispatch(
      sendArticleEmail({
        toEmail: article.email,
        authorName: article.givenName,
        articleTitle: article.title,
        status: "Copy Editor",
        body: `
<html>
  <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td align="center" style="background-color:#2563eb; padding:30px;">
                <h1 style="margin:0; color:#ffffff; font-size:26px; letter-spacing:0.3px;">
                  Your Article Is Now in Copy Editing
                </h1>
              </td>
            </tr>
            
            <!-- Greeting -->
            <tr>
              <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                Hello <strong>${article.givenName} ${
                  article.familyName
                }</strong>,
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.6;">
                <p style="margin:0 0 12px 0;">
                  We’re pleased to inform you that your article has successfully completed the review process and has now moved to the <strong>copy editing stage</strong>.
                </p>
                <p style="margin:0 0 12px 0;">
                  During this stage, our copy editors will refine your manuscript for grammar, formatting, and clarity to ensure it meets the publication standards of our journal.
                </p>
                <p style="margin:0;">
                  You will be notified once the editing process is complete or if any clarifications are required.
                </p>
              </td>
            </tr>

            <!-- Article Details -->
            <tr>
              <td style="background-color:#f9fafb; padding:25px 35px;">
                <h3 style="margin:0 0 15px 0; color:#2563eb; font-size:18px;">Article Details</h3>
                <table cellpadding="6" cellspacing="0" width="100%" style="color:#374151; font-size:14px;">
                  <tr>
                    <td width="35%" style="font-weight:bold;">Title:</td>
                    <td>${article.title}</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Status:</td>
                    <td>Copy Editor</td>
                  </tr>
                  <tr>
                    <td width="35%" style="font-weight:bold;">Submission Date:</td>
                    <td>${article.createdAt?.toString()}</td>
                  </tr>
                  ${
                    input.reviewer
                      ? `<tr>
                          <td width="35%" style="font-weight:bold;">Assigned Copy Editor:</td>
                          <td>${input.reviewer}</td>
                        </tr>`
                      : ""
                  }
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td align="center" style="padding:25px 35px 10px 35px; font-size:14px; color:#6b7280;">
                Thank you for your continued contribution to our journal.<br>
                <strong>The Editorial Team</strong>
              </td>
            </tr>

            <tr>
              <td align="center" style="font-size:12px; color:#9ca3af; padding:15px 35px 30px 35px;">
                © 2025 Journal Name. All rights reserved.<br>
                1234 Street, City, Country
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
      }),
    );
    dispatch(
      assignCopyEditor({
        articleId: article.id,
        copyeditor: input.reviewer,
        status: "Copy Editor",
        comments: input.comments,
      }),
    ).then(() => {
      dispatch(
        addNotification({
          title: article.title,
          message: `Reviewer ${input.reviewer} has been assigned to your article "${article.title}".`,
          email: article.email,
          status: "Copy Editor",
        }),
      );
      showAlert(" Article assigned to CopyEditor successfully!");
      dispatch(fetchUnderReview());
    });
  };
  return (
    <main>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white p-5 shadow-sm flex justify-between items-center ">
          <h1 className="text-xl font-bold flex items-center gap-2">
            Under Review Articles management
          </h1>
        </header>
        {loading ? (
          <p>Loading...</p>
        ) : underReviewArticles.length === 0 ? (
          <div className="text-center p-4 bg-blue-100 m-8 text-blue-700 rounded">
            No articles currently under review.
          </div>
        ) : (
          <div className=" overflow-scroll h-[calc(100vh-50px)]">
            {underReviewArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-xl shadow p-6 m-8 mb-6 transition-transform hover:-translate-y-1  "
              >
                <div className="flex justify-between items-center mb-3">
                  <h5 className="text-lg font-semibold text-blue-800">
                    {article.title}
                  </h5>
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold">
                    {article.status}
                  </span>
                </div>

                <p>
                  <strong>Submitted By:</strong> {article.givenName}|
                  {article.familyName}|{article.email} | {article.affiliation}
                </p>
                <p>Abstract:</p>
                <QuillViewer value={article.abstracts ?? ""} />

                <p>
                  <strong>Reviewer:</strong> {article.reviewerAssigned}
                </p>
                <p>
                  <strong>Submitted On:</strong> {article.createdAt}
                </p>
                <p>
                  <strong>Review Started:</strong> {article.reviewStartDate}
                </p>
                <p>
                  <strong>Review Deadline:</strong> {article.reviewEndDate}
                </p>
                <p>
                  <strong>PDF:</strong>{" "}
                  <a
                    href={`/uploads/${article.pdf}`}
                    target="_blank"
                    className="text-blue-600"
                    rel="noreferrer"
                  >
                    View PDF
                  </a>
                </p>

                {successMessage && (
                  <div className="mt-2 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                  </div>
                )}

                <div className="mt-3 space-x-2">
                  {article.status === "Under Review" && (
                    <div className="space-y-2  mb-4 ">
                      <input
                        type="text"
                        placeholder="CopyEditor Name"
                        className="border rounded px-2 py-1 w-full"
                        value={reviewInputs[article.id]?.reviewer || ""}
                        onChange={(e) =>
                          handleInputChange(
                            article.id,
                            "reviewer",
                            e.target.value,
                          )
                        }
                      />
                      <textarea
                        placeholder="Comments"
                        className="border rounded px-2 py-1 w-full"
                        value={reviewInputs[article.id]?.comments || ""}
                        onChange={(e) =>
                          handleInputChange(
                            article.id,
                            "comments",
                            e.target.value,
                          )
                        }
                      />

                      <div className="flex flex-row gap-2">
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                          onClick={() => handleAssignReviewer(article)}
                        >
                          Assign CopyEditor
                        </button>

                        <AlertInputDialog
                          bg="bg-red-400"
                          title="Recruit Reviewer"
                          description="Please provide reason for rejecting this article."
                          onConfirm={(val) => handleInput(val, article)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
