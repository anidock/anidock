import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vznlckpdapfzlpazerrd.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6bmxja3BkYXBmemxwYXplcnJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NTIwNjksImV4cCI6MjA3MTUyODA2OX0.fbsfj9xKZ2h1z-NOAsp1HJlnetBVhKGWx_jWaSe2Okk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
