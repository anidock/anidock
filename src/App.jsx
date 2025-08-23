import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import FeaturedAnime from './components/FeaturedAnime.jsx'
import AnimeList from './components/AnimeList.jsx'

export default function App() {
  const [search, setSearch] = useState('')
  const [featured, setFeatured] = useState(null)
  const [loadingFeatured, setLoadingFeatured] = useState(true)
  const [errorFeatured, setErrorFeatured] = useState('')

  useEffect(() => {
    async function fetchFeatured() {
      setLoadingFeatured(true)
      setErrorFeatured('')
      try {
        const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=8')
        const json = await res.json()
        const first = json?.data?.[0]
        setFeatured(first || null)
      } catch (e) {
        setErrorFeatured('Failed to fetch featured anime.')
      } finally {
        setLoadingFeatured(false)
      }
    }
    fetchFeatured()
  }, [])

  const year = useMemo(() => new Date().getFullYear(), [])

  return (
    <div className="min-h-screen">
      <Navbar onSearch={setSearch} />
      <main className="container-edge py-6 space-y-10">
        {loadingFeatured ? (
          <div className="animate-pulse h-64 rounded-2xl bg-zinc-800" />
        ) : errorFeatured ? (
          <p className="text-red-400">{errorFeatured}</p>
        ) : (
          <Hero anime={featured} />
        )}

        <FeaturedAnime />

        <section>
          <h2 className="text-xl font-semibold mb-3">Browse</h2>
          <AnimeList search={search} />
        </section>
      </main>

      <footer className="mt-16 border-t border-zinc-800">
        <div className="container-edge py-8 text-sm text-zinc-400">
          © {year} AniDock. Data provided by Jikan (MyAnimeList).
        </div>
      </footer>
    </div>
  )
}
