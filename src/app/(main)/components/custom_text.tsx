import React, { MouseEventHandler } from "react";

type Props = {
  style?: String;

  onTap?: MouseEventHandler;

  text?: String;
  boldText?: string;
  starting?: string;
};

const CustomText = (props: Props) => {
  return (
    <p onClick={props.onTap} className={`${props.style} `}>
      {props.starting ? props.starting : ""}{" "}
      {props.boldText ? <b>{props.boldText}</b> : ""}{" "}
      {props.text ? props.text : ""}
    </p>
  );
};

export default CustomText;
