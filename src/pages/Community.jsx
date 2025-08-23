import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../lib/AuthContext'

export default function Community(){
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState([])
  const { user } = useAuth()

  async function load(){
    const { data } = await supabase.from('posts').select('id, content, created_at, user_id')
      .order('created_at', { ascending: false })
    setPosts(data || [])
  }
  useEffect(()=>{ load() }, [])

  async function createPost(e){
    e.preventDefault()
    if(!content.trim()) return
    const { error } = await supabase.from('posts').insert({ content, user_id: user.id })
    if(error) return alert(error.message)
    setContent('')
    load()
  }

  async function likePost(id){
    await supabase.from('post_likes').insert({ post_id: id, user_id: user.id }).catch(()=>{})
  }

  return (
    <div>
      <Navbar />
      <div className="container-edge py-6 space-y-6">
        <form onSubmit={createPost} className="card p-4 space-y-2">
          <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Share a thought..." className="input h-24" />
          <button className="btn w-fit">Post</button>
        </form>

        <div className="space-y-4">
          {posts.map(p => (
            <article key={p.id} className="card p-4">
              <div className="text-xs text-zinc-400">{new Date(p.created_at).toLocaleString()}</div>
              <p className="mt-2">{p.content}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <button onClick={()=>likePost(p.id)} className="hover:underline">👍 Like</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
