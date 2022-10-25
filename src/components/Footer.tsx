import React, { CSSProperties, FC } from "react";

interface Props {
  style?: CSSProperties;
}

const Footer: FC<Props> = ({ style }) => {
  return (
    <div className="bg-zinc-800 flex justify-center text-zinc-500 p-5 box-border absolute w-full">
      &copy; 2022 Dan Thomason
    </div>
  );
};

export default Footer;
