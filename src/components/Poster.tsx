import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  imgPath: string;
  name: string;
  id: number;
  type: "person" | "movie";
}

const Poster: FC<Props> = ({ imgPath, name, id, type }) => {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="m-9 h-60 w-40">
      <img
        src={imgPath}
        alt={name}
        className={`bg-white cursor-pointer
        ${hovering ? "scale-110" : ""}
        transition-transform rounded
        object-fill shadow-black shadow-lg
      `}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => setHovering(false)}
        onClick={() => navigate(`/${type}/${id}}`)}
      />
    </div>
  );
};

export default Poster;
