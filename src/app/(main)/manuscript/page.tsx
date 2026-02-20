import React from "react";
import CustomText from "../components/custom_text";

const Manuscript = () => {
  return (
    <div className="w-[100%] p-5">
      {/* ORGANIZATION OF MANUSCRIPT */}
      <CustomText
        boldText="ORGANIZATION OF MANUSCRIPT"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Manuscripts should be submitted in English. All submissions must conform to the journal’s prescribed formatting and style requirements."
        style={"text-black pb-2 "}
      />

      {/* Reprints and Proofs */}
      <CustomText boldText="Reprints and Proofs" style={"text-black pb-2 "} />
      <CustomText
        text="The corresponding author will receive page proofs for review and correction, which must be returned within two weeks. Only minor corrections are permitted at this stage."
        style={"text-black pb-2 "}
      />

      {/* Publication Charges */}
      <CustomText boldText="Publication Charges" style={"text-black pb-2 "} />
      <CustomText
        text="ECHOS Quantum does not levy any fees for manuscript submission, processing, or publication in the first year."
        style={"text-black pb-2 "}
      />

      {/* <CustomText
        text={"Manuscript Organization"}
        style={"font-bold text-2xl pb-4"}
      />
      {manuscriptGuidelines.map((e) => {
        if (e.includes("PACS:")) {
          return (
            <div className="pb-5">
              <CustomText
                text={
                  "PACS: Authors should supply one or more relevant PACS-2006 classification codes, (available at"
                }
                style={""}
              />

              <a
                className="text-blue-300 underline"
                href="https://www.aip.org/publishing/pacs/pacs-2010-regular-edition"
              >
                {
                  "https://www.aip.org/publishing/pacs/pacs-2010-regular-edition)"
                }
              </a>
            </div>
          );
        }
        return <CustomText text={e} style={"pb-5"} />;
      })}
      {referenceExamples.map((ref, e) => (
        <>
          <CustomText text={ref.title} style={""} />
          {ref.content.map((con) => (
            <div key={e} className="pl-5">
              <li>{con}</li>
            </div>
          ))}
        </>
      ))}
      {manuscriptExtras.map((e) => (
        <CustomText text={e} style={"pb-5"} />
      ))}
      {manuscriptFinals.map((e, index) => {
        const [title, content] = e.split(":", 2); // split only at the first colon
        return (
          <p key={index} className="pb-5">
            <b>{title}:</b>
            {content}
          </p>
        );
      })} */}
    </div>
  );
};

export default Manuscript;
