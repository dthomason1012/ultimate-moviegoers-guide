import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Credits, Movie, Results } from "../types";
import Poster from "../components/Poster";
import {
  ANON_PROFILE,
  API_KEY,
  BASE_URL,
  IMG_BASE_URL,
  MOVIE_CLAPPER,
} from "../constants";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";

const fetchMovie = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  return res.json();
};

const fetchCredits = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
  return res.json();
};

const fetchRecommended = async (id: string | undefined) => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`
  );
  return res.json();
};

const MovieDetails: FC = () => {
  const { id } = useParams();
  const { data: movie, status: movieStatus } = useQuery(
    ["movie", id],
    (): Promise<Movie> | undefined => fetchMovie(id)
  );
  const { data: credits, status: creditsStatus } = useQuery(
    ["credits", id],
    (): Promise<Credits> | undefined => fetchCredits(id)
  );
  const { data: recommended, status: recommendedStatus } = useQuery(
    ["recommendations", id],
    (): Promise<Results> | undefined => fetchRecommended(id)
  );
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="h-full">
      {movieStatus === "error" && <div>Error fetching data</div>}
      <div className="p-7 grid place-items-center text-center">
        {movieStatus === "loading" ? (
          <LoadingSpinner />
        ) : (
          <>
            <img
              src={`${IMG_BASE_URL}${movie?.poster_path}`}
              alt={movie?.title}
              className="h-96 w-72 shadow-md shadow-black rounded"
            />
            <div>
              <div className="text-white p-5 text-4xl">{movie?.title}</div>
              <div className="text-white mb-5 ml-5 text-2xl">
                ({movie?.vote_average})
              </div>
              <div className="text-white m-5 text-xl">{movie?.overview}</div>
            </div>
          </>
        )}
      </div>
      <div className="text-3xl p-9 text-white">
        Cast
        <hr className="border-sky-500 border-2" />
      </div>

      {creditsStatus === "loading" && (
        <div className="grid place-items-center">
          <LoadingSpinner />
        </div>
      )}
      {creditsStatus === "error" && <div>Error loading data</div>}
      <div className="m-7 inline-flex w-11/12 overflow-x-scroll">
        {credits?.cast.map((actor) => {
          return (
            <div className="inline-flex">
              <div className="text-white m-5 text-center">
                <Poster
                  type="person"
                  id={actor.id}
                  imgPath={
                    actor.profile_path
                      ? `${IMG_BASE_URL}${actor.profile_path}`
                      : `${ANON_PROFILE}`
                  }
                  name={actor.name}
                  key={actor.id}
                />
                <div className="text-xl">{actor.name}</div>
                <div className="text-lg text-gray-400">{actor.character}</div>
              </div>
            </div>
          );
        })}
      </div>
      {recommendedStatus === "loading" && (
        <div className="grid place-items-center">
          <LoadingSpinner />
        </div>
      )}
      {recommendedStatus === "error" && <div>Error fetching data</div>}
      <div className="text-3xl p-7 text-white">
        Recommended
        <hr className="border-emerald-500 border-2" />
      </div>
      <div className="m-7 inline-flex w-11/12 overflow-x-scroll">
        {recommended?.results.map((movie) => {
          return (
            <div className="text-center" key={movie.id}>
              <Poster
                type="movie"
                imgPath={
                  movie.poster_path
                    ? `${IMG_BASE_URL}/${movie.poster_path}`
                    : `${MOVIE_CLAPPER}`
                }
                name={movie.title}
                id={movie.id}
              />
              <h3 className="text-white break-words">{movie.title}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieDetails;
