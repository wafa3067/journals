"use client";
import React, { useEffect } from "react";

import { updateTab } from "../api/providers/tab_bar";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { useRouter } from "next/navigation";
import CustomText from "../(main)/components/custom_text";
import { getToken, getUser } from "../api/slice/getTokenSlice";
import SubmissionsPage from "../(main)/aboutsubmissions/page";
import PublicationEthics from "../(main)/publications_ethics/page";
import Manuscript from "../(main)/manuscript/page";
import PrivacyPolicyPage from "../(main)/privacy-policy/page";

export default function Page() {
  const route = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTokens = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");

      if (token && email) {
        dispatch(getToken(token));
        dispatch(getUser(email));
      }
    };

    getTokens();
  }, [dispatch]);

  const { total, approved, pending, loading } = useAppSelector(
    (state) => state.getCountArticles,
  );

  return (
    <>
      <main style={styles.container} className="bg-gray-50">
        <header style={styles.header}>
          <div>
            <p className="md:2xl text-sm" style={styles.title}>
              Submissions Dashboard
            </p>
            <p style={styles.subtitle}>Create and manage your submissions</p>
          </div>
        </header>

        <div style={styles.actions}>
          <CustomText
            text={" New Submission"}
            style="inline-block bg-[#000] text-white px-4 py-2 rounded-lg no-underline font-semibold cursor-pointer"
            onTap={() => {
              route.push("/submissions/begin");
              dispatch(updateTab("initial-requirements"));
            }}
          />
          <CustomText
            text={" View Submission"}
            style="inline-block bg-indigo-100 text-indigo-800 px-4 py-2.5 rounded-lg no-underline font-semibold cursor-pointer"
            onTap={() => {
              route.push("/dashboard/show");
            }}
          />
        </div>

        <section style={styles.panel}>
          <h2 style={styles.panelTitle}>Quick Overview</h2>

          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.cardTitle}>Total</div>
              <div style={styles.cardValue}>
                {loading === false ? total : "0"}
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>Pending</div>
              <div style={styles.cardValue}>
                {loading === false ? pending : "0"}
              </div>
            </div>

            <div style={styles.card}>
              <div style={styles.cardTitle}>Approved</div>
              <div style={styles.cardValue}>
                {loading === false ? approved : "0"}
              </div>
            </div>
          </div>
        </section>
        <div>
          {/* titles */}
          {/* submission guidlines,oublication ethics,manuscript,privacy statement */}
          <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              Important Information
            </h3>
            <ul className="space-y-2">
              <li>
                <details className="cursor-pointer">
                  <summary className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Submission Guidelines
                  </summary>
                  <SubmissionsPage />
                </details>
              </li>
              <li>
                <details className="cursor-pointer">
                  <summary className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Publication Ethics
                  </summary>
                  <PublicationEthics />
                </details>
              </li>
              <li>
                <details className="cursor-pointer">
                  <summary className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Manuscript
                  </summary>
                  <Manuscript />
                </details>
              </li>
              <li>
                <details className="cursor-pointer">
                  <summary className="text-indigo-600 hover:text-indigo-800 font-medium">
                    Privacy Statement
                  </summary>
                  <PrivacyPolicyPage />
                </details>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    maxWidth: 1000,
    margin: "32px auto",
    padding: "0 20px",
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
  },
  subtitle: {
    margin: "6px 0 0 0",
    color: "#6b7280",
  },
  actions: {
    display: "flex",
    gap: 12,
    marginBottom: 28,
  },

  panel: {
    background: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  panelTitle: {
    margin: "0 0 12px 0",
    fontSize: 16,
    fontWeight: 600,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: 12,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    background: "#f8fafc",
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: 700,
  },
};
