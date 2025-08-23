import { Link } from 'react-router-dom'
function slugify(t){ return t.toLowerCase().replace(/[^a-z0-9]+/g,'-') }
export default function AnimeCard({ anime }){
  const cover = anime?.images?.jpg?.image_url
  const slug = slugify(anime.title)
  return (
    <Link to={`/anime/${anime.mal_id}-${slug}`} className="card group hover:-translate-y-1 transition">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img src={cover} alt={anime.title} className="h-full w-full object-cover group-hover:scale-105 transition" loading="lazy" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2 min-h-[2.5rem]">{anime.title}</h3>
        <div className="mt-1 text-xs text-zinc-400">⭐ {anime.score ?? '—'} · {anime.type ?? '—'} · Ep {anime.episodes ?? '—'}</div>
      </div>
    </Link>
  )
}
