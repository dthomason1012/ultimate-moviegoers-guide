import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Results } from "../types";
import { formatReleaseDate } from "../utils/formatReleaseDate";
import Poster from "./Poster";
import { API_KEY, BASE_URL, IMG_BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

const fetchMovies = async () => {
  const res = await fetch(`${BASE_URL}top_rated?api_key=${API_KEY}`);
  return res.json();
};

export const TopRated: FC = () => {
  const { data: movies, status } = useQuery(
    ["topRated"],
    (): Promise<Results> | undefined => fetchMovies()
  );

  return status === "loading" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>Error fetching data</div>
  ) : (
    <>
      <div
        style={{
          fontSize: "30px",
          padding: "30px",
          color: "white",
        }}
      >
        Top Rated
        <hr
          style={{
            color: "#c84e4e",
            border: "3px solid",
          }}
        />
      </div>
      <div
        style={{
          margin: "30px",
          marginLeft: "45px",
          display: "inline-flex",
          width: "95%",
          overflowX: "auto",
        }}
      >
        {movies?.results.map((movie) => {
          return (
            <div style={{ textAlign: "center" }} key={movie.id}>
              <Poster
                id={movie.id}
                imgPath={`${IMG_BASE_URL}${movie.poster_path}`}
                movieTitle={movie.title}
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
