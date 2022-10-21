import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { API_KEY, BASE_URL } from "../constants";
import { CastMember } from "../types";

const fetchCastMember = async (id: string | undefined) => {
  const res = await fetch(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);
  return res.json();
};

export const CastMemberDetails = () => {
  const { id } = useParams();
  const { data: castMember, status } = useQuery(
    ["person", id],
    (): Promise<CastMember> | undefined => fetchCastMember(id)
  );
  return (
    <>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div>Error fetching data</div>}
      <div>{castMember?.name}</div>
    </>
  );
};
