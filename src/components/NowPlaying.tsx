import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Results } from "../types";
import { formatReleaseDate } from "../utils/formatReleaseDate";
import Poster from "./Poster";
import { API_KEY, BASE_URL, IMG_BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

const fetchMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  return res.json();
};

export const NowPlaying: FC = () => {
  const { data: movies, status } = useQuery(
    ["nowPlaying"],
    (): Promise<Results> | undefined => fetchMovies()
  );

  return status === "loading" ? (
    <div>Loading...</div>
  ) : status === "error" ? (
    <div>Error fetching data</div>
  ) : (
    <>
      <div className="text-3xl p-7 text-white">
        Now Playing
        <hr className="border-sky-500 border-2" />
      </div>
      <div className="m-9 inline-flex w-11/12 overflow-x-scroll">
        {movies?.results.map((movie) => {
          return (
            <div className="text-center" key={movie.id}>
              <Poster
                type="movie"
                id={movie.id}
                imgPath={`${IMG_BASE_URL}${movie.poster_path}`}
                name={movie.title}
              />
              <Link to={`/movie/${movie.id}`} className="no-underline">
                <h3 className="text-white break-words">{movie.title}</h3>
              </Link>
              <p className="text-gray-400">
                {formatReleaseDate(movie.release_date)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};
