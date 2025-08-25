import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
export default function Community(){
  const [posts,setPosts]=useState([]); const [content,setContent]=useState(''); const nav=useNavigate()
  useEffect(()=>{
    supabase.auth.getSession().then(async({data})=>{ if(!data.session){ nav('/login'); return } await load() })
    const { data: sub } = supabase.auth.onAuthStateChange((_e,session)=>{ if(!session) nav('/login') })
    return ()=>sub.subscription.unsubscribe()
  },[nav])
  async function load(){ const {data,error}=await supabase.from('posts').select('id,content,created_at,user_id').order('created_at',{ascending:false}); if(error){ alert(error.message); return } setPosts(data||[]) }
  async function add(e){ e.preventDefault(); if(!content.trim()) return; const {error}=await supabase.from('posts').insert({content}); if(error){ alert(error.message); return } setContent(''); await load() }
  return (<div className="container"><div className="card" style={{maxWidth:700,margin:'0 auto'}}>
    <h2>Community Feed</h2>
    <form onSubmit={add} style={{marginTop:8}}><textarea className="input" rows="3" placeholder="Share something anime..." value={content} onChange={e=>setContent(e.target.value)} /><div style={{marginTop:8}}><button className="btn">Post</button></div></form>
    <div style={{marginTop:16}}>{posts.length===0? <p>No posts yet. Be the first!</p> : posts.map(p=>(
      <div key={p.id} style={{borderTop:'1px solid #1e2437',padding:'12px 0'}}>
        <div className="mono">{new Date(p.created_at).toLocaleString()}</div>
        <div style={{marginTop:4}}>{p.content}</div>
      </div>
    ))}</div>
  </div></div>)
}
