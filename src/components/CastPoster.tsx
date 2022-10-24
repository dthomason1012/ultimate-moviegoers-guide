import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  imgPath: string;
  name: string;
  id: number;
}

const CastPoster: FC<Props> = ({ imgPath, name, id }) => {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  return (
    <img
      src={imgPath}
      alt={name}
      style={{
        height: "225px",
        backgroundColor: "#ffffff",
        width: "150px",
        margin: "35px",
        cursor: "pointer",
        transform: hovering ? "scale(1.2)" : undefined,
        transition: "transform .2s",
        boxShadow: "10px 10px 5px #222222",
        borderRadius: "5px",
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => setHovering(false)}
      onClick={() => navigate(`/person/${id}`)}
    />
  );
};

export default CastPoster;
