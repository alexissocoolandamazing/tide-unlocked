# Tide UNLOCKED — Hackathon Starter

A minimal Next.js + TypeScript project scaffold for the RMIT Hackathon Tide UNLOCKED challenge.

> **Status:** starter only. No chosen challenge concept, security integration or substantive feature is implemented.

## Run locally

Requirements: Node.js 20 or later and npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. On Windows PowerShell, use `Copy-Item .env.example .env.local`.

Other commands: `npm run typecheck`, `npm run lint`, `npm run build`.

## Project structure

- `src/app/page.tsx` — starter homepage
- `src/app/globals.css` — basic styling
- `src/app/api/health/route.ts` — example API endpoint (`/api/health`)
- `src/lib/` — shared logic and future integrations
- `.env.example` — environment-variable template

## Team workflow

1. Decide on a project idea and user journey.
2. Create feature branches and open pull requests into `main`.
3. Add TideCloak integration (or clearly labelled permitted simulation) as appropriate.
4. Add a demo video and replace this README with the final submission description.

## Challenge submission notes (replace before submitting)

- Project name and problem:
- Why the solution needs distributed/conditional authority:
- How access decisions are enforced:
- What the demo proves:
- Technology and setup:

**Do not claim TideCloak is integrated until it actually is.** Never commit API keys or passwords.
