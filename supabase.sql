-- Users are managed by Supabase Auth.
-- Public profile
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  avatar_url text,
  created_at timestamp with time zone default now()
);

-- Anime library per user
create table if not exists public.user_anime (
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade,
  mal_id integer not null,
  title text not null,
  cover_url text,
  status text check (status in ('watching','completed','on-hold','dropped','plan-to-watch')) default 'plan-to-watch',
  score integer check (score between 1 and 10),
  progress integer default 0,
  notes text,
  updated_at timestamp with time zone default now(),
  unique (user_id, mal_id)
);

-- Posts (community feed)
create table if not exists public.posts (
  id bigserial primary key,
  user_id uuid references auth.users on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Comments on posts
create table if not exists public.comments (
  id bigserial primary key,
  post_id bigint references public.posts on delete cascade,
  user_id uuid references auth.users on delete cascade,
  content text not null,
  created_at timestamp with time zone default now()
);

-- Likes on posts
create table if not exists public.post_likes (
  post_id bigint references public.posts on delete cascade,
  user_id uuid references auth.users on delete cascade,
  created_at timestamp with time zone default now(),
  primary key (post_id, user_id)
);

-- RLS
alter table public.profiles enable row level security;
alter table public.user_anime enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;

-- Policies
create policy "profiles self read" on public.profiles for select using (true);
create policy "profiles self insert" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles self update" on public.profiles for update using (auth.uid() = id);

create policy "user_anime read own" on public.user_anime for select using (auth.uid() = user_id);
create policy "user_anime write own" on public.user_anime for insert with check (auth.uid() = user_id);
create policy "user_anime update own" on public.user_anime for update using (auth.uid() = user_id);
create policy "user_anime delete own" on public.user_anime for delete using (auth.uid() = user_id);

create policy "posts read all" on public.posts for select using (true);
create policy "posts insert own" on public.posts for insert with check (auth.uid() = user_id);
create policy "posts update own" on public.posts for update using (auth.uid() = user_id);
create policy "posts delete own" on public.posts for delete using (auth.uid() = user_id);

create policy "comments read all" on public.comments for select using (true);
create policy "comments insert own" on public.comments for insert with check (auth.uid() = user_id);
create policy "comments update own" on public.comments for update using (auth.uid() = user_id);
create policy "comments delete own" on public.comments for delete using (auth.uid() = user_id);

create policy "likes read all" on public.post_likes for select using (true);
create policy "likes insert own" on public.post_likes for insert with check (auth.uid() = user_id);
create policy "likes delete own" on public.post_likes for delete using (auth.uid() = user_id);
