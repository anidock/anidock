# Anidock — Netflix-style Anime + MAL-like Tracking

## Quick Start (Vercel)
1. Upload this repository to GitHub and import into Vercel.
2. Add Environment Variables in Vercel Project Settings → **Environment Variables**:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
3. Redeploy.

> Local fallback values exist in `src/lib/supabaseClient.js` but you should set env vars for your own project.

## Supabase
Run this SQL in Supabase SQL editor to create the `watchlist` table:

```sql
create table if not exists public.watchlist (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  media_id integer not null,
  status text not null check (status in ('PLANNING','WATCHING','COMPLETED','DROPPED')) default 'PLANNING',
  rating integer check (rating between 1 and 10),
  created_at timestamp with time zone default now(),
  unique (user_id, media_id)
);

-- Enable RLS
alter table public.watchlist enable row level security;

-- Policies
create policy "Users can read own rows"
on public.watchlist for select
using (auth.uid() = user_id);

create policy "Users can insert own rows"
on public.watchlist for insert
with check (auth.uid() = user_id);

create policy "Users can update own rows"
on public.watchlist for update
using (auth.uid() = user_id);

create policy "Users can delete own rows"
on public.watchlist for delete
using (auth.uid() = user_id);
```

## Features
- Browse: Trending + Top Rated (AniList)
- Search: instant anime search
- Detail: add to list, rate 1–10
- Auth: email/password via Supabase
- Profile: Watching / Planning / Completed grids

## Scripts
- `npm run dev` – start locally
- `npm run build` – build with Vite
- `npm run preview` – preview build

## Notes
- No actual video streaming included (use legal embeds only).
- Styling: TailwindCSS dark Netflix-like UI.
