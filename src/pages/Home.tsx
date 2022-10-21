import React from "react";
import { NowPlaying } from "../components/NowPlaying";
import { Popular } from "../components/Popular";
import { TopRated } from "../components/TopRated";

const Home = () => (
  <div>
    <NowPlaying />
    <Popular />
    <TopRated />
  </div>
);

export default Home;
