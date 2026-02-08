"use client";
import SideBar from "./components/side_bar";
import "../globals.css";
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
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [tokens, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { token } = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);

    // Only run on client side
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      dispatch(getToken(storedToken));
    } else {
    }
  }, []);

  useEffect(() => {
    if (token != null && token != "") {
      dispatch(fetchUserByEmail()).then((user) => {
        dispatch(setProfileData(user));
      });
    }
  }, []);

  const delay = (ms: number | undefined) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
  }, []);

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
          <header>
            <FirstHeader />
            <SecondHeader />
          </header>

          <main className="flex-1 bg-gray-50">
            <div style={{ display: "flex" }} className="pl-5 pr-5 ">
              {children}
              {/* <SideBar /> */}
            </div>
          </main>

          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </div>
  );
}
