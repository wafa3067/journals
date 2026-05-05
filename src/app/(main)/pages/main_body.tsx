"use client";
import React, { useEffect } from "react";
import CustomText from "../components/custom_text";

import { MdKeyboardArrowRight } from "react-icons/md";
import EditorsList from "../components/EditorsList";

import CurrentMonthPage from "../components/CurrentArticlesPage";
import { CreateEditorHomeState } from "@/app/admin/adminSlice/editor/getEditorSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { AboutHomeGetPage } from "@/app/admin/adminSlice/home/GetHomeAboutSlice";
import { CreateGetSideHome } from "@/app/admin/adminSlice/sideHomeSlice/getHomeSideSlice";
import CircularLoading from "../components/circular_loadinng";

const MainBody = () => {
  const dispatch = useAppDispatch();
  const { editor } = useAppSelector((state) => state.getEditorHome);
  const { side } = useAppSelector((state) => state.getSideHome);
  useEffect(() => {
    dispatch(CreateEditorHomeState());
  }, [CreateEditorHomeState, dispatch]);

  const { about, success } = useAppSelector((state) => state.homeGet);
  useEffect(() => {
    dispatch(AboutHomeGetPage());
  }, [AboutHomeGetPage, dispatch]);

  useEffect(() => {
    dispatch(CreateGetSideHome());
  }, [CreateGetSideHome, dispatch]);

  if (!about || about.length === 0) {
    return <CircularLoading />;
  }
  return (
    <div className="" style={{ width: "100%" }}>
      <div className=" h-fit  ">
        <div className=" flex md:flex-row flex-col gap-3 pt-8 pb-8 w-full">
          <div className="md:w-[70%] bg-gray-100">
            <div className="   space-y-8  ">
              {success === false ? (
                <p>Loading...</p>
              ) : Array.isArray(about) && about.length > 0 ? (
                about.map((item, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                      {item.title}
                    </h2>
                    <p>{item.descriptions}</p>
                  </div>
                ))
              ) : (
                <p>No Data</p>
              )}
            </div>
          </div>
          <div className="md:w-[30%]">
            {side.map((item, index) => (
              <div key={index} className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h2>
                <p>{item.descriptions}</p>
              </div>
            ))}
          </div>
        </div>

        <EditorsList options={editor} />
        <CustomText
          style={
            "text-gray-500 border-b-4 border-b-[#f7bc49] font-bold  text-2xl  m-2 w-fit mb-5 pt-8"
          }
          text={"Current Issue"}
        />
        <CurrentMonthPage />
        <div className="flex flex-row gap-1.5 rounded-sm items-center bg-[#000] text-white hover:bg-amber-500 w-fit pl-2 pr-2 pt-1 pb-1">
          <CustomText text={"VIEW ALL ISSUES"} style={"text-white"} />
          <MdKeyboardArrowRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default MainBody;
