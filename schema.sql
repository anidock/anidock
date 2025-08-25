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
