"use client";

import { GetContactThunk } from "@/app/admin/adminSlice/contact/getContactSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect, useState } from "react";
import CircularLoading from "../components/circular_loadinng";
import CustomText from "../components/custom_text";
import { addContactInfo } from "@/app/admin/adminSlice/contact_info/addContactInfo";

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState<string>();
  const dispatch = useAppDispatch();
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    if (
      form.email != "" &&
      form.phone != "" &&
      form.firstName != "" &&
      form.lastName != "" &&
      form.message != ""
    ) {
      setError("");
      dispatch(
        addContactInfo({
          firstName: form.firstName,
          lastName: form.lastName,
          emailName: form.email,
          phone: form.phone,
          message: form.message,
        }),
      ).then(() => {
        alert("Your request has been successfully sent");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",

          message: "",
        });
      });
    } else {
      setError("All fields are required");
    }
  };

  const { getContact, success, loading } = useAppSelector(
    (state) => state.getContact,
  );

  useEffect(() => {
    dispatch(GetContactThunk());
    // Fetch contact data when the component mounts
  }, []);

  if (success === false || loading) {
    return <CircularLoading />;
  }
  if (getContact.length == 0) {
    return <p>No Contact Information Found</p>;
  }

  const inputStyle =
    "w-full border border-indigo-400 rounded-md px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 transition bg-white";

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 w-[100%]">
      {/* Breadcrumb */}

      {/* Page Title */}
      <h1 className="text-sm md:text-3xl font-bold text-gray-900 mb-10">
        Contact Information:
      </h1>

      {/* Main Content */}
      <div className="    ">
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
                      className=" #00b4d8 "
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
        <section className=" ">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-10">
              Contact Us
            </h2>

            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputStyle}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={inputStyle}
                placeholder="Type your message"
              />
            </div>

            {error && <CustomText text={error} style="text-red-600" />}
            {/* Button */}
            <button
              onClick={() => handleSubmit()}
              className="bg-[#00b4d8] hover:bg-[#07bfe3] text-white px-6  mt-3 py-3 rounded-md transition"
            >
              Send Message
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
