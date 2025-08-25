import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [email,setEmail]=useState(''); const [password,setPassword]=useState(''); const [mode,setMode]=useState('login'); const [loading,setLoading]=useState(false)
  const nav=useNavigate()
  useEffect(()=>{ supabase.auth.getSession().then(({data})=>{ if(data.session) nav('/library') }) },[nav])
  async function submit(e){ e.preventDefault(); setLoading(True=false); }
  const handleAuth=async(e)=>{ e.preventDefault(); setLoading(true); try{
      if(mode==='login'){ const {error}=await supabase.auth.signInWithPassword({email,password}); if(error) throw error; }
      else { const {error}=await supabase.auth.signUp({email,password}); if(error) throw error; }
      nav('/library')
    }catch(err){ alert(err.message) } finally{ setLoading(false) } }
  const magic=async()=>{ setLoading(true); try{ const {error}=await supabase.auth.signInWithOtp({email}); if(error) throw error; alert('Magic link sent! Check your email.') }catch(err){ alert(err.message) } finally{ setLoading(false) } }
  return (<div className="container"><div className="card" style={{maxWidth:420,margin:'40px auto'}}>
    <h2>{mode==='login'?'Login':'Create account'}</h2>
    <form onSubmit={handleAuth}>
      <div style={{marginTop:12}}><label>Email</label><br/><input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></div>
      <div style={{marginTop:12}}><label>Password</label><br/><input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required={mode==='login'} /></div>
      <div className="row" style={{marginTop:12}}>
        <button className="btn" disabled={loading}>{loading?'Please wait...':(mode==='login'?'Login':'Sign up')}</button>
        <button type="button" className="btn secondary" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'Need an account? Sign up':'Have an account? Login'}</button>
        <button type="button" className="btn secondary" onClick={magic}>Magic link</button>
      </div>
    </form>
  </div></div>)
}
