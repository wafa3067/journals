import React from "react";
import CustomText from "../components/custom_text";

function Aims() {
  return (
    <div className=" p-8  ">
      <CustomText text="Aims and Scope:" style="font-bold text-2xl mb-2" />
      <CustomText
        style="mb-2"
        text="Quantum Journal is an open-access, peer-reviewed journal that publishes high-quality research in all areas of quantum science and technology. The journal aims to provide a platform for researchers to share their findings and insights with the global scientific community, fostering collaboration and advancing the field of quantum science."
      />

      <CustomText text="The scope of the journal includes, but not limited to:" />
      <ul>
        <li className="list-disc ml-5">Foundation of Quantum Mechanics</li>
        <li className="list-disc ml-5">Quantum Computation</li>
        <li className="list-disc ml-5">Quantum Information</li>
        <li className="list-disc ml-5">
          Cryptography and Quantum Communication
        </li>
        <li className="list-disc ml-5">Quantum Biology</li>
        <li className="list-disc ml-5">Engineering Quantum Devices</li>
        <li className="list-disc ml-5">Materials for Quantum Technologies</li>
        <li className="list-disc ml-5">Metrology and Instrumentation</li>
        <li className="list-disc ml-5">Quantum Machine Learning</li>
        <li className="list-disc ml-5">Quantum Chemistry</li>
        <li className="list-disc ml-5">Quantum Simulation</li>
        <li className="list-disc ml-5">Quantum Gravity and Cosmology</li>
        <li className="list-disc ml-5">Quantum Economics</li>
        <li className="list-disc ml-5">Quantum Physics and Thermodynamics</li>
      </ul>
    </div>
  );
}

export default Aims;
