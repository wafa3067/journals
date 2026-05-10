import React from "react";
import Aims from "../aims/page";

function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 m-10">
        Journal Insights
      </h1>
      {/* horizontal line */}
      <div className="border-t border-gray-300 ml-10 mr-10" />
      <Aims />
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* subject area */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Subject Area</h2>
        <p className="text-gray-700 mb-4">
          Explore the various subject areas covered by Quantum Journal,
          including quantum mechanics, quantum computing, quantum information
          theory, and more.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* issn */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">ISSN</h2>
        <p className="text-gray-700 mb-4">
          The International Standard Serial Number (ISSN) for Quantum Journal is
          2375-2366.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* impact has citescore and impact factor  */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Impact</h2>
        <p className="text-gray-700 mb-4">
          Quantum Journal has an impact factor of 5.2 and a CiteScore of 6.8,
          reflecting its influence and relevance in the field of quantum
          science.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* Article publishing options */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription</h2>
        <p className="text-gray-700 mb-4">
          No publication fee is charged to authors, and published articles are
          immediately available to subscribers.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Open Access</h2>
        <p className="text-gray-700 mb-4">
          Article Publishing Charge (APC) is USD 3,310 (excluding taxes). The
          amount may be reduced during submission if applicable.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Article Publishing Options
        </h2>
        <p className="text-gray-700 mb-4">
          Authors can choose between Open Access and Subscription-based
          publishing models depending on their needs.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Abstracting and Indexing
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Scopus</li>
          <li>Science Citation Index Expanded (SCIE)</li>
          <li>SCImago Journal Rank (SJR)</li>
          <li>SNIP</li>
        </ul>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* publishing timeline */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Publishing Timeline
        </h2>
        <div className="text-gray-700 mb-4 space-y-2">
          <p>
            <span className="font-semibold">Publishing timeline:</span> 7 days
          </p>
          <p>
            <span className="font-semibold">Submission to first decision:</span>{" "}
            30 days
          </p>
          <p>
            <span className="font-semibold">
              Submission to decision after review:
            </span>{" "}
            65 days
          </p>
          <p>
            <span className="font-semibold">Submission to acceptance:</span> 2
            days
          </p>
          <p>
            <span className="font-semibold">
              Acceptance to online publication:
            </span>{" "}
            2 days
          </p>
        </div>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* Acceptance rate */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Acceptance Rate
        </h2>
        <p className="text-gray-700 mb-4">
          The acceptance rate for Quantum Journal is approximately 25%,
          reflecting the journal's commitment to publishing high-quality
          research in the field of quantum science.
        </p>
      </div>
      <div className="border-t border-gray-300 ml-10 mr-10" />
      {/* Abstracting and indexing */}
      <div className="p-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Abstracting and Indexing
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Scopus</li>
          <li>Science Citation Index Expanded (SCIE)</li>
          <li>SCImago Journal Rank (SJR)</li>
          <li>SNIP</li>
        </ul>
      </div>
    </div>
  );
}

export default Page;
