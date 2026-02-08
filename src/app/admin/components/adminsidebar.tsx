"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const AdminSidebar = () => {
  const pathname = usePathname();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isArticlesOpen, setIsArticlesOpen] = useState(false);

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

  const isReviewActive = reviewStages.some((stage) =>
    pathname.includes(stage.href)
  );
  const isArticlesActive = articleStages.some((stage) =>
    pathname.includes(stage.href)
  );

  return (
    <div className="w-72 bg-white shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center">
        <h2 className="text-2xl font-bold text-gray-900">Admin Portal</h2>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 flex flex-col mt-4 px-2">
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
                    isActive ? "bg-gray-200 text-gray-900" : "text-gray-700"
                  } hover:bg-gray-100`}
                >
                  <div className="flex items-center">
                    <span className="mr-3 text-xl">{item.icon}</span>
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
                              ? "bg-blue-100 text-blue-700 font-medium"
                              : "text-gray-600 hover:bg-gray-100"
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
            <Link
              key={index}
              href={item.href}
              className={`flex items-center px-6 py-3 font-medium rounded-lg mb-2 transition-all ${
                isActive ? "bg-gray-200 text-gray-900" : "text-gray-700"
              } hover:bg-gray-100`}
            >
              <span className="mr-3 text-xl">{item.icon}</span>
              {item.name}
            </Link>
          );
        })}

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
