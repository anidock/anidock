import { useEffect, useState } from 'react'
import AnimeGrid from './AnimeGrid.jsx'

export default function AnimeList({ search }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function run() {
      setLoading(true)
      setError('')
      try {
        const url = search
          ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search)}&order_by=popularity&sfw=true&limit=24`
          : 'https://api.jikan.moe/v4/top/anime?limit=24'
        const res = await fetch(url)
        const json = await res.json()
        setData(json?.data || [])
      } catch (e) {
        setError('Failed to fetch anime list.')
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [search])

  if (loading) return <div className="animate-pulse h-48 rounded-2xl bg-zinc-800" />
  if (error) return <p className="text-red-400">{error}</p>

  return <AnimeGrid items={data} />
}
