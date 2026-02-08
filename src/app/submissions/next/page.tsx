"use client";
import CustomText from "@/app/(main)/components/custom_text";
import { useAppDispatch } from "@/app/api/hooks/hooks";
import { updateTab } from "@/app/api/providers/tab_bar";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const route = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    // ✅ This runs only when the page fully loads
    dispatch(updateTab("next-steps"));
  }, [dispatch]);

  return (
    <main
      className=" md:w-5xl   md:mx-auto flex flex-col  md:bg-white m-10 p-6 md:rounded-md justify-start items-start  md:shadow-lg"
      style={{
        padding: 20,
        fontFamily: "system-ui, -apple-system, Roboto, 'Segoe UI', Arial",
        display: "flex",
        gap: 24,
      }}
    >
      <CustomText
        style={"font-bold text-black  "}
        text={"Submission complete"}
      />
      <CustomText
        style={"font-normal text-black  "}
        text={
          "Thank you for your interest in publishing with Jordan Journal of Physics."
        }
      />
      <CustomText
        style={"font-bold text-black  "}
        text={"What Happens Next?"}
      />
      <CustomText
        style={"font-normal text-black  "}
        text={
          "The journal has been notified of your submission, and you've been emailed a confirmation for your records. Once the editor has reviewed the submission, they will contact you."
        }
      />
      <CustomText
        style={"font-normal text-black  "}
        text={"For now, you can:"}
      />
      <ul className="list-disc list-inside ml-4">
        <li
          className="underline text-blue-400  cursor-pointer"
          onClick={() => {
            route.push("/dashboard/show");
          }}
        >
          Review this submission
        </li>
        <li
          className="underline text-blue-400  cursor-pointer"
          onClick={() => {
            route.push("/submissions/begin");
          }}
        >
          Create a new submission{" "}
        </li>
        <li
          className="underline text-blue-400  cursor-pointer"
          onClick={() => {
            route.push("/dashboard");
          }}
        >
          Return to your dashboard{" "}
        </li>
      </ul>
    </main>
  );
};

export default page;
