"use client";

import { IoArrowBackSharp } from "react-icons/io5";
import CustomText from "../(main)/components/custom_text";
import Link from "next/link"; // ✅ Correct import
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { removeToken } from "../api/slice/getTokenSlice";
import UserMenu from "../(main)/components/user_menu";
import NotificationDropdown from "../(main)/components/notificationDropdown";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = useAppSelector((state) => state.profileData);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const tabs = [
    { name: "Identity", href: "/profile/identity" },
    { name: "Contact", href: "/profile/contact" },
    { name: "Roles", href: "/profile/roles" },
    { name: "Public", href: "/profile/public" },
    { name: "Password", href: "/profile/password" },
  ];

  const pathname = usePathname();
  const options = [
    { id: 1, label: "Dashboard" },

    { id: 3, label: "Logout" },
  ];
  const Navigating = (v: string) => {
    if (v === "Dashboard") {
      router.push("/dashboard");
    } else {
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      dispatch(removeToken());
      router.push("/");
    }
  };
  return (
    <div>
      {/* Header */}
      <div className="flex flex-row justify-between items-center mb-5 p-4 bg-[#f3f4f6]">
        <div className="flex flex-row text-2xl gap-2">
          <IoArrowBackSharp
            onClick={() => router.push("/")}
            className="text-3xl"
          />

          <CustomText text={"Profile"} style={"font-bold text-2xl"} />
        </div>
        <div className="flex flex-row gap-4 w-[220px]">
          <NotificationDropdown />
          <UserMenu
            options={options}
            starting={result.username}
            is_optins={true}
            selectedOpt={(v) => Navigating(v)}
            onTap={() => console.log("Clicked UserMenu")}
            bgColor="#E0ECFF" // Softer pastel blue
            textColor="#1E3A8A" // Deep blue text
            hoverBgColor="#BFDBFE" // Slightly darker blue on hover
            avatarBgColor="#FFFFFF"
            arrowColor="#1E3A8A"
            dropdownBgColor="#FFFFFF"
            dropdownTextColor="#1E3A8A"
            dropdownHoverBgColor="#DBEAFE"
            dropdownHoverTextColor="#1E40AF"
            fontSize="16px"
            // onTap={() => Navigating()}
          />
        </div>
      </div>

      {/* Profile Container */}
      <div className="max-w-6xl mx-auto mt-10 p-4 border rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6">User Profile</h1>

        {/* Tabs */}
        <div className=" flex space-x-4 border-b mb-6">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              href={tab.href}
              className={`pb-2 border-b-2 transition-colors ${
                pathname === tab.href
                  ? "border-blue-500 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-blue-500"
              }`}
            >
              {tab.name}
            </Link>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-screen bg-gray-50 p-4 rounded">{children}</div>
      </div>
    </div>
  );
}
