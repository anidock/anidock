import { useEffect, useState } from "react";
import AnimeCard from "./AnimeCard";

export default function AnimeList() {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetch("https://api.jikan.moe/v4/top/anime")
      .then(res => res.json())
      .then(data => setAnimeList(data.data));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {animeList.map(anime => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}
