# AniDock (Vite + React + Tailwind + Jikan API)

Discover trending anime and search the MyAnimeList database using the public Jikan API.

## Features
- Vite + React + TailwindCSS
- Trending section (Top Anime)
- Search powered by Jikan API
- Responsive grid of anime cards
- Clean, dark UI

## Getting Started

```bash
npm install
npm run dev
```

Then open the URL printed by Vite (usually http://localhost:5173).

## Deploy to Vercel
1. Push this project to a GitHub repository.
2. Import the repo in Vercel and deploy (framework: **Vite**).
3. Every push to `main` triggers an automatic redeploy.

## Notes
- API: https://api.jikan.moe/v4
- Rate limits apply. Consider adding simple caching or debounce for production use.
