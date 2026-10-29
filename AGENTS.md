<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Repository purpose

Wicket is OllyGarden's server-rendered marketing website at `https://ollygarden.com`. It uses
Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Supabase form submissions, and
consent-gated PostHog browser analytics. Prefer Server Components; add `"use client"` only for
browser state, forms, navigation menus, or motion.

The current repository is the source of truth for implemented behavior. The Pages preview linked
from `README.md` owns marketing information architecture and copy, while the Awesomic Figma owns
the visual language. For historical URL migrations only, compare the sitemap in the sibling
`../ollygarden-com` repository and add permanent redirects in the root `next.config.ts`.

## Implementation map

- `src/app/` contains routes, route metadata, `robots.ts`, `sitemap.ts`, and the RSS route. The
  active Next.js configuration is the root `next.config.ts`.
- `src/components/` contains page sections and the small client islands used by the shared shell.
  Pages that keep the global `PageMotif` frame open with `PageHero` and `PageBody` from
  `src/components/page-hero.tsx`; see the Page motif section in `doc/layout.md`.
- `src/lib/<area>.ts` contains the copy and structured data for each marketing area. Shared site
  identity and URLs live in `src/lib/site.ts`; keep that module import-free because the root
  `next.config.ts` imports it outside the TypeScript path-alias setup.
- Canonical blog metadata lives in `src/lib/blog.ts`, with article HTML in
  `content/blog/<slug>.html`. Do not add posts to the starter `src/lib/posts.ts` or the redirected
  `src/app/blog/` pages; the public blog lives under `/resources/blog`.
  Code-block and diagram markup for articles is in `doc/blog.md`.
- Customer case studies live in `src/lib/case-studies.ts`, with audio scripts in
  `content/case-studies/<slug>.txt`; anonymization, storytelling, linking, and audio rules are in
  `doc/case-studies.md`.
- The Instrumentation Score page (`/resources/instrumentation-score`) takes its copy from
  `src/lib/instrumentation-score.ts`. Its rules table comes from the generated
  `src/lib/instrumentation-score-rules.ts`; refresh it with
  `node scripts/sync-instrumentation-score-rules.mjs` when the spec changes, then give any new rule
  its one-line rationale in `ruleNotes` (a missing one is a type error). A rule target the
 filters do not know yet fails the build until it is added to `scoreTargets`.
- The telemetry quality guide (`/resources/telemetry-quality`) takes its definition, dimensions,
  and FAQ from `src/lib/telemetry-quality.ts`. Its numbers come only from the published case
  studies; bump `updated` there when the copy changes, since it feeds the sitemap and JSON-LD.
- The Trust Your Telemetry? game (`/resources/trust-your-telemetry`, plus a `/booth` kiosk) takes its cases
 from `src/lib/trust-game/cases.ts` and its copy from `src/lib/trust-game/content.ts`; how to add
 a case, the content rules, and the booth checklist are in `doc/trust-your-telemetry.md`.
- Event pages live under `/resources/events/<event>` with their copy and talk data in
  `src/lib/<event>.ts` (for example `src/lib/kubecon-na-2026.ts`); the `/resources/events` cards come
  from `src/lib/community.ts`. The site-wide announcement bar's copy lives in `src/lib/announcement.ts`.
- The brand kit (`/resources/brand-kit`) takes its copy, palette, and logo file names from
 `src/lib/brand-kit/content.ts`, the icon artwork from `src/lib/brand-kit/icons.ts`, and the pixel
 alphabet from `src/lib/brand-kit/pixel-font.ts`.
- Press-release data lives in `src/lib/press.ts`. Static assets live under `public/`; reuse the
  existing brand and layout assets instead of redrawing them.
- Global colors, typography, surfaces, and utility classes live in `src/app/globals.css`; reusable
  TypeScript tokens live in `src/lib/tokens.ts`. Preserve reduced-motion behavior.

## Routing and SEO invariants

- Every real public page needs visible server-rendered copy, numbers, and links (most AI crawlers
  never run JavaScript), unique metadata from `createPageMetadata`, a canonical path, and
  appropriate JSON-LD from `src/lib/structured-data.ts`.
- Titles lead with the OllyGarden brand or product and use "OpenTelemetry" only referentially
  (Linux Foundation trademark rules). After changing public pages (including legal pages),
  copy, pricing, content, metadata, or routes, run the `seo-review` skill; conventions live in
  `doc/seo.md`.
- Keep `src/app/sitemap.ts`, `src/app/robots.ts`, navigation data in `src/lib/nav.ts`, and the
  redirects in the root `next.config.ts` consistent when routes change.
- `/resources/blog` is canonical. `/blog`, old product paths, old legal paths, and other migrated
  URLs are compatibility redirects. Preserve those redirects when reorganizing routes.
- `/llms.txt` and `/llms-full.txt` are generated by `src/lib/llms.ts` from the blog, press, FAQ,
  and plan data, so new posts and price changes reach them without edits. Every indexable page
  has a Markdown version at `<path>.md` (`/index.md` for the home page), also served for
  `Accept: text/markdown`, and advertises it with a `text/markdown` alternate link.
- `/products/polder` is an intentional `noindex` coming-soon page. Do not add stubs to the sitemap.
  `/resources` is the indexable hub for every resource section; its groups live in
  `src/lib/resources.ts`, so a new resource section gets a card there. Tulip is retired:
  `/tulip` and `/products/tulip` redirect to `/products/insights`.
- `NEXT_PUBLIC_SITE_URL` must be the deployment's canonical origin. It drives canonical and Open
  Graph URLs, sitemap, robots, JSON-LD, and RSS; production must never fall back to localhost.

## Trademarks

- Copy that names OpenTelemetry or another Linux Foundation mark follows
  [`marketing/trademarks.md`](https://github.com/ollygarden/codex/blob/main/marketing/trademarks.md)
  in the codex repository: ® on the first OpenTelemetry mention in each page's visible copy,
  "OpenTelemetry" in full before "OTel" and never "OTel" alone in a title, the mark only as an
  adjective (no possessives or hyphenated forms), our name before the mark in product and
  project names that could read as official (content such as the OTel Quiz is fine), official CNCF event names, and no Linux Foundation logos in our artwork.
- Never store the ® in strings that also feed metadata, JSON-LD, RSS, or more than one page. Add
  it where the copy renders with the helpers in `src/lib/trademarks.ts`, as the blog, press, blog
  hero, and FAQ components do. That module also holds the attribution notice in the site footer;
  add any newly mentioned Linux Foundation mark to it.

## Open Graph images

- Every indexable page has its own Open Graph card. The copy lives in `src/lib/og-cards.ts`, keyed
  by canonical path: a `headline` with one to three `*accent*` words, and a one- or two-sentence
  `body`. Blog posts render on the `ink` theme, press releases on `forest`, and other pages on
  `olive`; legal pages set `theme: "cream"`.
- `createPageMetadata` attaches the card at `/og/<path>.png` to Open Graph and Twitter metadata,
  and the build fails when an indexable page has no card. `noindex` pages without a card, including
  coming-soon stubs and the not-found page, use the site-wide card for `/`.
- Shared quiz results live at `/otel-quiz/result/<token>`: server-rendered `noindex` pages outside
  the sitemap. The eight-character token's FNV-1a hash mod 11 is the score (`src/lib/result-token.ts`),
  which keeps casual URL edits from choosing one; it is not tamper-proof. Each page passes
  `ogCard: quizCardPath(score)` to `createPageMetadata`, so the 11 cards are keyed
  `/otel-quiz/score/<score>` and generated from the tiers in `src/lib/quiz/score.ts`. Shared trust
  game results at `/resources/trust-your-telemetry/result/<token>` work the same way, with one card per tier
  keyed `/resources/trust-your-telemetry/tier/<id>` from `src/lib/trust-game/score.ts`. Those modules,
  `result-token.ts`, and `og-cards.ts` import only each other, by relative `.ts` paths, because the
  render script loads them outside the path aliases. Numeric `/otel-quiz/result/<score>` links
  redirect to `/otel-quiz`.
- Render cards with the `og-image` skill through `node scripts/render-og-images.mjs [path ...]`
  (it finds the skill in `~/.claude/skills/og-image` or as the `og-image@growlight` plugin, which
  cloud sessions install from `.claude/settings.json`; otherwise set `OG_IMAGE_SKILL`). It writes
  `public/og/<path>.png`, or `public/og/index.png` for `/`.
- Adding a page, blog post, or press release means adding its card and committing the rendered
  PNG in the same change. Look at every rendered PNG before committing, and keep the headline clear
  of the mosaic on the right edge.
- Do not add `opengraph-image` or `twitter-image` files, draw images with `ImageResponse`, or set
  `openGraph.images` by hand; `bun run test` rejects them.

## Forms and server data

- Contact, careers, and Rose open-source application forms call Server Actions in
  `src/lib/supabase/submissions.ts`. Keep Supabase URL and publishable key server-only; never add a
  `NEXT_PUBLIC_` prefix or use a `service_role` key.
- `SUPABASE_SEND_EMAIL` gates the optional Edge Function invocation after a successful insert.
- `supabase/` defines the existing Website project (`sspupghymzfikfemusdc`): migrations, Edge
  Functions, and each function's `verify_jwt` in `config.toml`. A payload change that needs a new
  or changed column ships its migration in the same PR, and the migration must be additive so the
  live code keeps working once it applies. On every merge to `main`,
  `.github/workflows/deploy-production.yml` applies pending migrations, redeploys the Edge
  Functions when any changed, and only then builds and deploys the Cloudflare Worker that serves
  ollygarden.com, so code never goes live before its migrations. A `[skip ci]` commit skips that workflow, so it is not deployed
  until the workflow runs by hand or the next merge. See `doc/supabase.md` before changing form payloads, tables,
  policies, or functions.

## Analytics and build configuration

- Browser analytics initializes from `src/instrumentation-client.ts` and is implemented in
  `src/lib/posthog.ts`. Consent state uses the backward-compatible
  `ollygarden-cookie-consent` local-storage record in `src/lib/analytics-consent.ts`.
- Apollo's company-level visitor tracker (`src/lib/apollo.ts`) and HubSpot's tracking code
  (`src/lib/hubspot.ts`) share the analytics consent; see `doc/analytics.md`. Never allow LiveIntent
  (`liadm.com`) or `js.hscollectedforms.net` in the CSP.
- Capture and persistence start opted out. Session recording stays disabled. Visitors can reopen
  consent through **Cookie settings** in the footer. The not-found page emits `page_not_found` only
  after analytics consent.
- Key conversion links emit `cta_clicked` with a stable `button_id`, visible `button_text`,
  `section`, `page_path`, and `current_url`. Instrument hero, pricing, and closing CTAs through the
  shared `GetStartedLink`; keep the header sign-in event in `src/components/site-header.tsx`.
- The token variable is exactly `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`.
  `NEXT_PUBLIC_POSTHOG_TOKEN` is not read. `next.config.ts` still falls back to
  `VITE_POSTHOG_API_KEY` for local builds; deploys require `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`.
- The deploy build reads `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`,
  `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com` and the other public values from GitHub
  repository variables; `.env.example` documents their names and `doc/supabase.md` lists them all.
  `scripts/check-cloudflare-vars.sh` must keep running before the deploy build so a deploy cannot
  silently omit PostHog, the canonical origin, or the Supabase values.
- Production events live in PostHog Website project 57287. After analytics changes, confirm the
  published commit, reopen consent, accept analytics, navigate client-side, request one uniquely
  named missing path, click an instrumented CTA, and verify `$pageview`, `page_not_found`, and
  `cta_clicked` in PostHog. The **Page not found** action (157363) is the pageview-based fallback.

## Verification

- GitHub Actions (`.github/workflows/ci.yml`) runs `bun run typecheck`, `bun run lint`,
  `bun run test:unit`, and `bun run test:rss` on every pull request and push to `main`, then builds the Cloudflare Worker
  with a `wrangler deploy --dry-run`. Run the same four commands locally before opening a pull
  request.
- `bun run test:unit` runs every `test/*.test.mjs` with Node's test runner (new files are picked up
  without registration) and prints a coverage table for the `src/` and `scripts/` modules the
  tests load. It covers consent, PostHog configuration, Worker request handling, Open Graph
  cards, JSON-LD and metadata invariants, sitemap/nav/redirect consistency, and the form Server
  Actions against an in-process Supabase stand-in. Coverage is reported, not enforced: there is no
  minimum threshold.
- `bun run test:rss` performs a production build, then runs `test/build/rss.test.mjs` against the
  served output: redirects, sitemap, RSS, `llms.txt`, Markdown, and search-result title and
  description limits. `bun run test` runs both suites.
- `bun run typecheck` runs `next typegen` before `tsc --noEmit` because the route `PageProps` and
  `LayoutProps` types are generated into `.next/types/`. A local build may omit the PostHog token;
  deploy builds may not.
- CI installs with `bun install --frozen-lockfile` using the Bun in `.bun-version`, which the
  deploy workflow uses too. An older local Bun rewrites `bun.lock` to an older
  format; do not commit that diff, or regenerate the lockfile with the pinned version.
- The Cloudflare Worker (`wrangler.jsonc`, `worker.ts`, `src/edge/`) runs the OpenNext build, not
  the Node server `test:rss` uses. After changing it, a route handler that reads files, or the
  rewrites and headers in `next.config.ts`, run `bunx opennextjs-cloudflare build` and
  `bunx opennextjs-cloudflare preview`, then probe the affected routes. A file a route handler reads
  at runtime must match a module rule in `wrangler.jsonc`.
- For layout changes, verify desktop and mobile behavior, keyboard navigation, focus states, and
  reduced motion. Keep the shared header/footer behavior described in `doc/layout.md`.
- After merging deployment or analytics changes, verify the exact commit is deployed to the
  Worker (`wicket@<commit>` in `wrangler deployments list` or the **Deploy production** log) and
  perform the live checks in `operations.md` before closing the issue.

## Delivering a change

`deliver-ollygarden-services` targets Go services; for Wicket, follow its lifecycle as adapted here.

1. Before editing, record the outcome, the requested terminal state (plan, PR, merge, or live
   verification), and whether merging and production checks are authorized. Permission for one
   stage does not cover the next.
2. Fetch `origin/main` and work in an isolated worktree. Check open pull requests and Linear for
   overlapping work. Substantial or user-visible changes need a Linear issue with background,
   acceptance criteria, and rollout; fill in an empty existing issue, and use its suggested branch
   name. Never `git stash` in a worktree; the stash is shared by all worktrees.
3. Keep the diff minimal. Add a focused test that fails without the fix, then run the gates under
   Verification and the **Before commit** skills.
4. Before opening the pull request, update the `doc/` pages the change affects and `operations.md`
   (a new external service, signal, or failure mode adds rows to Failure scenarios and Telemetry
   inventory). Record only what the change proved.
5. Open the pull request with a Conventional Commits title and a body covering motivation,
   evidence, validation results, risk, rollback (for configuration-gated features, the variable to
   remove), and the live checks it needs. Own the review loop: wait for CI on the exact head,
   answer every review thread, and have a fresh sub-agent try to break the change. Then request
   human review; merge only if step 1 authorized it and a person approved (bots and the sub-agent
   do not count).
6. After merge, prove the exact merge commit is deployed to the Worker and run the live checks in
   `operations.md`. Close the issue only with that evidence.

## Agent skills

Agents working on Wicket load these skills at the matching stage. If a skill
is unavailable, say so and follow the requirements in this guide.

| Stage | Skill | When |
| --- | --- | --- |
| Dependency updates | `renovate-pr-sweep` | Reviewing or merging Renovate pull requests |
| Before commit | `/simplify` or `code-simplicity-reviewer`, then `/code-review` | Every change, before committing |
| Documentation | `experimental-operations-file` | Creating, updating, or auditing [`operations.md`](operations.md) |
| Documentation | `context-engineer` | Changing agent-facing guidance such as [`AGENTS.md`](AGENTS.md) or [`operations.md`](operations.md) |

`experimental-operations-file` ships in
[ollygarden/humus](https://github.com/ollygarden/humus); the other OllyGarden
skills ship in [ollygarden/growlight](https://github.com/ollygarden/growlight).
`/code-review` is the `code-review` plugin in
[anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official).
`/simplify` is built into Claude Code; without it, use
`code-simplicity-reviewer` or that repository's `code-simplifier` agent.
