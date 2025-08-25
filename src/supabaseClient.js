// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vznlckpdapfzlpazerrd.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey..."

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log("✅ Supabase initialized:", supabaseUrl)
