create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  github_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  plan text default 'free',
  stripe_customer_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  content_type text not null default 'skill' check (content_type in ('skill', 'mcp')),
  title text not null,
  description text not null,
  skill_md text not null,
  preview_md text,
  source_url text,
  docs_url text,
  tags text[] not null default '{}',
  category text not null,
  difficulty text not null check (difficulty in ('Beginner', 'Intermediate', 'Advanced')),
  creator_id uuid references public.users(id) on delete set null,
  listing_status text not null default 'approved' check (listing_status in ('draft', 'pending', 'approved', 'rejected', 'archived')),
  rejection_reason text,
  upvotes integer not null default 0,
  is_premium boolean not null default false,
  price_cents integer,
  featured boolean not null default false,
  copies_count integer not null default 0,
  downloads_count integer not null default 0,
  views_count integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.skill_votes (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid not null references public.skills(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (skill_id, user_id)
);

create table if not exists public.skill_reports (
  id uuid primary key default gen_random_uuid(),
  skill_id uuid not null references public.skills(id) on delete cascade,
  reported_by uuid not null references public.users(id) on delete cascade,
  reason text not null,
  notes text,
  status text not null default 'open' check (status in ('open', 'reviewed', 'resolved')),
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_user_id uuid references public.users(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  action text not null,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.community_threads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  author text not null,
  role text not null,
  summary text not null,
  body text not null,
  tags text[] not null default '{}',
  replies_count integer not null default 0,
  likes_count integer not null default 0,
  type text not null check (type in ('discussion', 'showcase', 'feedback')),
  created_at timestamptz not null default now()
);

create table if not exists public.community_replies (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid not null references public.community_threads(id) on delete cascade,
  author text not null,
  role text not null,
  body text not null,
  likes_count integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.skills enable row level security;
alter table public.skill_votes enable row level security;
alter table public.skill_reports enable row level security;
alter table public.audit_logs enable row level security;
alter table public.community_threads enable row level security;
alter table public.community_replies enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.users
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_skills_updated_at on public.skills;
create trigger set_skills_updated_at
before update on public.skills
for each row
execute function public.set_updated_at();

create policy "Users can read own profile"
on public.users
for select
to authenticated
using (id = auth.uid() or public.is_admin());

create policy "Admins can read users"
on public.users
for select
to anon, authenticated
using (public.is_admin());

create policy "Users can update own profile"
on public.users
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());

create policy "Public can read approved skills"
on public.skills
for select
to anon, authenticated
using (
  listing_status = 'approved'
  or creator_id = auth.uid()
  or public.is_admin()
);

create policy "Creators can insert own skills"
on public.skills
for insert
to authenticated
with check (
  creator_id = auth.uid()
  and listing_status in ('draft', 'pending')
  and (not is_premium or price_cents is not null)
);

create policy "Creators can update own non-approved skills"
on public.skills
for update
to authenticated
using (
  creator_id = auth.uid()
  and listing_status in ('draft', 'pending', 'rejected')
)
with check (
  creator_id = auth.uid()
  and listing_status in ('draft', 'pending', 'rejected')
  and (not is_premium or price_cents is not null)
);

create policy "Admins can manage skills"
on public.skills
for all
to anon, authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Users can read own votes"
on public.skill_votes
for select
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can create own votes"
on public.skill_votes
for insert
to authenticated
with check (user_id = auth.uid());

create policy "Users can delete own votes"
on public.skill_votes
for delete
to authenticated
using (user_id = auth.uid() or public.is_admin());

create policy "Users can create reports"
on public.skill_reports
for insert
to authenticated
with check (reported_by = auth.uid());

create policy "Admins can manage reports"
on public.skill_reports
for all
to anon, authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Admins can read audit logs"
on public.audit_logs
for select
to anon, authenticated
using (public.is_admin());

create policy "Admins can insert audit logs"
on public.audit_logs
for insert
to anon, authenticated
with check (public.is_admin());

create policy "Public can read community threads"
on public.community_threads
for select
to anon, authenticated
using (true);

create policy "Public can insert community threads"
on public.community_threads
for insert
to anon, authenticated
with check (true);

create policy "Public can read community replies"
on public.community_replies
for select
to anon, authenticated
using (true);

create policy "Public can insert community replies"
on public.community_replies
for insert
to anon, authenticated
with check (true);

insert into public.users (id, name, github_url, role, plan)
values
  ('00000000-0000-0000-0000-000000000001', 'Ava Patel', 'https://github.com/avapatel', 'admin', 'creator_pro'),
  ('00000000-0000-0000-0000-000000000002', 'Marcus Lee', 'https://github.com/marcuslee', 'user', 'creator_pro'),
  ('00000000-0000-0000-0000-000000000003', 'Nina Romero', 'https://github.com/nromero', 'user', 'free'),
  ('00000000-0000-0000-0000-000000000004', 'Julian Kim', 'https://github.com/juliankim', 'user', 'creator_pro'),
  ('00000000-0000-0000-0000-000000000005', 'Priya Shah', 'https://github.com/priyashah', 'user', 'free'),
  ('00000000-0000-0000-0000-000000000006', 'Sam Ortega', 'https://github.com/samortega', 'user', 'creator_pro')
on conflict (id) do nothing;

insert into public.community_threads (
  id,
  title,
  slug,
  author,
  role,
  summary,
  body,
  tags,
  replies_count,
  likes_count,
  type,
  created_at
)
values
  (
    '10000000-0000-0000-0000-000000000001',
    'What makes a premium Claude skill feel worth paying for?',
    'premium-skills-worth-paying-for',
    'Sam Ortega',
    'Creator Pro',
    'A practical thread on pricing based on time saved, skill depth, and whether buyers can reuse the workflow weekly.',
    'I keep seeing two extremes in premium skill pricing:

1. tiny upgrades that should probably stay free
2. giant packs that are hard to evaluate from the outside

The versions that seem to convert best for me have three traits:
- a clear before/after outcome
- reusable on a weekly workflow
- a public preview that proves the skill is structured, not vague',
    array['pricing', 'premium', 'creator'],
    28,
    64,
    'discussion',
    '2026-04-15T08:00:00.000Z'
  ),
  (
    '10000000-0000-0000-0000-000000000002',
    'Showcase: a design review skill pack that converted 18% from preview to paid',
    'design-review-pack-converted-18-percent',
    'Julian Kim',
    'Frontend Designer',
    'Breakdown of the preview structure, CTA placement, and what changed after watching copy-to-download behavior.',
    'I rebuilt my design review pack around a stronger preview:

- the first section shows tone and rigor immediately
- the middle hints at the framework without giving away everything
- the CTA sits next to trust signals instead of at the bottom',
    array['showcase', 'conversion', 'design'],
    16,
    47,
    'showcase',
    '2026-04-15T07:22:00.000Z'
  ),
  (
    '10000000-0000-0000-0000-000000000003',
    'Feedback wanted: should my incident response skill be one file or a 3-part pack?',
    'incident-response-one-file-or-pack',
    'Marcus Lee',
    'SRE Builder',
    'Looking for feedback on how much structure is too much before a skill becomes intimidating to adopt.',
    'I have split the workflow into timeline builder, stakeholder update composer, and postmortem draft assistant. My concern is whether that is cleaner or just more intimidating for first-time users.',
    array['feedback', 'incident', 'skill-structure'],
    21,
    35,
    'feedback',
    '2026-04-15T06:40:00.000Z'
  )
on conflict (id) do nothing;

insert into public.community_replies (
  id,
  thread_id,
  author,
  role,
  body,
  likes_count,
  created_at
)
values
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Ava Patel',
    'Staff Engineer',
    'Trust signals matter more than depth for the first purchase. Preview quality and evidence of real-world use close the gap.',
    12,
    '2026-04-15T08:21:00.000Z'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Nina Romero',
    'Product Lead',
    'I will pay faster for a skill that saves decision time than one that just looks sophisticated.',
    9,
    '2026-04-15T08:28:00.000Z'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000002',
    'Sam Ortega',
    'Creator Pro',
    'That preview structure is smart. The moment a buyer can picture where it fits in their day, the price stops feeling abstract.',
    7,
    '2026-04-15T07:51:00.000Z'
  )
on conflict (id) do nothing;

insert into public.skills (
  id,
  content_type,
  title,
  description,
  skill_md,
  preview_md,
  tags,
  category,
  difficulty,
  creator_id,
  upvotes,
  is_premium,
  price_cents,
  featured,
  copies_count,
  downloads_count,
  views_count
)
values
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141001',
    'skill',
    'PR Review Synthesizer',
    'Summarize a pull request into risk areas, review comments, and a ship/no-ship recommendation.',
    '# PR Review Synthesizer

## Purpose
Turn a noisy pull request into a crisp engineering decision.

## Inputs
- PR diff or changed files
- Existing reviewer comments
- Release context

## Workflow
1. Identify user-facing behavior changes first.
2. Flag regression risk, missing tests, and migration concerns.
3. Summarize unresolved reviewer feedback.
4. Produce a ship recommendation with rationale.
',
    null,
    array['review', 'git', 'quality'],
    'Productivity',
    'Intermediate',
    '00000000-0000-0000-0000-000000000001',
    42,
    false,
    null,
    true,
    314,
    119,
    1480
  ),
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141002',
    'skill',
    'Incident Timeline Builder',
    'Convert logs, alerts, and notes into a clean postmortem timeline with probable root cause signals.',
    '# Incident Timeline Builder

## Goal
Build a factual timeline before debating root cause.

## Instructions
1. Sort all events in UTC.
2. Separate confirmed facts from inferred links.
3. Highlight first symptom, first mitigation, and recovery point.
4. List top 3 root cause hypotheses with confidence levels.

## Constraints
- Do not blame individuals.
- Do not invent timestamps.
- Call out missing evidence explicitly.
',
    '# Incident Timeline Builder

## Goal
Build a factual timeline before debating root cause.

## Instructions
1. Sort all events in UTC.
2. Separate confirmed facts from inferred links.
3. Highlight first symptom...
',
    array['incident', 'sre', 'timeline'],
    'DevOps',
    'Advanced',
    '00000000-0000-0000-0000-000000000002',
    31,
    true,
    1900,
    true,
    208,
    84,
    1260
  ),
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141003',
    'skill',
    'Feature Spec Distiller',
    'Turn a rough product idea into a lightweight engineering-ready feature spec with states and edge cases.',
    '# Feature Spec Distiller

## You are helping with
Creating an MVP-level feature spec.

## Produce
- Problem statement
- Target user
- Happy path
- Edge cases
- Success metrics
- Open questions

## Style
Write with enough precision that a full-stack engineer can estimate the work.
',
    null,
    array['product', 'spec', 'ux'],
    'Research',
    'Beginner',
    '00000000-0000-0000-0000-000000000003',
    26,
    false,
    null,
    false,
    170,
    62,
    890
  ),
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141004',
    'skill',
    'Tailwind UI Refiner',
    'Audit a Tailwind interface and propose visual upgrades that feel deliberate, modern, and implementation-ready.',
    '# Tailwind UI Refiner

## Mission
Improve a UI without replacing the product''s personality.

## Audit Checklist
- Visual hierarchy
- Contrast and spacing
- Mobile responsiveness
- Empty/loading states
- Motion opportunities

## Deliverables
1. Top 5 issues
2. Suggested design direction
3. Concrete Tailwind implementation notes
',
    '# Tailwind UI Refiner

## Mission
Improve a UI without replacing the product''s personality.

## Audit Checklist
- Visual hierarchy
- Contrast and spacing
- Mobile responsiveness
',
    array['tailwind', 'design', 'frontend'],
    'Frontend',
    'Intermediate',
    '00000000-0000-0000-0000-000000000004',
    37,
    true,
    2400,
    true,
    267,
    103,
    1324
  ),
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141005',
    'skill',
    'API Contract Guardian',
    'Review request/response contracts and identify backward compatibility risks before shipping.',
    '# API Contract Guardian

## Objective
Catch breaking API changes early.

## Review for
- Removed fields
- Renamed enums
- Nullability changes
- Pagination consistency
- Error shape drift

## Required output
Return a table with change, client impact, severity, and mitigation.
',
    null,
    array['api', 'backend', 'contracts'],
    'Backend',
    'Advanced',
    '00000000-0000-0000-0000-000000000005',
    29,
    false,
    null,
    false,
    144,
    57,
    780
  ),
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141006',
    'skill',
    'Claude Skill Packager',
    'Standardize a rough workflow into a reusable SKILL.md file with inputs, outputs, and usage instructions.',
    '# Claude Skill Packager

## Goal
Turn repeated prompting into a reusable skill.

## Include
- When to use this skill
- Inputs required
- Step-by-step workflow
- Output format
- Guardrails

## Quality bar
Another engineer should be able to run the skill with zero extra explanation.
',
    '# Claude Skill Packager

## Goal
Turn repeated prompting into a reusable skill.

## Include
- When to use this skill
- Inputs required
- Step-by-step workflow
',
    array['claude', 'skill', 'workflow'],
    'Productivity',
    'Beginner',
    '00000000-0000-0000-0000-000000000006',
    55,
    true,
    2900,
    true,
    491,
    188,
    2140
  ),
  (
    '8b5fd7e0-8d66-4b1f-94a1-caf6b1141099',
    'mcp',
    'GitHub Repo MCP',
    'Connect Claude to GitHub repo context so builders can inspect code, issues, and pull requests through an MCP server.',
    '{
  "mcpServers": {
    "github-repo": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "YOUR_GITHUB_TOKEN"
      }
    }
  }
}',
    null,
    array['mcp', 'github', 'integration'],
    'Backend',
    'Intermediate',
    '00000000-0000-0000-0000-000000000001',
    18,
    false,
    null,
    true,
    97,
    41,
    530
  )
on conflict (id) do nothing;
