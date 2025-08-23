import { useEffect, useState } from 'react'
import AnimeGrid from './AnimeGrid.jsx'

export default function FeaturedAnime() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError('')
      try {
        const res = await fetch('https://api.jikan.moe/v4/top/anime?limit=12')
        const json = await res.json()
        setData(json?.data || [])
      } catch (e) {
        setError('Failed to load featured anime.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [])

  if (loading) return <div className="animate-pulse h-48 rounded-2xl bg-zinc-800" />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Trending Now</h2>
      <AnimeGrid items={data} />
    </section>
  )
}
