"use client";
import FirstHeader from "./pages/first_header";
import Footer from "./pages/footer";
import SecondHeader from "./pages/second_header";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import loadingAnim from "@/lottie/lodingAnim.json";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { getToken } from "../api/slice/getTokenSlice";
import { fetchUserByEmail } from "../api/slice/profileSlice";
import { setProfileData } from "../api/slice/profileStateSlice";
import {
  AboutHomePage,
  editAboutData,
} from "../admin/adminSlice/home/homePageSlice";
import { createSideHomeSlice } from "../admin/adminSlice/sideHomeSlice/addSideHomeSlice";
import { title } from "process";
import { createEditorHome } from "../admin/adminSlice/editor/addEditorSlice";
import { AboutHomeGetPage } from "../admin/adminSlice/home/GetHomeAboutSlice";
import {
  addCategory,
  addCategoryIntial,
  addTeamPage,
} from "../admin/adminSlice/team/addTeamSlice";
import { GetTeam, GetTeamThunk } from "../admin/adminSlice/team/getTeamSlice";
import { addContactPage } from "../admin/adminSlice/contact/addContactSlice";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [tokens, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  const [imageSelected, setimageSelected] = useState<File | null>(null);

  useEffect(() => {
    setLoading(true);

    // Only run on client side
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      dispatch(getToken(storedToken));
    } else {
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token != null && token != "") {
      dispatch(fetchUserByEmail()).then((user) => {
        dispatch(setProfileData(user));
      });
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token == null && token == "") {
      // Simulate 3-second loading
      const timer = setTimeout(() => {
        setLoading(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
    // Cleanup timer when component unmounts
  }, [token]);

  const aboutIntial = [
    {
      title: "About the Journal",
      desc: "ECHOS Quantum is an international open-access journal publishing original research and reviews within the field of Quantum Science and Technology.",
    },
    {
      title: "Spotlight",
      desc: "ECHOS Quantum covers interdisciplinary research disciplines including physics, chemistry, biology, metrology, computing, information theory, communications, economics, and finance. The journal aims to develop quantum technologies across various scientific and industrial domains and welcomes longer, in-depth research papers.",
    },
    {
      title: "Frequency",
      desc: "ECHOS Quantum is published annually, with issues released in December each year.",
    },
  ];

  const sideIntail = [
    {
      title: "Open Access",
      desc: "Article Publishing Charge (APC) is USD 3,310 (excluding taxes). The amount may be reduced during submission if applicable.",
    },
    {
      title: "Subscription",
      desc: "No publication fee is charged to authors, and published articles are immediately available to subscribers.",
    },
    {
      title: "Article Publishing Options",
      desc: "Authors can choose between Open Access and Subscription-based publishing models depending on their needs.",
    },
  ];

  useEffect(() => {
    const loadDefault = async () => {
      const file = await getDefaultFile();
      setimageSelected(file);
    };

    loadDefault();
  }, []);
  const editorIntial = [
    {
      name: "Dr. Farhan Saif",
      desc: "Department of Electronics, Quaid-i-Azam University, Islamabad, Pakistan",
      image: imageSelected,
    },
    {
      name: "Dr. Abderrahim Al Allati",
      desc: "Laboratory of R&D in Engineering Sciences, Abdelmalek Essaadi University, Morocco",
      image: imageSelected,
    },
    {
      name: "Dr. Jahan Akbar",
      desc: "Department of Physics, University of the West of England, Bristol, UK",
      image: imageSelected,
    },
  ];

  async function getDefaultFile() {
    const res = await fetch("/images/git.png");
    const blob = await res.blob();

    return new File([blob], "default.png", { type: blob.type });
  }
  useEffect(() => {
    dispatch(AboutHomeGetPage()).then((v) => {
      if (v.payload.length == 0) {
        addTypeOfTeams();
        aboutDataHome();
        SidebarHome();
        EditorHome();
        addContact();
        handleAddTeam();
      }
    });
  }, [AboutHomeGetPage]);

  // add  intial data for home
  const aboutDataHome = () => {
    aboutIntial.forEach((element) => {
      dispatch(
        AboutHomePage({ title: element.title, descriptions: element.desc }),
      );
    });
  };
  const SidebarHome = () => {
    sideIntail.forEach((element) => {
      dispatch(
        createSideHomeSlice({
          title: element.title,
          descriptions: element.desc,
        }),
      );
    });
  };
  const EditorHome = () => {
    editorIntial.forEach((element) => {
      dispatch(
        createEditorHome({
          title: element.name,
          descriptions: element.desc,
          image: element.image,
        }),
      );
    });
  };

  const EditorTeam = [
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
  const ASSOCIATE_EDITORIAL_BOARD = [
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

  const International_Advisory_Board = [
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

  const addTeamTypes = [
    "Editorial Team",
    "Associate Editorial Board",
    "Editorial Board",
    "International Advisory Board",
  ];
  const addTypeOfTeams = () => {
    addTeamTypes.forEach((el, index) => {
      console.log(`${index + 1} === ${addTeamTypes.length}`);
      dispatch(addCategoryIntial({ name: el, assignOrder: index }));
      if (index + 1 == addTeamTypes.length) {
      }
    });
    // handleAddTeam();
  };

  // add intial  data for editorial boards
  const handleAddTeam = () => {
    dispatch(GetTeamThunk()).then((element) => {
      element.payload.map((v: GetTeam) => {
        if (v.title === "Editorial Team") {
          EditorTeam.forEach((e) => {
            dispatch(
              addTeamPage({
                id: 0,
                title: e.name,
                descriptions: "",
                heading: e.title,
                email: e.email,
                link: "",
                affiliation: "",
                uni: e.desc,
                category: element.payload[0]["id"],
              }),
            );
          });
        }
        if (v.title === "Associate Editorial Board") {
          ASSOCIATE_EDITORIAL_BOARD.forEach((e) => {
            dispatch(
              addTeamPage({
                id: 0,
                title: e.name,
                descriptions: "",
                heading: e.title,
                email: e.email,
                link: "",
                affiliation: "",
                uni: e.desc,
                category: element.payload[1]["id"],
              }),
            );
          });
        }
        if (v.title === "Editorial Board") {
          editorialBoard.forEach((e) => {
            dispatch(
              addTeamPage({
                id: 0,
                title: e.name,
                descriptions: "",
                heading: "",
                email: e.email,
                link: "",
                affiliation: "",
                uni: e.affiliation,
                category: element.payload[2]["id"],
              }),
            );
          });
        }
        if (v.title === "International Advisory Board") {
          International_Advisory_Board.forEach((e) => {
            dispatch(
              addTeamPage({
                id: 0,
                title: e.name,
                descriptions: "",
                heading: "",
                email: "",
                link: "",
                affiliation: "",
                uni: e.uni,
                category: element.payload[3]["id"],
              }),
            );
          });
        }
      });
    });
    // dispatch(addTeamPage());
    // Logic to add a new team member
  };

  const addContactIntial = [
    {
      name: "Editorial Office",
      type: "None",
      desc: "Our Editorial office is overseeing the day-to-day editorial and publishing operations including addressing questions from authors, editors, or readers. For questions regarding submission of manuscripts, published articles, or other journal related questions, please contact.",
    },
    {
      type: "email",
      name: "Support Contact",
      desc: "Editorialoffuce@echosquantum.com",
    },
  ];
  // add intial  data for contact
  const addContact = () => {
    addContactIntial.forEach((element) => {
      dispatch(
        addContactPage({
          title: element.name,
          descriptions: element.desc,
          id: 0,
          type: element.type,
        }),
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {loading ? (
        <div className="flex justify-center items-center h-screen ">
          <Lottie
            animationData={loadingAnim}
            loop={true}
            style={{ width: 250, height: 250 }}
          />
        </div>
      ) : (
        <div>
          <header className="sticky top-0 z-50">
            <FirstHeader />
            <SecondHeader />
          </header>

          <main className="relative z-0 flex-1 bg-gray-50">
            <div className="flex pl-5 pr-5">{children}</div>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </div>
  );
}
