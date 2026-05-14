"use client";

import React from "react";

const SubmissionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50  w-full">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Submissions</h1>

      {/* Intro */}
      <p className="text-gray-700 mb-8">
        Make a new submission or view your pending submissions.
      </p>

      {/* Checklist Section */}
      <section className=" mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Submission Preparation Checklist
        </h2>
        <p className="text-gray-700 mb-4">
          As part of the submission process, authors are required to check off
          their submission&apos;s compliance with all of the following items,
          and submissions may be returned to authors that do not adhere to these
          guidelines.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            The submission has not been previously published, nor is it before
            another journal for consideration (or an explanation has been
            provided in Comments to the Editor).
          </li>
          <li>
            The submission file is in OpenOffice, Microsoft Word, or RTF
            document file format.
          </li>
          <li>Where available, URLs for the references have been provided.</li>
          <li>
            The text is single-spaced; uses a 12-point font; employs italics,
            rather than underlining (except with URL addresses); and all
            illustrations, figures, and tables are placed within the text at the
            appropriate points, rather than at the end.
          </li>
          <li>
            The text adheres to the stylistic and bibliographic requirements
            outlined in the Author Guidelines.
          </li>
        </ul>
      </section>

      {/* Articles Section */}
      <section className=" mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Articles</h2>
        <p className="text-gray-700 mb-4">
          Section default policy: Make a new submission to the Articles section.
        </p>
      </section>

      {/* Indexing */}
      <section className="">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indexing</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Scopus CiteScore Tracker</li>
          <li>Emerging Sources Citation Index (ESCI)</li>
          <li>ASCI</li>
        </ul>
      </section>
    </div>
  );
};

export default SubmissionsPage;
