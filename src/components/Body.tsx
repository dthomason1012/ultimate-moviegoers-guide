import React, { CSSProperties, FC, ReactNode } from "react";

interface Props {
  style?: CSSProperties;
  children: ReactNode;
}

// #515C5D

const Body: FC<Props> = ({ style, children }) => {
  return <div style={style}>{children}</div>;
};

export default Body;
