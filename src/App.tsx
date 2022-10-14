import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
} from "react-router-dom";
import Home from "./components/pages/Home";
import NowPlaying from "./components/pages/NowPlaying";
import Popular from "./components/pages/Popular";
import TopRated from "./components/pages/TopRated";
import NotFound from "./components/pages/NotFound";
import MovieDetails from "./components/pages/MovieDetails";
import ResultsPage from "./components/pages/ResultsPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nowplaying" element={<NowPlaying />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search" element={<ResultsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
