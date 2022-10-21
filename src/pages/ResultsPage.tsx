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
    <div
      style={{
        textAlign: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          display: "inline-flex",
          margin: "30px",
        }}
      >
        <form style={{ display: "inline-flex" }}>
          <input
            style={{
              width: "400px",
              fontSize: "18px",
              padding: "20px",
            }}
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
                <div style={{ textAlign: "center" }}>
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
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              color: "#ffffff",
              fontSize: "40px",
              margin: "30px",
              fontWeight: "bold",
              height: "100vh",
            }}
          >
            <SearchIcon
              style={{
                transform: "scale(1.3)",
              }}
            />{" "}
            Search for movies
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;
