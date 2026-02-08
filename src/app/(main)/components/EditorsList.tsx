"use client";
import React, { useState } from "react";
import EditorCard from "./EditorCard";

const EditorsList: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const options = [
    {
      heading: "EDITORIAL TEAM:",
      title: "Editor-in-Chief",
      name: "Dr. Farhan Saif",
      desc: "Department of Electronics, Quaid-i-Azam University, Islamabad, Pakistan",
      email: "",
    },
    {
      heading: "",
      title: "Lead Editor",
      name: "Dr. Abderrahim Al Allati",
      desc: "Laboratory of R&D in Engineering Sciences, Abdelmalek Essaadi University, Morocco",
      email: "",
    },
    {
      heading: "",
      title: "Lead Editor",
      name: "Dr. Jahan Akbar",
      desc: "Department of Physics, University of the West of England, Bristol, UK",
      email: "",
    },
  ];

  const totalEditors = options.length / 3;

  const nextEditor = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalEditors);
  };

  const prevEditor = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalEditors - 1 : prevIndex - 1
    );
  };

  return (
    <div className="py-8 px-4 bg-[#000]  relative">
      <h2 className="text-2xl font-bold text-center mb-8 text-white">
        Editors
      </h2>
      <div className="flex justify-center gap-8 flex-wrap items-center relative">
        {/* Carousel Container */}
        <div className="flex overflow-hidden relative">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            <div className="  grid grid-cols-1 md:grid-cols-3 ">
              {options.map((editor, index) => (
                <EditorCard
                  key={index}
                  name={editor.name}
                  institution={editor.desc}
                  location={editor.email}
                  // imageUrl={editor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Dots with Buttons on Each Side */}
      <div className="flex  flex-row justify-center items-center content-center     gap-2 mt-4 relative ">
        {/* Left Button */}
        <div className="flex justify-center items-center w-64 mx-auto relative">
          <button
            className="absolute left-0 z-10 text-white  p-3 rounded-full text-3xl"
            onClick={prevEditor}
          >
            &#8249;
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {options.map(
              (_, index) =>
                index === 1 && (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? "bg-white" : "bg-gray-400"
                    }`}
                    onClick={() => {
                      if (totalEditors > 1) {
                        setCurrentIndex(index);
                      }
                    }}
                  />
                )
            )}
          </div>

          {/* Right Button */}
          <button
            className="absolute right-0 z-10 text-white  p-3 rounded-full text-3xl"
            onClick={nextEditor}
          >
            &#8250;
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorsList;
