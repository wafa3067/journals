"use client";
import CustomText from "@/app/(main)/components/custom_text";
import EditorsList from "@/app/(main)/components/EditorsList";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect, useState } from "react";
import {
  AboutHomePage,
  deleteAboutData,
  editAboutData,
} from "../../adminSlice/home/homePageSlice";
import { AboutHomeGetPage } from "../../adminSlice/home/GetHomeAboutSlice";
import {
  createSideHomeSlice,
  deleteSideData,
  editSideData,
} from "../../adminSlice/sideHomeSlice/addSideHomeSlice";
import { CreateGetSideHome } from "../../adminSlice/sideHomeSlice/getHomeSideSlice";
import {
  createEditorHome,
  deleteEditorData,
  editEditorData,
} from "../../adminSlice/editor/addEditorSlice";
import { CreateEditorHomeState } from "../../adminSlice/editor/getEditorSlice";
import ModelComponent from "@/app/(main)/components/model_component";
import DeleteModel from "@/app/(main)/components/deleteModel";
import EditorModelComponent from "@/app/(main)/components/model_editor";
import EditorCard from "@/app/(main)/components/EditorCard";

interface HomeData {
  id: number;
  title: string;
  descriptions: string;
}

interface SidebarItem {
  id: number;
  title: string;
  descriptions: string;
}

interface EditorData {
  id: number;

  title: string;
  descriptions: string;
}

const homeData: HomeData = {
  id: 0,

  title: "",
  descriptions: "",
};

const editorData: EditorData = {
  id: 0,

  title: "Editor Title",
  descriptions: "Editor description",
};

function Page() {
  const [homeFormData, setHomeFormData] = useState<HomeData>(homeData);
  const [id, setId] = useState<number>(0);
  const [imageSelected, setimageSelected] = useState<File | null>(null);
  const [editorFormData, setEditorFormData] = useState<EditorData>(editorData);
  const [newSidebarItem, setNewSidebarItem] = useState<SidebarItem>({
    id: 0,
    title: "",
    descriptions: "",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const [openModal, setOpenModal] = useState<string | null>(null);

  const [editDelete, setEditDelete] = useState<
    "deleteEdit" | "deleteSide" | "deleteEditor" | null
  >(null);

  const handleHomeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setHomeFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditorChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setEditorFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSidebarChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewSidebarItem((prev) => ({ ...prev, [name]: value }));
  };

  // const addSidebarItem = () => {
  //   setSidebarItems([...sidebarItems, newSidebarItem]);
  //   setNewSidebarItem({ heading: "", title: "", description: "" });
  //   setOpenModal(null);
  // };

  const dispatch = useAppDispatch();
  const { about, success } = useAppSelector((state) => state.homeGet);
  const { side } = useAppSelector((state) => state.getSideHome);
  const { editor } = useAppSelector((state) => state.getEditorHome);

  const [selectedFile, setSelectedFile] = useState<File>();
  // Track file
  const handleEditor = () => {
    dispatch(createEditorHome({ ...editorFormData, image: selectedFile! }));
  };
  const handleSaveAboutData = () => {
    // Dispatch the AboutHomePage action with the form data
    dispatch(AboutHomePage(homeFormData));
    setOpenModal(null);
  };

  const handleSaveSidebar = () => {
    dispatch(createSideHomeSlice(newSidebarItem));
    setOpenModal(null);
  };

  const editHomePageData = (title: string, descriptions: string) => {
    dispatch(
      editAboutData({
        title: title,
        descriptions: descriptions,
        id: homeFormData.id,
      }),
    ).then(() => {
      dispatch(AboutHomeGetPage());
    });
  };

  const editSidePageData = (title: string, descriptions: string) => {
    dispatch(
      editSideData({
        title: title,
        descriptions: descriptions,
        id: newSidebarItem.id,
      }),
    ).then(() => {
      dispatch(CreateGetSideHome());
    });
  };

  const editEditorPageData = (
    title: string,
    descriptions: string,
    image: File,
  ) => {
    dispatch(
      editEditorData({
        title: title,
        image: image,
        descriptions: descriptions,
        id: editorFormData.id,
      }),
    ).then(() => {
      dispatch(CreateEditorHomeState());
    });
  };

  useEffect(() => {
    dispatch(AboutHomeGetPage());
  }, [AboutHomeGetPage, dispatch]);

  useEffect(() => {
    dispatch(CreateGetSideHome());
  }, [CreateGetSideHome, dispatch]);

  useEffect(() => {
    dispatch(CreateEditorHomeState());
  }, [CreateEditorHomeState, dispatch]);
  const totalEditors = editor.length / 3;

  const nextEditor = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalEditors);
  };

  const prevEditor = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalEditors - 1 : prevIndex - 1,
    );
  };
  return (
    <div className="p-8 ">
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setOpenModal("about")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add About
        </button>
        <button
          onClick={() => setOpenModal("sidebar")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Sidebar
        </button>
        <button
          onClick={() => setOpenModal("editor")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Editor
        </button>
      </div>

      {/* About Modal */}
      {openModal === "about" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add About</h2>
            {/* <input
              type="text"
              name="heading"
              value={homeFormData.heading}
              onChange={handleHomeChange}
              placeholder="Heading"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
            <input
              type="text"
              name="title"
              value={homeFormData.title}
              onChange={handleHomeChange}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="descriptions"
              value={homeFormData.descriptions}
              onChange={handleHomeChange}
              placeholder="Descriptions"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setOpenModal(null);
                  handleSaveAboutData();
                }}
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

      {/* Sidebar Modal */}
      {openModal === "sidebar" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Sidebar Item</h2>

            <input
              type="text"
              name="title"
              value={newSidebarItem.title}
              onChange={handleSidebarChange}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="descriptions"
              value={newSidebarItem.descriptions}
              onChange={handleSidebarChange}
              placeholder="Descriptions"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveSidebar}
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

      {/* Editor Modal */}
      {openModal === "editor" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Editor</h2>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
              className="w-full text-sm text-gray-600 border border-gray-300 rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none mb-2"
            />
            <input
              type="text"
              name="title"
              value={editorFormData.title}
              onChange={handleEditorChange}
              placeholder="Title"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="descriptions"
              value={editorFormData.descriptions}
              onChange={handleEditorChange}
              placeholder="Descriptions"
              className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => handleEditor()}
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
      {/* about home section */}
      {openModal === "editHome" && (
        <ModelComponent
          heading="Edit About Home"
          setOpenModal={setOpenModal}
          homeFormData={homeFormData}
          handleHomeChange={handleHomeChange}
          handleSaveAbout={editHomePageData}
        />
      )}

      {editDelete === "deleteEdit" && (
        <DeleteModel
          heading="Delete"
          handleSaveAbout={() => {
            dispatch(deleteAboutData(id)).then(() => {
              dispatch(AboutHomeGetPage());
            });
          }}
          setOpenModal={setEditDelete}
        />
      )}

      {/* side edit modal */}
      {openModal === "sideEdit" && (
        <ModelComponent
          heading="Edit Side Home"
          setOpenModal={setOpenModal}
          homeFormData={newSidebarItem}
          handleHomeChange={handleSidebarChange}
          handleSaveAbout={editSidePageData}
        />
      )}

      {editDelete === "deleteSide" && (
        <DeleteModel
          heading="Delete"
          handleSaveAbout={() => {
            dispatch(deleteSideData(id)).then(() => {
              dispatch(CreateGetSideHome());
            });
          }}
          setOpenModal={setEditDelete}
        />
      )}

      {/* editor edit modal */}
      {openModal === "editorEdit" && (
        <EditorModelComponent
          heading="Edit Editor Home"
          setOpenModal={setOpenModal}
          homeFormData={editorFormData}
          handleHomeChange={handleEditorChange}
          handleSaveAbout={editEditorPageData}
          setImageSelected={setimageSelected}
          image={imageSelected}
        />
      )}

      {editDelete === "deleteEditor" && (
        <DeleteModel
          heading="Delete"
          handleSaveAbout={() => {
            dispatch(deleteEditorData(id)).then(() => {
              dispatch(CreateEditorHomeState());
            });
          }}
          setOpenModal={setEditDelete}
        />
      )}

      <div className="mb-8">
        <CustomText
          style={"text-black p-2 font-bold text-3xl"}
          text={"Preview Home Page"}
        />
      </div>
      {/* about section */}
      <div className=" h-[calc(100vh-200px)]  p-4 rounded-lg overflow-y-auto">
        <div className=" flex md:flex-row flex-col gap-3 pt-8 pb-8 w-full">
          <div className="md:w-[70%] bg-gray-100">
            {success === false ? (
              <p>Loading...</p>
            ) : (
              about.length > 0 &&
              about.map((item, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h2>
                  <p>{item.descriptions}</p>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => {
                        setOpenModal("editHome");
                        setHomeFormData({
                          title: item.title,
                          descriptions: item.descriptions || "",
                          id: item.id,
                        });
                      }}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setId(item.id);
                        setEditDelete("deleteEdit");
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* sidebar section */}
          <div className="md:w-[30%]">
            {side.length > 0 &&
              side.map((item, index) => (
                <div key={index} className="mb-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h2>
                  <p>{item.descriptions}</p>
                  <div className="flex flex-row gap-2">
                    <button
                      onClick={() => {
                        setOpenModal("sideEdit");
                        setNewSidebarItem({
                          title: item.title,
                          descriptions: item.descriptions || "",
                          id: item.id,
                        });
                      }}
                      className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setId(item.id);
                        setEditDelete("deleteSide");
                      }}
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* editor section */}
        <div className="py-8 px-4 bg-[#000]  relative ">
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
                  {editor.length > 0 &&
                    editor.map((editor, index) => (
                      <div key={index}>
                        <EditorCard
                          key={index}
                          name={editor.title}
                          institution={editor.descriptions}
                          location={""}
                          imageUrl={editor.image}
                        />
                        <div className="flex flex-row gap-2">
                          <button
                            onClick={() => {
                              setOpenModal("editorEdit");
                              setEditorFormData({
                                title: editor.title,
                                descriptions: editor.descriptions || "",
                                id: editor.id,
                              });
                            }}
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setId(editor.id);
                              setEditDelete("deleteSide");
                            }}
                            className="mt-2 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
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
                {editor.map(
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
                    ),
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
      </div>
    </div>
  );
}

export default Page;
