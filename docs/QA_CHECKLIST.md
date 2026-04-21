# QA Checklist

Run this checklist before any production launch.

## Devices and Browsers

- Chrome desktop
- Safari desktop
- Firefox desktop
- iPhone Safari
- Android Chrome

## Core Flows

- Landing page renders without layout shift
- `/skills` loads approved skills
- Category filter works
- Difficulty filter works
- Empty state appears for unmatched filters
- Skill detail page renders full `SKILL.md`
- Copy button copies the full markdown
- Download button downloads a `.md` file
- Submit form validates required fields
- Submit form handles Supabase write errors gracefully
- Upvote button increments once and recovers on failure

## Slow and Failure States

- Simulate slow network in browser devtools
- Confirm no blank screens while navigating
- Disable Supabase env vars locally and confirm sample-data fallback works
- Confirm API errors return JSON and do not expose secrets

## Mobile Checks

- Code block scrolls horizontally instead of breaking layout
- Submit textarea is usable on small screens
- Navigation does not overflow
- Buttons remain tappable

