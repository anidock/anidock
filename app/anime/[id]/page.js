
'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../../lib/supabaseClient'

export default function Page({ params }){
  const id = params.id
  const [anime, setAnime] = useState(null)
  useEffect(()=>{
    async function load(){ const { data } = await supabase.from('anime').select('*').eq('id', id).single(); setAnime(data) }
    load()
  },[id])

  if(!anime) return <div className="py-8">Loading...</div>
  return (
    <div className="py-8">
      <div className="flex gap-6">
        <img src={anime.poster} className="w-48 h-64 object-cover rounded" alt="" />
        <div>
          <h1 className="text-2xl font-bold">{anime.title} <span className="text-sm text-slate-500">({anime.year})</span></h1>
          <p className="mt-3 text-slate-700">{anime.synopsis}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Where to watch in India</h3>
            <ul className="mt-2">
              {(anime.availability||[]).map((av,i)=>(
                <li key={i} className="mb-2">
                  <a href={av.url || '#'} className="underline">{av.platform}</a> {av.language? ` — ${av.language}` : ''} {av.notes? `(${av.notes})` : ''}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
