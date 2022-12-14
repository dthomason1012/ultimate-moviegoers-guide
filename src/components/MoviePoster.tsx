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
    <div className="m-9 h-60 w-40">
      <img
        src={imgPath}
        alt={movieTitle}
        className={`bg-white cursor-pointer
          ${hovering ? "scale-110" : ""}
          transition-transform rounded
          object-fill shadow-black shadow-lg
        `}
        onMouseEnter={() => {
          setHovering(true);
        }}
        onMouseLeave={() => setHovering(false)}
        onClick={() => navigate(`/movie/${id}}`)}
      />
    </div>
  );
};

export default MoviePoster;
