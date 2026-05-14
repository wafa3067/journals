"use client";

import MainBody from "./pages/main_body";
import TokenChecker from "./components/token_checker";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../api/hooks/hooks";
import { logout } from "../api/slice/auth";
import { checkToken } from "../api/slice/tokenCheck";
import CircularLoading from "./components/circular_loadinng";

export default function Home() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const { loading } = useAppSelector((state) => state.authToken);

  useEffect(() => {
    dispatch(checkToken())
      .unwrap()
      .catch(() => {
        dispatch(logout());
      });
  }, [dispatch, router]);
  if (loading) return <CircularLoading />;

  return (
    <div>
      <MainBody />
    </div>
  );
}
