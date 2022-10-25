import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL, IMG_BASE_URL } from "../constants";
import { Actor } from "../types";
import { formatReleaseDate } from "../utils/formatReleaseDate";

const fetchActor = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
  return res.json();
};

export const ActorDetails = () => {
  const { id } = useParams();
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
      <div className="p-8 text-center grid place-items-center">
        <img
          src={`${IMG_BASE_URL}${actor?.profile_path}`}
          alt={actor?.name}
          className="w-72 h-auto shadow-md shadow-black rounded"
        />
        <div>
          <div className="text-white p-5 text-4xl">{actor?.name}</div>
          {actor && (
            <div className="text-gray-400">
              Born: {formatReleaseDate(actor.birthday)}
            </div>
          )}
          {actor?.deathday && (
            <div className="text-gray-400">
              Died: {formatReleaseDate(actor.deathday)}
            </div>
          )}
        </div>
        <div className="text-white m-5 text-xl">{actor?.biography}</div>
        <a
          href={`https://www.imdb.com/name/${actor?.imdb_id}/?ref_=fn_al_nm_1`}
          target="_blank"
          rel="noreferrer"
          className="no-underline text-gray-400"
        >
          IMDb Page
        </a>
      </div>
    </>
  );
};
