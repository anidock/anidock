import fetch from "node-fetch";
import { createClient } from "@supabase/supabase-js";

// Usage: Set environment variables before running:
// SUPABASE_URL, SUPABASE_SERVICE_KEY (service_role key, KEEP SECRET)
// Then run: npm run seed
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_KEY;
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY. Set them before running the seed script.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, { auth: { persistSession: false } });

const ANILIST_ENDPOINT = "https://graphql.anilist.co";

async function gql(query, variables = {}) {
  const res = await fetch(ANILIST_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

async function fetchTop(perPage = 50) {
  const query = `
    query ($page:Int,$perPage:Int) {
      Page(page:$page, perPage:$perPage) {
        media(type: ANIME, sort:POPULARITY_DESC) {
          id
          title { romaji english native }
          description(asHtml:false)
          coverImage { extraLarge large medium }
          bannerImage
          averageScore
          episodes
          seasonYear
          status
          format
          genres
        }
      }
    }
  `;
  const data = await gql(query, { page: 1, perPage });
  return data.Page.media;
}

function mapAnime(a) {
  return {
    anime_id: a.id,
    title: a.title?.english || a.title?.romaji || null,
    romaji_title: a.title?.romaji || null,
    description: a.description || null,
    cover_large: a.coverImage?.large || null,
    cover_extra: a.coverImage?.extraLarge || null,
    cover_medium: a.coverImage?.medium || null,
    banner: a.bannerImage || null,
    average_score: a.averageScore ?? null,
    episodes: a.episodes ?? null,
    season_year: a.seasonYear ?? null,
    status: a.status || null,
    format: a.format || null,
    genres: a.genres || null
  };
}

async function upsertAnime(list) {
  for (const a of list) {
    const row = mapAnime(a);
    // Upsert into 'anime' table (anime_id unique)
    const { error } = await supabase
      .from("anime")
      .upsert(row, { onConflict: "anime_id" });
    if (error) {
      console.error("Upsert error for", row.anime_id, error.message);
    } else {
      console.log("Upserted", row.anime_id, row.title);
    }
  }
}

async function main() {
  console.log("Fetching top anime from AniList...");
  const top = await fetchTop(50);
  console.log("Fetched", top.length, "titles. Seeding Supabase...");

  await upsertAnime(top);
  console.log("Seeding complete.");
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
