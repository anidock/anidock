import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'

export default function AnimeDetail() {
  const { id } = useParams()
  const [anime, setAnime] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)
        const json = await res.json()
        setAnime(json?.data || null)
      } catch (e) {
        setError('Failed to load anime details.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [id])

  if (loading) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-edge py-6">
        <div className="animate-pulse h-64 rounded-2xl bg-zinc-800" />
      </div>
    </div>
  )

  if (error || !anime) return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-edge py-6">
        <p className="text-red-400">{error || 'Anime not found.'}</p>
        <Link to="/" className="inline-block mt-4 text-indigo-400 underline">← Back</Link>
      </div>
    </div>
  )

  const cover = anime?.images?.jpg?.large_image_url || anime?.images?.jpg?.image_url
  const trailer = anime?.trailer?.embed_url

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-edge py-6 space-y-8">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 card">
            <img src={cover} alt={anime.title} className="w-full object-cover" />
            <div className="p-4 text-sm text-zinc-300">
              <div><span className="text-zinc-400">Type:</span> {anime.type ?? '—'}</div>
              <div><span className="text-zinc-400">Episodes:</span> {anime.episodes ?? '—'}</div>
              <div><span className="text-zinc-400">Score:</span> {anime.score ?? '—'}</div>
              <div><span className="text-zinc-400">Status:</span> {anime.status ?? '—'}</div>
              <div><span className="text-zinc-400">Year:</span> {anime.year ?? '—'}</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {(anime.genres || []).map(g => (
                  <span key={g.mal_id} className="px-2 py-1 text-xs rounded-full bg-zinc-800 border border-zinc-700">{g.name}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-extrabold">{anime.title}</h1>
            <p className="text-zinc-300 whitespace-pre-line">{anime.synopsis || 'No synopsis available.'}</p>

            {trailer && (
              <div className="card">
                <div className="aspect-video">
                  <iframe
                    src={trailer}
                    title="Trailer"
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  />
                </div>
              </div>
            )}

            <div className="card p-4 text-sm text-zinc-300">
              <h2 className="text-lg font-semibold mb-2">Details</h2>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                <div><span className="text-zinc-400">Duration:</span> {anime.duration || '—'}</div>
                <div><span className="text-zinc-400">Rating:</span> {anime.rating || '—'}</div>
                <div><span className="text-zinc-400">Studios:</span> {(anime.studios||[]).map(s=>s.name).join(', ') || '—'}</div>
                <div><span className="text-zinc-400">Producers:</span> {(anime.producers||[]).map(p=>p.name).join(', ') || '—'}</div>
                <div><span className="text-zinc-400">Source:</span> {anime.source || '—'}</div>
                <div><span className="text-zinc-400">Season:</span> {anime.season || '—'}</div>
              </div>
            </div>
          </div>
        </div>

        <Link to="/" className="inline-block text-indigo-400 underline">← Back to home</Link>
      </div>
    </div>
  )
}
