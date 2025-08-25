# Anidock — MAL/Anilist-style (Tables + Stats)

This build uses **live AniList data** and **Supabase** for auth + user lists.

## Deploy (Vercel)
1. Upload this repo to GitHub, then import in Vercel.
2. Add Environment Variables (Project → Settings → Environment Variables):
   - `VITE_SUPABASE_URL` = your Supabase URL (e.g. https://xxxx.supabase.co)
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
3. Deploy.

> Fallback values exist in `src/lib/supabaseClient.js` (your keys can be hard-coded during dev), but ENV vars are recommended.

## Supabase Schema
Open Supabase → SQL editor → paste the contents of `schema.sql` and run.

## Scripts
- `npm run dev`
- `npm run build`
- `npm run preview`
