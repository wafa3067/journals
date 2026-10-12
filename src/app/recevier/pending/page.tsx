// app/admin/review/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../api/hooks/hooks";

import QuillViewer from "@/app/(main)/components/rectquilviwer";
import { useAlert } from "@/app/(main)/components/AlertProvider";
import { sendArticleEmail } from "@/app/admin/adminSlice/emailSlice";
import { addNotification } from "@/app/admin/adminSlice/notificationSlice";
import { Article } from "@/app/admin/adminSlice/pending";

import {
  getAssignedArticles,
  updateAssignmentStatus,
  updateReviewComments,
} from "@/app/admin/adminSlice/assigned/assignedSlice";

type HomeFormData = {
  comments: string;
  status: "accepted" | "accepted" | "accepted with modifications" | "rejected";
};

export default function UnderReviewPage() {
  const dispatch = useAppDispatch();
  const [homeFormData, setHomeFormData] = useState<HomeFormData>({
    comments: "",
    status: "accepted",
  });
  const [articleid, setArticleid] = useState<number>(0);
  const [reviewerID, setReviewerID] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [givenName, setGivenName] = useState<string>("");
  const [familyName, setFamilyName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");

  const { assignments, loading } = useAppSelector((state) => state.assigned);
  const [reviewInputs, setReviewInputs] = useState<
    Record<
      number,
      { reviewer: string; start: string; end: string; comments: string }
    >
  >({});

  const [openModel, setOpenModel] = useState<string | null>(null);
  useEffect(() => {
    dispatch(getAssignedArticles(5));
  }, [dispatch]);

  // Filter articles that are currently "Under Review"
  const underReviewArticles = assignments.filter(
    (a) => a.status === "ASSIGNED",
  );

  const { showAlert } = useAlert();

  const handleStatus = () => {
    if (!homeFormData.comments || !homeFormData.status) {
      showAlert("Please fill in all fields.");
      return;
    }

    if (homeFormData.status === "accepted") {
      dispatch(
        updateReviewComments({
          assignmentId: articleid,
          status: homeFormData.comments,
        }),
      );
      dispatch(
        updateAssignmentStatus({
          assignmentId: reviewerID,
          status: "accepted",
        }),
      ).then(() => {
        dispatch(getAssignedArticles(5));
      });
    }
    if (homeFormData.status === "accepted with modifications") {
      dispatch(
        updateAssignmentStatus({
          assignmentId: reviewerID,
          status: "accepted with modifications",
        }),
      );

      dispatch(
        sendArticleEmail({
          toEmail: email,
          authorName: givenName + " " + familyName,
          articleTitle: title,
          status: "Under Review",
          body: `
            <html>
              <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:'Segoe UI', Arial, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
                  <tr>
                    <td align="center">
                      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">

                        <!-- Header -->
                        <tr>
                          <td align="center" style="background-color:#2563eb; padding:20px;">
                            <h1 style="margin:0; color:#ffffff; font-size:20px; letter-spacing:0.3px;">
                              Please Review Your Article Submission
                            </h1>
                          </td>
                        </tr>

                        <!-- Greeting -->
                        <tr>
                          <td style="padding:25px 35px 10px 35px; font-size:18px; color:#111827;">
                            Hello <strong>${givenName} ${familyName}</strong>,
                          </td>
                        </tr>

      <!-- Message -->
      <tr>
        <td style="padding:10px 35px 20px 35px; font-size:15px; color:#374151; line-height:1.6;">
          <p style="margin:0 0 12px 0;">
            Your article has been reviewed, and the reviewer has recommended <strong>Acceptance with Modifications</strong>.
          </p>
          <p style="margin:0 0 12px 0;">
            Please review the feedback and make the necessary revisions to your manuscript to address the reviewer's comments and meet the journal's publication standards.
          </p>
          <p style="margin:0; color:#FF0000">
          Reviewer Comment: ${homeFormData.comments}
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
                                <td>${title}</td>
                              </tr>
                              <tr>
                                <td width="35%" style="font-weight:bold;">Status:</td>
                                <td> Reviwer Comment: Accepted With Modifications</td>
                              </tr>
                              <tr>
                                <td width="35%" style="font-weight:bold;">Submission Date:</td>
                                <td>${createdAt?.toString()}</td>
                              </tr>

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
      ).then(() => {
        dispatch(getAssignedArticles(5));
      });
    }
    if (homeFormData.status === "rejected") {
      dispatch(
        updateReviewComments({
          assignmentId: reviewerID,
          status: homeFormData.comments,
        }),
      );
      dispatch(
        updateAssignmentStatus({
          assignmentId: articleid,
          status: "rejected",
        }),
      ).then(() => {
        dispatch(getAssignedArticles(5));
      });
    }
    setOpenModel(null);
  };

  const handleHomeChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setHomeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <main>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className=" md:bg-[#00b4d8] p-5 flex justify-center items-center ">
          <h1 className="text-sm font-semibold flex items-center gap-2 text-black md:text-white">
            Review Articles
          </h1>
        </header>
        {openModel == "add" && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              {/* Comments */}
              <textarea
                name="comments"
                value={homeFormData.comments ?? ""}
                onChange={handleHomeChange}
                placeholder="Comments"
                rows={4}
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Status Dropdown */}
              <select
                name="status"
                value={homeFormData.status}
                onChange={handleHomeChange}
                className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="accepted">Accepted</option>
                <option value="accepted with modifications">
                  Accepted with Modifications
                </option>
                <option value="rejected">Rejected</option>
              </select>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleStatus();
                  }}
                  className="bg-[#00b4d8] text-white px-4 py-2 rounded-md hover:bg-[#0096c7] transition-colors"
                >
                  Save
                </button>

                <button
                  onClick={() => setOpenModel(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

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
                <div className="flex flex-row gap-2">
                  <button
                    className="bg-[#00b4d8] text-white px-3 py-1 rounded hover:bg-[#00b4d8]"
                    onClick={() => {
                      console.log(
                        "article",
                        article.article.contributorsList[0].name,
                      );
                      setOpenModel("add");
                      setArticleid(article.article.id);
                      setReviewerID(article.id);
                      setEmail(article.article.user);
                      setGivenName(
                        article.article.contributorsList[0].giveName,
                      );
                      setFamilyName(article.article.contributorsList[0].name);
                      setTitle(article.article.title);
                      setCreatedAt(article.article.createdAt ?? "");
                    }}
                  >
                    Response
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
