import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AnimeDetail from "./components/AnimeDetail";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/anime/:idSlug" element={<AnimeDetail />} />
    </Routes>
  </BrowserRouter>
);
