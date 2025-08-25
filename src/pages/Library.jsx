import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
export default function Library(){
  const [items,setItems]=useState([])
  const [form,setForm]=useState({title:'',status:'planning',score:0,progress:0,notes:''})
  const nav=useNavigate()
  useEffect(()=>{
    supabase.auth.getSession().then(async({data})=>{ if(!data.session){ nav('/login'); return } await load() })
    const { data: sub } = supabase.auth.onAuthStateChange((_e,session)=>{ if(!session) nav('/login') })
    return ()=>sub.subscription.unsubscribe()
  },[nav])
  async function load(){ const {data,error}=await supabase.from('anime_library').select('*').order('created_at',{ascending:false}); if(error){ alert(error.message); return } setItems(data||[]) }
  async function add(e){ e.preventDefault(); if(!form.title.trim()) return
    const {error}=await supabase.from('anime_library').insert({title:form.title.trim(),status:form.status,score:Number(form.score)||0,progress:Number(form.progress)||0,notes:form.notes})
    if(error){ alert(error.message); return } setForm({title:'',status:'planning',score:0,progress:0,notes:''}); await load()
  }
  async function del(id){ const {error}=await supabase.from('anime_library').delete().eq('id',id); if(error){ alert(error.message); return } setItems(items.filter(i=>i.id!==id)) }
  return (<div className="container">
    <div className="row">
      <div className="card" style={{flex:'1 1 300px'}}>
        <h2>Add to your anime library</h2>
        <form onSubmit={add}>
          <div style={{marginTop:8}}><label>Title</label><br/><input className="input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. Haikyuu!!" /></div>
          <div className="row" style={{marginTop:8}}>
            <div style={{flex:1}}><label>Status</label><br/>
              <select className="input" value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                <option value="planning">Planning</option><option value="watching">Watching</option><option value="completed">Completed</option><option value="on-hold">On hold</option><option value="dropped">Dropped</option>
              </select>
            </div>
            <div style={{flex:1}}><label>Score</label><br/><input className="input" type="number" min="0" max="10" value={form.score} onChange={e=>setForm({...form,score:e.target.value})} /></div>
            <div style={{flex:1}}><label>Progress (eps)</label><br/><input className="input" type="number" min="0" value={form.progress} onChange={e=>setForm({...form,progress:e.target.value})} /></div>
          </div>
          <div style={{marginTop:8}}><label>Notes</label><br/><textarea className="input" rows="3" value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} /></div>
          <div style={{marginTop:12}}><button className="btn">Add</button></div>
        </form>
      </div>
      <div className="card" style={{flex:'2 1 500px'}}>
        <h2>Your Library</h2>
        {items.length===0? <p>No entries yet. Add your first anime!</p> :
          <div style={{marginTop:8}}>{items.map(i=> (
            <div key={i.id} className="row" style={{alignItems:'center',justifyContent:'space-between',borderBottom:'1px solid #1e2437',padding:'10px 0'}}>
              <div><strong>{i.title}</strong><div className="mono">Status: {i.status} • Score: {i.score} • Progress: {i.progress}</div>{i.notes&&<div style={{marginTop:4}}>{i.notes}</div>}</div>
              <button className="btn secondary" onClick={()=>del(i.id)}>Delete</button>
            </div>
          ))}</div>
        }
      </div>
    </div>
  </div>)
}
