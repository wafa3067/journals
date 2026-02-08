import React from "react";
import CustomText from "./custom_text";
import Image from "next/image";
type Props = {
  title1?: String;
  title12?: String;
  style1?: String;
  style2?: String;
  desc?: String;
  descStyle?: String;
  img?: string;
  date?: string;
  image_style?: String;
};

const Journals = (props: Props) => {
  return (
    <div className="p-5">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          paddingBottom: 20,
        }}
      >
        {props.title1 && (
          <CustomText style={props.style1} text={props.title1} />
        )}
        {props.title12 && (
          <CustomText style={props.style2} text={props.title12 ?? ""} />
        )}
      </div>
      {props.desc && (
        <CustomText style={props.descStyle} text={props.desc ?? ""} />
      )}
      <div className="flex flex-row gap-2">
        {props.img && (
          <Image
            className={`${props.image_style}`}
            alt="No "
            width={200}
            height={200}
            src={props.img}
          />
        )}
        {props.date && (
          <div className="flex flex-row">
            <CustomText
              text={"Published: "}
              style={"font-bold text-gray-500"}
            />
            {props.date && <CustomText text={props.date ?? ""} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Journals;
