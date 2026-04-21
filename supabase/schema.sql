create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text,
  github_url text,
  created_at timestamp with time zone not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  skill_md text not null,
  tags text[] not null default '{}',
  category text not null,
  difficulty text not null,
  creator_id uuid references public.users(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  upvotes integer not null default 0,
  created_at timestamp with time zone not null default now()
);

alter table public.users enable row level security;
alter table public.skills enable row level security;

create policy "Users are readable by everyone"
  on public.users for select
  using (true);

create policy "Skills are readable by everyone"
  on public.skills for select
  using (status = 'approved');

create index if not exists skills_category_idx on public.skills(category);
create index if not exists skills_difficulty_idx on public.skills(difficulty);
create index if not exists skills_tags_idx on public.skills using gin(tags);
create index if not exists skills_upvotes_idx on public.skills(upvotes desc);
create index if not exists skills_status_idx on public.skills(status);
