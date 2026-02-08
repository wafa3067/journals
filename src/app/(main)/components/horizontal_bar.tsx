"use client";
import React from "react";

type Step = {
  key: string;
  title: string;
  subtitle?: string;
};

type HorizontalBarProps = {
  steps?: Step[];
  current?: string; // step key
  onChange?: (key: string) => void;
  className?: string;
};

const DEFAULT_STEPS: Step[] = [
  {
    key: "initial-requirements",
    title: "Initial Requirements",
    subtitle: "Define scope & needs",
  },
  {
    key: "upload-documents",
    title: "Upload Documents",
    subtitle: "Attach files & info",
  },
  {
    key: "meta-data",
    title: "Meta Data",
    subtitle: "Attach files & info",
  },
  {
    key: "confirmations",
    title: "Confirmations",
    subtitle: "Review & approve",
  },
  { key: "next-steps", title: "Next Steps", subtitle: "Finalize & proceed" },
];

export default function HorizontalBar({
  steps = DEFAULT_STEPS,
  current = "initial-requirements",
  onChange,
  className = "",
}: HorizontalBarProps) {
  function handleClick(key: string) {
    onChange?.(key);
  }

  return (
    <nav
      className={`hb-root ${className} md:w-max-5xl bg-white bg-opacity-10`}
      aria-label="Progress"
      role="navigation"
      data-current={current}
    >
      <ol
        className="hb-list flex flex-row gap-1 md:gap-5 justify-center p-2 "
        role="list"
      >
        {steps.map((step, idx) => {
          return (
            <li
              onClick={() => handleClick(step.key)}
              key={step.key}
              className={`hb-item  text-[10px] md:text-2xl p-2 md:pl-3 md:pr-3 md:pt-2 md:pb-2  ${
                current == step.key
                  ? "border-4 border-b-slate-500 bg-[#651404] bg-opacity-10 rounded-md"
                  : ""
              } `}
            >
              <button type="button" className="hb-button">
                <span className="hb-text">
                  <span
                    className={`hb-title  ${
                      current == step.key ? "text-white" : "text-black"
                    }`}
                  >
                    {step.title}
                  </span>
                </span>
              </button>

              {idx < steps.length - 1 && (
                <span className="hb-connector" aria-hidden />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
