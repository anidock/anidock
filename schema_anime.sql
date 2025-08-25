-- Anime metadata table (seeded from AniList)
create table if not exists public.anime (
  id bigint generated always as identity primary key,
  anime_id integer not null unique,
  title text,
  romaji_title text,
  description text,
  cover_extra text,
  cover_large text,
  cover_medium text,
  banner text,
  average_score integer,
  episodes integer,
  season_year integer,
  status text,
  format text,
  genres text[]
);

grant select on public.anime to authenticated;
