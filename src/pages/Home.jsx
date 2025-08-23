import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import AnimeGrid from '../components/AnimeGrid'

export default function Home(){
  const [top, setTop] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    const url = search
      ? `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(search)}&order_by=popularity&sfw=true&limit=24`
      : `https://api.jikan.moe/v4/top/anime?limit=24`
    fetch(url).then(r=>r.json()).then(j=> setTop(j.data || []))
  }, [search])

  return (
    <div>
      <Navbar />
      <main className="container-edge py-6 space-y-6">
        <div className="flex items-center gap-3">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anime..." className="input" />
        </div>
        <AnimeGrid items={top} />
      </main>
    </div>
  )
}
