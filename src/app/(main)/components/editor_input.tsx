"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // optional, if you didn’t import globally
import CustomText from "./custom_text";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
type EditorInputProps = {
  placeholder?: string;
  width?: string;
  style?: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
};
const EditorInput = ({ style, onChange, value, error }: EditorInputProps) => {
  return (
    <div className={`w-[290px] md:w-[500px]  ${style}`}>
      <ReactQuill
        className="rounded-2xl outline-none md:h-[200px] "
        theme="snow"
        style={{
          borderRadius: "1rem",
        }}
        value={value}
        onChange={onChange}
        placeholder="Write something here..."
      />
      {error && <CustomText text={error} style={"text-red-400 mt-10"} />}
    </div>
  );
};
export default EditorInput;
