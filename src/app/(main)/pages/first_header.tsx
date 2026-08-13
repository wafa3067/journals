// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import CustomText from "../components/custom_text";
// import { useRouter } from "next/navigation";
// import UserMenu from "../components/user_menu";
// import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
// import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
// import { setProfileData } from "@/app/api/slice/profileStateSlice";
// import { SlMenu } from "react-icons/sl";
// import { RxCross1 } from "react-icons/rx";
// import {
//   fetchApprovedArticles,
//   fetchPendingArticles,
//   fetchTotalArticles,
// } from "@/app/api/slice/fetchArticaleCount";
// import { getToken } from "@/app/api/slice/getTokenSlice";
// import { FaSearch } from "react-icons/fa";
// import { IoIosArrowDown } from "react-icons/io";

// const FirstHeader = () => {
//   const router = useRouter();
//   const dispatch = useAppDispatch();

//   const { token } = useAppSelector((state) => state.token);
//   const result = useAppSelector((state) => state.profileData);

//   const isLoggedIn = Boolean(token);

//   const [menu, setMenu] = useState(0);
//   const [show, setShow] = useState(0);

//   const navigate = (route: string) => router.push(route);

//   const options = [
//     { id: 1, label: "Dashboard" },
//     { id: 2, label: "View Profile" },
//     { id: 3, label: "Logout" },
//   ];

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchUserByEmail())
//         .then((user) => dispatch(setProfileData(user)))
//         .catch(console.error);
//     }
//   }, [dispatch, token]);

//   const Navigating = (v: string) => {
//     dispatch(fetchUserByEmail()).then((V) => {
//       dispatch(setProfileData(V));
//     });

//     if (v === "Dashboard") {
//       dispatch(fetchTotalArticles());
//       dispatch(fetchPendingArticles());
//       dispatch(fetchApprovedArticles());
//       router.push("/dashboard");
//     } else if (v === "View Profile") {
//       router.push("/profile/identity");
//     } else {
//       router.push("/");
//       localStorage.clear();
//       dispatch(getToken(""));
//     }
//   };

//   useEffect(() => {
//     const routes = [
//       "/editors",
//       "/international_ad_board",
//       "/publications_ethics",
//       "/current",
//       "/archive",
//       "/manuscript",
//       "/announce",
//       "/aboutjournals",
//       "/aboutsubmissions",
//       "/privacy-policy",
//       "/contact",
//       "/news",
//     ];
//     routes.forEach((r) => router.prefetch(r));
//   }, [router]);

//   // ---------------- UI ----------------

//   return (
//     <header className="w-full">
//       {/* ================= DESKTOP HEADER ================= */}
//       <div className="hidden md:flex items-center justify-between h-27.5 px-6 bg-white">
//         {/* Logo Section */}
//         <div className="flex items-center gap-4">
//           <Image
//             src="/images/logoos.png"
//             width={200}
//             height={90}
//             alt="logo"
//             className="object-contain"
//           />

//           <div className="leading-tight">
//             <p className="text-xl font-semibold text-black">
//               An International Quantum Journal
//             </p>
//             <p className="text-sm text-gray-600">
//               Science,Technology,Engineering & Mathematics
//             </p>
//           </div>
//         </div>

//         {/* User Section */}
//         <div className="flex items-center gap-4">
//           {isLoggedIn ? (
//             <UserMenu
//               options={options}
//               starting={result.username}
//               is_optins={true}
//               selectedOpt={Navigating}
//               textColor="#ffffff"
//               bgColor="#00b4d8"
//               hoverBgColor="#0F2A44"
//               avatarBgColor="#ffffff"
//               avatarTextColor="#000000"
//               dropdownBgColor="#00b4d8"
//               dropdownHoverBgColor="#ffffff"
//               dropdownTextColor="#ffffff"
//               dropdownHoverTextColor="#3F1005"
//               arrowColor="#FFF8F0"
//               fontSize="16px"
//             />
//           ) : (
//             <div className="flex items-center gap-6">
//               <CustomText
//                 text="Log in"
//                 style="text-black cursor-pointer hover:opacity-70 transition"
//                 onTap={() => navigate("/dashboard/login")}
//               />
//               <CustomText
//                 text="Register"
//                 style="text-black cursor-pointer hover:opacity-70 transition"
//                 onTap={() => navigate("/dashboard/register")}
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ================= MOBILE HEADER ================= */}
//       <div className="md:hidden bg-[#00b4d8] text-white ">
//         {/* Top Bar */}
//         <div className="flex items-center justify-between px-3 h-17.5 w-full">
//           <div className="flex items-center gap-2">
//             {show === 0 ? (
//               <SlMenu className="text-2xl" onClick={() => setShow(1)} />
//             ) : (
//               <RxCross1 className="text-2xl" onClick={() => setShow(0)} />
//             )}

//             <Image
//               src="/images/logoos.png"
//               width={100}
//               height={100}
//               alt="logo"
//               className="object-cover "
//             />

//             <p className="text-lg font-medium">Echos Quantum</p>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {show === 1 && (
//           <div className="px-3 pb-4 flex flex-col gap-3 text-sm">
//             {/* Home */}
//             <div
//               onClick={() => {
//                 navigate("/");
//                 setShow(0);
//               }}
//             >
//               <CustomText text="Home" style="cursor-pointer" />
//             </div>

//             {/* Publish */}
//             <div
//               className="flex items-center gap-1 cursor-pointer"
//               onClick={() => setMenu(menu === 2 ? 0 : 2)}
//             >
//               <span>Publish</span>
//               <IoIosArrowDown />
//             </div>

//             {menu === 2 && (
//               <div className="pl-4 flex flex-col gap-2">
//                 <CustomText
//                   text="Submit an article"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     isLoggedIn
//                       ? navigate("/submissions/begin")
//                       : navigate("/dashboard/login");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Authors Guidelines"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/author");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Publication Ethics"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/publications_ethics");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Privacy Policy"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/privacy-policy");
//                     setShow(0);
//                   }}
//                 />
//               </div>
//             )}

//             {/* Issues */}
//             <div
//               className="flex items-center gap-1 cursor-pointer"
//               onClick={() => setMenu(menu === 1 ? 0 : 1)}
//             >
//               <span>Issues</span>
//               <IoIosArrowDown />
//             </div>

//             {menu === 1 && (
//               <div className="pl-4 flex flex-col gap-2">
//                 <CustomText
//                   text="Current"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/current");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Archive"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/archive");
//                     setShow(0);
//                   }}
//                 />
//               </div>
//             )}

//             {/* About */}
//             <div
//               className="flex items-center gap-1 cursor-pointer"
//               onClick={() => setMenu(menu === 3 ? 0 : 3)}
//             >
//               <span>About</span>
//               <IoIosArrowDown />
//             </div>

//             {menu === 3 && (
//               <div className="pl-4 flex flex-col gap-2">
//                 <CustomText
//                   text="Aims and Scope"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/aims");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Editorial Board"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/editors");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Journal Insights"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/insights");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Professional Development"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/news");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Advertising & Services"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/announce");
//                     setShow(0);
//                   }}
//                 />
//                 <CustomText
//                   text="Contact"
//                   style="cursor-pointer"
//                   onTap={() => {
//                     navigate("/contact");
//                     setShow(0);
//                   }}
//                 />
//               </div>
//             )}

//             {/* Search */}
//             <button
//               className="flex items-center gap-2 mt-3 border-t border-b py-2"
//               onClick={() => navigate("/search")}
//             >
//               <FaSearch />
//               Search
//             </button>

//             {/* Auth */}
//             <div className="mt-2">
//               {isLoggedIn ? (
//                 <UserMenu
//                   options={options}
//                   starting={result.username}
//                   is_optins={true}
//                   selectedOpt={Navigating}
//                   textColor="#00b4d8"
//                   bgColor="#ffffff"
//                   hoverBgColor="#0F2A44"
//                   avatarBgColor="#00b4d8"
//                   avatarTextColor="#ffffff"
//                   dropdownBgColor="#ffffff"
//                   dropdownHoverBgColor="#00b4d8"
//                   dropdownTextColor="#00b4d8"
//                   dropdownHoverTextColor="#ffffff"
//                   arrowColor="#FFF8F0"
//                   fontSize="16px"
//                 />
//               ) : (
//                 <div className="flex gap-4">
//                   <CustomText
//                     text="Log in"
//                     style="text-white"
//                     onTap={() => navigate("/dashboard/login")}
//                   />
//                   <CustomText
//                     text="Register"
//                     style="text-white"
//                     onTap={() => navigate("/dashboard/register")}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default FirstHeader;

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
  const [aboutMenu, setAboutMenu] = useState(0);
  const [show, setShow] = useState(0);

  const navigate = (route: string) => {
    router.push(route);
  };

  // =========================
  // USER MENU
  // =========================

  const options = [
    { id: 1, label: "Dashboard" },
    { id: 2, label: "View Profile" },
    { id: 3, label: "Logout" },
  ];

  // =========================
  // FETCH USER PROFILE
  // =========================

  useEffect(() => {
    if (token) {
      dispatch(fetchUserByEmail())
        .then((user) => {
          dispatch(setProfileData(user));
        })
        .catch(console.error);
    }
  }, [dispatch, token]);

  // =========================
  // USER MENU NAVIGATION
  // =========================

  const Navigating = (value: string) => {
    dispatch(fetchUserByEmail()).then((user) => {
      dispatch(setProfileData(user));
    });

    if (value === "Dashboard") {
      dispatch(fetchTotalArticles());
      dispatch(fetchPendingArticles());
      dispatch(fetchApprovedArticles());

      router.push("/dashboard");
    } else if (value === "View Profile") {
      router.push("/profile/identity");
    } else {
      router.push("/");
      localStorage.clear();
      dispatch(getToken(""));
    }
  };

  // =========================
  // PREFETCH ROUTES
  // =========================

  useEffect(() => {
    const routes = [
      "/",

      // Publish
      "/submissions/begin",
      "/aboutsubmissions",
      "/author",
      "/publications_ethics",
      "/privacy-policy",

      // Issues
      "/current",
      "/archive",

      // About
      "/aims",
      "/editors",
      "/insights",
      "/contact",

      // Professional Development
      "/news",
      "/careers",
      "/conferences",

      // Advertising & Services
      "/advertising",
      "/services",
      "/partnership",

      // Search
      "/search",

      // Authentication
      "/dashboard/login",
      "/dashboard/register",
    ];

    routes.forEach((route) => {
      router.prefetch(route);
    });
  }, [router]);

  // =========================
  // UI
  // =========================

  return (
    <header className="w-full">
      {/* =====================================================
          DESKTOP HEADER
      ===================================================== */}

      <div className="hidden md:flex items-center justify-between h-27.5 px-6 bg-white">
        {/* ================= LOGO SECTION ================= */}

        <div className="flex items-center gap-4">
          <Image
            src="/images/logoos.png"
            width={200}
            height={90}
            alt="logo"
            className="object-contain"
          />

          <div className="leading-tight">
            <p className="text-xl font-semibold text-black">
              An International Quantum Journal
            </p>

            <p className="text-sm text-gray-600">
              Science,Technology,Engineering & Mathematics
            </p>
          </div>
        </div>

        {/* ================= USER SECTION ================= */}

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

      {/* =====================================================
          MOBILE HEADER
      ===================================================== */}

      <div className="md:hidden bg-[#00b4d8] text-white">
        {/* ================= MOBILE TOP BAR ================= */}

        <div className="flex items-center justify-between px-3 h-17.5 w-full">
          <div className="flex items-center gap-2">
            {show === 0 ? (
              <SlMenu
                className="text-2xl cursor-pointer"
                onClick={() => setShow(1)}
              />
            ) : (
              <RxCross1
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setShow(0);
                  setMenu(0);
                }}
              />
            )}

            <Image
              src="/images/logoos.png"
              width={100}
              height={100}
              alt="logo"
              className="object-cover"
            />

            <p className="text-lg font-medium">Echos Quantum</p>
          </div>
        </div>

        {/* =================================================
            MOBILE MENU
        ================================================= */}

        {show === 1 && (
          <div className="px-3 pb-4 flex flex-col gap-3 text-sm">
            {/* ================= HOME ================= */}

            <div
              onClick={() => {
                navigate("/");
                setShow(0);
                setMenu(0);
              }}
              className="cursor-pointer"
            >
              <CustomText text="Home" style="cursor-pointer" />
            </div>

            {/* =================================================
                PUBLISH
            ================================================= */}

            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setMenu(menu === 2 ? 0 : 2)}
            >
              <span>Publish</span>
              <IoIosArrowDown />
            </div>

            {menu === 2 && (
              <div className="pl-4 flex flex-col gap-2">
                {/* Submit an Article */}

                <CustomText
                  text="Submit an article"
                  style="cursor-pointer"
                  onTap={() => {
                    isLoggedIn
                      ? navigate("/submissions/begin")
                      : navigate("/dashboard/login");

                    setShow(0);
                    setMenu(0);
                  }}
                />

                {/* Authors Guidelines */}

                <CustomText
                  text="Authors Guidelines"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/author");
                    setShow(0);
                    setMenu(0);
                  }}
                />

                {/* Publication Ethics */}

                <CustomText
                  text="Publication Ethics"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/publications_ethics");
                    setShow(0);
                    setMenu(0);
                  }}
                />

                {/* Privacy Policy */}

                <CustomText
                  text="Privacy Policy"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/privacy-policy");
                    setShow(0);
                    setMenu(0);
                  }}
                />
              </div>
            )}

            {/* =================================================
                ISSUES
            ================================================= */}

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
                    setMenu(0);
                  }}
                />

                <CustomText
                  text="Archive"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/archive");
                    setShow(0);
                    setMenu(0);
                  }}
                />
              </div>
            )}

            {/* =================================================
                ABOUT
            ================================================= */}

            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setMenu(menu === 3 ? 0 : 3)}
            >
              <span>About</span>
              <IoIosArrowDown />
            </div>

            {menu === 3 && (
              <div className="pl-4 flex flex-col gap-2">
                {/* Aims and Scope */}

                <CustomText
                  text="Aims and Scope"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/aims");
                    setShow(0);
                    setMenu(0);
                  }}
                />

                {/* Editorial Board */}

                <CustomText
                  text="Editorial Board"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/editors");
                    setShow(0);
                    setMenu(0);
                  }}
                />

                {/* Journal Insights */}

                <CustomText
                  text="Journal Insights"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/insights");
                    setShow(0);
                    setMenu(0);
                  }}
                />

                {/* =========================================
                    PROFESSIONAL DEVELOPMENT
                ========================================= */}

                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setAboutMenu(aboutMenu === 4 ? 3 : 4)}
                >
                  <span>Professional Development</span>
                  <IoIosArrowDown />
                </div>

                {aboutMenu === 4 && (
                  <div className="pl-4 flex flex-col gap-2">
                    <CustomText
                      text="Awards"
                      style="cursor-pointer"
                      onTap={() => {
                        navigate("/news");
                        setShow(0);
                        setMenu(0);
                      }}
                    />

                    <CustomText
                      text="Careers"
                      style="cursor-pointer"
                      onTap={() => {
                        navigate("/careers");
                        setShow(0);
                        setMenu(0);
                      }}
                    />

                    <CustomText
                      text="Conferences"
                      style="cursor-pointer"
                      onTap={() => {
                        navigate("/conferences");
                        setShow(0);
                        setMenu(0);
                      }}
                    />
                  </div>
                )}

                {/* =========================================
                    ADVERTISING & SERVICES
                ========================================= */}

                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setAboutMenu(aboutMenu === 5 ? 3 : 5)}
                >
                  <span>Advertising & Services</span>
                  <IoIosArrowDown />
                </div>

                {aboutMenu === 5 && (
                  <div className="pl-4 flex flex-col gap-2">
                    <CustomText
                      text="Advertising"
                      style="cursor-pointer"
                      onTap={() => {
                        navigate("/advertising");
                        setShow(0);
                        setMenu(0);
                      }}
                    />

                    <CustomText
                      text="Services"
                      style="cursor-pointer"
                      onTap={() => {
                        navigate("/services");
                        setShow(0);
                        setMenu(0);
                      }}
                    />

                    <CustomText
                      text="Partnerships"
                      style="cursor-pointer"
                      onTap={() => {
                        navigate("/partnership");
                        setShow(0);
                        setMenu(0);
                      }}
                    />
                  </div>
                )}

                {/* Contact */}

                <CustomText
                  text="Contact"
                  style="cursor-pointer"
                  onTap={() => {
                    navigate("/contact");
                    setShow(0);
                    setMenu(0);
                  }}
                />
              </div>
            )}

            {/* =================================================
                SEARCH
            ================================================= */}

            <button
              className="flex items-center gap-2 mt-3 border-t border-b py-2"
              onClick={() => {
                navigate("/search");
                setShow(0);
                setMenu(0);
              }}
            >
              <FaSearch />
              Search
            </button>

            {/* =================================================
                AUTH
            ================================================= */}

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
                    style="text-white cursor-pointer"
                    onTap={() => {
                      navigate("/dashboard/login");
                      setShow(0);
                    }}
                  />

                  <CustomText
                    text="Register"
                    style="text-white cursor-pointer"
                    onTap={() => {
                      navigate("/dashboard/register");
                      setShow(0);
                    }}
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
