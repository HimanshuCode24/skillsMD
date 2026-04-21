# Claude Skills Directory

A production-ready MVP for discovering, copying, downloading, and submitting reusable Claude AI skills stored as `SKILL.md` files.

## Features

- Landing page with trending skills
- Skills directory with category and difficulty filters
- Skill detail pages with copy/download actions
- Submit form for new `SKILL.md` entries
- Supabase database integration with sample-data fallback
- Basic upvote endpoint and UI
- Minimal ShadCN-style component system built with Tailwind CSS

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

1. Create a Supabase project.
2. Run `supabase/schema.sql` in the SQL editor.
3. Run `supabase/seed.sql` to preload examples.
4. Copy `.env.example` to `.env.local` and fill in your values.

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

The app can browse sample data without env vars. Submissions and upvotes require Supabase env vars.

## Production Readiness

Before launching publicly, read:

- `docs/ENVIRONMENT.md`
- `docs/DEPLOYMENT.md`
- `docs/QA_CHECKLIST.md`
- `docs/PRODUCTION_READINESS.md`

Submitted skills default to `pending` and public pages only show `approved` skills. The MVP includes in-memory rate limiting for local/single-instance deployments; replace it with Redis-backed rate limiting before meaningful traffic.
