import React from "react";
import CustomText from "../components/custom_text";

type Props = {};

const Manuscript = (props: Props) => {
  const manuscriptGuidelines: string[] = [
    "Manuscripts should be typed double spaced on one side of A4 sheets (21.6 x 27.9 cm) with 3.71 cm margins, using Microsoft Word 2000 or a later version thereof. The author should adhere to the following order of presentation: Article Title, Author(s), Full Address and E-mail, Abstract, PACS and Keywords, Main Text, Acknowledgment. Only the first letters of words in the Title, Headings and Subheadings are capitalized. Headings should be in bold while subheadings in italic fonts.",

    "Title Page: Includes the title of the article, authors’ first names, middle initials and surnames and affiliations. The affiliation should comprise the department, institution (university or company), city, zip code and state and should be typed as a footnote to the author’s name. The name and complete mailing address, telephone and fax numbers, and e-mail address of the author responsible for correspondence (designated with an asterisk) should also be included for official use. The title should be carefully, concisely and clearly constructed to highlight the emphasis and content of the manuscript, which is very important for information retrieval.",

    "Abstract: A one paragraph abstract not exceeding 200 words is required, which should be arranged to highlight the purpose, methods used, results and major findings.",

    "Keywords: A list of 4-6 keywords, which expresses the precise content of the manuscript for indexing purposes, should follow the abstract.",

    "PACS: Authors should supply one or more relevant PACS-2006 classification codes, (available at https://www.aip.org/publishing/pacs/pacs-2010-regular-edition)",

    "Introduction: Should present the purpose of the submitted work and its relationship to earlier work in the field, but it should not be an extensive review of the literature (e.g., should not exceed 1 ½ typed pages).",

    "Experimental Methods: Should be sufficiently informative to allow competent reproduction of the experimental procedures presented; yet concise enough not to be repetitive of earlier published procedures.",

    "Results: should present the results clearly and concisely.",

    "Discussion: Should be concise and focus on the interpretation of the results.",

    "Conclusion: Should be a brief account of the major findings of the study not exceeding one typed page.",

    "Acknowledgments: Including those for grant and financial support if any, should be typed in one paragraph directly preceding the References.",

    "References: References should be typed double spaced and numbered sequentially in the order in which they are cited in the text. References should be cited in the text by the appropriate Arabic numerals, which are superscripted while enclosed in square brackets. Titles of journals are abbreviated according to list of scientific periodicals. The style and punctuation should conform to the following examples:",
  ];
  const referenceExamples = [
    {
      title: "Journal Article",
      content: [
        "Heisenberg, W., Z. Phys. 49 (1928) 619.",
        "Bednorz, J. G. and Müller, K. A., Z. Phys. B64 (1986) 189",
        "Bardeen, J., Cooper, L.N. and Schrieffer, J. R., Phys. Rev. 106 (1957) 162.",
        "Asad, J. H., Hijjawi, R. S., Sakaji, A. and Khalifeh, J. M., Int. J. Theor. Phys. 44(4) (2005), 3977.",
      ],
    },
    {
      title: "Books with Authors, but no Editors",
      content: [
        'Kittel, C., "Introduction to Solid State Physics", 8th Ed. (John Wiley and Sons, New York, 2005), chapter 16.',
        'Chikazumi, S., C. D. Graham, JR, "Physics of Ferromagnetism", 2nd Ed. (Oxford University Press, Oxford, 1997).',
      ],
    },
    {
      title: "Books with Authors and Editors",
      content: [
        'Allen, P. B. "Dynamical Properties of Solids", Ed. (1), G. K. Horton and A. A. Maradudin (North-Holland, Amsterdam, 1980), p137.',
        'Chantrell, R. W. and O\'Grady, K., "Magnetic Properities of Fine Particles" Eds. J. L. Dormann and D. Fiorani (North-Holland, Amsterdam, 1992), p103.',
      ],
    },
    {
      title: "Technical Report",
      content: [
        'Purcell, J. "The Superconducting Magnet System for the 12-Foot Bubble Chamber", report ANL/HEP6813, Argonne Natt. Lab., Argonne, III, (1968).',
      ],
    },
    {
      title: "Patent",
      content: ["Bigham, C. B., Schneider, H. R., US patent 3 925 676 (1975)."],
    },
    {
      title: "Thesis",
      content: [
        "Mahmood, S. H., Ph.D. Thesis, Michigan State University, (1986), USA (Unpublished).",
      ],
    },
    {
      title: "Conference or Symposium Proceedings",
      content: [
        "Blandin, A. and Lederer, P. Proc. Intern. Conf. on Magnetism, Nottingham (1964), P.71.",
      ],
    },
    {
      title: "Internet Source",
      content: [
        "Should include authors' names (if any), title, internet website, URL, and date of access.",
      ],
    },
    {
      title:
        "Prepublication online articles (already accepted for publication)",
      content: [
        "Should include authors' names (if any), title of digital database, database website, URL, and date of access.",
      ],
    },
  ];
  const manuscriptExtras: string[] = [
    "For other types of referenced works, provide sufficient information to enable readers to access them.",

    "Tables: Tables should be numbered with Arabic numerals and referred to by number in the Text (e.g., Table 1). Each table should be typed on a separate page with the legend above the table, while explanatory footnotes, which are indicated by superscript lowercase letters, should be typed below the table.",

    "Illustrations: Figures, drawings, diagrams, charts and photographs are to be numbered in a consecutive series of Arabic numerals in the order in which they are cited in the text. Computer-generated illustrations and good-quality digital photographic prints are accepted. They should be black and white originals (not photocopies) provided on separate pages and identified with their corresponding numbers. Actual size graphics should be provided, which need no further manipulation, with lettering (Arial or Helvetica) not smaller than 8 points, lines no thinner than 0.5 point, and each of uniform density. All colors should be removed from graphics except for those graphics to be considered for publication in color. If graphics are to be submitted digitally, they should conform to the following minimum resolution requirements: 1200 dpi for black and white line art, 600 dpi for grayscale art, and 300 dpi for color art. All graphic files must be saved as TIFF images, and all illustrations must be submitted in the actual size at which they should appear in the journal. Note that good quality hardcopy original illustrations are required for both online and mail submissions of manuscripts.",

    "Text Footnotes: The use of text footnotes is to be avoided. When their use is absolutely necessary, they should be typed at the bottom of the page to which they refer, and should be cited in the text by a superscript asterisk or multiples thereof. Place a line above the footnote, so that it is set off from the text.",

    "Supplementary Material: Authors are encouraged to provide all supplementary materials that may facilitate the review process, including any detailed mathematical derivations that may not appear in whole in the manuscript.",

    "Revised Manuscript and Computer Disks: Following the acceptance of a manuscript for publication and the incorporation of all required revisions, authors should submit an original and one more copy of the final disk containing the complete manuscript typed double spaced in Microsoft Word for Windows 2000 or a later version thereof. All graphic files must be saved as PDF, JPG, or TIFF images.",

    "Allen, P.B., “…………….”, in: Horton, G.K., and Muradudin, A. A., (eds.), “Dynamical…….”, (North……..), pp….",
  ];

  const manuscriptFinals: string[] = [
    "Reprints: Twenty (20) reprints free of charge are provided to the corresponding author. For orders of more reprints, a reprint order form and prices will be sent with the article proofs, which should be returned directly to the Editor for processing.",

    "Copyright: Submission is an admission by the authors that the manuscript has neither been previously published nor is being considered for publication elsewhere. A statement transferring copyright from the authors to Yarmouk University is required before the manuscript can be accepted for publication. The necessary form for such transfer is supplied by the Editor-in-Chief. Reproduction of any part of the contents of a published work is forbidden without a written permission by the Editor-in-Chief.",

    "Disclaimer: Opinions expressed in this Journal are those of the authors and neither necessarily reflects the opinions of the Editorial Board or the University, nor the policy of the Higher Scientific Research Committee or the Ministry of Higher Education and Scientific Research. The publisher shoulders no responsibility or liability whatsoever for the use or misuse of the information published by JJP.",

    "Indexing: JJP is currently applying for indexing and abstracting to all related International Services.",
  ];

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
