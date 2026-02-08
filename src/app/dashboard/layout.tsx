"use client";
import CustomText from "../(main)/components/custom_text";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { IoArrowBackSharp } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "../(main)/components/user_menu";
import { NotebookIcon } from "lucide-react";
import NotificationDropdown from "../(main)/components/notificationDropdown";
import { useEffect } from "react";
import { fetchUnreadCount } from "../api/slice/getNotificationSlice";
import { removeToken } from "../api/slice/getTokenSlice";

export default function SubmissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const result = useAppSelector((state) => state.profileData);
  const options = [
    { id: 2, label: "View Profile" },
    { id: 3, label: "Logout" },
  ];

  const Navigating = (v: string) => {
    if (v === "View Profile") {
      router.push("/profile/identity");
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

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchUnreadCount());
  }, []);
  const router = useRouter();

  return (
    <div className="w-full ">
      <div className=" flex flex-row justify-between items-center mb-5 p-4 bg-[#f3f4f6]  ">
        <div className="flex gap-2">
          <IoArrowBackSharp
            onClick={() => {
              if (pathname === "/dashboard/show") {
                router.push("/dashboard");
              } else {
                router.push("/");
              }
            }}
            className="text-2xl md:text-3xl"
          />
          <CustomText
            text={"Echos Quantum"}
            style={"font-bold text-sm md:text-2xl"}
          />
        </div>

        {pathname !== "/dashboard/login" &&
          pathname !== "/dashboard/register" && (
            <div className=" flex flex-row md:gap-4 gap-2  ">
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
          )}
      </div>
      <div className="min-h-screen bg-gray-50 ">{children}</div>;
    </div>
  );
}
