"use client";
import React from "react";
import CustomText from "./custom_text";
import Link from "next/link";

type Props = {
  heading?: String;
  title?: String;
  name?: String;
  desc?: String;
  email?: String;
  link?: String;
  titleStyle?: String;
  style?: String;
};

const EditorComponent = (props: Props) => {
  return (
    <div className={`${props.style}`}>
      {props.heading && (
        <CustomText
          text={props.heading ?? ""}
          style={"text-2xl font-bold pb-3"}
        />
      )}
      {props.title && (
        <CustomText
          text={props.title ?? ""}
          style={`text-sm font-bold pb-2 `}
        />
      )}
      {props.name && (
        <CustomText
          text={props.name ?? ""}
          style={`text-sm font-bold pb-2 ${props.titleStyle}`}
        />
      )}
      {props.desc && (
        <CustomText text={props.desc ?? ""} style={" text-gray-500"} />
      )}
      {props.email && (
        <div>
          <Link href={`${props.link}`}>
            <CustomText
              text={props.email ?? ""}
              style={"text-blue-300 pb-3 underline"}
            />
          </Link>
        </div>
      )}
    </div>
  );
};

export default EditorComponent;
