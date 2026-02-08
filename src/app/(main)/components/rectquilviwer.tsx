import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css"; // optional, if you didn’t import globally

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function QuillViewer({ value }: { value: string }) {
  return (
    <ReactQuill
      value={value}
      readOnly={true}
      theme="bubble" // bubble = clean viewer theme
    />
  );
}
