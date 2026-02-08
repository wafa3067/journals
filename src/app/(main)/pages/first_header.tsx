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
import CustomDropdown from "../components/custom_dropdown";

const FirstHeader = () => {
  const { token } = useAppSelector((state) => state.token);

  const router = useRouter();
  const result = useAppSelector((state) => state.profileData);
  const Navigate = (route: any) => {
    router.push(route);
  };

  const options = [
    { id: 1, label: "Dashboard" },
    { id: 2, label: "View Profile" },
    { id: 3, label: "Logout" },
  ];

  const [menu, setMenu] = useState(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserByEmail())
        .then((user) => {
          dispatch(setProfileData(user));
        })
        .catch(console.error);
    }
  }, [token]);

  const Navigating = (v: string) => {
    const data = dispatch(fetchUserByEmail());
    data.then((V) => {
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
      localStorage.clear(); // simpler way to remove all
      dispatch(getToken("")); // clear token in redux store
    }
  };

  useEffect(() => {
    router.prefetch("/dashboard");
    router.prefetch("/profile/identity");
  }, []);

  const [selected, setSelected] = useState<string>();
  const [show, setShow] = useState<number>(0);

  const navigate = (route: string) => router.push(route);

  const announce = [
    { id: 1, label: "News" },
    { id: 2, label: "Announcements" },
  ];

  const about = [
    { id: 1, label: "ABOUT THE JOURNALS" },
    { id: 2, label: "SUBMISSIONS" },
    { id: 3, label: "PRIVACY STATEMENTS" },
    { id: 4, label: "CONTACT" },
  ];

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

    routes.forEach((route) => router.prefetch(route));
  }, [router]);

  return (
    <div>
      <div
        className="h-[120px] flex-row md:justify-between items-center  hidden md:flex"
        style={{
          backgroundColor: "#ffffff",

          gap: 10,
          padding: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
            gap: 10,
            padding: 20,
          }}
        >
          <Image
            className="h-[200px] w-[200px]"
            src={"/images/logoos.png"}
            height={100}
            width={70}
            objectFit="cover"
            alt={"no image"}
          />
          <p className="text-2xl" style={{ color: "black" }}>
            The International Science Journals
          </p>
        </div>

        <div className="items-center justify-start gap-2.5 p-5  hidden md:flex ">
          {token != null && token != "" ? (
            <UserMenu
              options={options}
              starting={result.username}
              is_optins={true}
              selectedOpt={(v) => Navigating(v)}
              onTap={() => console.log("Clicked UserMenu")}
              textColor="#671509"
              bgColor="#F5F5F5"
              hoverBgColor="#0F2A44"
              avatarBgColor="#F9D7B9"
              avatarTextColor="#671509"
              dropdownBgColor="#F9D7B9"
              dropdownHoverBgColor="#E8B58D"
              dropdownTextColor="#671509"
              dropdownHoverTextColor="#3F1005"
              arrowColor="#FFF8F0"
              fontSize="16px"
            />
          ) : (
            <div className="flex items-center gap-4">
              <CustomText
                text="Log in"
                style="text-black cursor-pointer"
                onTap={() => Navigate("/dashboard/login")}
              />
              <CustomText
                text="Register"
                style="text-black cursor-pointer"
                onTap={() => Navigate("/dashboard/register")}
              />
            </div>
          )}
        </div>
      </div>
      {/* mobile view */}
      <div className="h-[70px] flex-col   md:hidden flex bg-[#000000]  ">
        <div
          className="pl-2"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          {show === 0 ? (
            <SlMenu
              className="text-2xl text-white "
              onClick={() => setShow(1)}
            />
          ) : (
            <RxCross1
              className="text-2xl text-white "
              onClick={() => setShow(0)}
            />
          )}

          <Image
            className="h-[70px] w-[70px]"
            src={"/images/lg2-removebg-preview.png"}
            height={50}
            width={50}
            objectFit="cover"
            alt={"no image"}
          />
          <p className="text-2xl" style={{ color: "white" }}>
            Echos Quantum
          </p>
        </div>
        <div
          className={`relative w-full border-b bg-[#000] pl-2 text-white ${
            show === 1 ? "" : "hidden"
          } `}
        >
          <div className="flex flex-col gap-3 text-white">
            <CustomText
              style={"cursor-pointer"}
              onTap={() => {
                if (token != null && token != "" && token != undefined) {
                  navigate("/submissions/begin");
                  setSelected("Submit an article");
                  return;
                }
                navigate("/dashboard/login");
                // navigate("/aboutsubmissions");
                setSelected("Submit an article");

                setShow(0);
              }}
              text={"Submit an article"}
            />

            <CustomText
              style={"cursor-pointer"}
              onTap={() => {
                setShow(0);
                navigate("/editors");
                setSelected("Editorial Team");
              }}
              text={"Editorial Team"}
            />

            <div
              className="flex  items-center gap-1"
              onClick={() => {
                if (menu === 1) {
                  setMenu(0);
                } else {
                  setMenu(1);
                }
                setSelected("Issues");
              }}
            >
              <CustomText style={"cursor-pointer"} text={"Issues"} />
              <IoIosArrowDown className="text-white" />
            </div>

            <CustomText
              style={`cursor-pointer pl-5 ${menu === 1 ? "flex" : "hidden"}`}
              onTap={() => {
                setSelected("CURRENT");
                setShow(0);
                navigate("/current");
              }}
              text={"Current"}
            />
            <CustomText
              style={`cursor-pointer pl-5 ${menu === 1 ? "flex" : "hidden"}`}
              onTap={() => {
                setShow(0);
                navigate("/archive");
              }}
              text={"Archive"}
            />

            <div
              className="flex  items-center gap-1"
              onClick={() => {
                if (menu === 2) {
                  setMenu(0);
                } else {
                  setMenu(2);
                }
                setSelected("Announcement");
              }}
            >
              <CustomText style={"cursor-pointer"} text={"Announcement"} />
              <IoIosArrowDown className="text-white" />
            </div>

            <CustomText
              style={`cursor-pointer pl-5 ${menu === 2 ? "flex" : "hidden"}`}
              onTap={() => {
                setSelected("CURRENT");
                setShow(0);
                navigate("/announce");
              }}
              text={"Announcements"}
            />
            <CustomText
              style={`cursor-pointer pl-5 ${menu === 2 ? "flex" : "hidden"}`}
              onTap={() => {
                setShow(0);
                navigate("/news");
              }}
              text={"News"}
            />

            <div
              className="flex  items-center gap-1"
              onClick={() => {
                if (menu === 3) {
                  setMenu(0);
                } else {
                  setMenu(3);
                }
                setSelected("about");
              }}
            >
              <CustomText style={"cursor-pointer"} text={"About"} />
              <IoIosArrowDown className="text-white" />
            </div>

            <CustomText
              style={`cursor-pointer pl-5 ${menu === 3 ? "flex" : "hidden"}`}
              onTap={() => {
                setShow(0);
                setSelected("CURRENT");
                navigate("/aboutjournals");
              }}
              text={"ABOUT THE JOURNALS"}
            />

            <CustomText
              style={`cursor-pointer pl-5 ${menu === 3 ? "flex" : "hidden"}`}
              onTap={() => {
                setShow(0);
                navigate("/contact");
              }}
              text={"CONTACT"}
            />
          </div>

          <button
            className="bg-[#000]  text-white  flex items-center gap-2 hover:bg-[#000] transition border-t-1 border-b-1 border-gray-300 pr-2 pt-2 mt-5 mb-2 pb-2 w-[99%]"
            onClick={() => {
              navigate("/search");
              setShow(0);
            }}
          >
            <FaSearch className="text-sm" />
            Search
          </button>

          <div className="items-center justify-start gap-2.5 p-5   ">
            {token != null && token != "" ? (
              <UserMenu
                options={options}
                starting={result.username}
                is_optins={true}
                selectedOpt={(v) => Navigating(v)}
                onTap={() => console.log("Clicked UserMenu")}
                textColor="#671509"
                bgColor="#F5F5F5"
                hoverBgColor="#0F2A44"
                avatarBgColor="#F9D7B9"
                avatarTextColor="#671509"
                dropdownBgColor="#F9D7B9"
                dropdownHoverBgColor="#E8B58D"
                dropdownTextColor="#671509"
                dropdownHoverTextColor="#3F1005"
                arrowColor="#FFF8F0"
                fontSize="16px"
              />
            ) : (
              <div className="flex items-center gap-4">
                <CustomText
                  text="Log in"
                  style="text-white cursor-pointer"
                  onTap={() => Navigate("/dashboard/login")}
                />
                <CustomText
                  text="Register"
                  style="text-white cursor-pointer"
                  onTap={() => Navigate("/dashboard/register")}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstHeader;
