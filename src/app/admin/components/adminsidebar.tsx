"use client";

import CustomText from "@/app/(main)/components/custom_text";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
interface type {
  open: boolean;
  setOpen(val: boolean): void;
}

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState("");

  const reviewStages = [
    {
      name: "Under Review",
      href: "/admin/underreview",
      status: "under review",
    },
    {
      name: "Copyediting",
      href: "/admin/copyeditor",
      status: "copyediting",
    },
    {
      name: "Production",
      href: "/admin/production",
      status: "production",
    },
  ];

  const articleStages = [
    { name: "Pending", href: "/admin/pending", status: "pending" },
    { name: "Approved", href: "/admin/approved", status: "approved" },
    { name: "Rejected", href: "/admin/rejected", status: "rejected" },
  ];

  const menuItems = [
    { name: "Articles", href: "#", icon: "📄", hasDropdown: true },
    { name: "Under Review", href: "#", icon: "👥", hasDropdown: true },
    { name: "User Management", href: "/admin/users", icon: "👥" },
    { name: "Settings", href: "#", icon: "⚙️" },
  ];

  const settingsStages = [
    { name: "Home", icon: "🏠", href: "/admin/setting/home" },
    { name: "Team", icon: "👥", href: "/admin/setting/team" },
    { name: "Contact", icon: "📞", href: "/admin/setting/contact" },
    { name: "News", icon: "📰", href: "/admin/setting/news" },
    { name: "Announcements", icon: "📢", href: "/admin/setting/announcement" },
    {
      name: "publication ethics",
      icon: "⚖️", // Scales/Gavel to represent ethics, law, or fairness
      href: "/admin/setting/publications",
    },
    {
      name: "Aims and Scope",
      icon: "🎯", // Bullseye to represent goals and scope
      href: "/admin/setting/aims",
    },
    {
      name: "Journal Insights",
      icon: "📊", // Chart to represent data, analytics, and insights
      href: "/admin/setting/insights",
    },
    {
      name: "Contact info",
      icon: "📞", // Telephone or Email (✉️) to represent communication
      href: "/admin/setting/contact_info",
    },
    {
      name: "Authors Guidelines", // Corrected spelling
      icon: "📝", // Memo/Pencil to represent writing and instructions
      href: "/admin/setting/author_guidlines",
    },
  ];

  const isReviewActive = reviewStages.some((stage) =>
    pathname.includes(stage.href),
  );
  const isArticlesActive = articleStages.some((stage) =>
    pathname.includes(stage.href),
  );

  const [open, setOpen] = useState(false);

  return (
    <div className="h-full">
      <div className="w-72 bg-[#00b4d8]  shadow-lg  flex-col h-full hidden  md:block">
        {/* Header */}
        <div className="p-5 border-b border-gray-200 flex items-center">
          <h2 className="    text-sm font-bold text-white">Admin Portal</h2>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col p-2  h-[calc(100vh-80px)] px-2 overflow-x-scroll">
          {menuItems.map((item, index) => {
            const isActive =
              (item.hasDropdown &&
                ((item.name === "Articles" && isArticlesActive) ||
                  (item.name === "Under Review" && isReviewActive))) ||
              pathname === item.href;

            // Dropdowns
            if (item.hasDropdown) {
              const stages =
                item.name === "Articles" ? articleStages : reviewStages;
              const isOpen =
                item.name === "Articles" ? isArticlesOpen : isReviewOpen;
              const toggleOpen =
                item.name === "Articles"
                  ? () => setIsArticlesOpen(!isArticlesOpen)
                  : () => setIsReviewOpen(!isReviewOpen);

              return (
                <div key={index} className="mb-2">
                  <button
                    onClick={toggleOpen}
                    className={`flex items-center justify-between w-full px-6 py-3 hover:text-black font-medium rounded-lg transition-all ${
                      isActive ? "bg-white text-black" : "text-white"
                    } hover:bg-white`}
                  >
                    <div className="flex items-center hover:text-black">
                      <span
                        className="mr-3 text-xl hover:color-white color-black "
                        color={isActive ? "white" : "black"}
                      >
                        {item.icon}
                      </span>
                      {item.name}
                    </div>
                    <span
                      className={`transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {stages.map((stage, stageIndex) => {
                        const isStageActive = pathname === stage.href;
                        return (
                          <Link
                            key={stageIndex}
                            href={stage.href}
                            className={`flex items-center px-4 py-2 hover:text-black text-sm rounded-lg transition-all ${
                              isStageActive
                                ? "bg-blue-100 text-black font-medium"
                                : "text-white hover:bg-white"
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-current mr-3"></span>
                            {stage.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal links
            return (
              <div key={index}>
                {item.name === "Settings" && (
                  <button
                    onClick={(v) => {
                      if (item.name === "Settings") {
                        if (isSettingsOpen === "Settings") {
                          setIsSettingsOpen("");
                        } else {
                          setIsSettingsOpen("Settings");
                        }
                      }
                    }}
                    className={`flex items-center justify-between hover:text-black w-full px-6 py-3 font-medium rounded-lg transition-all ${
                      isActive ? "bg-white text-black" : "text-white"
                    } hover:bg-white`}
                  >
                    <div className="flex items-center">
                      <span className="mr-3 text-xl">{item.icon}</span>
                      {item.name}
                    </div>
                    <span
                      className={`transform transition-transform ${
                        isSettingsOpen === "Settings" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                )}
                {item.name === "User Management" && (
                  <Link
                    onClick={(v) => {
                      if (item.name === "Settings") {
                        if (isSettingsOpen === "Settings") {
                          setIsSettingsOpen("");
                        } else {
                          setIsSettingsOpen("Settings");
                        }
                      }
                    }}
                    key={index}
                    href={item.href}
                    className={`flex items-center px-6 py-3 hover:text-black font-medium rounded-lg mb-2 transition-all ${
                      isActive ? "bg-white text-black" : "text-white"
                    } hover:bg-white`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
                {item.name === isSettingsOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {settingsStages.map((item, stageIndex) => {
                      const isStageActive = pathname === item.href;
                      return (
                        <Link
                          key={stageIndex}
                          href={item.href}
                          className={`flex items-center px-6 py-3 hover:text-black font-medium rounded-lg mb-2 transition-all ${
                            isActive ? "bg-white text-black" : "text-white"
                          } hover:bg-white`}
                        >
                          <span className="mr-3 text-xl">{item.icon}</span>
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="my-4 border-t border-gray-200"></div>
        </nav>
      </div>

      <div className="bg-[#00b4d8] flex flex-row items-center w-full">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-3  text-white hover:text-black  h-16 block   md:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <CustomText text="Admin Panel" style="text-white" />
      </div>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-[#00b4d8]/50 z-40"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#00b4d8] shadow-lg z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg text-white">Admin Portal</h2>
          <button onClick={() => setOpen(false)} className="text-white">
            ✖
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-2 flex flex-col  px-2  h-screen overflow-y-scroll">
          {menuItems.map((item, index) => {
            const isActive =
              (item.hasDropdown &&
                ((item.name === "Articles" && isArticlesActive) ||
                  (item.name === "Under Review" && isReviewActive))) ||
              pathname === item.href;

            // Dropdowns
            if (item.hasDropdown) {
              const stages =
                item.name === "Articles" ? articleStages : reviewStages;
              const isOpen =
                item.name === "Articles" ? isArticlesOpen : isReviewOpen;
              const toggleOpen =
                item.name === "Articles"
                  ? () => setIsArticlesOpen(!isArticlesOpen)
                  : () => setIsReviewOpen(!isReviewOpen);

              return (
                <div key={index} className="mb-2">
                  <button
                    onClick={toggleOpen}
                    className={`flex items-center justify-between w-full px-6 py-3 font-medium rounded-lg transition-all ${
                      isActive ? "bg-white text-black" : "text-white"
                    } hover:bg-white`}
                  >
                    <div className="flex items-center  hover:text-black">
                      <span className="mr-3 text-xl ">{item.icon}</span>
                      {item.name}
                    </div>
                    <span
                      className={`transform transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>

                  {isOpen && (
                    <div className="ml-8 mt-1 space-y-1">
                      {stages.map((stage, stageIndex) => {
                        const isStageActive = pathname === stage.href;
                        return (
                          <Link
                            key={stageIndex}
                            href={stage.href}
                            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-all ${
                              isStageActive
                                ? "bg-blue-100 text-black font-medium"
                                : "text-white hover:bg-white"
                            }`}
                          >
                            <span className="w-2 h-2 rounded-full bg-current mr-3"></span>
                            {stage.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Normal links
            return (
              <div key={index}>
                {item.name === "Settings" && (
                  <button
                    onClick={(v) => {
                      if (item.name === "Settings") {
                        if (isSettingsOpen === "Settings") {
                          setIsSettingsOpen("");
                        } else {
                          setIsSettingsOpen("Settings");
                        }
                      }
                    }}
                    className={`flex items-center justify-between    w-full px-6 py-3 font-medium rounded-lg transition-all ${
                      isActive ? "bg-white text-green-200" : "text-white"
                    } hover:bg-white`}
                  >
                    <div className="flex items-center  ">
                      <span className="mr-3 text-xl ">{item.icon}</span>
                      {item.name}
                    </div>
                    <span
                      className={`transform transition-transform ${
                        isSettingsOpen === "Settings" ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                )}
                {item.name === "User Management" && (
                  <Link
                    onClick={(v) => {
                      if (item.name === "Settings") {
                        if (isSettingsOpen === "Settings") {
                          setIsSettingsOpen("");
                        } else {
                          setIsSettingsOpen("Settings");
                        }
                      }
                    }}
                    key={index}
                    href={item.href}
                    className={`flex items-center px-6 py-3  font-medium rounded-lg mb-2 transition-all ${
                      isActive ? "bg-white text-black" : "text-white"
                    } hover:bg-white hover:text-black`}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {item.name}
                  </Link>
                )}
                {item.name === isSettingsOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {settingsStages.map((item, stageIndex) => {
                      const isStageActive = pathname === item.href;
                      return (
                        <Link
                          key={stageIndex}
                          href={item.href}
                          className={`flex items-center px-6 py-3 font-medium rounded-lg mb-2 transition-all ${
                            isActive ? "bg-white text-black" : "text-white"
                          } hover:bg-white`}
                        >
                          <span className="mr-3 text-xl">{item.icon}</span>
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          <div className="my-4 border-t border-gray-200"></div>
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
