"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginReviewer } from "@/app/admin/adminSlice/reviewer/reviewerSlice";

const ReviewerLogin: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { loading, error } = useAppSelector((state) => state.reviewer);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(loginReviewer(formData));

    if (loginReviewer.fulfilled.match(result)) {
      console.log("Login successful:", result.payload.data?.id);
      console.log("Login successful:", result.payload.data?.name);
      console.log("Login successful:", result.payload.data?.email);
      // Save the credentials in Redux and navigate to the reviewer dashboard.
      if (result.payload.token) {
        router.push("/recevier");

        localStorage.setItem("reviewerToken", result.payload.token);
        localStorage.setItem("email", result.payload.data?.email); // Store the entire response data if needed
        localStorage.setItem("name", result.payload.data?.name); // Store the entire response data if needed
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
          Reviewer Login
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sign in to review your assigned articles.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="email"
              placeholder="Email"
              autoComplete="username"
              className="pl-10 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-3 w-full rounded-lg outline-none bg-white text-gray-900"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className="pl-10 border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all p-3 w-full rounded-lg outline-none bg-white text-gray-900"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          {/* Login Button */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Error Message */}
        {error && (
          <p role="alert" className="text-red-600 text-center mt-4 font-medium">
            {error}
          </p>
        )}

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} Reviewer Dashboard. All rights reserved.
        </p>
      </motion.div>
    </div>
  );
};

export default ReviewerLogin;
