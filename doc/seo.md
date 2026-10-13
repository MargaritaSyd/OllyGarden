# SEO and answer-engine conventions

Search engines and answer engines (ChatGPT, Perplexity, Claude, Google AI Overviews) read
ollygarden.com three ways: as server-rendered HTML, as Markdown, and through the generated
`llms.txt` files. A page ranks and gets cited when every one of those views carries the same clear,
current, quotable facts. The `seo-review` skill in `.claude/skills/seo-review/` checks changes
against this document.

## Crawl access

- `src/app/robots.ts` allows everything except `/api/` and `/agent-content/`. The Markdown route
  stays disallowed so its URLs are not indexed as duplicates; agents reach Markdown through
  `<path>.md` or `Accept: text/markdown` on the page URL.
- Cloudflare sits in front of Netlify. Its AI Crawl Control decides which crawlers get through, and
  Bot Preference Sync prepends those choices to `robots.txt`. GPTBot, ClaudeBot, OAI-SearchBot,
  Claude-SearchBot, PerplexityBot, and the user-triggered agents are allowed. A 403 for any of them
  is a Cloudflare setting, not something `robots.txt` can fix.

## Server-rendered content

Most AI crawlers do not run JavaScript, so anything that appears only after hydration does not
exist for them.

- Numbers, links, and copy must be in the server HTML. Animated counters render their final value
  on the server and reset in the browser, as `FinancialStat` does with `useIsClient()` from
  `src/hooks/use-prefers-reduced-motion.ts`. A counter that is visible on load, such as the
  Insights hero score, also hides the number with `motion-safe:invisible` until hydration so it
  never flashes the final value before counting.
- The header's mega menus mount only when opened, so their links are invisible to crawlers. Every
  indexable page therefore needs a server-rendered link from the footer (`footerColumns` in
  `src/lib/nav.ts`) or from page copy.

## Titles and descriptions

Each area's `*Meta` object in `src/lib/<area>.ts` owns the page `title` and `description`; the page
passes both to `createPageMetadata`, and the JSON-LD `WebPage` node reuses the description. Blog
posts and press releases use their headline and `excerpt` or `dek`, unless an optional `seo`
override (`SeoOverride` in `src/lib/metadata.ts`) supplies a shorter title or description; the
override changes only search results and link previews, never the published headline or card.
`bun run test` fails when any sitemap page's title or description falls outside these limits.

- **Title:** name the product or topic a searcher would type, within about 60 characters.
  `createPageMetadata` appends " — OllyGarden" only when the result stays within 60 characters and
  the title doesn't already contain the brand; pages that pass `absoluteTitle: true` own the whole
  string.
- **Trademarks:** titles follow the trademark rules in `AGENTS.md`. Product, solution, and
  landing-page titles lead with the OllyGarden brand or product ("OllyGarden Blog — …",
  "OllyGarden Rose — …"), never with "OpenTelemetry …" in a way
  that reads as an official project page, and spell out "OpenTelemetry" instead of "OTel". A
  blog-post title may name OpenTelemetry, but not in a form that reads as the project's own
  documentation or blog: "How to set up tail sampling in the OpenTelemetry Collector", not
  "OpenTelemetry Tail Sampling: The Complete Guide"; an opinion such as "OpenTelemetry is not hard"
  is fine. Say "distribution" or "for OpenTelemetry", never "OpenTelemetry-native", and not "the
  OpenTelemetry Collector" for our product.
- **Description:** 110–160 characters that answer "what is this page and why read it", with the
  primary keyword early. Hero ledes are usually too long to reuse.
- **Headings:** the `<h1>` names the topic; heading levels do not skip.

## Structured data

`src/lib/structured-data.ts` builds one `@graph` per page type. Every page carries `Organization`
and `WebSite`.

| Page | Main node |
|---|---|
| Home, solutions, company, contact, lists | `WebPage` or `AboutPage`, plus `BreadcrumbList` |
| Product | `SoftwareApplication` with `Offer`s built from the plan data |
| Page with a visible FAQ (`/resources/faq`, pricing, guides) | `FAQPage` whose questions match the page |
| Blog post | `BlogPosting` with author `Person` (job title, profile URL, `sameAs`), `datePublished`, and `dateModified` from the post's optional `updated` |
| Press release | `NewsArticle` |
| Job | `JobPosting` |

Markup describes only what the page shows. Prices come from `insightsPlans` and `rosePlans`, so a price change updates the cards, FAQ, JSON-LD, and `llms.txt` together.

## Indexing

- `src/app/sitemap.ts` lists every indexable page. Blog posts and press releases come from their
  data; pages without a real content date carry no `lastmod`, because an always-current date tells
  crawlers nothing.
- `noindex` pages stay out of the sitemap and `llms.txt`: coming-soon stubs, shared quiz results,
  the not-found page, and press releases with `noIndex: true` (use `indexablePressReleases`).
  Retired product pages redirect instead: `/products/tulip` goes to `/products/insights`.
- Renamed or moved pages keep a permanent redirect in `next.config.ts`. Internal links point at the
  canonical path, not at a redirect or an old `olly.garden` page. The `contact@olly.garden` address
  is still the official contact email.

## Answer engines

- `/llms.txt` and `/llms-full.txt` are generated by `src/lib/llms.ts`. A new content type or
  product section needs an entry there; a new post or release appears automatically.
- Every indexable page has a Markdown version at `<path>.md`, advertised by a `text/markdown`
  alternate link and served with a canonical `Link` header.
- Answer engines quote short, self-contained passages. Put the definition first ("Rose is …"),
  keep concrete numbers and prices in text rather than images, and phrase FAQ entries as the
  question a user would ask. Each FAQ answer must answer its own question.
- Facts must agree everywhere and stay current. A date written as future ("planned for …") becomes
  wrong the day it passes; state what shipped instead. Jokes and satire (the April Fools' release)
  are `noindex` so they are never quoted as fact.
- Company facts (founder, headquarters, social profiles) belong in the `Organization` node and on
  the company page, stated the same way in both.

## Content and internal links

- Blog posts link to the product page they discuss, and product pages link to their best posts.
  Links inside `content/blog/*.html` use absolute `https://ollygarden.com/...` URLs because the
  HTML also feeds RSS and Markdown.
- Titles of posts target a question people search for ("How to name your spans") rather than only a
  clever phrase.

## Verification

- `node .claude/skills/seo-review/scripts/check-site.mjs <base-url> [path ...]` audits a local
  build, a deploy preview, or production against these rules.
- `bun run test` enforces Open Graph cards, redirects, the sitemap, RSS, `llms.txt`, and Markdown
  versions.
- AI referrals appear in PostHog project 57287 as `$referring_domain` values such as `chatgpt.com`
  and `www.perplexity.ai`.
