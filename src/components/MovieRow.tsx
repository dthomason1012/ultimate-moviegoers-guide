import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Results } from "../types";
import { formatReleaseDate } from "../utils/formatReleaseDate";
import Poster from "./movies/Poster";

interface Props {
  type: string;
}

const MovieRow: FC<Props> = ({ type }) => {
  const [results, setResults] = useState<Results>();
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=c3bfa4bdb28d9cfa882313ad43f7ba6a&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((movies) => setResults(movies));
  }, [type]);

  return (
    <>
      <div
        style={{
          fontSize: "30px",
          padding: "30px",
          color: "white",
        }}
      >
        {type === "now_playing"
          ? "Now Playing"
          : type === "popular"
          ? "Popular"
          : type === "top_rated"
          ? "Top Rated"
          : "Recommended"}
        <hr
          style={{
            color:
              type === "now_playing"
                ? "#3498db"
                : type === "popular" || type === "similar"
                ? "#19b092"
                : "#c84e4e",
            border: "3px solid",
          }}
        />
      </div>
      <div
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          margin: "30px",
          marginLeft: "45px",
          display: "inline-flex",
          width: "95%",
          overflowX: "auto",
        }}
      >
        {results?.results.map((movie) => {
          return (
            <div
              style={{
                textAlign: "center",
              }}
            >
              <Poster
                imgPath={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                movieTitle={movie.title}
                id={movie.id}
              />
              <Link
                to={`/movie/${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                <h3
                  style={{
                    color: "#ffffff",
                    wordWrap: "break-word",
                  }}
                >
                  {movie.title}
                </h3>
              </Link>
              <p style={{ color: "#cccccc" }}>
                {formatReleaseDate(movie.release_date)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieRow;
