import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  imgPath?: string;
  movieTitle: string;
  id: number;
}

const MoviePoster: FC<Props> = ({ imgPath, movieTitle, id }) => {
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate();

  return (
    <img
      src={imgPath}
      alt={movieTitle}
      style={{
        height: "225px",
        backgroundColor: "#ffffff",
        width: "150px",
        margin: "35px",
        cursor: "pointer",
        transform: hovering ? "scale(1.2)" : undefined,
        transition: "transform .2s",
        boxShadow: "10px 10px 5px #444444",
        borderRadius: "5px",
      }}
      onMouseEnter={() => {
        setHovering(true);
      }}
      onMouseLeave={() => setHovering(false)}
      onClick={() => navigate(`/movie/${id}}`)}
    />
  );
};

export default MoviePoster;
