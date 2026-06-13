"use client";

import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CustomDropdown from "../components/custom_dropdown";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import { setProfileData } from "@/app/api/slice/profileStateSlice";
import { Contact } from "lucide-react";

const SecondHeader = () => {
  const [selected, setSelected] = useState<string>("Home");
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
    { id: 1, label: "Aims and Scope" },
    { id: 2, label: "Editorial Board" },
    { id: 3, label: "Journal Insights" },
    { id: 4, label: "Professional Development" },
    { id: 5, label: "Advertising & Services" },
    { id: 6, label: "Contact" },
  ];
  const publish = [
    { id: 1, label: "Submit an article" },
    { id: 2, label: "Authors Guidelines" },
    { id: 2, label: "Publication Ethics" },
    { id: 3, label: "Privacy Policy" },
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
      "/submissions/begin",
    ];

    routes.forEach((route) => router.prefetch(route));
  }, [router]);

  return (
    <div className="w-full border-b bg-[#00b4d8] p-4  justify-between items-center md:flex hidden">
      <div className="flex flex-wrap gap-3">
        <CustomDropdown
          selectedOption={selected || undefined}
          starting="Home"
          options={options}
          is_optins={false}
          onTap={() => {
            navigate("/");
            setSelected("Home");
          }}
          onChange={(value: string): void => {
            setSelected(value);
          }}
        />
        <CustomDropdown
          starting="publish"
          options={publish}
          is_optins={true}
          selectedOption={selected}
          onTap={() => {
            // if (token != null && token != "" && token != undefined) {
            //   navigate("/submissions/begin");
            //   setSelected("Submit an article");
            //   return;
            // }
            // navigate("/dashboard/login");
            // // navigate("/aboutsubmissions");
            // setSelected("Submit an article");
          }}
          onChange={(val) => {
            const routes: Record<string, string> = {
              "Submit an article": "/aboutsubmissions",
              "Authors Guidelines": "/author",
              "Publication Ethics": "/publications_ethics",
              "Privacy Policy": "/privacy-policy",
            };
            if (val === "Submit an article") {
              if (token != null && token != "" && token != undefined) {
                navigate("/submissions/begin");
                setSelected("Submit an article");
                return;
              }
              navigate("/dashboard/login");
              // navigate("/aboutsubmissions");
              setSelected("Submit an article");
              return;
            }
            navigate(routes[val]);
          }}
        />
        {/* <CustomDropdown
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
        /> */}

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

        {/* <CustomDropdown
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
        /> */}

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
              "Editorial Board": "/editors",
              "Aims and Scope": "/aims",
              "Journal Insights": "/insights",
              News: "/news",
              Announcements: "/announce",
              Contact: "/contact",
            };
            navigate(routes[val]);
          }}
        />
      </div>

      <button
        className=" text-white px-4 py-2 rounded flex items-center gap-2 bg-[#00b4d8] transition"
        onClick={() => navigate("/search")}
      >
        <FaSearch className="text-sm" />
        Search
      </button>
    </div>
  );
};

export default SecondHeader;
