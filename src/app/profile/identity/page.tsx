"use client";
import CustomText from "@/app/(main)/components/custom_text";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import {
  setFamilyName,
  setGivenName,
  setProfileData,
  setPublicName,
} from "@/app/api/slice/profileStateSlice";
import { updateIdentity } from "@/app/api/slice/updateidentitySlice";
import { useState } from "react";

export default function IdentityPage() {
  const [success, setSuccess] = useState("");
  const { user, loading } = useAppSelector((state) => state.user);
  const { givenName, familyName, publicName } = useAppSelector(
    (state) => state.profileData,
  );
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      updateIdentity({
        updatedUser: { givenName, familyName, publicName },
      }),
    )
      .then((v) => {
        setSuccess(v.payload ? v.payload : "");
      })
      .catch((err) => {
        setSuccess(`Update identity failed: ${err.toString()}`);
      });
  };

  return (
    <div className="  mt-10 p-6 ">
      <h2 className="text-xl font-semibold mb-4">Identity</h2>

      <div className="mb-4">
        <label className="block font-medium">Username</label>
        <input
          type="text"
          value={
            loading === false
              ? user?.username != null
                ? user.username
                : ""
              : "loading"
          }
          disabled
          className="border p-2 w-full rounded bg-gray-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium">Given Name *</label>
          <input
            onChange={(v) => dispatch(setGivenName(v.target.value))}
            type="text"
            defaultValue={
              loading === false
                ? user?.givenName != null
                  ? user.givenName
                  : ""
                : "loading"
            }
            className="border p-2 w-full rounded"
          />
        </div>
        <div>
          <label className="block font-medium">Family Name</label>
          <input
            type="text"
            onChange={(v) => dispatch(setFamilyName(v.target.value))}
            defaultValue={
              loading === false
                ? user?.familyName != null
                  ? user.familyName
                  : ""
                : "loading"
            }
            className="border p-2 w-full rounded"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block font-medium">Preferred Public Name</label>
        <input
          type="text"
          placeholder="Optional"
          onChange={(v) => {
            dispatch(setPublicName(v.target.value));
          }}
          defaultValue={
            loading === false
              ? user?.publicName != null
                ? user.publicName
                : ""
              : "loading"
          }
          className="border p-2 w-full rounded"
        />
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Your data is stored in accordance with our{" "}
        <a href="#" className="text-blue-500 underline">
          privacy statement
        </a>
        .
      </p>
      {success && <CustomText text={success} style={"text-green-500"} />}
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => {
          handleSubmit();
          const data = dispatch(fetchUserByEmail());
          data.then((V) => {
            dispatch(setProfileData(V));
          });
        }}
      >
        Save
      </button>
    </div>
  );
}
