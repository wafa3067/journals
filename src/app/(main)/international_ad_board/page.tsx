import React from "react";
import EditorComponent from "../components/editor_component";
import CustomText from "../components/custom_text";

const Page = () => {
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

  return (
    <div className="w-[100%] p-5">
      <CustomText
        text={"International Advisory Board"}
        style={"font-bold text-2xl pb-5"}
      />
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-3 ">
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
  );
};

export default Page;
