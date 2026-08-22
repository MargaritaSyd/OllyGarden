# Wicket

OllyGarden marketing site rebuilt in Next.js, with server-rendered SEO. Visual source of truth is the [Awesomic JULY 2026 Figma](https://www.figma.com/design/2Q2qXohp53pJbg6jb2NXHz/Ollygarden---Awesomic--JULY--2026-?node-id=2-14). The [Pages preview](https://ollygarden-website.pages.dev/) is the inventory of routes and copy.

The three-stage plan lives in [`doc/roadmap.md`](doc/roadmap.md).

## Stack

- Next.js 16 (App Router, Turbopack, React Compiler)
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint with Core Web Vitals rules

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying. That value drives canonical URLs, Open Graph tags, the sitemap, robots.txt, JSON-LD, and the RSS feed.

## Scripts

```bash
npm run dev      # development server
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
```

## SEO

| Area | Where it lives |
| --- | --- |
| Site name, description, origin | `src/lib/site.ts` |
| Shared metadata helpers | `src/lib/metadata.ts` |
| JSON-LD schemas | `src/lib/structured-data.ts` |
| `robots.txt` | `src/app/robots.ts` |
| `sitemap.xml` | `src/app/sitemap.ts` |
| Web app manifest | `src/app/manifest.ts` |
| Default Open Graph image | `src/app/opengraph-image.tsx` |
| RSS feed | `src/app/feed.xml/route.ts` |

Every public page should export a unique `title` and `description`, set a canonical path, render visible English copy in the HTML (prefer Server Components), and add JSON-LD when the page maps to a schema.org type.

## Docs

- [`doc/roadmap.md`](doc/roadmap.md) — stages, routes, tokens, and open questions
- [`doc/layout.md`](doc/layout.md) — breakpoints, header chrome, grain
