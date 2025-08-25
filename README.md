# AniDock (Minimal, Fully Functional)
React + Vite + Supabase. Features:
- Email/password login or magic link
- Personal anime library (status/score/progress/notes)
- Community feed (text posts)

## Supabase setup
1) In your project, open SQL Editor and run `supabase.sql` from this repo.
2) In Auth → Providers, enable Email.

## Deploy on Vercel
- Push this repo to GitHub and import to Vercel.
- `vercel.json` handles SPA routes.
- Supabase URL and anon key are hardcoded in `src/supabaseClient.js` (you can switch to env vars later).
