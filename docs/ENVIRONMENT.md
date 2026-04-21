# Environment Variables

The app must deploy with documented environment variables only.

## Required for Supabase reads

`NEXT_PUBLIC_SUPABASE_URL`

Your Supabase project URL. Find it in Supabase project settings under API.

`NEXT_PUBLIC_SUPABASE_ANON_KEY`

The public anonymous API key. This can be exposed to the browser because row-level security controls public reads.

## Required for writes

`SUPABASE_SERVICE_ROLE_KEY`

Server-only key used by API routes to create submitted skills and process upvotes. Never expose this value to the browser.

`ADMIN_SECRET`

Server-side secret required to access moderation API routes. Use a long random value and share it only through the team password manager.

## Recommended before launch

`NEXT_PUBLIC_APP_URL`

Canonical production URL used for metadata, redirects, and external links.

`SENTRY_DSN`

Error monitoring DSN. Add before launch so server and client failures are visible.

`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`

Recommended replacement for the MVP in-memory rate limiter when running more than one serverless instance.
