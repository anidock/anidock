import { Link } from 'react-router-dom'

export default function AnimeCard({ anime }) {
  const cover = anime?.images?.jpg?.image_url
  const title = anime?.title

  return (
    <Link to={`/anime/${anime.mal_id}`} className="card group">
      <div className="aspect-[3/4] w-full overflow-hidden">
        <img
          src={cover}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold line-clamp-2 min-h-[2.5rem]">{title}</h3>
        <div className="mt-1 text-xs text-zinc-400">
          ⭐ {anime.score ?? '—'} · {anime.type ?? '—'} · Ep {anime.episodes ?? '—'}
        </div>
      </div>
    </Link>
  )
}
