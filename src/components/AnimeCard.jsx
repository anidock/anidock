import { Link } from "react-router-dom";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function AnimeCard({ anime }) {
  const cover = anime.images?.jpg?.image_url;
  const slug = slugify(anime.title);
  return (
    <Link to={`/anime/${anime.mal_id}-${slug}`} className="bg-zinc-800 rounded-xl overflow-hidden hover:scale-105 transition">
      <img src={cover} alt={anime.title} className="w-full h-64 object-cover" />
      <div className="p-2">
        <h3 className="text-sm font-semibold line-clamp-2">{anime.title}</h3>
        <p className="text-xs text-zinc-400">⭐ {anime.score ?? "—"}</p>
      </div>
    </Link>
  );
}
