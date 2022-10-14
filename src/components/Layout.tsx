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
    <div style={{ backgroundColor: "#2b3233" }}>
      <Header
        style={{
          backgroundColor: "#2b3233",
          color: "#ffffff",
          padding: "50px",
          boxSizing: "border-box",
          width: "100%",
          fontSize: "32px",
          fontWeight: "bold",
          display: "inline-flex",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ color: "#ffffff", textDecoration: "none" }}>
          The Ultimate Moviegoer's Guide
        </Link>
        <Link
          to="/search"
          style={{
            transform: hovering ? "scale(1.2)" : undefined,
            transition: "transform .2s",
          }}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <SearchIcon />
        </Link>
      </Header>
      <Body
        style={{ backgroundColor: "#555555", height: "100%", width: "100%" }}
      >
        {children}
      </Body>
      <Footer
        style={{
          backgroundColor: "#2b3233",
          justifyContent: "center",
          color: "#646464",
          padding: "20px",
          boxSizing: "border-box",
          position: "static",
          bottom: 0,
          width: "100%",
        }}
      />
    </div>
  );
};

export default Layout;
