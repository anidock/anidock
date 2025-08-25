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


## Google OAuth

To enable Google login:

1. In Supabase dashboard → Authentication → Providers → enable Google.
2. Provide the OAuth client ID & secret from Google Cloud (OAuth Consent Screen + Credentials).
3. Set redirect URL in Google Console to `https://<your-vercel-domain>/.auth/v1/callback` (or use Supabase docs).
4. In Vercel, ensure your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set.

## Seeding real anime data

This project includes a seed script that pulls top anime from AniList and inserts into your Supabase `anime` table.

Steps:

1. In Supabase SQL editor run `schema_anime.sql` to create the `anime` table.
2. Create a service role key in Supabase (Project > Settings > API > Service key) and **keep it secret**.
3. Run locally:

```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_KEY="<your-service-role-key>"
npm i
npm run seed
```

This will upsert ~50 popular anime into your `anime` table.

Use this data to populate your UI for genres, posters, and detailed pages.

