
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method' })
  const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}')
  const adminPass = process.env.ADMIN_PASSWORD
  if(!adminPass || body.password !== adminPass) return res.status(401).json({ error: 'Unauthorized' })

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if(!serviceKey) return res.status(500).json({ error: 'Service role key not set' })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabase = createClient(supabaseUrl, serviceKey)

  try{
    const payload = {
      id: body.id || ('a'+Date.now()),
      title: body.title || 'Untitled',
      year: body.year || null,
      poster: body.poster || null,
      synopsis: body.synopsis || null,
      availability: body.availability || []
    }
    const { error } = await supabase.from('anime').insert([payload])
    if(error) return res.status(500).json({ error: error.message })
    res.json({ ok: true })
  }catch(e){
    res.status(500).json({ error: String(e) })
  }
}
