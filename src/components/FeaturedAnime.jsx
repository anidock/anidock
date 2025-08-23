import React from "react";
import AnimeCard from "./AnimeCard";

const featuredAnime = [
  { title: "Attack on Titan", img: "https://i.imgur.com/xyz1.jpg" },
  { title: "Naruto", img: "https://i.imgur.com/xyz2.jpg" },
  { title: "Demon Slayer", img: "https://i.imgur.com/xyz3.jpg" },
];

function FeaturedAnime() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Featured Anime</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {featuredAnime.map((anime) => (
          <AnimeCard key={anime.title} title={anime.title} img={anime.img} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedAnime;

