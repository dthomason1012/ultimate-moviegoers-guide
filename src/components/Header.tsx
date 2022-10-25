import React, { CSSProperties, FC, ReactNode } from "react";

interface Props {
  style?: CSSProperties;
  children?: ReactNode;
}

const Header: FC<Props> = ({ style, children }) => {
  return (
    <div className="bg-zinc-800 text-2xl p-12 box-border w-full font-bold flex justify-between">
      {children}
    </div>
  );
};

export default Header;
