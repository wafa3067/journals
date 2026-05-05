"use client";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect, useState } from "react";
import { getAnnouncementData } from "../../adminSlice/announcement/getAnnouncementSlice";
import {
  addAnnouncement,
  deleteAnnouncementData,
} from "../../adminSlice/announcement/addAnnouncementSlice";
import NewsCard from "@/app/(main)/components/news_card";
interface EditorData {
  title: string;
  date: string;
  desc: string;
  link: string;
}

const editorData: EditorData = {
  title: "",
  date: new Date().toISOString().split("T")[0], // Default to today's date in YYYY-MM-DD format
  link: "",
  desc: "",
};

function Page() {
  const [editorFormData, setEditorFormData] = useState<EditorData>(editorData);
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleEditorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditorFormData((prev) => ({ ...prev, [name]: value }));
  };
  const dispatch = useAppDispatch();

  const { getAnnounce, success, loading } = useAppSelector(
    (state) => state.getAnnouncement,
  );

  useEffect(() => {
    dispatch(getAnnouncementData());
  }, [getAnnouncementData]);

  const handleAddAnnouncement = () => {
    setOpenModal("null");
    dispatch(
      addAnnouncement({
        title: editorFormData.title,
        date: editorFormData.date,
        desc: editorFormData.desc,
        link: editorFormData.link,
        image: selectedFile,
      }),
    ).then(() => {
      dispatch(getAnnouncementData());
    });
  };

  return (
    <div>
      {/* Editor Modal */}
      {openModal === "announcement" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Announcement</h2>
            {/* <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none mb-2"
            /> */}
            <input
              type="text"
              name="title"
              value={editorFormData.title}
              onChange={handleEditorChange}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="link"
              value={editorFormData.link}
              onChange={handleEditorChange}
              placeholder="Link"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="desc"
              value={editorFormData.desc}
              onChange={handleEditorChange}
              placeholder="Descriptions"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleAddAnnouncement()} // Debug log to check the data being sent
                className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save
              </button>
              <button
                onClick={() => setOpenModal(null)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex  m-4">
        <button
          onClick={() => setOpenModal("announcement")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Announcement
        </button>
      </div>
      {getAnnounce.length > 0 &&
        getAnnounce.map((news, index) => (
          <NewsCard
            key={index}
            date={news.date}
            title={news.title}
            description={news.descriptions}
            link={news.link}
            deleteButton={true}
            deleteHandler={() => {
              dispatch(deleteAnnouncementData(news.id)).then(() => {
                dispatch(getAnnouncementData());
              });
            }}
          />
        ))}
    </div>
  );
}

export default Page;
