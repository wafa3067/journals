"use client";

import { useRouter } from "next/navigation";
import CheckText from "../../(main)/components/check_title";
import CustomButton from "../../(main)/components/custom_button";
import CustomText from "../../(main)/components/custom_text";
import DropDownMenu from "../../(main)/components/dropdown_menu";
import EditorInput from "../../(main)/components/editor_input";
import { Edit } from "lucide-react";
import React, { useEffect, useState, useTransition } from "react";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";

import {
  updateComment,
  updateContinue,
  updateCopyright,
  updateError,
  updateFileType,
  updatePreviousPublished,
  updatePrivacypolicy,
  updateRefrencedUrl,
  updateSection,
  updateSetSection,
  updateTextStyle,
  updateTextStylic,
} from "@/app/api/slice/beginSlice";
import { updateTab } from "@/app/api/providers/tab_bar";
import LoadingSpinner from "@/app/(main)/components/loading_spannier";

const Page = () => {
  const dispatch = useAppDispatch();
  const research = useAppSelector((state) => state.begin);
  useEffect(() => {
    // ✅ This runs only when the page fully loads
    dispatch(updateTab("initial-requirements"));
  }, [dispatch]);

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const Navigate = (route: string) => {
    setIsLoading(true);
    startTransition(() => {
      router.push(route);
    });
  };

  return (
    <div className=" flex-col  bg-gray-50 flex items-center justify-center p-6  overflow-scroll ">
      <div className="w-full md:max-w-5xl md:bg-white/95 backdrop-blur-sm md:rounded-2xl md:shadow-lg md:border md:border-gray-100 p-8">
        <div className="flex items-center gap-3 mb-4">
          <Edit className="text-[#000] w-6 h-6" />
          <h1 className="text-2xl font-semibold text-gray-800">
            New Submission
          </h1>
        </div>

        <div className="space-y-4">
          <CustomText
            text={"Choose a Section"}
            style={"lg:w-[740px] sm:w-[300px]"}
          />
          <DropDownMenu
            onChange={(v) => dispatch(updateSection(v))}
            country={research.section}
            countries={[
              "Articles",
              "Communication",
              "Review Article",
              "Technical Note",
            ]}
          />

          <CustomText
            text={"Write Comments for Editor"}
            style={"w-full mt-2"}
          />
          <div className="mb-15">
            <EditorInput
              onChange={(v) => dispatch(updateComment(v))}
              value={research.comment}
            />
          </div>
          <CustomText
            text={"Submission follows the journal's guidelines for authors."}
            style={"w-full mt-2 font-bold "}
          />

          <CheckText
            error={
              research.continue == false
                ? ""
                : research.previousPublished === ""
                  ? "This field is required"
                  : ""
            }
            check={research.previousPublished}
            width="w-full"
            title="The submission has not been previously published, nor is it before another journal for consideration (or an explanation has been provided in Comments to the Editor)."
            onChange={() => {
              if (research.previousPublished) {
                dispatch(updatePreviousPublished(""));
              } else {
                dispatch(updatePreviousPublished("yes"));
              }
            }}
          />
          <CheckText
            error={
              research.continue == false
                ? ""
                : research.fileType === ""
                  ? "This field is required"
                  : ""
            }
            check={research.fileType}
            width="w-full"
            title="The submission file is in OpenOffice, Microsoft Word, or RTF document file format."
            onChange={() => {
              if (research.fileType) {
                dispatch(updateFileType(""));
              } else {
                dispatch(updateFileType("yes"));
              }
            }}
          />
          <CheckText
            error={
              research.continue == false
                ? ""
                : research.refrencedUrl === ""
                  ? "This field is required"
                  : ""
            }
            check={research.refrencedUrl}
            width="w-full"
            title="Where available, URLs for the references have been provided."
            onChange={() => {
              if (research.refrencedUrl) {
                dispatch(updateRefrencedUrl("no"));
              } else {
                dispatch(updateRefrencedUrl("yes"));
              }
            }}
          />

          <CheckText
            check={research.textStyle}
            required={true}
            error={
              research.continue == false
                ? ""
                : research.setsection === ""
                  ? "This field is required"
                  : ""
            }
            width="w-full"
            title="The text is single-spaced; uses a 12-point font; employs italics, rather than underlining (except with URL addresses); and all illustrations, figures, and tables are placed within the text at the appropriate points, rather than at the end."
            onChange={(text: string) => {
              dispatch(updateSetSection(text));

              if (research.textStyle) {
                dispatch(updateTextStyle(""));
              } else {
                dispatch(updateTextStyle("yes"));
              }
            }}
          />
          <CheckText
            check={research.textStylic}
            required={true}
            error={
              research.continue == false
                ? ""
                : research.textStylic === ""
                  ? "This field is required"
                  : ""
            }
            width="w-full"
            title="The text adheres to the stylistic and bibliographic requirements outlined in the Author Guidelines."
            onChange={(text: string) => {
              dispatch(updateSetSection(text));
              if (research.textStylic) {
                dispatch(updateTextStylic(""));
              } else {
                dispatch(updateTextStylic("yes"));
              }
            }}
          />

          <div>
            <CustomText
              text={"Acknowledge the copyright statement"}
              style={"w-full mt-2 font-bold"}
            />
            <CustomText
              text={
                "Submission is an admission by the authors that the manuscript has neither been previously published nor is being considered for publication elsewhere. A statement transferring copyright from the authors to Yarmouk University is required before the manuscript can be accepted for publication. The necessary form for such transfer is supplied by the Editor-in-Chief. Reproduction of any part of the contents of a published work is forbidden without a written permission by the Editor-in-Chief."
              }
              style={"w-full mt-2 text-gray-600 mb-3"}
            />
            <CheckText
              check={research.copyright}
              required={true}
              error={
                research.continue == false
                  ? ""
                  : research.copyright === ""
                    ? "This field is required"
                    : ""
              }
              width="w-full"
              title=" Yes, I agree to abide by the terms of the copyright statement."
              onChange={(text: string) => {
                dispatch(updateSetSection(text));
                if (research.copyright) {
                  dispatch(updateCopyright(""));
                } else {
                  dispatch(updateCopyright("yes"));
                }
              }}
            />
            <div className="mt-3"></div>
            <CheckText
              check={research.privacypolicy}
              required={true}
              error={
                research.continue == false
                  ? ""
                  : research.privacypolicy === ""
                    ? "This field is required"
                    : ""
              }
              width="w-full"
              title=" Yes, I agree to have my data collected and stored according to the privacy statement."
              onChange={(text: string) => {
                dispatch(updateSetSection(text));
                if (research.privacypolicy) {
                  dispatch(updatePrivacypolicy(""));
                } else {
                  dispatch(updatePrivacypolicy("yes"));
                }
              }}
            />
          </div>
          {research.customError && (
            <CustomText
              text={research.customError}
              style={"w-full mt-2 text-red-600"}
            />
          )}
          <div className="flex justify-end mt-4 gap-2">
            {isLoading || isPending ? (
              <LoadingSpinner />
            ) : (
              <CustomButton
                text="Next"
                bgColor="bg-[#000]"
                hoverEffect="hover:bg-[#f7bc49]"
                rounded="8px"
                onClick={() => {
                  dispatch(updateContinue(true));
                  if (
                    research.section.length != 0 &&
                    research.comment != "<p><br></p>" &&
                    research.previousPublished.length != 0 &&
                    research.fileType.length != 0 &&
                    research.refrencedUrl.length != 0 &&
                    research.textStyle.length != 0 &&
                    research.textStylic.length != 0 &&
                    research.copyright.length != 0 &&
                    research.privacypolicy.length != 0
                  ) {
                    Navigate("/submissions/upload");
                  } else {
                    dispatch(updateError("All Fields are required"));
                  }
                }}
              />
            )}
            <CustomButton
              onClick={() => {
                Navigate("/dashboard");
              }}
              text="Cancel"
              rounded="rounded-[8px]"
              textColor="black"
              bgColor={"bg-[#cccccc]"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
