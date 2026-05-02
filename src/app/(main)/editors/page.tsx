"use client";
import React, { useEffect } from "react";
import EditorComponent from "../components/editor_component";
import { GetTeamThunk } from "@/app/admin/adminSlice/team/getTeamSlice";
import { useAppDispatch, useAppSelector } from "@/app/api/hooks/hooks";

const Page = () => {
  const dispatch = useAppDispatch();
  const { getTeam, success, loading } = useAppSelector(
    (state) => state.getTeam,
  );

  useEffect(() => {
    dispatch(GetTeamThunk());
  }, [dispatch]);
  return (
    <div className="w-[100%]   p-5">
      {/* <div className="w-[100%] columns-1 md:columns-2 gap-3 "> */}
      <div className="w-full gap-3 columns-2 overflow-y-auto">
        {Array.isArray(getTeam) && getTeam.length > 0 ? (
          getTeam.map((value, index) => (
            <div className="" key={index}>
              <EditorComponent heading={value.title} />

              {value.team &&
                value.team.map((team) => (
                  <div key={team.id}>
                    <EditorComponent
                      key={team.title}
                      style={"p-0"}
                      heading={""}
                      title={team.heading}
                      name={team.title}
                      desc={team.uni}
                      email={team.email}
                      link={team.link}
                    />
                  </div>
                ))}
            </div>
          ))
        ) : (
          <p>NO Team Found</p>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Page;
