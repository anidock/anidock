import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AnimeList from "./components/AnimeList";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/anime" element={<AnimeList />} />
    </Routes>
  </BrowserRouter>
);
