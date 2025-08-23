import React from "react";

const AnimeList = () => {
  const animes = [
    { id: 1, title: "Naruto", episodes: 220 },
    { id: 2, title: "Attack on Titan", episodes: 75 },
    { id: 3, title: "Demon Slayer", episodes: 26 },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Anime List</h2>
      <ul className="space-y-2">
        {animes.map((anime) => (
          <li key={anime.id} className="p-4 border rounded shadow">
            <p className="font-semibold">{anime.title}</p>
            <p>Episodes: {anime.episodes}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnimeList;
