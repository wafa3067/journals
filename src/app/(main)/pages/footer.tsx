import React from "react";
import CustomText from "../components/custom_text";

const Footer = () => {
  return (
    <div className=" flex flex-col h-[180px] bg-[#f2f2f2] items-end  ">
      <CustomText text={"CopyRight"} style={"text-2xl  w-fit pr-2 pb-2"} />
      <CustomText text={"2026"} style={"text-2xl  w-fit pr-2 pb-2"} />
      <CustomText
        text={"ISSN: 2957-4083"}
        style={"text-2xl font-bold  w-fit pr-2 pb-10 "}
      />
      <div className="h-[30] bg-[#000] w-full"></div>
    </div>
  );
};

export default Footer;
