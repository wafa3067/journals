"use client";
import AlertDialogDemo from "@/app/(main)/components/alerdialog";
import CustomArea from "@/app/(main)/components/areaCustom";
import CustomButton from "@/app/(main)/components/custom_button";
import CustomInput from "@/app/(main)/components/custom_input";
import CustomText from "@/app/(main)/components/custom_text";
import EditContributorDialog from "@/app/(main)/components/editalert";
import EditorInput from "@/app/(main)/components/editor_input";
import LoadingSpinner from "@/app/(main)/components/loading_spannier";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { updateTab } from "@/app/api/providers/tab_bar";
import {
  checkAllFieldsComplete,
  Contributor,
  removeContributor,
  updateAbstracts,
  updateKeywords,
  updatePrefix,
  updateReferences,
  updateSubtitle,
  updateTitle,
} from "@/app/api/slice/metaData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { FaTrash } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";

const Page = () => {
  const dispatch = useAppDispatch();
  const research = useAppSelector((state) => state.meta);
  useEffect(() => {
    // ✅ This runs only when the page fully loads
    dispatch(updateTab("meta-data"));
  }, [dispatch]);

  const goBack = () => {
    Navigate("/submissions/upload");
  };

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [active, setActive] = useState(false);
  const [isPending, startTransition] = useTransition();

  const Navigate = (route: string) => {
    setIsLoading(true);
    startTransition(() => {
      router.push(route);
    });
  };

  return (
    <main
      className=" md:w-5xl   md:mx-auto flex flex-col  md:bg-white m-10 p-6 md:rounded-md justify-start items-center md:shadow-lg"
      style={{
        padding: 20,
        fontFamily: "system-ui, -apple-system, Roboto, 'Segoe UI', Arial",
        display: "flex",
        gap: 24,
      }}
    >
      <div className="flex flex-row gap-4 justify-center  ">
        <CustomText
          style={
            "font-bold text-black border-b-2 border-b-slate-500  text-sm md:text-base"
          }
          text={"Article’s details"}
        />
      </div>
      <div className="flex flex-row gap-4 ">
        <CustomInput
          error={
            active
              ? research.prefix.length == 0
                ? "Prefeix is required"
                : ""
              : ""
          }
          value={research.prefix}
          style={"lg:w-[140px]  w-[70px] "}
          placeholder={`The,A`}
          onChange={(v) => dispatch(updatePrefix(v.target.value))}
        />

        <CustomInput
          error={
            active
              ? research.title.length == 0
                ? "Title is required"
                : ""
              : ""
          }
          value={research.title}
          style={"lg:w-[580px] w-[200px]"}
          placeholder={"Title"}
          onChange={(v) => dispatch(updateTitle(v.target.value))}
        />
      </div>
      <CustomInput
        error={""}
        value={research.subtitle}
        style={"lg:w-[740px] w-[290px]"}
        placeholder={"Sub Title"}
        onChange={(v) => dispatch(updateSubtitle(v.target.value))}
      />
      <CustomText
        style={"font-normal text-black h-1 lg:w-[740px] sm:w-[320px]"}
        text={"Abstract"}
      />
      <EditorInput
        error={
          active
            ? research.abstracts === "<p><br></p>"
              ? "Abstract  is required"
              : ""
            : ""
        }
        value={research.abstracts}
        style="lg:w-[740px] w-[290px] h-[200px] mb-10 md:mb-0"
        onChange={(v) => {
          dispatch(updateAbstracts(v));
        }}
      />

      <div className="flex flex-col lg:w-185 w-[290px] ">
        <div className="mt-10 lg:w-[740px] w-[290px] justify-between items-center flex flex-row   ">
          <CustomText
            text={"List of Contributors"}
            style={"font-bold text-sm md:text-base"}
          />
          <AlertDialogDemo />
        </div>
        <div className="flex flex-col border-2 mt-3  overflow-x-scroll">
          <table className="table-auto border-collapse border border-gray-300 w-full max-w-185 text-sm ">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-3 py-2 text-left w-30 text-sm md:text-base">
                  Name
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left w-45 text-sm md:text-base">
                  Email
                </th>
                <th className="border border-gray-300 px-3 py-2 text-left w-25 text-sm md:text-base">
                  Role
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center w-30 text-sm md:text-base">
                  Primary
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center w-30 text-sm md:text-base">
                  Browser List
                </th>
                <th className="border border-gray-300 px-3 py-2 text-center w-30 text-sm md:text-base ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {research.contributorsList.map((val: Contributor, index) => (
                <tr
                  key={index}
                  className={`hover:bg-gray-50 cursor-pointer ${
                    research.browser === index ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="border border-gray-300 px-3 py-2 truncate text-sm md:text-base">
                    {val.publicName}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 truncate text-sm md:text-base">
                    {val.email}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-sm md:text-base">
                    {val.role}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm md:text-base">
                    {val.primaryContact ? (
                      <MdOutlineDone className="text-[#00b4d8] inline-block" />
                    ) : (
                      <IoIosClose className="text-red-500 inline-block" />
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center text-sm md:text-base">
                    {val.inBrowserlist ? (
                      <MdOutlineDone className="text-[#00b4d8] inline-block" />
                    ) : (
                      <IoIosClose className="text-red-500 inline-block" />
                    )}
                  </td>
                  <td className="border border-gray-300 px-3 py-2 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // prevent row toggle
                          // dispatch(updateBrowswe(val.publicName));
                        }}
                        className="#00b4d8 hover:text-[#0096c7]"
                      >
                        <EditContributorDialog
                          key={index}
                          editIndex={index}
                          triggerLabel="Edit"
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // dispatch(deleteContributor(val.email)); // you can implement this action
                        }}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash
                          onClick={() => dispatch(removeContributor(index))}
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* // keywords section */}
      <div className="flex flex-col justify-end mt-4 lg:w-185 w-72.5 ">
        <CustomText
          text={"Keywords"}
          style={"lg:w-[740px] w-[290px] h-[30px] font-bold "}
        />
        <CustomInput
          error={
            active
              ? research.keywords.length == 0
                ? "Keywords is required"
                : ""
              : ""
          }
          value={research.keywords}
          onChange={(v) => dispatch(updateKeywords(v.target.value))}
          style={"lg:w-[740px] w-[290px] "}
          placeholder={"Enter keywords separated by commas"}
        />
      </div>
      {/* // refresnce section */}
      <div className="flex flex-col justify-end mt-4 lg:w-185 w-72.5 ">
        <CustomText
          text={"reviewer’s names"}
          style={"lg:w-[740px] w-[290px] h-[30px] font-bold "}
        />
        <area className="w-full p-3 text-gray-800 text-[10px] md:text-base" />
        <CustomArea
          error={
            active
              ? research.references.length == 0
                ? "reviewer’s names is required"
                : ""
              : ""
          }
          value={research.references}
          style={"lg:w-[740px] w-[290px] h-[150px] "}
          placeholder={""}
          onChange={(v) => dispatch(updateReferences(v.target.value))}
        />
      </div>
      {error && <CustomText text={error} style={"text-red-400 mt-10"} />}
      <div className=" lg:w-[740px] sm:w-[320px] flex justify-end mt-4 gap-2">
        <CustomButton
          text="Back"
          rounded="rounded-[8px]"
          bgColor={"bg-[#00b4d8]"}
          onClick={() => goBack()}
        />
        {isLoading || isPending ? (
          <LoadingSpinner />
        ) : (
          <CustomButton
            text="Next"
            rounded="rounded-[8px]"
            bgColor={"bg-[#00b4d8]"}
            onClick={() => {
              setActive(true);
              const isComplete = checkAllFieldsComplete(research);
              //console.log(isComplete);
              if (isComplete === false) {
                setError(
                  "Please fill all required fields and add at least one contributor!",
                );
              } else if (isComplete === true) {
                setError("");
                Navigate("/submissions/confirmations");
              }
            }}
          />
        )}
        <CustomButton
          text="Cancel"
          rounded="rounded-[8px]"
          textColor="black"
          bgColor={"bg-[#cccccc]"}
          onClick={() => {
            Navigate("/dashboard");
          }}
        />
      </div>
    </main>
  );
};

export default Page;
