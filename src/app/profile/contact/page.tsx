"use client";
import { CountryDropdown } from "@/app/(main)/components/country_dropdown";
import CustomText from "@/app/(main)/components/custom_text";
import { useAppSelector, useAppDispatch } from "@/app/api/hooks/hooks";
import { fetchUserByEmail } from "@/app/api/slice/profileSlice";
import {
  setAffiliation,
  setArabic,
  setCountry,
  setEnglish,
  setMailing,
  setPhone,
  setProfileData,
  setSignature,
} from "@/app/api/slice/profileStateSlice";
import { updateContact } from "@/app/api/slice/updateContactSlice";
import { useState } from "react";

export default function ContactPage() {
  const { Signature, Phone, Mailing, Affiliation, Country, english, arabic } =
    useAppSelector((state) => state.profileData);
  const [success, setSuccess] = useState<string>();

  const { user, loading } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(
      updateContact({
        updatedUser: {
          signature: Signature,
          phone: Phone,
          maillingAddress: Mailing,
          affiliation: Affiliation,
          country: Country,
          languagesList: [
            { name: english ? "English" : "" },
            { name: arabic ? "Arabic" : "" },
          ],
        },
      }),
    ).then((v) => {
      const data = dispatch(fetchUserByEmail());
      data.then((V) => {
        dispatch(setProfileData(V));
      });
      setSuccess(v.payload ? v.payload : "");
    });
  };
  return (
    <div className=" mt-10 p-6  ">
      <h2 className="text-xl font-semibold mb-4">Contact Information</h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium">Email *</label>
          <input
            defaultValue={
              loading === false
                ? user?.email != null
                  ? user.email
                  : ""
                : "loading"
            }
            type="email"
            readOnly
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Signature</label>
          <textarea
            defaultValue={
              loading === false
                ? user?.signature != null
                  ? user.signature
                  : ""
                : "loading"
            }
            onChange={(v) => dispatch(setSignature(v.target.value))}
            className="border p-2 w-full rounded"
            placeholder="Digital signature or name format"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            defaultValue={
              loading === false
                ? user?.phone != null
                  ? user.phone
                  : ""
                : "loading"
            }
            onChange={(v) => dispatch(setPhone(v.target.value))}
            type="text"
            placeholder="+92 300 1234567"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Affiliation</label>
          <input
            defaultValue={
              loading === false
                ? user?.affiliation != null
                  ? user.affiliation
                  : ""
                : "loading"
            }
            onChange={(v) => dispatch(setAffiliation(v.target.value))}
            type="text"
            placeholder="University or Organization"
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Mailing Address</label>
          <textarea
            defaultValue={
              loading === false
                ? user?.maillingAddress != null
                  ? user.maillingAddress
                  : ""
                : "loading"
            }
            onChange={(v) => dispatch(setMailing(v.target.value))}
            className="border p-2 w-full rounded"
            placeholder="Street, City, ZIP"
          />
        </div>

        <div>
          <label className="block font-medium">Country</label>
          <CountryDropdown
            placeholder={
              loading === false
                ? user?.country != null
                  ? user.country
                  : ""
                : "loading"
            }
            defaultValue={
              loading === false
                ? user?.country != null
                  ? user.country
                  : ""
                : "loading"
            }
            onChange={(v) => dispatch(setCountry(v.name))}
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Working Languages</label>
          <div className="flex flex-wrap gap-3">
            <label>
              <input
                checked={loading === false ? english : false}
                type="checkbox"
                onChange={() => dispatch(setEnglish(!english))}
              />{" "}
              English
            </label>
            <label>
              <input
                checked={loading === false ? arabic : false}
                type="checkbox"
                onChange={() => dispatch(setArabic(!arabic))}
              />
              Arabic
            </label>
          </div>
        </div>
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
    </div>
  );
}
