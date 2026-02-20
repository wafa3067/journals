import React from "react";
import CustomText from "../components/custom_text";

const PublicationEthics = () => {
  const bulits = [
    "ensuring that all appropriate contributors are included as co-authors",
    "verifying that all co-authors have reviewed and approved the manuscript",
    "managing communication with the editorial office and reviewers",
    "ensuring compliance with journal policies on behalf of the author group",
  ];
  return (
    <div style={{ width: "100%" }} className=" p-5">
      <CustomText
        text={"Publication Ethics"}
        style={"text-2xl font-bold pb-3"}
      />
      <CustomText
        text={"ECHOS Quantum-Publication: Ethics and Malpractice Statement"}
        style={"text-sm font-bold pb-2"}
      />

      <CustomText text={"GENERAL STATEMENT"} style={"text-sm font-bold pb-2"} />

      <CustomText
        boldText="ECHOS Quantum "
        text={
          "is an international, peer-reviewed research journal published biannually. ECHOS Quantum adheres to the highest standards of publication ethics to ensure full compliance with internationally recognized ethical practices in scholarly publishing. The journal actively implements all necessary measures to prevent publication misconduct in any form.ECHOS Quantum ensures that all parties involved in the publication process, including authors, editors, and reviewers, fully commit to maintaining ethical behavior and safeguarding the integrity of the scholarly record."
        }
        style={" text-black pb-10"}
      />

      <CustomText
        text={"DUTIES OF EDITOR-IN-CHIEF & EDITORIAL BOARD"}
        style={"text-sm font-bold pb-2 font-bold"}
      />

      <CustomText
        starting="The"
        boldText="Editorial Board"
        text={
          "follows strict procedures and policies to ensure the quality of all published materials and to maintain the integrity of the scholarly record. Decisions regarding the acceptance or rejection of submitted manuscripts are made solely on the basis of academic and scientific merit. The Editorial Board holds full and independent authority over editorial decisions, without any influence or intervention from the publisher."
        }
        style={" text-black pb-2"}
      />
      <CustomText
        text={
          "The Editorial Board selects qualified peer reviewers with appropriate expertise and ensures that no conflicts of interest exist in the review process. The editorial staff takes great care to preserve confidentiality; no information about a submitted manuscript is disclosed to anyone other than the corresponding author, assigned reviewers, and the publisher as necessary. Reviewers are consistently reminded of their obligation to maintain strict confidentiality and not to share or discuss any part of the manuscript they are evaluating."
        }
        style={" text-black pb-2"}
      />
      <CustomText
        starting="The editorial staff also ensures the anonymity of reviewers unless a reviewer explicitly chooses to reveal their identity. The "
        boldText="Editorial Board"
        text={
          "and the Editor-in-Chief work diligently to ensure that all manuscripts are evaluated solely on scholarly grounds and that authors are never pressured to cite specific publications for non-academic or inappropriate reasons."
        }
        style={" text-black pb-2"}
      />
      <CustomText
        text={
          "In cases where legitimate and undisputed changes in authorship arise, the Editor shall require written consent from all listed authors, including those whose names are being added or removed, before implementing any changes."
        }
        style={" text-black pb-10"}
      />
      <CustomText
        text={"Instructions to the Authors"}
        style={"text-sm font-bold pb-2"}
      />
      <CustomText
        starting="Authors submitting manuscripts to"
        boldText="ECHOS Quantum"
        text={
          "are expected to uphold the highest standards of scholarly integrity and ethical research practice. By submitting their work, authors affirm their commitment to the following responsibilities:"
        }
        style={" text-black pb-2"}
      />
      <CustomText
        boldText="1. Originality and Authenticity of Work"
        style={" text-black pb-2"}
      />
      <CustomText
        starting="Authors must ensure that the submitted manuscript represents their"
        boldText=" own original research, "
        text={"presented accurately and honestly."}
        style={" text-black pb-2"}
      />
      <CustomText
        text={
          "The work should not contain fabricated, falsified, or plagiarized material. Any form of academic dishonesty is strictly prohibited."
        }
        style={" text-black pb-2"}
      />
      <CustomText
        boldText="2. Exclusive Submission"
        style={" text-black pb-2"}
      />
      <CustomText
        starting="Manuscripts submitted to ECHOS Quantum must be"
        boldText=" submitted exclusively"
        text={
          " to the journal.They must not be under review, accepted, or published elsewhere in any form. Authors are required to withdraw submissions from other outlets before submitting to this journal."
        }
        style={" text-black pb-2"}
      />
      <CustomText
        boldText="3. Accuracy and Completeness of Content"
        style={"text-black pb-2"}
      />
      <CustomText
        starting="Authors are responsible for the"
        boldText=" accuracy, clarity, and completeness"
        text=" of the manuscript. The research presented must include sufficient methodological detail, data, and explanation to allow verification or replication by other scholars when appropriate."
        style={"text-black pb-2"}
      />

      <CustomText
        boldText="4. Proper Acknowledgment of Sources"
        style={"text-black pb-2"}
      />
      <CustomText
        starting="All relevant literature, data, methods, and earlier work that contributed to the manuscript must be"
        boldText=" properly cited."
        text=" Authors must acknowledge the intellectual contributions of others accurately and transparently."
        style={"text-black pb-2 "}
      />

      <CustomText
        boldText="5. Authorship Criteria"
        style={"text-black pb-2 "}
      />
      <CustomText
        starting="Authorship must reflect"
        boldText=" substantial scholarly contribution."
        text=" Each listed author must have contributed meaningfully to the conception, design, execution, analysis, interpretation, or writing of the research. All authors must review and approve the final manuscript before submission."
        style={"text-black pb-2 "}
      />

      <CustomText
        boldText="6. Copyright and Publication Agreement"
        style={"text-black pb-2 "}
      />
      <CustomText
        starting="All authors must read and sign the journal’s"
        boldText=" copyright release form."
        text=" By signing, authors confirm their rights to the work and grant ECHOS Quantum permission to publish it in accordance with journal policy."
        style={"text-black pb-2 "}
      />

      <CustomText
        boldText="7. Responsibilities of the Corresponding Author"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="The corresponding author is responsible for:"
        style={"text-black pb-2 "}
      />
      {bulits.map((e) => (
        <div className="ml-5" key={e}>
          <li className="">{e}</li>
        </div>
      ))}

      {/* 8. Disclosure of Funding */}
      <CustomText
        boldText="8. Disclosure of Funding"
        style={"text-black pb-2 pt-5 "}
      />
      <CustomText
        starting="All sources of"
        boldText=" financial support"
        text=" institutional backing, or sponsorship must be clearly disclosed in the manuscript. Authors should specify the role of the funding agency in the research process, including study design, data collection, analysis, and manuscript preparation."
        style={"text-black pb-2 "}
      />

      {/* 9. Ethical Compliance */}
      <CustomText boldText="9. Ethical Compliance" style={"text-black pb-2 "} />
      <CustomText
        starting="Authors must ensure that their work complies with all relevant"
        boldText=" ethical standards"
        text=", including approvals for studies involving human participants, animals, or sensitive data, when applicable."
        style={"text-black pb-2 "}
      />

      {/* 10. Correction of Errors */}
      <CustomText
        boldText="10. Correction of Errors"
        style={"text-black pb-2 "}
      />
      <CustomText
        starting="If authors discover a significant error or inaccuracy in their published or submitted manuscript, they must promptly notify the journal and cooperate in issuing a"
        boldText=" correction, retraction, or amendment"
        text=" as necessary."
        style={"text-black pb-2 "}
      />

      {/* Instructions to the Reviewers */}
      <CustomText
        boldText="Instructions to the Reviewers"
        style={"text-black pb-2 "}
      />
      <CustomText
        starting="Reviewers play a central role in maintaining the academic rigor, integrity, and quality of manuscripts published in ECHOS Quantum. All reviewers are expected to adhere to the highest standards of"
        boldText=" ethical conduct"
        text=" and to fulfill the following responsibilities:"
        style={"text-black pb-2 "}
      />

      {/* 1. Confidentiality */}
      <CustomText boldText="1. Confidentiality" style={"text-black pb-2 "} />
      <CustomText
        text="Manuscripts received for review are strictly confidential."
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">share the manuscript or its contents with others</li>
        <li className="">
          discuss the manuscript with unauthorized individuals
        </li>
        <li className="">
          use any part of the unpublished material for personal research or
          advantage
        </li>
      </ul>

      {/* 2. Objective and Constructive Evaluation */}
      <CustomText
        boldText="2. Objective and Constructive Evaluation"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Reviews must be conducted with impartiality, fairness, and scholarly judgment."
        style={"text-black pb-2 "}
      />
      <CustomText text="Reviewers should:" style={"text-black pb-2 "} />
      <ul className="ml-5 list-disc">
        <li className="">provide clear, evidence-based comments</li>
        <li className="">avoid personal criticism</li>
        <li className="">
          offer constructive suggestions to improve the clarity, rigor, and
          quality of the manuscript
        </li>
      </ul>

      {/* Reviewer Guidelines */}

      {/* 3. Assessment of Originality and Academic Integrity */}
      <CustomText
        boldText="3. Assessment of Originality and Academic Integrity"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Reviewers should evaluate whether the manuscript:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">presents original and significant research</li>
        <li className="">
          avoids plagiarism, duplication, or unethical practices
        </li>
        <li className="">
          provides accurate, verifiable, and sufficient data and analysis
        </li>
      </ul>
      <CustomText
        text="If plagiarism or ethical concerns arise, reviewers should confidentially notify the Editorial Board."
        style={"text-black pb-2 "}
      />

      {/* 4. Identification of Relevant Literature */}
      <CustomText
        boldText="4. Identification of Relevant Literature"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Reviewers should ensure that the manuscript appropriately:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">cites relevant prior work</li>
        <li className="">acknowledges foundational studies</li>
        <li className="">avoids inappropriate or unnecessary citations</li>
      </ul>
      <CustomText
        text="If key references are missing, reviewers should recommend them in an unbiased manner."
        style={"text-black pb-2 "}
      />

      {/* 5. Conflict of Interest */}
      <CustomText
        boldText="5. Conflict of Interest"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Reviewers must disclose any potential conflict of interest, including:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          personal, professional, or financial relationships with the authors
        </li>
        <li className="">competitive or collaborative connections</li>
        <li className="">situations that may compromise objectivity</li>
      </ul>
      <CustomText
        text="If a conflict exists, the reviewer should decline the review."
        style={"text-black pb-2 "}
      />

      {/* 6. Timely Response */}
      <CustomText boldText="6. Timely Response" style={"text-black pb-2 "} />
      <CustomText
        text="Reviewers should complete evaluations promptly. If unable to meet the deadline, reviewers must inform the editorial office immediately so the manuscript can be reassigned."
        style={"text-black pb-2 "}
      />

      {/* 7. Ethical Considerations */}
      <CustomText
        boldText="7. Ethical Considerations"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Reviewers should evaluate whether the study:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">follows accepted ethical standards</li>
        <li className="">
          reports necessary approvals for human or animal research
        </li>
        <li className="">handles sensitive data responsibly</li>
      </ul>
      <CustomText
        text="Any ethical irregularities should be reported to the Editor-in-Chief confidentially."
        style={"text-black pb-2 "}
      />

      {/* 8. Respect for Authorship and Independence */}
      <CustomText
        boldText="8. Respect for Authorship and Independence"
        style={"text-black pb-2 "}
      />
      <CustomText text="Reviewers must not:" style={"text-black pb-2 "} />
      <ul className="ml-5 list-disc">
        <li className="">
          attempt to influence authors to cite their own unrelated work
        </li>
        <li className="">
          impose personal preferences unrelated to scientific merit
        </li>
        <li className="">request data or materials for personal use</li>
        <li className="">try to identify or contact the authors</li>
      </ul>

      {/* 9. Recommendation to the Editorial Board */}
      <CustomText
        boldText="9. Recommendation to the Editorial Board"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Reviewers should provide a recommendation regarding the manuscript’s suitability for publication, such as:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">accept</li>
        <li className="">minor revision</li>
        <li className="">major revision</li>
        <li className="">reject</li>
      </ul>
      <CustomText
        text="The final decision rests with the Editorial Board, not the reviewer."
        style={"text-black pb-2 "}
      />

      {/* Instruction to the Editors */}
      <CustomText
        boldText="Instruction to the Editors"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="The Editorial Board of ECHOS Quantum follows strict and transparent procedures to ensure the highest quality of published material and to maintain the integrity of the scholarly record. The editorial process is guided by internationally recognized standards of publication ethics."
        style={"text-black pb-2 "}
      />

      {/* 1. Editorial Independence and Decision-Making */}
      <CustomText
        boldText="1. Editorial Independence and Decision-Making"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="The Editorial Board is solely responsible for all editorial decisions, including acceptance, revision requests, and rejection of submitted manuscripts."
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          Decisions are made exclusively on academic merit, scientific rigor,
          relevance, and originality.
        </li>
        <li className="">
          The publisher has no influence on editorial decisions or the peer
          review process.
        </li>
        <li className="">
          Commercial, institutional, or political considerations do not affect
          the editorial outcome.
        </li>
      </ul>

      {/* 2. Selection of Qualified Peer Reviewers */}
      <CustomText
        boldText="2. Selection of Qualified Peer Reviewers"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="The Editorial Board ensures that each manuscript is evaluated by reviewers who:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">possess appropriate subject expertise</li>
        <li className="">have no known conflicts of interest</li>
        <li className="">
          are capable of offering fair, objective, and constructive evaluations
        </li>
      </ul>
      <CustomText
        text="Reviewers are selected solely based on their scientific qualifications and experience."
        style={"text-black pb-2 "}
      />

      {/* 3. Confidentiality and Data Protection */}
      <CustomText
        boldText="3. Confidentiality and Data Protection"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="The editorial office takes great care to preserve the confidentiality of all submitted manuscripts."
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          Manuscripts and related materials are shared only with the
          corresponding author, selected reviewers, and essential editorial
          staff.
        </li>
        <li className="">
          Reviewers are regularly reminded that the manuscript and its contents
          are confidential and may not be shared or discussed with others.
        </li>
        <li className="">
          Reviewer identities are protected and remain confidential unless a
          reviewer explicitly chooses to reveal their name.
        </li>
      </ul>

      {/* 4. Integrity of the Peer Review Process */}
      <CustomText
        boldText="4. Integrity of the Peer Review Process"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          All manuscripts undergo a fair, unbiased, and scholarly peer review
        </li>
        <li className="">
          Reviewers’ assessments are based solely on academic standards
        </li>
        <li className="">
          Authors are not pressured to cite specific journals, editors, or
          publications for non-scholarly reasons
        </li>
        <li className="">
          Unethical influences, coercive citation practices, and citation
          manipulation are strictly avoided
        </li>
      </ul>

      {/* 5. Authorship Issues and Changes */}
      <CustomText
        boldText="5. Authorship Issues and Changes"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          Requests for changes in authorship must be justified and accompanied
          by a written agreement from all listed authors, including those being
          removed
        </li>
        <li className="">
          Authorship changes must comply with internationally accepted
          authorship criteria
        </li>
        <li className="">
          No changes are made without full documentation and unanimous author
          consent
        </li>
      </ul>

      {/* 6. Editorial Transparency and Accountability */}
      <CustomText
        boldText="6. Editorial Transparency and Accountability"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">Documenting decisions and communications</li>
        <li className="">
          Ensuring consistent application of editorial policies
        </li>
        <li className="">
          Responding promptly and responsibly to concerns about ethical breaches
          or research misconduct
        </li>
      </ul>

      {/* 7. Protection of the Scholarly Record */}
      <CustomText
        boldText="7. Protection of the Scholarly Record"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          Errata, corrigenda, retractions, or expressions of concern are issued
          according to established guidelines when errors or misconduct are
          identified.
        </li>
      </ul>

      {/* Plagiarism */}
      <CustomText boldText="Plagiarism" style={"text-black pb-2 "} />
      <CustomText
        text="ECHOS Quantum maintains a strict zero-tolerance policy toward plagiarism in all forms. Upholding originality and protecting intellectual property are essential to preserving the integrity of the scholarly record and ensuring trust in the research published by the journal."
        style={"text-black pb-2 "}
      />

      {/* 1. Definition of Plagiarism */}
      <CustomText
        boldText="1. Definition of Plagiarism"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Plagiarism includes, but is not limited to:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          presenting another author’s ideas, words, figures, or data as one’s
          own
        </li>
        <li className="">copying text or results without proper citation</li>
        <li className="">
          reusing substantial parts of one’s own previously published work
          without disclosure (self-plagiarism)
        </li>
        <li className="">
          paraphrasing content too closely to the original source without
          appropriate acknowledgment
        </li>
        <li className="">
          submitting a manuscript that overlaps significantly with previously
          published material
        </li>
      </ul>
      <CustomText
        text="All authors are required to ensure that their work is genuinely original and properly cites all sources."
        style={"text-black pb-2 "}
      />

      {/* 2. Screening for Plagiarism */}
      <CustomText
        boldText="2. Screening for Plagiarism"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="All submitted manuscripts undergo plagiarism screening using reliable detection tools approved by the journal."
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          Manuscripts with excessive similarity, unreferenced material, or
          copied sections are rejected immediately.
        </li>
        <li className="">
          Authors may be asked to explain or revise overlapping text when
          similarity is minor and unintentional.
        </li>
        <li className="">
          Serious or deliberate cases are referred to the Editor-in-Chief and
          may result in further actions.
        </li>
      </ul>

      {/* 3. Handling Confirmed Plagiarism */}
      <CustomText
        boldText="3. Handling Confirmed Plagiarism"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="If plagiarism is detected at any stage—submission, review, or after publication—the Editorial Board will take appropriate actions, which may include:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">rejecting the manuscript</li>
        <li className="">retracting a published article</li>
        <li className="">
          notifying the authors’ institution or funding agency
        </li>
        <li className="">
          banning the authors from future submissions for a defined period
        </li>
        <li className="">
          reporting the misconduct to relevant authorities, if required
        </li>
      </ul>

      {/* 4. Authors’ Responsibilities */}
      <CustomText
        boldText="4. Authors’ Responsibilities"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">submit only original work</li>
        <li className="">
          cite all sources and previously published work used in the study
        </li>
        <li className="">
          avoid reusing their own previously published text without clear
          citation (self-plagiarism)
        </li>
        <li className="">
          ensure that all co-authors review and approve the manuscript prior to
          submission
        </li>
      </ul>

      {/* 5. Reviewers’ and Editors’ Role in Preventing Plagiarism */}
      <CustomText
        boldText="5. Reviewers’ and Editors’ Role in Preventing Plagiarism"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">reporting any suspected plagiarism or overlap</li>
        <li className="">
          handling allegations confidentially and with due process
        </li>
        <li className="">
          ensuring that evaluations are scholarly, unbiased, and based solely on
          academic merit
        </li>
      </ul>

      {/* 6. Commitment to Ethical Publishing */}
      <CustomText
        boldText="6. Commitment to Ethical Publishing"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          ensuring that all manuscripts are evaluated without influence from the
          publisher or external parties
        </li>
        <li className="">
          protecting the confidentiality of submitted manuscripts
        </li>
        <li className="">safeguarding the identities of reviewers</li>
        <li className="">
          ensuring that authors are not pressured to cite specific publications
          without scholarly justification
        </li>
        <li className="">
          processing authorship changes only when all authors agree in writing
        </li>
      </ul>

      {/* Copyright */}
      <CustomText boldText="Copyright" style={"text-black pb-2 "} />
      <CustomText
        text="ECHOS Quantum upholds strict copyright policies to protect the rights of authors, preserve academic integrity, and ensure proper use and distribution of published material."
        style={"text-black pb-2 "}
      />

      {/* 1. Copyright Transfer */}
      <CustomText boldText="1. Copyright Transfer" style={"text-black pb-2 "} />
      <CustomText
        text="Upon acceptance of a manuscript, all authors are required to sign the Copyright Transfer Agreement. This agreement confirms that:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          the manuscript is original and has not been published elsewhere
        </li>
        <li className="">
          the authors grant ECHOS Quantum the exclusive right to publish,
          reproduce, and distribute the article in all formats
        </li>
        <li className="">
          the authors retain the right to use their work for academic,
          non-commercial purposes with proper citation
        </li>
      </ul>
      <CustomText
        text="No article will be published without a completed and signed copyright form from all authors."
        style={"text-black pb-2 "}
      />

      {/* 2. Author Rights */}
      <CustomText boldText="2. Author Rights" style={"text-black pb-2 "} />
      <ul className="ml-5 list-disc">
        <li className="">
          use their published article in teaching, presentations, theses, or
          dissertations
        </li>
        <li className="">
          place the accepted version (post-print) in institutional or personal
          repositories with acknowledgment of the journal
        </li>
        <li className="">
          reuse figures or data from the article in future work with proper
          citation
        </li>
      </ul>
      <CustomText
        text="However, authors may not distribute the final published version without written permission from the journal."
        style={"text-black pb-2 "}
      />

      {/* 3. Permissions and Reuse */}
      <CustomText
        boldText="3. Permissions and Reuse"
        style={"text-black pb-2 "}
      />
      <CustomText
        text="Any reproduction, translation, or large-scale distribution of material published in ECHOS Quantum requires prior written approval from the journal. This applies to:"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">tables, figures, or data</li>
        <li className="">extended quotations</li>
        <li className="">
          re-publication in books, edited volumes, or commercial materials
        </li>
      </ul>
      <CustomText
        text="Requests for permission should be submitted to the Editorial Office."
        style={"text-black pb-2 "}
      />

      {/* 4. Originality and Ownership */}
      <CustomText
        boldText="4. Originality and Ownership"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          the submitted work is their own intellectual property
        </li>
        <li className="">
          no part of the manuscript infringes upon the rights of other authors
          or publishers
        </li>
        <li className="">
          all copyrighted material used in the manuscript (figures, tables,
          data) has proper permission and acknowledgment
        </li>
        <li className="">
          the manuscript contains no previously published content unless
          explicitly permitted and cited
        </li>
      </ul>

      {/* 5. Editorial Responsibilities in Copyright Protection */}
      <CustomText
        boldText="5. Editorial Responsibilities in Copyright Protection"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          no copyrighted material is published without proper authorization
        </li>
        <li className="">
          plagiarism and copyright violations are investigated promptly
        </li>
        <li className="">
          manuscripts are handled confidentially and responsibly during the
          editorial process
        </li>
        <li className="">
          reviewer identities and manuscript content remain protected
        </li>
      </ul>

      {/* 6. Handling Copyright Violations */}
      <CustomText
        boldText="6. Handling Copyright Violations"
        style={"text-black pb-2 "}
      />
      <ul className="ml-5 list-disc">
        <li className="">
          the manuscript may be rejected or returned to authors for correction
        </li>
        <li className="">
          published articles found to violate copyright may be retracted
        </li>
        <li className="">
          the authors’ institution or funding agency may be notified in severe
          cases
        </li>
        <li className="">
          the authors may be restricted from future submissions
        </li>
      </ul>
      <CustomText
        text="Copyright violations are treated as serious academic misconduct."
        style={"text-black pb-2 "}
      />
    </div>
  );
};

export default PublicationEthics;
