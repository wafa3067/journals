"use client";
import { CountryDropdown } from "@/app/(main)/components/country_dropdown";
import CustomButton from "@/app/(main)/components/custom_button";
import CustomInput from "@/app/(main)/components/custom_input";
import CustomText from "@/app/(main)/components/custom_text";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const Navigate = (route: string) => {
    router.push(route);
  };
  return (
    <div className="w-full]  place-items-center justify-center bg-white  p-5  ">
      <div className="h-[35px] flex flex-row gap-2 mb-3">
        <Image
          color="white"
          height={35}
          width={35}
          src="/images/logo3.png"
          alt="Echos Quantum Logo"
        />
        <CustomText
          text={"Echos Quantum"}
          style={"font-bold text-2xl  pb-5 "}
        />
      </div>
      <CustomText
        text={"Welcome to Echos Quantum"}
        style={"font-bold text-2xl  pb-5 "}
      />
      <CustomInput style="w-[500px] m-2" placeholder="Enter your Given Name" />
      <CustomInput style="w-[500px] m-2" placeholder="Enter your Family Name" />
      <CustomInput style="w-[500px] m-2" placeholder="Enter your Affiliation" />
      <CustomInput style="w-[500px] m-2" placeholder="Enter your Username" />
      <CustomInput style="w-[500px] m-2" placeholder="Enter your Country" />
      <div className="w-[500px] m-2  h-[56px]">
        <CountryDropdown />
      </div>
      <CustomInput style="w-[500px] mb-2" placeholder="Enter your Email" />
      <CustomInput style="w-[500px] m-2" placeholder="Enter your Password" />
      <CustomInput
        style="w-[500px] m-2 mb-5"
        placeholder="Enter Retype password"
      />
      <div className="flex flex-row gap-2 mb-5 mt-3 w-[500px]">
        <CustomText text={"Have an account?"} />{" "}
        <CustomText
          onTap={() => Navigate("/dashboard/login")}
          text={" Log In"}
          style={"font-bold text-blue-400 pb-2  cursor-pointer"}
        />
      </div>
      <CustomButton
        width="w-[500px]"
        bgColor="bg-[#000]"
        hoverEffect="hover:bg-[#f7bc49]"
        rounded="8px"
        text="Register"
        onClick={() => Navigate("/dashboard/login")}
      />
    </div>
  );
};

export default Page;
