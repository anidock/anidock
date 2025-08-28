
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home(){
  const [q, setQ] = useState('')
  const [platform, setPlatform] = useState('All')
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  async function load(){
    setLoading(true)
    let query = supabase.from('anime').select('*').order('title', { ascending: true })
    const { data: rows, error } = await query
    if(error){ console.error(error); setData([]) } else setData(rows || [])
    setLoading(false)
  }

  useEffect(()=>{ load() }, [])

  const platforms = ['All','Netflix','Prime','Crunchyroll','JioCinema','Muse Asia','ZeeCafe','Sony YAY']

  const filtered = data.filter(a=>{
    const matchQ = (a.title + ' ' + (a.synopsis||'')).toLowerCase().includes(q.toLowerCase())
    const matchP = platform === 'All' || (a.availability || []).some(av => av.platform === platform)
    return matchQ && matchP
  })

  return (
    <main className="py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Anidock — India Anime Finder</h1>
        <p className="text-sm text-slate-600">Connected to your Supabase DB. Search and find where to watch anime in India.</p>
      </header>

      <div className="mb-4 flex gap-3">
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search anime..." className="flex-1 p-2 border rounded" />
        <select value={platform} onChange={e=>setPlatform(e.target.value)} className="p-2 border rounded">
          {platforms.map(p=> <option key={p} value={p}>{p}</option>)}
        </select>
      </div>

      {loading ? <div>Loading...</div> : (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map(a=> (
            <article key={a.id} className="p-4 bg-white rounded shadow">
              <div className="flex gap-4">
                <img src={a.poster} className="w-24 h-32 object-cover rounded" alt="" />
                <div>
                  <h2 className="text-lg font-semibold">{a.title} <span className="text-sm text-slate-500">({a.year})</span></h2>
                  <p className="text-sm text-slate-600 mt-1 line-clamp-3">{a.synopsis}</p>
                  <div className="mt-3 text-xs text-slate-500">Where to watch in India:</div>
                  <div className="mt-1 flex flex-wrap">
                    {(a.availability||[]).map((av,i)=> <span key={i} className="inline-block mr-2 mt-2 px-2 py-1 text-xs rounded-full border">{av.platform}{av.language? ' — '+av.language : ''}</span>)}
                  </div>
                  <div className="mt-3"><a href={`/anime/${a.id}`} className="text-sm underline">Details</a></div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <footer className="mt-8 text-sm text-slate-500">
        <a href="/admin" className="underline">Admin Panel</a>
      </footer>
    </main>
  )
}
