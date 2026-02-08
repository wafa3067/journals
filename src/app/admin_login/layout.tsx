"use client";
import { useAppSelector } from "../api/hooks/hooks";
import { useRouter } from "next/navigation";

export default function SdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = useAppSelector((state) => state.profileData);

  const router = useRouter();
  return <div className="min-h-screen bg-gray-50 ">{children}</div>;
}
