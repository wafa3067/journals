"use client";
import CustomText from "@/app/(main)/components/custom_text";
import { useAppSelector, useAppDispatch } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";

import {
  setAuthor,
  setProfileData,
  setReader,
  setReviewer,
  setReviewes,
} from "@/app/api/slice/profileStateSlice";
import { updateRole } from "@/app/api/slice/roleSlice";
import { useState } from "react";

export default function RolesPage() {
  const [success, setSuccess] = useState<string>();

  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const { reviewes, reader, reviewer, author } = useAppSelector(
    (state) => state.profileData,
  );

  const handleSubmit = () => {
    dispatch(
      updateRole({
        review: reviewes,
        roles: [
          { name: reader ? "Reader" : "" },
          { name: author ? "Author" : "" },
          { name: reviewer ? "Reviwer" : "" },
        ],
      }),
    ).then((v) => {
      console.log("error is ", v.payload);
      setSuccess(v.payload ? v.payload : "");
    });
  };
  return (
    <div className=" mt-10 p-6 ">
      <h2 className="text-xl font-semibold mb-4">Roles</h2>

      <div className="space-y-4">
        <p className="text-gray-700">
          Select your roles in the journal system:
        </p>

        <div className="flex flex-col gap-2 ml-2">
          <label className="flex items-center space-x-2">
            {loading === false ? (
              <input
                checked={reader ?? false}
                type="checkbox"
                onChange={() => dispatch(setReader(!reader))}
              />
            ) : null}
            <span>Reader</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              checked={loading === false ? (author ?? false) : false}
              type="checkbox"
              onChange={() => dispatch(setAuthor(!author))}
            />
            <span>Author</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              checked={loading === false ? (reviewer ?? false) : false}
              type="checkbox"
              onChange={() => dispatch(setReviewer(!reviewer))}
            />
            <span>Reviewer</span>
          </label>
        </div>

        <div className="mt-6">
          <label className="block font-medium mb-2">Reviewing Interests</label>
          <textarea
            defaultValue={
              loading === false
                ? user?.review != null
                  ? user.review.toString()
                  : ""
                : "loading"
            }
            onChange={(v) => dispatch(setReviewes(v.target.value))}
            className="border p-2 w-full rounded"
            placeholder="Enter topics or fields you are interested in reviewing (e.g. Quantum Physics, Materials Science)"
            rows={4}
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
    </div>
  );
}
