create table if not exists public.user_anime_list (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  anime_id integer not null,
  status text not null check (status in ('PLANNING','WATCHING','COMPLETED','DROPPED')) default 'PLANNING',
  score integer check (score between 1 and 10),
  progress integer check (progress >= 0),
  updated_at timestamp with time zone default now(),
  unique (user_id, anime_id)
);

alter table public.user_anime_list enable row level security;

create policy "Users can view own list" on public.user_anime_list
for select using (auth.uid() = user_id);

create policy "Users can insert own list" on public.user_anime_list
for insert with check (auth.uid() = user_id);

create policy "Users can update own list" on public.user_anime_list
for update using (auth.uid() = user_id);

create policy "Users can delete own list" on public.user_anime_list
for delete using (auth.uid() = user_id);


-- Reviews and Friends schema

-- Reviews table
create table if not exists public.reviews (
  id bigint generated always as identity primary key,
  user_id uuid not null,
  anime_id integer not null,
  rating integer check (rating between 1 and 10),
  review_text text,
  created_at timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "Users can insert reviews" on public.reviews for insert with check (auth.uid() = user_id);
create policy "Users can select reviews" on public.reviews for select using (true);
create policy "Users can update own review" on public.reviews for update using (auth.uid() = user_id);
create policy "Users can delete own review" on public.reviews for delete using (auth.uid() = user_id);

-- Friends / followers (simple follower model)
create table if not exists public.follows (
  id bigint generated always as identity primary key,
  follower uuid not null,
  following uuid not null,
  created_at timestamptz default now(),
  unique (follower, following)
);

alter table public.follows enable row level security;
create policy "Users can follow/unfollow" on public.follows for insert with check (auth.uid() = follower);
create policy "Users can select follows" on public.follows for select using (true);
create policy "Users can delete own follow" on public.follows for delete using (auth.uid() = follower);

-- Simple aggregated ratings view (optional: materialized view)
create or replace view public.anime_ratings as
select anime_id, count(*) as votes, avg(rating) as avg_rating
from public.reviews
where rating is not null
group by anime_id;
