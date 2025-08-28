
'use client'
import { useState } from 'react'

export default function Admin(){
  const [pass, setPass] = useState('')
  const [ok, setOk] = useState(false)
  const [message, setMessage] = useState('')

  async function check(e){
    e.preventDefault()
    const res = await fetch('/api/admin/add', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ password: pass, __bypass: true }) })
    const j = await res.json()
    if(j.error === 'Service role key not set'){ setMessage('Server missing SUPABASE_SERVICE_ROLE_KEY env var') ; return }
    if(j.ok) setOk(true)
    else setMessage('Wrong password or server error')
  }

  if(!ok){
    return (
      <div className="py-8">
        <h2 className="text-xl font-bold">Admin Login</h2>
        <form onSubmit={check} className="mt-4 flex gap-2">
          <input value={pass} onChange={e=>setPass(e.target.value)} placeholder="ADMIN_PASSWORD" className="p-2 border rounded" />
          <button className="px-4 bg-slate-800 text-white rounded">Enter</button>
        </form>
        {message && <div className="mt-2 text-red-600">{message}</div>}
      </div>
    )
  }

  return (
    <div className="py-8">
      <h2 className="text-xl font-bold">Admin Panel — Add Anime (writes to Supabase)</h2>
      <AddForm password={pass} />
    </div>
  )
}

function AddForm({password}){
  const [id, setId] = useState('')
  const [title, setTitle] = useState('')
  const [year, setYear] = useState('2024')
  const [poster, setPoster] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [availability, setAvailability] = useState('Crunchyroll|Sub/Eng')

  async function submit(e){
    e.preventDefault()
    const av = availability.split(';;').map(s=>{
      const [platform, language, url, notes] = s.split('|').map(x=>x?.trim())
      return { platform: platform||'Unknown', language: language||'', url: url||'', notes: notes||'' }
    })
    const payload = { id, title, year, poster, synopsis, availability: av, password }
    const res = await fetch('/api/admin/add', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(payload) })
    const j = await res.json()
    if(j.ok) alert('Added') 
    else alert('Error: '+(j.error || 'unknown'))
  }

  return (
    <form onSubmit={submit} className="mt-4 grid grid-cols-1 gap-2 max-w-xl">
      <input value={id} onChange={e=>setId(e.target.value)} placeholder="id (unique, e.g. naruto-2)" className="p-2 border rounded" />
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />
      <input value={year} onChange={e=>setYear(e.target.value)} placeholder="Year" className="p-2 border rounded" />
      <input value={poster} onChange={e=>setPoster(e.target.value)} placeholder="Poster URL" className="p-2 border rounded" />
      <textarea value={synopsis} onChange={e=>setSynopsis(e.target.value)} placeholder="Synopsis" className="p-2 border rounded" rows="4" />
      <input value={availability} onChange={e=>setAvailability(e.target.value)} placeholder="Availability (Platform|Language|URL|Notes; separate multiple with ;; )" className="p-2 border rounded" />
      <button className="px-4 py-2 bg-slate-800 text-white rounded">Add Anime</button>
    </form>
  )
}
