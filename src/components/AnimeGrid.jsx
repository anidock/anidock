import AnimeCard from "./AnimeCard.jsx";

const animeList = [
  { title: "Naruto", img: "https://via.placeholder.com/200x300?text=Naruto" },
  { title: "One Piece", img: "https://via.placeholder.com/200x300?text=One+Piece" },
  { title: "Attack on Titan", img: "https://via.placeholder.com/200x300?text=AoT" },
  { title: "Demon Slayer", img: "https://via.placeholder.com/200x300?text=Demon+Slayer" },
];

export default function AnimeGrid() {
  return (
    <section className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      {animeList.map((anime) => (
        <AnimeCard key={anime.title} title={anime.title} img={anime.img} />
      ))}
    </section>
  );
}