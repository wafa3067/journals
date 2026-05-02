"use client";
import React, { useState } from "react";
import EditorCard from "./EditorCard";
import { GetEditorHomeState } from "@/app/admin/adminSlice/editor/getEditorSlice";
import Carousel from "./mini_crasual";
interface Editor {
  image: string;
  title: string;
  descriptions: string;

  // image: string; // Add image property if needed
}
const EditorsList: React.FC<{ options: Array<Editor> }> = ({ options }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editDelete, setEditDelete] = useState<
    "deleteEdit" | "deleteSide" | "deleteEditor" | null
  >(null);
  const [openModal, setOpenModal] = useState<
    | "about"
    | "sidebar"
    | "editor"
    | "editHome"
    | "sideEdit"
    | "editorEdit"
    | null
  >(null);
  const totalEditors = options.length / 3;

  const nextEditor = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalEditors);
  };

  const prevEditor = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalEditors - 1 : prevIndex - 1,
    );
  };

  const [id, setId] = useState<number>(0);

  return (
    <div className="py-8 px-4 bg-[#000]  relative ">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">
        Editors
      </h2>
      <Carousel
        items={options}
        itemsPerPage={3}
        renderItem={(editor, index) => (
          <div className=" m-2  w-[30%]" key={index}>
            <EditorCard
              name={editor.title}
              institution={editor.descriptions}
              location={""}
              imageUrl={editor.image}
            />
          </div>
        )}
      />
    </div>
  );
};

export default EditorsList;
