import React, { FC, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import { ReactComponent as SearchIcon } from "../icons/icons8-search.svg";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="bg-zinc-800">
      <Header>
        <Link to="/" className="text-white no-underline">
          The Ultimate Moviegoer's Guide
        </Link>
        <Link
          to="/search"
          className={`${hovering ? "scale-125" : undefined}
              transition-transform
          `}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <SearchIcon />
        </Link>
      </Header>
      <Body>{children}</Body>
      <Footer />
    </div>
  );
};

export default Layout;
