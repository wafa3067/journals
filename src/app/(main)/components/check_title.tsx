"use client";
import React from "react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

type Props = {
  title: string;
  width?: string;
  onChange?: (text: string) => void;
  error?: string;
  required?: boolean;
  check: string;
};

const CheckText = ({ title, onChange, width, error, check }: Props) => {
  return (
    <div>
      <div className={`${width} flex flex-row  gap-2 `}>
        {check === "yes" ? (
          <MdCheckBox
            className="w-[20px] h-[20px] "
            onClick={() => {
              if (onChange) onChange("");
            }}
          />
        ) : (
          <MdCheckBoxOutlineBlank
            onClick={() => {
              if (onChange) onChange(title);
            }}
            className="w-[20px] h-[20px]"
          />
        )}
        <span className="text-black w-[90%]">{title}</span>
      </div>
      {error && <span className="text-red-500">* {error}</span>}
    </div>
  );
};

export default CheckText;
