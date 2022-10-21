import React, { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Credits, Movie, Results } from "../types";
import Poster from "../components/Poster";
import { API_KEY, BASE_URL, IMG_BASE_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

const fetchMovie = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}${id}?api_key=${API_KEY}`);
  return res.json();
};

const fetchCredits = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}${id}/credits?api_key=${API_KEY}`);
  return res.json();
};

const fetchRecommended = async (id: string | undefined) => {
  const res = await fetch(
    `${BASE_URL}${id}/recommendations?api_key=${API_KEY}`
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
    <>
      {movieStatus === "loading" && <div>Loading...</div>}
      {movieStatus === "error" && <div>Error fetching data</div>}
      <div
        style={{
          padding: "30px",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <img
          src={`${IMG_BASE_URL}${movie?.poster_path}`}
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

      {creditsStatus === "loading" && <div>Loading...</div>}
      {creditsStatus === "error" && <div>Error loading data</div>}
      <div
        style={{
          margin: "30px",
          marginLeft: "45px",
          display: "inline-flex",
          width: "95%",
          overflowX: "scroll",
        }}
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
                        ? `${IMG_BASE_URL}/${actor.profile_path}`
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
      {recommendedStatus === "loading" && <div>Loading...</div>}
      {recommendedStatus === "error" && <div>Error fetching data</div>}
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
                imgPath={`${IMG_BASE_URL}/${movie.poster_path}`}
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

  // return (

  //   </>
  // );
};

export default MovieDetails;
