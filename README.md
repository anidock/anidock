# AniDock + Supabase (Auth, Personal Library, Ratings, Community)

A Vite + React + Tailwind app wired to **Supabase** to support:
- Email/password **Auth**
- **Personal Anime Library** with status, rating, progress, notes
- **Community Posts** (feed) with likes
- Internal detail pages (no external MAL links)

## 1) Setup Supabase
1. Create a project at https://supabase.com/ (free tier works).
2. In **SQL editor**, run `supabase.sql` from this repo.
3. In **Authentication → Providers**, enable **Email**.
4. Grab your **Project URL** and **anon public key**.

## 2) Configure the app
Copy `.env.example` to `.env` and set:
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

## 3) Run locally
```
npm install
npm run dev
```

## 4) Deploy to Vercel
- Import GitHub repo into Vercel
- Add the same env vars in **Vercel → Settings → Environment Variables**
- Build command `vite` (auto), Output `dist` (auto)

## Notes
- Tracking data lives in `user_anime` table (per-user).
- Community posts in `posts`; likes in `post_likes`.
- Extend with comments, profile avatars, etc.
