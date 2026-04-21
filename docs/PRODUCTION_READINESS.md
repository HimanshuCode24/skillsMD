# Production Readiness

This project started as an MVP, but launch requires operational discipline.

## Non-Negotiables

- Document every environment variable.
- Use staging before production.
- Enable Supabase backups before real users submit data.
- Add monitoring before launch, not after.
- Keep the service role key server-only.
- Rate-limit public write endpoints.
- Moderate submitted skills before they appear publicly.

## Current MVP Guardrails

- Server-side request validation with `zod`
- Rate limiting for submit and upvote API routes
- Public reads restricted to approved skills
- Submitted skills default to `pending`
- Supabase sample data fallback for local development
- Production build and lint checks

## Known Follow-Ups

- Replace in-memory rate limiting with Redis before traffic.
- Add Sentry.
- Add admin moderation UI.
- Add GitHub auth for submitters.
- Add analytics for skill views, copies, and downloads.
- Add load testing script for directory reads and public write endpoints.

