import React, { CSSProperties, FC, ReactNode } from "react";

interface Props {
  style?: CSSProperties;
  children: ReactNode;
}

// #515C5D

const Body: FC<Props> = ({ style, children }) => {
  return <div className="bg-gray-700 h-full w-full">{children}</div>;
};

export default Body;
