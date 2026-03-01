"use client";

import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import { updatePublicProfile } from "@/app/api/slice/publicSlice";
import { useState } from "react";
import Image from "next/image";
import CustomText from "@/app/(main)/components/custom_text";
import {
  setBio,
  setFileName,
  setHomeurl,
  setOrcid_id,
  setProfile,
  setProfileData,
} from "@/app/api/slice/profileStateSlice";
export default function PublicPage() {
  const { bio, homeurl, orcid_id, fileName, profile } = useAppSelector(
    (state) => state.profileData,
  );
  const [success, setSuccess] = useState<string>();

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append(
      "user",
      new Blob(
        [
          JSON.stringify({
            bio,
            homeurl,
            orcid_id,
          }),
        ],
        { type: "application/json" },
      ),
    );

    if (profile) {
      formData.append("profile", profile);
    }

    dispatch(updatePublicProfile(formData)).then((v) => setSuccess(v.payload));
    const data = dispatch(fetchUserByEmail());
    data.then((V) => {
      dispatch(setProfileData(V));
    });
  };

  return (
    <div className="mt-10 p-6 ">
      <h2 className="text-xl font-semibold mb-4">Public</h2>

      {/* Profile Image Upload */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Profile Image</label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50">
          <p className="text-gray-500 mb-2">
            Drag and drop a file here to begin upload
          </p>
          <label className="inline-block bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700">
            Upload File
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files !== null) {
                  dispatch(setProfile(e.target.files[0]));
                  dispatch(setFileName(e.target.files[0]));
                }
              }}
            />
          </label>
          <p className="mt-2 text-sm text-gray-600 align-middle justify-center items-center  bg-amber-100 ">
            {profile && fileName == null && (
              <Image
                src={`http://journalsbackend-env.eba-ebzkqbct.ap-northeast-1.elasticbeanstalk.com${profile}`}
                alt="Profile picture"
                width={50}
                height={50}
              />
            )}

            {fileName !== null && (
              <Image
                className="w-[100px] h-[100px] justify-center items-center"
                src={URL.createObjectURL(fileName as File)}
                alt="Profile picture"
                width={100}
                height={100}
              />
            )}
          </p>
        </div>
      </div>

      {/* Bio Statement */}
      <div className="mb-6">
        <label className="block font-medium mb-2">
          <span className="text-gray-500 text-sm">
            (e.g., department and rank)
          </span>
        </label>
        <textarea
          value={bio ?? ""}
          onChange={(e) => dispatch(setBio(e.target.value))}
          className="border p-2 w-full rounded"
          placeholder="Enter your bio statement..."
          rows={4}
        />
      </div>

      {/* Homepage URL */}
      <div className="mb-6">
        <label className="block font-medium mb-2">Homepage URL</label>
        <input
          value={homeurl ?? ""}
          onChange={(e) => dispatch(setHomeurl(e.target.value))}
          type="url"
          className="border p-2 w-full rounded"
          placeholder="https://example.com"
        />
      </div>

      {/* ORCID ID */}
      <div className="mb-6">
        <label className="block font-medium mb-2">ORCID iD</label>
        <input
          value={orcid_id ?? ""}
          onChange={(e) => dispatch(setOrcid_id(e.target.value))}
          type="text"
          className="border p-2 w-full rounded"
          placeholder="0000-0002-1825-0097"
        />
      </div>

      <p className="text-sm text-gray-500 mt-6">
        Your data is stored in accordance with our{" "}
        <a href="#" className="text-blue-500 underline">
          privacy statement
        </a>
        .
      </p>

      <p className="italic text-sm text-gray-400 mt-2">
        * Denotes required field
      </p>
      {success && (
        <CustomText text={success.toString()} style={"text-green-500"} />
      )}
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => handleSubmit()}
      >
        Save
      </button>
    </div>
  );
}
