"use client";

import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 w-[100%]">
      {/* Breadcrumb */}

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-10">
        Contact Information:
      </h1>

      {/* Main Content */}
      <div className="  space-y-10">
        {/* Editor in Chief */}
        <div>
          <p>
            Our Editorial office is overseeing the day-to-day editorial and
            publishing operations including addressing questions from authors,
            editors, or readers. For questions regarding submission of
            manuscripts, published articles, or other journal related questions,
            please contact:
          </p>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Support Contact
          </h2>

          <p>
            <a
              href="mailto:jjp@yu.edu.jo"
              className="text-blue-600 hover:underline"
            >
              Editorialoffuce@echosquantum.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
