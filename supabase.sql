
create table if not exists public.anime_library (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  title text not null,
  status text not null default 'planning',
  score int not null default 0,
  progress int not null default 0,
  notes text,
  created_at timestamp with time zone default now()
);
alter table public.anime_library enable row level security;
create policy if not exists "own rows select" on public.anime_library for select using (auth.uid()=user_id);
create policy if not exists "own rows insert" on public.anime_library for insert with check (auth.uid()=user_id);
create policy if not exists "own rows update" on public.anime_library for update using (auth.uid()=user_id);
create policy if not exists "own rows delete" on public.anime_library for delete using (auth.uid()=user_id);

create table if not exists public.posts (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid(),
  content text not null,
  created_at timestamp with time zone default now()
);
alter table public.posts enable row level security;
create policy if not exists "read all posts" on public.posts for select using (true);
create policy if not exists "write own posts" on public.posts for insert with check (auth.uid()=user_id);
create policy if not exists "update own posts" on public.posts for update using (auth.uid()=user_id);
create policy if not exists "delete own posts" on public.posts for delete using (auth.uid()=user_id);
