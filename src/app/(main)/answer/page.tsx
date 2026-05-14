"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BACKEND_URL } from "@/app/api/actions/articleActions";

export default function ReviewPage() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");
  const answer = searchParams.get("answer");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const sendAnswer = async () => {
      try {
        if (!id || !answer) {
          setStatus("error");
          return;
        }

        const res = await fetch(
          `${BACKEND_URL}/admin/answer?id=${id}&answer=${answer}`,
          {
            method: "PATCH",
          },
        );

        if (!res.ok) throw new Error("Failed");

        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    sendAnswer();
  }, [id, answer]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Processing your response...</p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className="text-2xl font-bold text-green-600">
          Response Recorded Successfully
        </h1>
        <p className="mt-2 text-gray-600">Thank you for your response.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <h1 className="text-2xl font-bold text-red-600">
        Invalid or Expired Link
      </h1>
    </div>
  );
}
