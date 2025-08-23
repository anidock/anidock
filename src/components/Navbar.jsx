import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Navbar() {
  const { user } = useAuth()
  const navigate = useNavigate()

  async function signOut(){
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="container-edge py-4 flex items-center gap-4">
        <Link to="/" className="text-2xl font-bold tracking-tight">
          <span className="text-indigo-400">Ani</span>Dock
        </Link>

        <nav className="ml-auto flex items-center gap-4 text-sm">
          <Link to="/community" className="hover:underline">Community</Link>
          <Link to="/library" className="hover:underline">My Library</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:underline">Profile</Link>
              <button onClick={signOut} className="btn">Sign out</button>
            </>
          ) : (
            <Link to="/auth" className="btn">Sign in</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
