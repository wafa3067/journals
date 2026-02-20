// "use client";
// import { useEffect, useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // Set the workerSrc globally for pdf.js
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// interface Props {
//   params: { pdfData: string }; // pdfData as part of URL params
// }

// const ViewPDF = ({ params }: Props) => {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   useEffect(() => {
//     if (params?.pdfData) {
//       const decodedPdfData = decodeURIComponent(params.pdfData);
//       setPdfUrl(decodedPdfData);
//     }
//   }, [params]);

//   if (!pdfUrl) {
//     return <p>Loading PDF...</p>;
//   }
//   // Re-run when params change if (!pdfUrl) { return <p>Loading PDF...</p>; }
//   return (
//     <div className="flex justify-center items-center flex-col p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">PDF Viewer</h1>

//       {pdfUrl ? (
//         <Document
//           file={pdfUrl} // Set the PDF file URL to render
//           // Error while loading PDF
//         >
//           <Page pageNumber={1} /> {/* Show the first page of the PDF */}
//         </Document>
//       ) : (
//         <p>Loading PDF...</p>
//       )}
//     </div>
//   );
// };

// export default ViewPDF;

// "use client";
// import { useEffect, useState } from "react";

// interface Props {
//   params: { pdfData: string }; // pdfData as part of URL params
// }

// const ViewPDF = ({ params }: Props) => {
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (params?.pdfData) {
//       // Decode URL-encoded PDF data
//       const decodedPdfData = decodeURIComponent(params.pdfData);
//       setPdfUrl(decodedPdfData);
//     }
//   }, [params]); // Re-run when params change

//   // If no PDF URL, show loading message
//   if (!pdfUrl) {
//     return <p>Loading PDF...</p>;
//   }

//   return (
//     <div className="flex justify-center items-center flex-col p-6 bg-gray-100 rounded-lg shadow-lg">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">PDF Viewer</h1>

//       <div className="flex items-center space-x-4">
//         {/* Direct Link to Open PDF in New Tab */}
//         <a
//           href={pdfUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//         >
//           Open PDF
//         </a>

//         {/* Link to Download PDF */}
//         <a
//           href={pdfUrl}
//           download
//           className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//         >
//           Download PDF
//         </a>
//       </div>
//     </div>
//   );
// };

// export default ViewPDF;

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const ViewPDF = () => {
  const params = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const pdfData = params?.pdfData;

    // Ensure it's a single string
    if (pdfData) {
      const decodedPdfData = Array.isArray(pdfData) ? pdfData[0] : pdfData; // take first element if array
      setPdfUrl(decodeURIComponent(decodedPdfData));
    }
  }, [params?.pdfData]);

  if (!pdfUrl) return <p>Loading PDF...</p>;

  return (
    <div className="flex justify-center items-center flex-col p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">PDF Viewer</h1>

      <div className="flex items-center space-x-4">
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Open PDF
        </a>

        <a
          href={pdfUrl}
          download
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default ViewPDF;
