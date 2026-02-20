"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { getToken, getUser } from "@/app/api/slice/getTokenSlice";
import { updatePassword } from "@/app/api/slice/passwordSlice";

import { useEffect, useState } from "react";

export default function PasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (newPassword.length < 6) {
      setError("The password must be at least 6 characters.");
      return;
    }
    if (newPassword !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    alert("Password successfully updated!");

    dispatch(
      updatePassword({ oldPassword: currentPassword, newPassword }),
    ).then((v) => setSuccess(v.payload));
  };

  const [success, setSuccess] = useState<string>();

  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);

  const getTokens = async () => {
    const token = await localStorage.getItem("token");
    const email = await localStorage.getItem("email");

    if (token && email) {
      dispatch(getToken(token));
      dispatch(getUser(email));
    }
  };

  useEffect(() => {
    getTokens();

    if (token.user) {
    }
  }, [token, getTokens]);

  return (
    <div className=" mt-10 p-6 border ">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      <p className="text-gray-600 mb-6">
        Enter your current and new passwords below to change the password for
        your account.
      </p>

      {/* Current Password */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Current password</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      {/* New Password */}
      <div className="mb-4">
        <label className="block font-medium mb-2">New password</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <p className="text-xs text-gray-400 mt-1">
          The password must be at least 6 characters.
        </p>
      </div>

      {/* Repeat New Password */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Repeat new password</label>
        <input
          type="password"
          className="border p-2 w-full rounded"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
        />
      </div>

      {success && <p className="text-red-500 text-sm mb-4">{success}</p>}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <p className="text-sm text-gray-500 mt-4">
        Your data is stored in accordance with our{" "}
        <a href="#" className="text-blue-500 underline">
          privacy statement
        </a>
        .
      </p>

      <div className="flex justify-end gap-3 mt-6">
        <button
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-50"
          onClick={() => {
            setCurrentPassword("");
            setNewPassword("");
            setRepeatPassword("");
            setError(null);
          }}
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
}
