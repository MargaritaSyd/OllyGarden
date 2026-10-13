---
name: seo-review
description: Reviews OllyGarden marketing-site (wicket) changes for SEO and answer-engine (AEO/AIO) quality before they ship. Use after any change to a public page, route, copy, FAQ, pricing, titles or metadata, blog post in content/blog, press release, structured data, redirects, sitemap, robots.txt, or llms.txt — and when someone asks whether a page is SEO-ready, why it doesn't rank, or how AI assistants will cite it. Use it even for a plain "add a blog post" or "update the pricing". Not for rendering Open Graph PNGs (og-image) or performance profiling (web-perf).
---

# SEO review for wicket

`doc/seo.md` holds the conventions and their reasons; read the sections matching the change before
judging it.

## 1. Scope the change

List what the change touches (`git diff --name-only origin/main...` plus uncommitted files) and
map it to canonical paths:

- `src/app/<route>/page.tsx` or `src/lib/<area>.ts` copy → that page.
- `content/blog/<slug>.html` or `src/lib/blog.ts` → `/resources/blog/<slug>` and `/resources/blog`.
- `src/lib/press.ts` → `/resources/press-releases/<slug>`.
- Plan data (`insightsPlans`, `rosePlans`), `faq.ts`, `structured-data.ts`,
  `metadata.ts`, `nav.ts`, `sitemap.ts`, `robots.ts`, `llms.ts`, `next.config.ts` → site-wide;
  check the whole sitemap.

## 2. Run the checker

Run `bun run build`, start `bun run start -p 3100` as a background command, and wait until
`curl -sf localhost:3100` succeeds. Then audit the affected paths (or everything for site-wide
changes):

```bash
node .claude/skills/seo-review/scripts/check-site.mjs http://localhost:3100 /products/rose /resources/blog/new-post
```

A Netlify deploy preview URL works the same way, and so does `https://ollygarden.com` for a
baseline. Errors break an invariant; warnings are judgment calls you resolve in step 3. When a
finding also shows up on production, it predates the change — report it separately so it doesn't
block this one. Stop the server when you're done.

## 3. Review what the script can't judge

- **Titles and trademarks:** does the title name what a searcher would type? Product and landing
  pages lead with the OllyGarden brand or product. No title may read as an official OpenTelemetry
  page ("OpenTelemetry X: The Complete Guide", "OpenTelemetry Blog"); retitle those around the
  task, e.g. "How to set up X in the OpenTelemetry Collector".
- **Answers:** can each key passage be quoted on its own — definition first, concrete numbers in
  text, FAQ answers that answer their question?
- **Facts:** are prices, dates, versions, and names correct and identical everywhere? Grep for the
  old value after any change to one. No "planned for" dates in the past.
- **Server rendering:** does any new client component hide copy, numbers, or links until hydration?
- **Links:** does new content link to the relevant product page (and vice versa), and does every new
  indexable page have a server-rendered link? No links to redirects or `olly.garden` pages; links
  in `content/blog/*.html` are absolute `https://ollygarden.com/...` because that HTML also feeds
  RSS and Markdown.
- **Indexing:** new pages are in the sitemap and `llms.txt` (or deliberately `noindex`), with a
  redirect for any moved URL.
- **Structured data:** matches what the page shows; new plans, FAQs, or authors flow from data.

## 4. Report

Lead with a one-line verdict (ready / needs changes). Then list findings, most serious first, each
with the path or `file:line`, what a crawler or answer engine would get wrong, and the concrete fix.
Separate pre-existing issues from ones this change introduces. Fix the introduced ones directly
when you're working on the change yourself; leave pre-existing ones as suggestions.
