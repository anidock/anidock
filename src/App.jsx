import React from "react";
import Navbar from "./components/Navbar";
import FeaturedAnime from "./components/FeaturedAnime";

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      <FeaturedAnime />
    </div>
  );
}

export default App;
