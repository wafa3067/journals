"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomText from "../components/custom_text";
import { useRouter } from "next/navigation";
import UserMenu from "../components/user_menu";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import { setProfileData } from "@/app/api/slice/profileStateSlice";
import { SlMenu } from "react-icons/sl";
import { RxCross1 } from "react-icons/rx";
import {
  fetchApprovedArticles,
  fetchPendingArticles,
  fetchTotalArticles,
} from "@/app/api/slice/fetchArticaleCount";
import { getToken } from "@/app/api/slice/getTokenSlice";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const FirstHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { token } = useAppSelector((state) => state.token);
  const result = useAppSelector((state) => state.profileData);

  const isLoggedIn = Boolean(token);

  const [menu, setMenu] = useState(0);
  const [show, setShow] = useState(0);

  const navigate = (route: string) => router.push(route);

  const options = [
    { id: 1, label: "Dashboard" },
    { id: 2, label: "View Profile" },
    { id: 3, label: "Logout" },
  ];

  useEffect(() => {
    if (token) {
      dispatch(fetchUserByEmail())
        .then((user) => dispatch(setProfileData(user)))
        .catch(console.error);
    }
  }, [dispatch, token]);

  const Navigating = (v: string) => {
    dispatch(fetchUserByEmail()).then((V) => {
      dispatch(setProfileData(V));
    });

    if (v === "Dashboard") {
      dispatch(fetchTotalArticles());
      dispatch(fetchPendingArticles());
      dispatch(fetchApprovedArticles());
      router.push("/dashboard");
    } else if (v === "View Profile") {
      router.push("/profile/identity");
    } else {
      router.push("/");
      localStorage.clear();
      dispatch(getToken(""));
    }
  };

  useEffect(() => {
    const routes = [
      "/editors",
      "/international_ad_board",
      "/publications_ethics",
      "/current",
      "/archive",
      "/manuscript",
      "/announce",
      "/aboutjournals",
      "/aboutsubmissions",
      "/privacy-policy",
      "/contact",
      "/news",
    ];
    routes.forEach((r) => router.prefetch(r));
  }, [router]);

  // ---------------- UI ----------------

  return (
    <header className="w-full">
      {/* ================= DESKTOP HEADER ================= */}
      <div className="hidden md:flex items-center justify-between h-27.5 px-6 bg-white">
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <Image
            src="/images/logoos.png"
            width={90}
            height={90}
            alt="logo"
            className="object-contain"
          />

          <div className="leading-tight">
            <p className="text-xl font-semibold text-black">
              The International Science Journals
            </p>
            <p className="text-sm text-gray-600">
              Research • Innovation • Publication
            </p>
          </div>
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <UserMenu
              options={options}
              starting={result.username}
              is_optins={true}
              selectedOpt={Navigating}
              textColor="#ffffff"
              bgColor="#00b4d8"
              hoverBgColor="#0F2A44"
              avatarBgColor="#ffffff"
              avatarTextColor="#000000"
              dropdownBgColor="#00b4d8"
              dropdownHoverBgColor="#ffffff"
              dropdownTextColor="#ffffff"
              dropdownHoverTextColor="#3F1005"
              arrowColor="#FFF8F0"
              fontSize="16px"
            />
          ) : (
            <div className="flex items-center gap-6">
              <CustomText
                text="Log in"
                style="text-black cursor-pointer hover:opacity-70 transition"
                onTap={() => navigate("/dashboard/login")}
              />
              <CustomText
                text="Register"
                style="text-black cursor-pointer hover:opacity-70 transition"
                onTap={() => navigate("/dashboard/register")}
              />
            </div>
          )}
        </div>
      </div>

      {/* ================= MOBILE HEADER ================= */}
      <div className="md:hidden bg-[#00b4d8] text-white ">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-3 h-17.5 w-full">
          <div className="flex items-center gap-2">
            {show === 0 ? (
              <SlMenu className="text-2xl" onClick={() => setShow(1)} />
            ) : (
              <RxCross1 className="text-2xl" onClick={() => setShow(0)} />
            )}

            <Image
              src="/images/lg2-removebg-preview.png"
              width={50}
              height={50}
              alt="logo"
              className="object-contain"
            />

            <p className="text-lg font-medium">Echos Quantum</p>
          </div>
        </div>

        {/* Mobile Menu */}
        {show === 1 && (
          <div className="px-3 pb-4 flex flex-col gap-3 text-sm">
            {/* Home */}
            <div
              onClick={() => {
                navigate("/");
                setShow(0);
              }}
            >
              <CustomText text="Home" style="cursor-pointer" />
            </div>

            {/* Publish */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setMenu(menu === 2 ? 0 : 2)}
            >
              <span>Publish</span>
              <IoIosArrowDown />
            </div>

            {menu === 2 && (
              <div className="pl-4 flex flex-col gap-2">
                <CustomText
                  text="Submit an article"
                  style="cursor-pointer"
                  onTap={() => {
                    isLoggedIn
                      ? navigate("/submissions/begin")
                      : navigate("/dashboard/login");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Authors Guidelines"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/author");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Publication Ethics"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/publications_ethics");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Privacy Policy"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/privacy-policy");
                    setShow(0);
                  }}
                />
              </div>
            )}

            {/* Issues */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setMenu(menu === 1 ? 0 : 1)}
            >
              <span>Issues</span>
              <IoIosArrowDown />
            </div>

            {menu === 1 && (
              <div className="pl-4 flex flex-col gap-2">
                <CustomText
                  text="Current"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/current");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Archive"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/archive");
                    setShow(0);
                  }}
                />
              </div>
            )}

            {/* About */}
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setMenu(menu === 3 ? 0 : 3)}
            >
              <span>About</span>
              <IoIosArrowDown />
            </div>

            {menu === 3 && (
              <div className="pl-4 flex flex-col gap-2">
                <CustomText
                  text="Aims and Scope"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/aims");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Editorial Board"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/editors");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Journal Insights"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/insights");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="News"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/news");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Announcements"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/announce");
                    setShow(0);
                  }}
                />
                <CustomText
                  text="Contact"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/contact");
                    setShow(0);
                  }}
                />
              </div>
            )}

            {/* Search */}
            <button
              className="flex items-center gap-2 mt-3 border-t border-b py-2"
              onClick={() => navigate("/search")}
            >
              <FaSearch />
              Search
            </button>

            {/* Auth */}
            <div className="mt-2">
              {isLoggedIn ? (
                <UserMenu
                  options={options}
                  starting={result.username}
                  is_optins={true}
                  selectedOpt={Navigating}
                  textColor="#00b4d8"
                  bgColor="#ffffff"
                  hoverBgColor="#0F2A44"
                  avatarBgColor="#00b4d8"
                  avatarTextColor="#ffffff"
                  dropdownBgColor="#ffffff"
                  dropdownHoverBgColor="#00b4d8"
                  dropdownTextColor="#00b4d8"
                  dropdownHoverTextColor="#ffffff"
                  arrowColor="#FFF8F0"
                  fontSize="16px"
                />
              ) : (
                <div className="flex gap-4">
                  <CustomText
                    text="Log in"
                    style="text-white"
                    onTap={() => navigate("/dashboard/login")}
                  />
                  <CustomText
                    text="Register"
                    style="text-white"
                    onTap={() => navigate("/dashboard/register")}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default FirstHeader;
