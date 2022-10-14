import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Credits, Movie, Results } from "../../types";
import Poster from "../movies/Poster";

const MovieDetails: FC = () => {
  const [movie, setMovie] = useState<Movie>();
  const [recommended, setRecommended] = useState<Results>();
  const [credits, setCredits] = useState<Credits>();
  const { id } = useParams();

  useEffect(() => {
    window.scroll(0, 0);
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=c3bfa4bdb28d9cfa882313ad43f7ba6a&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => setMovie(data));
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=c3bfa4bdb28d9cfa882313ad43f7ba6a&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => setRecommended(data));
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c3bfa4bdb28d9cfa882313ad43f7ba6a&language=en-US&page=1`
    )
      .then((response) => response.json())
      .then((data) => setCredits(data));
  }, [id]);

  return (
    <>
      <div
        style={{
          padding: "30px",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <img
          src={`http://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
          alt={movie?.title}
          style={{
            height: "450px",
            width: "300px",
            boxShadow: "10px 10px 5px #444444",
            borderRadius: "5px",
          }}
        />
        <div>
          <div style={{ color: "white", padding: "20px", fontSize: "40px" }}>
            {movie?.title}
          </div>
          <div
            style={{
              color: "white",
              marginBottom: "20px",
              marginLeft: "20px",
              fontSize: "24px",
            }}
          >
            ({movie?.vote_average})
          </div>
          <div
            style={{
              color: "white",
              margin: "20px",
              fontSize: "20px",
            }}
          >
            {movie?.overview}
          </div>
        </div>
      </div>

      <div
        style={{
          fontSize: "30px",
          padding: "30px",
          color: "white",
        }}
      >
        Cast
        <hr style={{ color: "#3498db", border: "3px solid" }} />
      </div>

      <div
        style={{ display: "inline-flex", width: "95%", overflowX: "scroll" }}
      >
        {credits?.cast.map((actor) => {
          return (
            <div
              style={{
                display: "inline-flex",
              }}
            >
              <Link to="/">
                <div
                  style={{
                    color: "#ffffff",
                    margin: "30px",
                    textAlign: "center",
                  }}
                >
                  <img
                    src={
                      actor.profile_path
                        ? `http://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : "https://i.pinimg.com/736x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"
                    }
                    alt={actor.name}
                    style={{
                      width: "150px",
                      height: "auto",
                      margin: "30px",
                      boxShadow: "10px 10px 5px #444444",
                      borderRadius: "5px",
                    }}
                  />
                  <div style={{ fontSize: "20px" }}>{actor.name}</div>
                  <div>{actor.character}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div
        style={{
          fontSize: "30px",
          padding: "30px",
          color: "white",
        }}
      >
        Recommended
        <hr style={{ color: "#19b092", border: "3px solid" }} />
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
        {recommended?.results.map((movie) => {
          return (
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
          );
        })}
      </div>
    </>
  );
};

export default MovieDetails;
