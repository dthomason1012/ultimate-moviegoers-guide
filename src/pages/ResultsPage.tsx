import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Results } from "../types";
import Poster from "../components/MoviePoster";
import { ReactComponent as SearchIcon } from "../icons/icons8-search.svg";

const ResultsPage: FC = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Results>();

  const handleChange = (e: any) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  useEffect(() => {
    input &&
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=c3bfa4bdb28d9cfa882313ad43f7ba6a&language=en-US&query=${encodeURI(
          input
        )}&page=1&include_adult=fa`
      )
        .then((response) => response.json())
        .then((data) => setResults(data));
  }, [input]);

  return (
    <div className="text-center">
      <div className="text-center inline-flex m-8">
        <form className="inline-flex">
          <input
            className="w-96 text-lg p-5"
            type="search"
            placeholder="Search Movies"
            value={input}
            onChange={handleChange}
          />
        </form>
      </div>
      <div>
        {results ? (
          results.results.map((movie) => {
            return (
              <div>
                <div className="grid place-items-center">
                  <Poster
                    imgPath={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    movieTitle={movie.title}
                    id={movie.id}
                  />
                  <Link to={`/movie/${movie.id}`} className="no-underline">
                    <h3 className="text-white break-words">{movie.title}</h3>
                  </Link>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-white text-4xl m-8 font-bold h-screen inline-flex">
            <SearchIcon className="scale-125" />
            Search for movies
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
