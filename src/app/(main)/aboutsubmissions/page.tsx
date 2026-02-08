"use client";

import React from "react";
import Link from "next/link";

const SubmissionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 w-[100%]">
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

      {/* Author Guidelines */}
      <section className=" mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Author Guidelines
        </h2>
        <div className="text-gray-700 space-y-4">
          <p>
            Manuscripts should be typed double spaced on one side of A4 sheets
            (21.6 x 27.9 cm) with 3.71 cm margins, using Microsoft Word 2000 or
            a later version thereof. The author should adhere to the following
            order of presentation:{" "}
            <strong>
              Article Title, Author(s), Full Address and E-mail, Abstract, PACS
              and Keywords, Main Text, Acknowledgment.
            </strong>
          </p>
          <p>
            <strong>Title Page:</strong> Includes the title of the article,
            authors’ full names and affiliations, mailing address, telephone,
            fax, and email of the corresponding author.
          </p>
          <p>
            <strong>Abstract:</strong> A one-paragraph abstract not exceeding
            200 words, highlighting purpose, methods, results, and findings.
          </p>
          <p>
            <strong>Keywords:</strong> 4–6 relevant keywords.
          </p>
          <p>
            <strong>PACS:</strong> Supply relevant PACS-2006 codes (
            <a
              href="https://www.aip.org/publishing/pacs/pacs-2010-regular-edition"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://www.aip.org/publishing/pacs/pacs-2010-regular-edition
            </a>
            ).
          </p>
          <p>
            <strong>Sections:</strong> Introduction, Experimental Methods,
            Results, Discussion, Conclusion, Acknowledgments, and References.
          </p>
          <p>
            References must follow the journal citation style (numbered,
            superscript, and enclosed in brackets).
          </p>
        </div>
      </section>

      {/* Articles Section */}
      <section className=" mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Articles</h2>
        <p className="text-gray-700 mb-4">
          Section default policy: Make a new submission to the Articles section.
        </p>
        <button className="px-5 py-2 bg-[#000] text-white rounded-lg hover:bg-[#000]">
          Make a New Submission
        </button>
      </section>

      {/* Copyright Notice */}
      <section className=" mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Copyright Notice
        </h2>
        <p className="text-gray-700">
          Submission is an admission by the authors that the manuscript has
          neither been previously published nor is being considered for
          publication elsewhere. A statement transferring copyright from the
          authors to Yarmouk University is required before acceptance.
          Reproduction of any part of a published work is forbidden without
          written permission from the Editor-in-Chief.
        </p>
      </section>

      {/* Privacy Statement */}
      <section className=" mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Privacy Statement
        </h2>
        <p className="text-gray-700">
          The names and email addresses entered in this journal site will be
          used exclusively for the stated purposes of this journal and will not
          be made available for any other purpose or to any other party.
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
