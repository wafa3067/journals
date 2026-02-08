"use client";

import { MouseEventHandler, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

type Props = {
  options: Array<{ label: string }>;
  starting: string;
  selectedOption?: string;
  is_optins: boolean;
  onTap?: MouseEventHandler;
  onChange: (value: string) => void;
};

export default function CustomDropdown({
  options,
  starting,
  is_optins,
  selectedOption,
  onTap,
  onChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  console.log(
    "selectedOption",
    selectedOption === "Editorial Team"
      ? "border-[#671509]"
      : "border-[#3a1beb]"
  );
  return (
    <div
      onClick={onTap}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative w-64 cursor-default"
    >
      <div className="flex items-center justify-between w-fit">
        <p
          className={`text-[#ffffff] font-bold hover:text-[#e8ebef]  ${
            selectedOption === starting ? "border-b-[#e8ebef] border-b-2" : ""
          }
           hover:border-b-2 hover:border-[#ffffff] `}
        >
          {starting}
        </p>
        {is_optins && <MdOutlineKeyboardArrowDown />}
      </div>

      {/* Menu */}
      {open && is_optins && (
        <ul className="absolute w-full bg-gray-200 rounded-sm overflow-hidden">
          {options.map((option) => (
            <li
              key={option.label}
              className="px-4 py-2 text-black hover:bg-black hover:text-white"
              onClick={() => {
                setSelected(option.label);
                setOpen(false);
                onChange(option.label);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
