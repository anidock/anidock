import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function AnimeDetail(){
  const { idSlug } = useParams()
  const id = idSlug.split('-')[0]
  const [anime, setAnime] = useState(null)
  const [status, setStatus] = useState('plan-to-watch')
  const [score, setScore] = useState('')
  const [progress, setProgress] = useState(0)
  const [notes, setNotes] = useState('')
  const { user } = useAuth()

  useEffect(()=>{
    fetch(`https://api.jikan.moe/v4/anime/${id}/full`).then(r=>r.json()).then(j=> setAnime(j.data))
  }, [id])

  useEffect(()=>{
    async function load(){
      if(!user) return
      const { data } = await supabase.from('user_anime').select('*').eq('user_id', user.id).eq('mal_id', id).maybeSingle()
      if(data){
        setStatus(data.status || 'plan-to-watch')
        setScore(data.score ?? '')
        setProgress(data.progress || 0)
        setNotes(data.notes || '')
      }
    }
    load()
  }, [user, id])

  async function save(){
    if(!user) return alert('Sign in to save')
    const payload = {
      user_id: user.id, mal_id: Number(id),
      title: anime.title, cover_url: anime.images?.jpg?.image_url,
      status, score: score ? Number(score) : null, progress: Number(progress), notes
    }
    const { error } = await supabase.from('user_anime').upsert(payload, { onConflict: 'user_id,mal_id' })
    if(error) alert(error.message); else alert('Saved to your library')
  }

  if(!anime) return <div><Navbar /><div className="container-edge py-6">Loading...</div></div>

  const cover = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url

  return (
    <div>
      <Navbar />
      <div className="container-edge py-6 space-y-6">
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
                {(anime.genres || []).map(g => <span key={g.mal_id} className="px-2 py-1 text-xs rounded-full bg-zinc-800 border border-zinc-700">{g.name}</span>)}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-4">
            <h1 className="text-2xl md:text-3xl font-extrabold">{anime.title}</h1>
            <p className="text-zinc-300 whitespace-pre-line">{anime.synopsis || 'No synopsis available.'}</p>

            <div className="card p-4 space-y-3">
              <h2 className="text-lg font-semibold">Your Tracking</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <label className="text-sm">Status
                  <select value={status} onChange={e=>setStatus(e.target.value)} className="input mt-1">
                    <option value="watching">Watching</option>
                    <option value="completed">Completed</option>
                    <option value="on-hold">On-Hold</option>
                    <option value="dropped">Dropped</option>
                    <option value="plan-to-watch">Plan to Watch</option>
                  </select>
                </label>
                <label className="text-sm">Score (1–10)
                  <input type="number" min="1" max="10" value={score} onChange={e=>setScore(e.target.value)} className="input mt-1" />
                </label>
                <label className="text-sm">Progress (episodes)
                  <input type="number" min="0" value={progress} onChange={e=>setProgress(e.target.value)} className="input mt-1" />
                </label>
                <label className="text-sm">Notes
                  <input value={notes} onChange={e=>setNotes(e.target.value)} className="input mt-1" placeholder="Thoughts, arcs, fav chars..." />
                </label>
              </div>
              <div className="flex gap-2">
                <button onClick={save} className="btn">Save to Library</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
