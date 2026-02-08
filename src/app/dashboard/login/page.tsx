"use client";
import CustomButton from "@/app/(main)/components/custom_button";
import CustomInput from "@/app/(main)/components/custom_input";
import CustomText from "@/app/(main)/components/custom_text";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { clearError } from "@/app/api/slice/auth";
import { loginUser } from "@/app/api/slice/login";

type Props = {};

const page = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const [localError, setLocalError] = useState(""); // Renamed to avoid conflict

  const {
    loadings, // Fixed: removed colon
    errors,
    isAuthenticated,
  } = useAppSelector((state) => state.login);
  const router = useRouter();
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async () => {
    if (!email.trim() && !password.trim()) {
      setLocalError("Enter Email and Password");
      return;
    }
    const result = await dispatch(loginUser({ email, password }));
    if (result.payload["token"] != "" && result.payload["token"] != null) {
      router.push("/");
    }
  };
  const Navigate = (route: any) => {
    router.push(route);
  };

  const displayError = errors ?? localError;
  const isLoading = loadings || false; // Adjust based on your Redux state structure
  return (
    <div className="w-full  min-h-screen justify-center flex items-center">
      <div className="w-[300px] md:w-[550px] p:2 md:p-10 p-4 place-items-center justify-center bg-white shadow-lg rounded-md  m-3">
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
            style={"font-bold  md:text-2xl  pb-5 "}
          />
        </div>
        <CustomText
          text={"Welcome to Echos Quantum"}
          style={"font-bold  md:text-2xl  pb-5 "}
        />

        <CustomInput
          style="w-[250px] md:w-[500px] mb-2"
          placeholder="Email"
          onChange={(v) => setEmail(v.target.value)}
        />
        <CustomInput
          type="password"
          style="w-[250px] md:w-[500px] m-2"
          placeholder="Password"
          onChange={(v) => setPassword(v.target.value)}
        />
        {displayError && (
          <div className="flex flex-row gap-2 mb-5 mt-3 w-[250px] md:w-[500px]">
            <CustomText text={displayError} style={"text-red-500"} />
          </div>
        )}
        <div className="flex flex-row gap-2 mb-5 mt-3 w-[280px] md:w-[500px]">
          <CustomText text={"Dont have an account?"} />{" "}
          <CustomText
            onTap={() => Navigate("/dashboard/register")}
            text={" Register"}
            style={"font-bold text-blue-400 pb-2 text-sm  cursor-pointer"}
          />
        </div>

        <CustomButton
          width="w-[250px] md:w-[500px]"
          bgColor="bg-[#000]"
          hoverEffect="hover:bg-[#f7bc49]"
          rounded="8px"
          text="Login"
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  );
};

export default page;
