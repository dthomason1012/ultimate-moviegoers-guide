import React from "react";
import MovieRow from "../MovieRow";

const Home = () => (
  <div>
    <MovieRow type="now_playing" />
    <MovieRow type="popular" />
    <MovieRow type="top_rated" />
  </div>
);

export default Home;
