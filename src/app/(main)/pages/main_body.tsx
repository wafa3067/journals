import Image from "next/image";
import React from "react";
import CustomText from "../components/custom_text";
import Journals from "../components/journals";
import Articles from "../components/article";
import { MdKeyboardArrowRight } from "react-icons/md";
import EditorsList from "../components/EditorsList";
import CurrentArticlesPage from "../components/CurrentArticlesPage";
import ArchiveMonthPage from "../archive/[year]/[month]/page";
import CurrentMonthPage from "../components/CurrentArticlesPage";

type Props = {};

const MainBody = (props: Props) => {
  return (
    <div className="" style={{ width: "100%" }}>
      <div className=" h-fit  ">
        <div className=" flex md:flex-row flex-col gap-3 pt-8 pb-8 w-full">
          <div className="md:w-[70%] bg-gray-100">
            <CustomText
              style={"text-black p-2 font-bold text-2xl"}
              text={"About the Journal"}
            />
            <CustomText
              style={"text-black p-2 font-normal "}
              text={
                "ECHOS Quantum is an international open-access journal publishing original research and reviews within the field of Quantum Science and Technology."
              }
            />
            {/* Aim and Scope */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Spotlight:
              </h2>
              <p>
                ECHOS Quantum coovers interdisciplinary research disciplines
                including physics, chemistry, biology, metrology, computing,
                information theory, communications, economics, and finance. The
                broad spectrum of topics thus aims at developing quantum
                technologies across various scientific and industrial domains.
                The journal has a flexible approach to article lengths and
                welcomes submission of longer papers that provide depth and
                authority in their subject areas.
              </p>
            </section>

            {/* Publication Details */}

            {/* Editorial Board */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Frequency
              </h2>
              <p>
                ECHOS Quantum will be published annually with its issues
                released in December of each year.
              </p>
            </section>
          </div>
          <div className="md:w-[30%]">
            <CustomText
              style={"text-black p-2 font-bold text-2xl"}
              text={"Article publishing options"}
            />
            <CustomText
              style={"text-black p-2 font-bold "}
              text={"Open Access"}
            />
            <CustomText
              style={"text-black p-2 font-normal "}
              text={
                "Article Publishing Charge (APC): USD 3,310 (excluding taxes). The amount you pay may be reduced during submission if applicable."
              }
            />
            <CustomText
              style={"text-black p-2 font-bold "}
              text={"Subscription"}
            />
            <CustomText
              style={"text-black p-2 font-normal "}
              text={
                "No publication fee charged to authors, and published articles are immediately available to subscribers."
              }
            />
          </div>
        </div>

        <EditorsList />
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
