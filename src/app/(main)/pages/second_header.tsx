"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CustomDropdown from "../components/custom_dropdown";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import { setProfileData } from "@/app/api/slice/profileStateSlice";

const SecondHeader = () => {
  const [selected, setSelected] = useState<string>();
  const router = useRouter();
  const navigate = (route: string) => router.push(route);
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchUserByEmail())
        .then((user) => {
          dispatch(setProfileData(user));
        })
        .catch(console.error);
    }
  }, [dispatch, token]);
  const options = [
    { id: 1, label: "CURRENT" },
    { id: 2, label: "ARCHIVES" },
  ];
  const announce = [
    { id: 1, label: "News" },
    { id: 2, label: "Announcements" },
  ];

  const about = [
    { id: 1, label: "ABOUT THE JOURNALS" },

    { id: 2, label: "CONTACT" },
  ];

  useEffect(() => {
    const routes = [
      "/editors",
      "/aboutsubmissions",
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
    <div className="w-full border-b bg-black p-4  justify-between items-center md:flex hidden">
      <div className="flex flex-wrap gap-3">
        <CustomDropdown
          starting="Submit an article"
          options={options}
          is_optins={false}
          selectedOption={selected}
          onTap={() => {
            if (token != null && token != "" && token != undefined) {
              navigate("/submissions/begin");
              setSelected("Submit an article");
              return;
            }
            navigate("/dashboard/login");
            // navigate("/aboutsubmissions");
            setSelected("Submit an article");
          }}
          onChange={() => {
            // setSelected("Submit an article");
          }}
        />
        <CustomDropdown
          selectedOption={selected || undefined}
          starting="Editorial Team"
          options={options}
          is_optins={false}
          onTap={() => {
            navigate("/editors");
            setSelected("Editorial Team");
          }}
          onChange={(value: string): void => {
            setSelected(value);
          }}
        />

        <CustomDropdown
          selectedOption={selected || undefined}
          starting="Issues"
          options={options}
          onTap={() => {
            setSelected("Issues");
          }}
          is_optins={true}
          onChange={(val) =>
            val === "CURRENT" ? navigate("/current") : navigate("/archive")
          }
        />

        <CustomDropdown
          selectedOption={selected || undefined}
          starting="Announcement"
          options={announce}
          is_optins={true}
          onTap={() => {
            // navigate("/announce");
            setSelected("Announcement");
          }}
          onChange={(val) => {
            const routes: Record<string, string> = {
              Announcements: "/announce",
              News: "/news",
            };
            navigate(routes[val]);
          }}
        />

        <CustomDropdown
          selectedOption={""}
          starting="About"
          options={about}
          onTap={() => {
            setSelected("About");
          }}
          is_optins={true}
          onChange={(val) => {
            const routes: Record<string, string> = {
              "ABOUT THE JOURNALS": "/aboutjournals",
              CONTACT: "/contact",
            };
            navigate(routes[val]);
          }}
        />
      </div>

      <button
        className="bg-[#000000] text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-[#000] transition"
        onClick={() => navigate("/search")}
      >
        <FaSearch className="text-sm" />
        Search
      </button>
    </div>
  );
};

export default SecondHeader;
