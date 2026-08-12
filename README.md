# OllyGarden

A marketing website for OllyGarden, built with Next.js 16, React, TypeScript, and Tailwind CSS. All content is in English with a robust SEO setup.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- SEO: Metadata API, sitemap, robots.txt, Open Graph, Twitter cards, JSON-LD

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your production domain before deploying (e.g. `https://ollygarden.com`).

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Pages

| Route      | Description        |
| ---------- | ------------------ |
| `/`        | Home               |
| `/about`   | About OllyGarden   |
| `/contact` | Contact information |

## SEO

SEO configuration lives in `src/lib/seo/`:

- **`site.ts`** — site name, URL, keywords, routes
- **`metadata.ts`** — `buildPageMetadata()` helper for per-page metadata
- **`json-ld.ts`** — structured data (Organization, WebSite, WebPage)

Additional SEO routes:

- `/sitemap.xml` — auto-generated from `siteConfig.routes`
- `/robots.txt` — crawl rules + sitemap reference
- `/opengraph-image` — default social share image (1200×630)

Each page exports its own `metadata` and includes page-specific JSON-LD where relevant.

## Project structure

```
src/
├── app/                  # App Router pages and SEO routes
├── components/
│   ├── layout/           # Header, Footer
│   └── seo/              # JsonLdScript
└── lib/seo/              # Shared SEO configuration
```

## License

See [LICENSE](LICENSE).
