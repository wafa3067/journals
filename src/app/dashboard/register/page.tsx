"use client";
import { CountryDropdown } from "@/app/(main)/components/country_dropdown";
import CustomButton from "@/app/(main)/components/custom_button";
import CustomInput from "@/app/(main)/components/custom_input";
import CustomText from "@/app/(main)/components/custom_text";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { clearError, registerUser } from "@/app/api/slice/auth";

const Page = () => {
  const dispatch = useAppDispatch();
  const {
    loadings, // Fixed: removed colon
    errors,
    isAuthenticated,
  } = useAppSelector((state) => state.auth);

  const router = useRouter();
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [country, setCountry] = useState("Select a country");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(""); // Renamed to avoid conflict

  const Navigate = (route: string) => {
    // Added type for route
    router.push(route);
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard/login");
    }
  }, [isAuthenticated, router]);

  // Effect to handle Redux errors
  useEffect(() => {
    if (errors) {
      setLocalError(errors);
    }
  }, [errors]);

  const validateForm = (): boolean => {
    // Check required fields
    if (
      !givenName.trim() ||
      !familyName.trim() ||
      !affiliation.trim() ||
      !country.trim() ||
      country === "Select a country" ||
      !email.trim() ||
      !username.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setLocalError("All fields are required");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return false;
    }

    // Password validation
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long");
      return false;
    }

    // Username validation
    if (username.length < 3) {
      setLocalError("Username must be at least 3 characters long");
      return false;
    }

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      setLocalError(
        "Username can only contain letters, numbers, and underscores",
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setLocalError("");
    dispatch(clearError());

    if (!validateForm()) {
      return;
    }

    try {
      const registrationData = {
        givenName,
        familyName,
        affiliation,
        country,
        email,
        username,
        password,
        status: "active",
        emailVerified: false,
      };

      const result = await dispatch(registerUser(registrationData));

      console.log("Registration successful:", result);
      // Redirection will happen automatically due to useEffect
    } catch (err) {
      console.error("Registration failed:", err);
      // Error is already set in Redux state and will be handled by useEffect
    }
  };

  const displayError = localError || errors;
  const isLoading = loadings || false; // Adjust based on your Redux state structure

  return (
    <div className="w-full place-items-center justify-center bg-white p-5">
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
          style={"font-bold md:text-2xl pb-5"}
        />
      </div>
      <CustomText
        text={"Welcome to Echos Quantum"}
        style={"font-bold md:text-2xl pb-5"}
      />

      <CustomInput
        style="w-[250px] md:w-[500px] m-2"
        placeholder="Given Name"
        value={givenName}
        onChange={(v) => setGivenName(v.target.value)}
      />
      <CustomInput
        style="w-[250px] md:w-[500px] m-2"
        placeholder="Family Name"
        value={familyName}
        onChange={(v) => setFamilyName(v.target.value)}
      />
      <CustomInput
        style="w-[250px] md:w-[500px] m-2"
        placeholder="Affiliation"
        value={affiliation}
        onChange={(v) => setAffiliation(v.target.value)}
      />
      <CustomInput
        style="w-[250px] md:w-[500px] m-2"
        placeholder="Username"
        value={username}
        onChange={(v) => setUsername(v.target.value)}
      />

      <div className="w-[250px] md:w-[500px] m-2 h-[56px]">
        <CountryDropdown
          onChange={(v) => setCountry(v.name)}
          placeholder={country}
          defaultValue={country}
        />
      </div>

      <CustomInput
        style="w-[250px] md:w-[500px] mb-2"
        placeholder="Email"
        value={email}
        onChange={(v) => setEmail(v.target.value)}
      />

      <CustomInput
        type="password"
        style="w-[250px] md:w-[500px] m-2"
        placeholder="Password"
        value={password}
        onChange={(v) => setPassword(v.target.value)}
      />

      <CustomInput
        type="password"
        style="w-[250px] md:w-[500px] m-2 mb-5"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(v) => setConfirmPassword(v.target.value)}
      />

      {displayError && (
        <div className="flex flex-row gap-2 mb-5 mt-3 w-[250px] md:w-[500px]">
          <CustomText text={displayError} style={"text-red-500"} />
        </div>
      )}

      <div className="flex flex-row gap-2 mb-5 mt-3 w-[250px] md:w-[500px]">
        <CustomText text={"Have an account?"} />
        <CustomText
          onTap={() => Navigate("/dashboard/login")}
          text={" Log In"}
          style={"font-bold text-blue-400 pb-2 cursor-pointer"}
        />
      </div>

      <CustomButton
        width="w-[250px] md:w-[500px]"
        bgColor="bg-[#000]"
        hoverEffect="hover:bg-[#f7bc49]"
        rounded="8px"
        text={isLoading ? "Registering..." : "Register"}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Page;
