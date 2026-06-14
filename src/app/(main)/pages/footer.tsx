import React from "react";
import CustomText from "../components/custom_text";

const Footer = () => {
  return (
    <div className=" flex flex-col h-45 bg-[#f2f2f2] items-end  ">
      <div className="flex w-full">
        <div className="w-100">
          <a
            href="https://www.linkedin.com/in/photal-khan-5859aa151?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black "
          ></a>
        </div>
        <div className="flex flex-col w-full items-end justify-center">
          <CustomText
            text={"A project of Enchanting Horizons of Science"}
            style={"font-semibold w-fit pr-2 pb-2"}
          />
          <CustomText
            text={"(ECHOS)"}
            style={"font-semibold w-fit pr-2 pb-2"}
          />
          <CustomText
            text={"Registered 2020"}
            style={"font-semibold  w-fit pr-2 pb-10 "}
          />
        </div>
      </div>
      <div className="h-[30] bg-[#00b4d8] w-full"></div>
    </div>
  );
};

export default Footer;
