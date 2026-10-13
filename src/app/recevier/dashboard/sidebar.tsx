"use client";

import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { TbPasswordUser } from "react-icons/tb";

const articleStages = [
  {
    name: "Pending",
    href: "/recevier/pending",
    icon: "🕒",
  },
  {
    name: "Accepted",
    href: "/recevier/accepted",
    icon: "✅",
  },
  {
    name: "Accepted With Modifications",
    href: "/recevier/accepted-with-modifications",
    icon: "✅",
  },
  {
    name: "Rejected",
    href: "/recevier/rejected",
    icon: "❌",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between border-b border-white/30 p-5">
        <h2 className="text-sm font-bold text-white">Reviewer Portal</h2>
        <LogOut
          size={25}
          color="white"
          onClick={async () => {
            await localStorage.removeItem("reviewerToken");

            navigation.navigate("/");
          }}
        />
        <TbPasswordUser
          size={25}
          color="white"
          onClick={async () => {
            navigation.navigate("/recevier/reviewer-update");
          }}
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-xl text-white md:hidden"
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      <nav className="flex flex-col gap-2 p-3">
        {articleStages.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-5 py-3 font-medium transition-all ${
                isActive
                  ? "bg-white text-black shadow-sm"
                  : "text-white hover:bg-white hover:text-black"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div>
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-64 flex-col bg-[#00b4d8] shadow-lg md:flex">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <header className="flex h-16 items-center bg-[#00b4d8] md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="p-4 text-white"
          aria-label="Open sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <span className="font-semibold text-white">Admin Panel</span>
      </header>

      {/* Mobile Overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-[#00b4d8] shadow-lg transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>
    </div>
  );
};

export default AdminSidebar;
