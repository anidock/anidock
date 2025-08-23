# AniDock — Internal Detail Pages (Vite + React + Tailwind + Jikan API)

This version routes clicks to **/anime/:id** (internal page) instead of MyAnimeList.
Great for SEO, community features, and future streaming.

## Quick Start
```bash
npm install
npm run dev
```

## What changed vs previous build
- Added **react-router-dom**
- `AnimeCard` now links to `/anime/:id`
- `main.jsx` defines routes for Home and Anime Detail
- New `AnimeDetail.jsx` shows synopsis, trailer, genres, studios, etc.

## Deploy to Vercel
- Framework preset: **Vite**
- If you have a custom domain, add it in Vercel → Domains

## API
- Jikan v4 (public MyAnimeList mirror). You are **not** linking out to MAL anywhere.
