import React from "react";
import "./App.css";
import Layout from "./components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetails";
import ResultsPage from "./pages/ResultsPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ActorDetails } from "./pages/ActorDetails";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/person/:id" element={<ActorDetails />} />
            <Route path="/search" element={<ResultsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
