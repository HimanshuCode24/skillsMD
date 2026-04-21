# Claude Skills Directory

A production-ready MVP for discovering, previewing, and submitting reusable Claude `SKILL.md` workflows.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- ShadCN-style UI primitives
- Supabase for persistence
- Stripe payment-link ready pricing page

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Add your Supabase project credentials to `.env.local`.

4. Optional: add Stripe payment links for the paid plans:

```bash
NEXT_PUBLIC_STRIPE_SKILL_CHECKOUT_BASE_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_SKILL_PACK_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_CREATOR_PRO_URL=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_TEAM_URL=https://buy.stripe.com/...
```

5. Run the SQL in [`supabase/migrations/202604150001_init.sql`](./supabase/migrations/202604150001_init.sql) in your Supabase project.

6. Start the app:

```bash
npm run dev
```

## Features

- Landing page with trending skills
- Browseable skill directory with category and difficulty filters
- Skill detail page with copy and download actions
- Submit form for adding new skills
- Basic upvote endpoint
- Premium skills with public previews
- Creator dashboard with monetization metrics
- Split pricing flows for premium skill buyers and creators
- GitHub sign-in ready header controls via Supabase auth
- Empty state and loading state support

## Notes

- The UI falls back to local sample data when Supabase environment variables are not configured, so the app is still previewable.
- New submissions and persistent upvotes require a connected Supabase project.
- Pricing CTAs can point directly to Stripe Payment Links through environment variables.
