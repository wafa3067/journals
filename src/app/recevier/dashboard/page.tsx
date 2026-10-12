"use client";
import React, { useState } from "react";
import Sidebar from "./sidebar";

type ArticleStatus =
  | "pending"
  | "accepted"
  | "accepted-with-modifications"
  | "rejected";

const Page = () => {
  const [filter, setFilter] = useState<ArticleStatus | "all">("all");

  const counts = {
    pending: 12,
    accepted: 8,
    acceptedWithModifications: 4,
    rejected: 3,
  };

  const resetDashboard = () => {
    setFilter("all");
  };
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="min-w-0 flex-1 bg-[#f8fafc]">
        {/* Your existing page content */}
      </main>
    </div>
  );
};

export default Page;
