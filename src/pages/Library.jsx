import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../lib/AuthContext'

export default function Library(){
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(()=>{
    async function load(){
      const query = supabase.from('user_anime').select('*').eq('user_id', user.id)
      const { data } = await query
      setItems(data || [])
    }
    load()
  }, [user])

  const filtered = items.filter(i => filter==='all' ? true : i.status === filter)

  return (
    <div>
      <Navbar />
      <div className="container-edge py-6 space-y-4">
        <h1 className="text-2xl font-bold">My Library</h1>
        <div className="flex gap-2">
          {['all','watching','completed','on-hold','dropped','plan-to-watch'].map(s=> (
            <button key={s} onClick={()=>setFilter(s)} className="btn">{s}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtered.map(i => (
            <div key={i.mal_id} className="card">
              <img src={i.cover_url} alt={i.title} className="w-full aspect-[3/4] object-cover" />
              <div className="p-3 text-sm">
                <div className="font-semibold line-clamp-2">{i.title}</div>
                <div className="mt-1 text-zinc-400">Status: {i.status}</div>
                <div className="mt-1 text-zinc-400">Score: {i.score ?? '—'}</div>
                <div className="mt-1 text-zinc-400">Progress: {i.progress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
