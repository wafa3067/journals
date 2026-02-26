"use client";
import React, { useState } from "react";
import axios from "axios";
import Articles from "../components/article";
import router from "next/router";

interface Article {
  id: number;
  title: string;
  subtitle: string;
  pdfUrl: string;
  author: string;
  publishedDate: string;
}

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedAfter, setPublishedAfter] = useState({
    year: "",
    month: "",
    day: "",
  });
  const [publishedBefore, setPublishedBefore] = useState({
    year: "",
    month: "",
    day: "",
  });

  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Reset error state on new search

    try {
      // Make the API call based on the user's inputs
      const response = await axios.get(
        `http://ec2-18-179-200-143.ap-northeast-1.compute.amazonaws.com:8080/api/search`,
        {
          params: {
            keyword: query,
            startDate: `${publishedAfter.year}-${publishedAfter.month || "01"}-${
              publishedAfter.day || "01"
            }`,
            endDate: `${publishedBefore.year}-${publishedBefore.month || "12"}-${
              publishedBefore.day || "31"
            }`,
            author: author,
          },
        },
      );

      // Set results
      setResults(response.data);
      console.log("Search results:", response.data);
    } catch (error) {
      setError(
        "Failed to fetch data. Please try again later. " +
          (error instanceof Error ? error.message : ""),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 py-12 md:px-24 w-[100%]">
      <h1 className="text-4xl font-bold mb-10 text-gray-900">Search</h1>

      <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
        <label className="block font-semibold mb-2">Search articles for</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter keywords..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSearch}
          className="bg-[#000] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#771509] transition mb-6"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>

        <h2 className="text-2xl font-semibold mb-4">Advanced Filters</h2>

        {/* Published After */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Published After</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Year"
              value={publishedAfter.year}
              onChange={(e) =>
                setPublishedAfter({ ...publishedAfter, year: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            />
            <input
              type="number"
              placeholder="Month"
              value={publishedAfter.month}
              onChange={(e) =>
                setPublishedAfter({ ...publishedAfter, month: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            />
            <input
              type="number"
              placeholder="Day"
              value={publishedAfter.day}
              onChange={(e) =>
                setPublishedAfter({ ...publishedAfter, day: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            />
          </div>
        </div>

        {/* Published Before */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Published Before</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Year"
              value={publishedBefore.year}
              onChange={(e) =>
                setPublishedBefore({ ...publishedBefore, year: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            />
            <input
              type="number"
              placeholder="Month"
              value={publishedBefore.month}
              onChange={(e) =>
                setPublishedBefore({
                  ...publishedBefore,
                  month: e.target.value,
                })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            />
            <input
              type="number"
              placeholder="Day"
              value={publishedBefore.day}
              onChange={(e) =>
                setPublishedBefore({ ...publishedBefore, day: e.target.value })
              }
              className="border border-gray-300 rounded-lg px-3 py-2 w-24"
            />
          </div>
        </div>

        {/* By Author */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">By Author</h3>
          <input
            type="text"
            placeholder="Enter author name"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-[#000] text-white font-medium px-6 py-2 rounded-lg hover:bg-[#771509] transition"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Search Results */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {error && <p className="text-red-500">{error}</p>}

        {results.length > 0 ? (
          <ul className="space-y-4">
            {results.map((article) => (
              <Articles
                onClick={() => {
                  // Assuming the handleClick function is inside a component
                  const encodedPdfData = encodeURIComponent(article.pdfUrl); // Encode the pdfData
                  router.push(`/viewpdf/${encodedPdfData}`); // Navigate to the URL with encoded data
                }}
                pdfUrl={article.pdfUrl}
                key={article.id}
                style1={"font-bold text-[#4b7d92]"}
                style2={"text-black w-[90%]"}
                title1={article.title}
                title12={article.subtitle}
                // cited={"123-130"}
              />
              // <li
              //   key={article.id}
              //   className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              // >
              //   <h3 className="font-semibold text-lg">{article.title}</h3>
              //   <p className="text-gray-600">Author: {article.author}</p>
              //   <p className="text-gray-500 text-sm">
              //     Published: {article.publishedDate}
              //   </p>
              // </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
