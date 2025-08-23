export default function Hero({ anime }) {
  if (!anime) return null
  const cover = anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url

  return (
    <section className="relative overflow-hidden rounded-2xl">
      <img
        src={cover}
        alt={anime.title}
        className="w-full h-64 object-cover opacity-30"
        loading="eager"
      />
      <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">{anime.title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-300 line-clamp-3">
          {anime.synopsis || 'Discover trending anime, top charts and more.'}
        </p>
        <div className="mt-4 text-sm text-zinc-400">
          Score: <span className="text-zinc-200">{anime.score ?? '—'}</span> ·
          Episodes: <span className="text-zinc-200">{anime.episodes ?? '—'}</span> ·
          Type: <span className="text-zinc-200">{anime.type ?? '—'}</span>
        </div>
      </div>
    </section>
  )
}
