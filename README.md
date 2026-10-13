# Wicket

OllyGarden marketing site in Next.js, with server-rendered SEO. Visual source of truth is the [Awesomic JULY 2026 Figma](https://www.figma.com/design/2Q2qXohp53pJbg6jb2NXHz/Ollygarden---Awesomic--JULY--2026-?node-id=2-14). The [Pages preview](https://ollygarden-website.pages.dev/) is the inventory of routes and copy.

The three-stage plan lives in [`doc/roadmap.md`](doc/roadmap.md).

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint with Core Web Vitals rules
- Supabase (`@supabase/supabase-js`) for the contact, careers, and Rose open-source form submits

## Getting started

```bash
cp .env.example .env.local
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` to the production origin in every deployed environment (any host). There is no Vercel/Netlify auto-detect — without it, canonicals and the sitemap fall back to `http://localhost:3000`. That value drives canonical URLs, Open Graph tags, the sitemap, robots.txt, JSON-LD, and the RSS feed.

Form submits need `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` (server-only). Leave `SUPABASE_SEND_EMAIL` as `false` until you want Edge Function emails. Details: [`doc/supabase.md`](doc/supabase.md).

Website analytics use PostHog when `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set at build time. See
[`operations.md`](operations.md) for the event inventory, consent behavior, and production checks.

## Scripts

```bash
bun run dev        # development server
bun run build      # production build
bun run start      # serve the production build
bun run typecheck  # next typegen + tsc --noEmit
bun run lint       # ESLint
bun run test:unit  # test/*.test.mjs with a coverage report (no threshold)
bun run test:rss   # production build, then test/build/rss.test.mjs against it
bun run test       # test:unit + test:rss
```

GitHub Actions runs typecheck, lint, test:unit, and test:rss on every pull request and push to
`main` (`.github/workflows/ci.yml`). Netlify only runs the build.

## SEO

| Area | Where it lives |
| --- | --- |
| Site name, description, origin | `src/lib/site.ts` |
| Shared metadata helpers | `src/lib/metadata.ts` |
| JSON-LD schemas | `src/lib/structured-data.ts` |
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| Web app manifest | `src/app/manifest.ts` |
| Open Graph cards | `src/lib/og-cards.ts`, rendered to `public/og/` by `scripts/render-og-images.mjs` |
| RSS feed | `src/app/blog/rss.xml/route.ts` |

Every public page should export a unique `title` and `description`, set a canonical path, render visible English copy in the HTML (prefer Server Components), and add JSON-LD when the page maps to a schema.org type.

## Docs

- [`doc/roadmap.md`](doc/roadmap.md) — stages, routes, tokens, and open questions
- [`doc/layout.md`](doc/layout.md) — breakpoints, header chrome, grain
- [`doc/supabase.md`](doc/supabase.md) — form submissions, migrations, and Edge Functions for the Website Supabase project
- [`doc/careers.md`](doc/careers.md) — open positions, role pages, and application payloads
- [`doc/case-studies.md`](doc/case-studies.md) — anonymized customer stories, linking, and audio
- [`doc/seo.md`](doc/seo.md) — search and answer-engine conventions
- [`doc/analytics.md`](doc/analytics.md) — PostHog event contract, consent, and Apollo
- [`operations.md`](operations.md) — runtime, analytics, failure scenarios, and production checks
- [Website Runbook](https://github.com/ollygarden/codex/blob/main/operations/website-runbook.md) in the codex handbook — accounts, access, shipping, troubleshooting, and known gaps for the team
