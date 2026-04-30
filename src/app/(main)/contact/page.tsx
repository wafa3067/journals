"use client";

import { GetContactThunk } from "@/app/admin/adminSlice/contact/getContactSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect } from "react";

const ContactPage = () => {
  const dispatch = useAppDispatch();
  const { getContact } = useAppSelector((state) => state.getContact);

  useEffect(() => {
    dispatch(GetContactThunk());
    // Fetch contact data when the component mounts
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 w-[100%]">
      {/* Breadcrumb */}

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Contact Information:
      </h1>

      {/* Main Content */}
      <div className="   overflow-y-auto h-[calc(100vh-200px)] space-y-10 ">
        {/* Editor in Chief */}
        <div>
          {getContact.length > 0 &&
            getContact.map((contact) => (
              <div key={contact.id}>
                {contact.title && (
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {contact.title}
                  </h2>
                )}
                {contact.type === "None" && (
                  <p className="text-gray-600 mb-4">{contact.descriptions}</p>
                )}

                {contact.type !== "None" && contact.type !== "" && (
                  <p className="text-gray-600 mb-4">
                    <a
                      className=" text-blue-600 "
                      href={
                        contact.type == "Email Address"
                          ? `mailto:${contact.descriptions}`
                          : `tel:${contact.descriptions}`
                      }
                      type="emal"
                      target="_blank"
                    >
                      {contact.descriptions}
                    </a>
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
