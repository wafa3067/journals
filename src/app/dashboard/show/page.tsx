"use client";
import CustomInput from "@/app/(main)/components/custom_input";
import CustomText from "@/app/(main)/components/custom_text";
import LoadingSpinner from "@/app/(main)/components/loading_spannier";
import ArticleCheckDialog from "@/app/admin/components/accept_changes";
import ArticleCheckDialogApprove from "@/app/admin/components/accept_changes_approve";
import MessageDialog from "@/app/admin/components/message";
import ReSubmit from "@/app/admin/components/resubmit";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchArticleById } from "@/app/api/slice/getArticleByIdSlice";
import {
  fetchArticlesByUser,
  updatePdfAndComments,
  updateUserProductionComments,
  uploadFinalFile,
} from "@/app/api/slice/getArticleSlice";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaRegCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Page = () => {
  const route = useRouter();
  const [selected, setSelected] = useState<number>(999999);
  const [search, setSearch] = useState("");
  const { token, user } = useAppSelector((state) => state.token);
  const [selectedFileOuter, setSelectedFileOuter] = useState<File>(); // file state

  const { loading, articles } = useAppSelector((state) => state.getArticle);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchArticlesByUser({ userEmail: user, token: token }));
  }, [dispatch, token, user]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div>
      <section className="min-h-screen  md:py-10 py-4">
        <div className="md:max-w-4xl mx-auto bg-white p-4 sm:p-8 md:rounded-2xl md:shadow-lg flex flex-col gap-6">
          {/* Header */}

          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CustomText
                text={"My Assigned"}
                style={"md:text-2xl sm:text-3xl font-extrabold text-gray-800"}
              />
              <CustomText
                text={"Overview of submissions assigned to you"}
                style={"text-sm text-gray-500 mt-1"}
              />
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <form role="search" className="relative">
                <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <CustomInput
                  onChange={(v) => setSearch(v.target.value)}
                  style="md:w-[300px] sm:w-80 pl-3 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  placeholder="Search submissions..."
                />
              </form>

              {/* Primary action */}
              <button
                onClick={() => {
                  route.push("/dashboard");
                }}
                type="button"
                className="inline-flex items-center gap-2 bg-[#000] text-white p-2  text-sm rounded-lg shadow hover:[#000] transition"
                aria-label="new submission"
              >
                New Submission
              </button>
            </div>
          </header>

          {articles.map((e) => {
            return (
              <div key={e.id}>
                {search !== "" && e.title.includes(search) ? (
                  <div key={e.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-md">
                          <CustomText
                            text={`00${e.id.toString()}`}
                            style={"text-sm"}
                          />
                        </div>
                        <div className="flex flex-col">
                          <CustomText
                            text={e.title}
                            style={"font-medium text-gray-700"}
                          />
                          <CustomText
                            text={e.subtitle}
                            style={"text-xs text-gray-400"}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageDialog
                            description={e.underReviewComments}
                            button="error"
                            bg="text-red-200"
                            title="Fix the details mentioned below and resubmit the article"
                          />
                          <CustomText text="1" style={"text-sm"} />
                        </div>

                        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-lg border border-red-100">
                          <FaRegCircle color="red" />
                          {e.modifyProduction === false ? (
                            e.modifyCopyEditor === true ? (
                              e.userComments != "" ? (
                                <CustomText text={"Submitted"} />
                              ) : (
                                <ReSubmit
                                  onConfirm={(v, file) =>
                                    dispatch(
                                      updatePdfAndComments({
                                        articleId: e.id,
                                        pdfFile: file,
                                        userComments: v,
                                      }),
                                    )
                                  }
                                  button="ReSubmit"
                                  description={e.underReviewComments}
                                />
                              )
                            ) : (
                              <CustomText
                                text={
                                  e.status === "pending" ? "OnReview" : e.status
                                }
                                style={"text-sm"}
                              />
                            )
                          ) : e.userProductionComments != "" &&
                            e.userProductionComments != null ? (
                            <ArticleCheckDialog
                              articleId={e.id}
                              onConfirm={(val, reson) => {
                                if (val === true) {
                                  dispatch(
                                    updateUserProductionComments({
                                      articleId: e.id,
                                      userProductionComments:
                                        "The user has accepted the changes",
                                    }),
                                  );
                                } else {
                                  dispatch(
                                    updateUserProductionComments({
                                      articleId: e.id,
                                      userProductionComments: reson ?? "",
                                    }),
                                  );
                                }
                              }}
                              description={e.underReviewComments}
                            />
                          ) : (
                            <CustomText text={e.status} />
                          )}
                        </div>

                        <button
                          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                          aria-haspopup="menu"
                          aria-label="View options"
                        >
                          <CustomText
                            text="View"
                            style={"text-sm"}
                            onTap={() => {
                              dispatch(fetchArticleById(e.id));
                              route.push("/view/submission_page");
                            }}
                          />
                        </button>
                        <button
                          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                          aria-haspopup="menu"
                          aria-label="View options"
                          onClick={() => {
                            if (e.id == selected) {
                              setSelected(999999);
                            } else {
                              setSelected(e.id);
                            }
                          }}
                        >
                          <IoIosArrowDown />
                        </button>
                      </div>
                    </div>

                    {selected == e.id ? (
                      <div className="mt-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                              <BiMessageRounded size={20} />
                            </div>
                            <div>
                              <CustomText
                                text={e.status}
                                style={"font-medium text-gray-700"}
                              />
                            </div>
                          </div>

                          <div className="ml-auto text-sm text-gray-400">
                            <CustomText
                              text={
                                e.createdAt !== "" && e.createdAt !== null
                                  ? e.createdAt
                                  : "2025-10-24"
                              }
                              style={"text-sm text-gray-400"}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : null}
                {search === "" ? (
                  <div key={e.id}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-indigo-50 text-indigo-700 font-semibold px-3 py-1 rounded-md">
                          <CustomText
                            text={`00${e.id.toString()}`}
                            style={"text-sm"}
                          />
                        </div>
                        <div className="flex flex-col">
                          <CustomText
                            text={e.title}
                            style={"font-medium text-gray-700"}
                          />
                          <CustomText
                            text={e.subtitle}
                            style={"text-xs text-gray-400"}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <MessageDialog
                            description={e.underReviewComments}
                            button="error"
                            bg="text-red-200"
                            title="Fix the details mentioned below and resubmit the article"
                          />
                          <CustomText text="1" style={"text-sm"} />
                        </div>

                        <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-lg border border-red-100">
                          <FaRegCircle color="red" />
                          {
                            e.modifyProduction === false ? (
                              e.modifyCopyEditor === true ? (
                                e.userComments != "" ? (
                                  <CustomText text={"Submitted"} />
                                ) : (
                                  <ReSubmit
                                    onConfirm={(v, file) =>
                                      dispatch(
                                        updatePdfAndComments({
                                          articleId: e.id,
                                          pdfFile: file,
                                          userComments: v,
                                        }),
                                      )
                                    }
                                    button="ReSubmit"
                                    description={e.underReviewComments}
                                  />
                                )
                              ) : (
                                <CustomText
                                  text={
                                    e.status === "pending"
                                      ? "OnReview"
                                      : e.status
                                  }
                                  style={"text-sm"}
                                />
                              )
                            ) : // : e.finalFile == "" && e.finalFile == null ? (

                            e.finalFile == null ? (
                              <ArticleCheckDialogApprove
                                title={`${e.finalFile}`}
                                selectedFile={selectedFileOuter?.name ?? ""}
                                setSelectedFile={(e) => {
                                  if (
                                    e.target.files &&
                                    e.target.files.length > 0
                                  ) {
                                    console.log("file", e.target.files[0]);
                                    setSelectedFileOuter(e.target.files[0]);
                                  }
                                }}
                                articleId={e.id}
                                onConfirm={(val, reson, file) => {
                                  console.log("the file in dialog is ", file);
                                  if (val === true) {
                                    if (selectedFileOuter) {
                                      dispatch(
                                        uploadFinalFile({
                                          user: e.id,
                                          finalFile: selectedFileOuter!,
                                        }),
                                      );
                                    }
                                    dispatch(
                                      updateUserProductionComments({
                                        articleId: e.id,
                                        userProductionComments:
                                          "The user has accepted the changes",
                                      }),
                                    );
                                  } else {
                                    dispatch(
                                      updateUserProductionComments({
                                        articleId: e.id,
                                        userProductionComments: reson ?? "",
                                      }),
                                    );
                                  }
                                }}
                                description={e.productionComments}
                              />
                            ) : (
                              <CustomText text={"Submitted"} />
                            )
                            // ) : (
                            //   <CustomText text={e.status} />
                            // )
                          }
                        </div>

                        <button
                          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                          aria-haspopup="menu"
                          aria-label="View options"
                        >
                          <CustomText
                            text="View"
                            style={"text-sm"}
                            onTap={() => {
                              dispatch(fetchArticleById(e.id));
                              route.push("/view/submission_page");
                            }}
                          />
                        </button>
                        <button
                          className="flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 hover:bg-gray-50 transition"
                          aria-haspopup="menu"
                          aria-label="View options"
                          onClick={() => {
                            if (e.id == selected) {
                              setSelected(999999);
                            } else {
                              setSelected(e.id);
                            }
                          }}
                        >
                          <IoIosArrowDown />
                        </button>
                      </div>
                    </div>

                    {selected == e.id ? (
                      <div className="mt-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm">
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                              <BiMessageRounded size={20} />
                            </div>
                            <div>
                              <CustomText
                                text={e.status}
                                style={"font-medium text-gray-700"}
                              />
                            </div>
                          </div>

                          <div className="ml-auto text-sm text-gray-400">
                            <CustomText
                              text={
                                e.createdAt !== "" && e.createdAt !== null
                                  ? e.createdAt
                                  : "2025-10-24"
                              }
                              style={"text-sm text-gray-400"}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Page;
