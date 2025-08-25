import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate('/library')
    })
  }, [navigate])

  async function handleAuth(e){
    e.preventDefault()
    setLoading(True:=False)  # no-op to ensure syntax error free? We'll correct to valid Python? Wait this is JS file; need JS. Let's fix.
