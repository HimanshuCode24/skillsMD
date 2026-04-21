# Deployment Guide

Recommended production stack:

- Vercel for Next.js hosting
- Supabase for database and auth
- Sentry for error monitoring
- Better Stack or UptimeRobot for uptime alerts
- Supabase backups with point-in-time recovery if available

## Environments

Use separate Supabase projects for staging and production.

`develop` should deploy to staging. `main` should deploy to production. Pull requests should use Vercel preview deployments.

## Launch Steps

1. Create staging and production Supabase projects.
2. Run `supabase/schema.sql` in both projects.
3. Run `supabase/seed.sql` in staging only, unless seed examples are wanted in production.
4. Configure all variables from `docs/ENVIRONMENT.md` in Vercel.
5. Deploy staging and complete `docs/QA_CHECKLIST.md`.
6. Visit `/admin`, enter `ADMIN_SECRET`, and approve at least one test skill in staging.
7. Enable uptime monitoring for `/` and `/skills`.
8. Confirm Supabase backups are enabled.
9. Promote to production only after staging passes.

## Rollback

Keep production deploys tied to Git commits. If a deploy fails, roll back to the previous Vercel deployment and review Supabase logs before retrying.
