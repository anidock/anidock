import { useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Auth(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('signin')
  const navigate = useNavigate()

  async function submit(e){
    e.preventDefault()
    try{
      if(mode === 'signin'){
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if(error) throw error
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if(error) throw error
        // create profile row
        const user = data.user
        if(user){
          await fetchProfileCreate(user.id, email.split('@')[0])
        }
      }
      navigate('/')
    }catch(err){
      alert(err.message)
    }
  }

  async function fetchProfileCreate(id, username){
    await fetch('/rpc/create_profile', { method: 'POST' })
  }

  return (
    <div>
      <Navbar />
      <div className="container-edge py-10 max-w-md">
        <h1 className="text-2xl font-bold mb-4">{mode === 'signin' ? 'Sign in' : 'Create account'}</h1>
        <form onSubmit={submit} className="space-y-3">
          <input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="input" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button type="submit" className="btn w-full">{mode === 'signin' ? 'Sign in' : 'Sign up'}</button>
        </form>
        <button className="mt-3 text-sm text-indigo-400" onClick={()=> setMode(mode==='signin'?'signup':'signin')}>
          {mode==='signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  )
}
