"use client";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useEffect } from "react";
import QuillViewer from "../components/rectquilviwer";
import { GetAuthors } from "@/app/admin/adminSlice/author/getAuthorSlice";
import CustomButton from "../components/custom_button";
import { useRouter } from "next/navigation";
import Loading from "../loading";

function Page() {
  return (
    <div>
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
              className="#00b4d8 hover:underline"
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
    </div>
  );
}

export default Page;
