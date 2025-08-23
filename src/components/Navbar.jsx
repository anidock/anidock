import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({ onSearch }) {
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  function submit(e) {
    e.preventDefault()
    onSearch?.(q.trim())
    // stay on home to see results
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="container-edge py-4 flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-indigo-400">Ani</span>Dock
        </Link>

        <form onSubmit={submit} className="flex-1 max-w-xl ml-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search anime..."
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 outline-none focus:border-indigo-500"
          />
        </form>
      </div>
    </header>
  )
}
