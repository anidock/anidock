import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
export default function Navbar(){
  const [user,setUser]=useState(null)
  useEffect(()=>{
    supabase.auth.getSession().then(({data})=>setUser(data.session?.user??null))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session)=>setUser(session?.user??null))
    return ()=>sub.subscription.unsubscribe()
  },[])
  return (<div className="nav">
    <Link to="/">AniDock</Link>
    <Link to="/library">My Library</Link>
    <Link to="/community">Community</Link>
    <div className="spacer" />
    {user? <><span className="tag">{user.email}</span><Link to="/login">Account</Link></> : <Link to="/login">Login / Sign up</Link>}
  </div>)
}
