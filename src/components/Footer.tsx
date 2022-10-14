import React, { CSSProperties, FC } from "react";

interface Props {
  style?: CSSProperties;
}

const Footer: FC<Props> = ({ style }) => {
  return <div style={style}>&copy; 2022 Dan Thomason</div>;
};

export default Footer;
