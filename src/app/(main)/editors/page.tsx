import React from "react";
import EditorComponent from "../components/editor_component";

const options = [
  {
    heading: "EDITORIAL TEAM:",
    title: "Editor-in-Chief",
    name: "Dr. Farhan Saif",
    desc: "Department of Electronics, Quaid-i-Azam University, Islamabad, Pakistan",
    email: "",
  },
  {
    heading: "",
    title: "Lead Editor",
    name: "Dr. Abderrahim Al Allati",
    desc: "Laboratory of R&D in Engineering Sciences, Abdelmalek Essaadi University, Morocco",
    email: "",
  },
  {
    heading: "",
    title: "Lead Editor",
    name: "Dr. Jahan Akbar",
    desc: "Department of Physics, University of the West of England, Bristol, UK",
    email: "",
  },
];
const association = [
  {
    heading: "ASSOCIATE EDITORIAL BOARD",
    title: "",
    name: "Prof. Mark Hagmann",
    desc: "Desert Electronics Research Corporation, 762 Lacey Way, North Salt Lake 84064, Utah, U. S. A.",
    email: "MHagmann@NewPathResearch.Com.",
  },
  {
    heading: "",
    title: "",
    name: "Prof. Ibrahim A. Bsoul",
    desc: "Department  of Physics, Al al-Bayt University, Mafraq, Jordan.",
    email: "Ibrahimbsoul@yahoo.com",
  },
  {
    heading: " ",
    title: "",
    name: "  Prof. Riyad S. Manasrah",
    desc: "Department of Physics, The University of Jordan, Amman, Jordan.",
    email: "r.manasrah@ju.edu.jo",
  },
  {
    heading: "",
    title: "",
    name: "Prof. Ibrahim A. Bsoul",
    desc: "Department  of Physics, Al al-Bayt University, Mafraq, Jordan.",
    email: "Ibrahimbsoul@yahoo.com",
  },
  {
    heading: " ",
    title: "",
    name: "  Prof. Riyad S. Manasrah",
    desc: "Department of Physics, The University of Jordan, Amman, Jordan.",
    email: "r.manasrah@ju.edu.jo",
  },
  {
    heading: "",
    title: "",
    name: "Prof. Ibrahim A. Bsoul",
    desc: "Department  of Physics, Al al-Bayt University, Mafraq, Jordan.",
    email: "Ibrahimbsoul@yahoo.com",
  },
  {
    heading: " ",
    title: "",
    name: "  Prof. Riyad S. Manasrah",
    desc: "Department of Physics, The University of Jordan, Amman, Jordan.",
    email: "r.manasrah@ju.edu.jo",
  },
  {
    heading: "",
    title: "",
    name: "Prof. Ibrahim A. Bsoul",
    desc: "Department  of Physics, Al al-Bayt University, Mafraq, Jordan.",
    email: "Ibrahimbsoul@yahoo.com",
  },
  {
    heading: " ",
    title: "",
    name: "  Prof. Riyad S. Manasrah",
    desc: "Department of Physics, The University of Jordan, Amman, Jordan.",
    email: "r.manasrah@ju.edu.jo",
  },
];
const editorialBoard = [
  {
    name: "Dr. Shinichi Watanabe",
    affiliation: "University of Electro-Communications (Japan)",
    email: "watanabe@uec.ac.jp",
    link: "https://researchers.uec.ac.jp/search/detail.html?systemId=ce37d76c47eacb56520e17560c007669&lang=en&st=researcher",
  },
  {
    name: "Dr. John B Delos",
    affiliation: "College of William and Mary",
    email: "jbdelo@wm.edu",
    link: "https://www.wm.edu/as/mathematics/research/undergraduate_research/EXTREEMS-QED/faculty/delos_j.php",
  },
  {
    name: "Dr. Tomotake Yamakoshi",
    affiliation:
      "Institute for Laser Science, University of Electro-Communications, Tokyo, Japan",
    email: "t-yamakoshi@uec.ac.jp",
    link: "https://researchmap.jp/7000020905",
  },
  {
    name: "Dr. Hilda Cerdeira",
    affiliation: "Instituto de Física Teórica - UNESP",
    email: "cerdeira@ift.unesp.br",
    link: "https://hcerdeira.info/index.php?resume",
  },
  {
    name: "Dr. Yaseen Hassouni",
    affiliation:
      "Mohammed V University, Rabat, Morocco (Université Mohammed V de Rabat)",
    email: "yassine.hassouni@gmail.com",
    link: "https://www.researchgate.net/profile/Yassine-Hassouni-2",
  },
  {
    name: "Dr. Gernot Alber",
    affiliation:
      "Technical University of Darmstadt, Germany (TECHNISCHE UNIVERSITAT DARMASTADT)",
    email: "gernot.alber@physik.tu-darmstadt.de",
    link: "https://www.physik.tu-darmstadt.de/der_fachbereich/lehrende_physik/professor_innen_details_5249.en.jsp",
  },
  {
    name: "Dr. Jahan Akbar",
    affiliation: "Hazara University Mansehra, Khyber Pakhtunkhwa, Pakistan",
    email: "jahan_akbar@yahoo.com, jehan@hu.edu.pk",
    link: "https://lms.hu.edu.pk/department/faculty-details/1686",
  },
  {
    name: "Dr. Khalid Al Badar",
    affiliation: "Department of Physics, University of Jordan, Amman, Jordan",
    email: "hbadar@hu.edu.jo",
    link: "",
  },
  {
    name: "Dr. Munazza Z. Ali",
    affiliation: "Physics Department, Punjab University, Lahore",
    email: "munazzazulfiqar@yahoo.com, munazza.physics@pu.edu.pk",
    link: "https://pu.edu.pk/faculty/detail/munaza-zulfiqar",
  },
  {
    name: "Dr. Atif Shahbaz",
    affiliation: "GC University, Lahore",
    email: "atifshahbaz@gcu.edu.pk",
    link: "https://gcu.edu.pk/faculty-profile.php?id=952",
  },
  {
    name: "Dr. Imran Qureshi",
    affiliation: "University of Birmingham, Dubai campus",
    email: "m.i.qureshi@bham.ac.uk",
    link: "https://research.birmingham.ac.uk/en/persons/imran-qureshi",
  },
  {
    name: "Dr. Shakir Ullah",
    affiliation: "Department of Physics, Quaid-i-Azam University, Islamabad",
    email: "shakir@qau.edu.pk",
    link: "https://phys.qau.edu.pk/faculty.php?id=42",
  },
  {
    name: "Dr. Wajid A Khan",
    affiliation:
      "National Center for Physics, Quaid-i-Azam University, Islamabad",
    email: "wajid.ali@ncp.edu.pk",
    link: "https://www.ncp.edu.pk/slp-2024.php",
  },
  {
    name: "Dr. Hassana Kokab",
    affiliation: "Quaid-i-Azam University, Islamabad",
    email: "kokab.awan@gmail.com",
    link: "",
  },
];

const professors = [
  {
    name: "Dr. Dieter Suter",
    uni: "Fakultaet Physik, Technische Universitaet Dortmund, Germany",
    email: "dieter.suter@tu-dortmund.de",
    link: "",
  },
  {
    name: "Dr. Hilda Cerdeira",
    uni: "Instituto de Física Teórica – UNESP, Brazil",
    email: "cerdeira@ift.unesp.br",
    link: "",
  },
  {
    name: "Dr. Mahmoud Jaghoub",
    uni: "The University of Jordan",
    email: "mjaghoub@ju.edu.jo",
    link: "",
  },
  {
    name: "Dr. Shinichi Watanabe",
    uni: "University of Electro-Communications, Tokyo, Japan",
    email: "watanabe@uec.ac.jp",
    link: "",
  },
  {
    name: "Dr. Yaseen Hassouni",
    uni: "Université Mohammed V de Rabat (Mohammed V University), Rabat, Morocco",
    email: "yassine.hassouni@gmail.com",
    link: "",
  },
  {
    name: "Dr. Asghar Qadir",
    uni: "Pakistan Academy of Sciences, Islamabad, Pakistan",
    email: "",
    link: "",
  },
  {
    name: "Dr. M. Suhail Zubairy",
    uni: "Texas A&M university, Texas, USA",
    email: "",
    link: "",
  },
];

const Page = () => {
  return (
    <div className="w-[100%]   p-5">
      <div className="columns-1 md:columns-2 gap-3">
        <div className="flex flex-col w-full gap-3 break-inside-avoid ">
          <EditorComponent heading={"EDITORIAL BOARD:"} />
          {editorialBoard.map((value) => (
            <EditorComponent
              key={value.email}
              style={"p-0"}
              heading={""}
              title={""}
              name={value.name}
              desc={value.affiliation}
              email={value.email}
              link={value.link}
            />
          ))}
        </div>
        <div className="flex flex-col  gap-3 w-full   break-inside-avoid">
          <EditorComponent heading={"EDITORIAL TEAM:"} />
          {options.map((value) => (
            <EditorComponent
              key={value.email}
              heading={""}
              title={value.title}
              name={value.name}
              desc={value.desc}
              email={value.email}
            />
          ))}
        </div>
        <div className="flex flex-col w-full  gap-3 break-inside-avoid">
          {association.map((value) => (
            <EditorComponent
              key={value.email}
              heading={value.heading}
              title={value.title}
              name={value.name}
              desc={value.desc}
              email={value.email}
            />
          ))}
        </div>

        <div className="flex flex-col  gap-3 w-full  break-inside-avoid">
          <EditorComponent heading={"International Advisory Board:"} />
          {professors.map((value) => (
            <EditorComponent
              key={value.email}
              heading={""}
              title={""}
              name={value.name}
              desc={value.uni}
              email={value.email}
              titleStyle="underline"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
