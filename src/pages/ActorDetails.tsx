import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_KEY, BASE_URL, IMG_BASE_URL } from "../constants";
import { Actor } from "../types";
import { formatReleaseDate } from "../utils/formatReleaseDate";

const fetchActor = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
  return res.json();
};

export const ActorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: actor, status } = useQuery(
    ["person", id],
    (): Promise<Actor> | undefined => fetchActor(id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error fetching data</div>}
      <div
        style={{
          padding: "30px",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <img
          src={`${IMG_BASE_URL}${actor?.profile_path}`}
          alt={actor?.name}
          style={{
            height: "450px",
            width: "300px",
            boxShadow: "10px 10px 5px #222222",
            borderRadius: "5px",
          }}
        />
        <div>
          <div style={{ color: "white", padding: "20px", fontSize: "40px" }}>
            {actor?.name}
          </div>
          {actor && <div>Born: {formatReleaseDate(actor.birthday)}</div>}
          {actor?.deathday && (
            <div>Died: {formatReleaseDate(actor.deathday)}</div>
          )}
        </div>
        <div
          style={{
            color: "white",
            margin: "20px",
            fontSize: "20px",
          }}
        >
          {actor?.biography}
        </div>
        <a
          href={`https://www.imdb.com/name/${actor?.imdb_id}/?ref_=fn_al_nm_1`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", color: "#dddddd" }}
        >
          IMDb Page
        </a>
      </div>
    </>
  );
};
