import React, { CSSProperties, FC, ReactNode } from "react";

interface Props {
  style?: CSSProperties;
  children?: ReactNode;
}

const Header: FC<Props> = ({ style, children }) => {
  return <div style={style}>{children}</div>;
};

export default Header;
