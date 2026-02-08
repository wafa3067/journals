"use client";

import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 w-[100%]">
      {/* Breadcrumb */}

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        About the Journal
      </h1>

      {/* Content */}
      <div className="   space-y-8 text-gray-700 ">
        {/* Journal Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3"></h2>
          <p>
            ECHOS Quantum is an international open-access journal publishing
            original research and reviews within the field of Quantum Science
            and Technology.
          </p>
        </section>

        {/* Aim and Scope */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Spotlight:
          </h2>
          <p>
            ECHOS Quantum coovers interdisciplinary research disciplines
            including physics, chemistry, biology, metrology, computing,
            information theory, communications, economics, and finance. The
            broad spectrum of topics thus aims at developing quantum
            technologies across various scientific and industrial domains. The
            journal has a flexible approach to article lengths and welcomes
            submission of longer papers that provide depth and authority in
            their subject areas.
          </p>
        </section>

        {/* Publication Details */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Scope</h2>
          <p>The scope of the journal includes, but not limited to:</p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Foundation of Quantum Mechanics</li>
            <li>Quantum Computation</li>
            <li>Quantum Information</li>
            <li>Cryptography and Quantum Communication</li>
            <li>Quantum Biology</li>
            <li>Engineering Quantum Devices</li>
            <li>Materials for Quantum Technologies</li>
            <li>Metrology and Instrumentation</li>
            <li>Quantum Machine Learning</li>
            <li>Quantum Chemistry</li>
            <li>Quantum Simulation</li>
            <li>Quantum Gravity and Cosmology</li>
            <li>Quantum Economics</li>
            <li>Quantum Physics and Thermodynamics</li>
          </ul>
        </section>

        {/* Editorial Board */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Frequency
          </h2>
          <p>
            ECHOS Quantum will be published annually with its issues released in
            December of each year.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
