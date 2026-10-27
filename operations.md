# Operations — Wicket

Operational characteristics of the OllyGarden marketing website. Read this before diagnosing
production behavior.

## Runtime shape

- **Business role:** Public marketing, product, company, and resource website.
- **Deployment:** Next.js 16 application built with OpenNext and served by the Cloudflare Worker
  `wicket` (`wrangler.jsonc`) on the route `ollygarden.com/*`. The **Deploy production** GitHub
  Actions workflow deploys it after Supabase migrations and Edge Functions, stamping each deployment
  `wicket@<commit>`. The zone (seedbed `infrastructure/cloudflare/ollygarden-com`) redirects `www`
  and plain HTTP to `https://ollygarden.com`. Every non-production branch gets a Worker
  Preview from Workers Builds (Cloudflare dashboard, `wicket` → Settings → Build), linked from
  the pull request. Previews take their settings from the `previews` block in `wrangler.jsonc`
  and the preview command's `--var` values, write to the production Website project, send no
  email, report analytics to the production PostHog, HubSpot and Apollo projects (reports filter
  on `ollygarden.com`), and answer with `X-Robots-Tag: noindex`. Workers Builds runs
  `bunx opennextjs-cloudflare build && bunx opennextjs-cloudflare populateCache remote` and then,
  on non-production branches,
  `npx wrangler preview --var SUPABASE_URL:$SUPABASE_URL --var SUPABASE_PUBLISHABLE_KEY:$SUPABASE_PUBLISHABLE_KEY`,
  with the same public build variables as the Deploy production workflow. Its production deploy
  command is a no-op: production deploys only from that workflow.
  `NEXT_PUBLIC_SITE_URL` defines the canonical production origin at build time.
- **Hot path:** Prerendered pages served from the Worker's static assets, server-rendered routes
  and Markdown representations, and client-side navigation after hydration. Static files skip the
  Worker code and get their headers from `public/_headers`.
- **State:** Page content is built into the deployment. Visitor analytics consent is stored for one
  year in browser local storage under `ollygarden-cookie-consent`. After consent, HubSpot keeps its visitor
  cookies (`__hstc`, `hubspotutk`, `__hssc`, `__hssrc`) on the site's domain.

## Failure scenarios

| Scenario                                             | Status       | Symptom                                                                    | Likely cause                                                                                                                    | Covering telemetry                                                                                                      |
| ---------------------------------------------------- | ------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Website traffic is absent from PostHog               | hypothesized | `$pageview` stops after a deploy                                           | Missing `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (or legacy `VITE_POSTHOG_API_KEY`) at build time, invalid host, or blocked requests | Browser network requests and the PostHog Website project's live events                                                  |
| A published or legacy URL returns 404                | hypothesized | Visitor sees the not-found page                                            | Missing page or redirect                                                                                                        | PostHog's **Page not found** action, plus `page_not_found` with `page_path`, `current_url`, and `referrer`              |
| A key call to action attracts no engagement          | hypothesized | Visitors view a page but do not click its primary actions                  | Broken link, unclear offer, or page-specific friction                                                                           | `cta_clicked` with `button_id`, `button_text`, `section`, `page_path`, and `current_url`                                |
| Client-side code fails                               | hypothesized | Interaction stops or page behavior degrades                                | Browser exception or rejected promise                                                                                           | `client_side_error` and `unhandled_promise_rejection`                                                                   |
| A lead or application is not persisted               | hypothesized | Form keeps the entered values and shows an error                           | Supabase configuration, validation, policy, or database failure                                                                 | `form_submission_failed` with `failure_type=persistence`                                                                |
| HubSpot records no website visits | hypothesized | HubSpot Traffic analytics and contact timelines show no new page views after consent | `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` missing at build time, HubSpot moved hosts outside the CSP, or HubSpot's portal consent settings changed | Browser network requests to `track.hubspot.com/__ptq.gif` after **Accept analytics**; HubSpot Traffic analytics |
| A persisted submission does not notify the team      | hypothesized | Visitor sees success, but the notification Edge Function fails             | Edge Function or email-provider failure                                                                                         | `form_notification_failed` with `failure_type=notification`; the database record remains authoritative                  |
| A merge does not reach the Worker | hypothesized | `wrangler deployments list` (or the Worker's deployments in the dashboard) shows an older `wicket@<commit>` | A missing repository variable or token, an OpenNext build failure, or a Cloudflare API error | The **Build and deploy the Cloudflare Worker** job of **Deploy production** |
| A page or route handler fails on the Worker | hypothesized | 500 for one route while `next start` serves it | A runtime file read not covered by the module rules in `wrangler.jsonc`, or a Node API workerd lacks | Workers Logs and observability for the `wicket` Worker |
| Agent clients receive HTML or stale API instructions | hypothesized | A Markdown request returns HTML, or `/openapi.json` disagrees with the API | Worker content negotiation (`src/edge/`) or upstream OpenAPI failure                                                                             | HTTP probes for the discovery resources, representative HTML routes with `Accept: text/markdown`, and the OpenAPI proxy |

## Telemetry inventory

| Signal                                                                                                                                                                                   | Type   | Source / backend                               | Exposes which scenario                                             | Gap notes                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------------------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `$pageview` and `$pageleave`                                                                                                                                                             | event  | PostHog Website project (57287)                | Traffic, navigation, and acquisition analysis                      | No automated alert for an ingestion outage                                                                                          |
| **Page not found**                                                                                                                                                                       | action | PostHog Website project (57287), action 157363 | Broken inbound links and missing redirects                         | Classifies `$pageview` events by the verified not-found page title                                                                  |
| `page_not_found`                                                                                                                                                                         | event  | PostHog Website project (57287)                | Broken inbound links and missing redirects                         | Only emitted after consent                                                                                                          |
| `cta_clicked`                                                                                                                                                                            | event  | PostHog Website project (57287)                | Intent from header sign-in, hero, pricing, and closing CTAs        | Only emitted after consent                                                                                                          |
| `client_side_error`                                                                                                                                                                      | event  | PostHog Website project (57287)                | Browser exceptions                                                 | Client event only; no source maps configured here                                                                                   |
| `unhandled_promise_rejection`                                                                                                                                                            | event  | PostHog Website project (57287)                | Unhandled async failures                                           | Client event only; no source maps configured here                                                                                   |
| `$web_vitals`                                                                                                                                                                            | event  | PostHog Website project (57287)                | Browser performance regressions                                    | Explicitly enabled in the SDK; LCP, FCP, INP and CLS arrive independently                                                                    |
| `form_started`, `form_submission_attempted`, `form_submitted`, `form_submission_failed`, `form_notification_failed`                                                                                                   | event  | PostHog Website project (57287)                | Contact, job application, and Rose open-source form funnels | Properties identify the form, page, and safe failure class; never names, email addresses, repository URLs, free text, or raw errors |
| `lead_generated`, `job_application_form_opened`, `job_application_submitted`, `rose_oss_apply_opened`, `rose_oss_apply_submitted`                         | event  | PostHog Website project (57287)                | Product- and workflow-specific conversion analysis                 | These compatibility events retain the established funnel names without PII                                                          |
| HubSpot page views and clicks | event | HubSpot portal 49255120 (Traffic analytics, contact timelines) | Which organizations and known contacts engage with the site | Only after consent; App Router navigations reported on pathname changes; no alert when page views stop |
| `trust_game_started`, `trust_game_case_answered`, `trust_game_completed`, `trust_game_shared`, `trust_game_retake`, `trust_game_abandoned`, `trust_game_product_cta_clicked` | event  | PostHog Website project (57287)                | Trust game progression, per-case accuracy, and product intent      | Case IDs, verdicts, correctness, score, and channel are safe; the booth kiosk sends no events                                       |
| `quiz_started`, `quiz_question_answered`, `quiz_explanation_viewed`, `quiz_completed`, `quiz_results_viewed`, `quiz_abandoned`, `quiz_retake`, `quiz_shared`, `quiz_product_cta_clicked` | event  | PostHog Website project (57287)                | OpenTelemetry quiz progression and product intent                  | Question IDs, topics, correctness, score, and channel are safe; the quiz collects no lead data                                      |

The website also captures `app_handoff_opened`, `app_handoff_confirmed`,
`app_handoff_cancelled`, `page_engaged`, `outbound_link_clicked`, `file_download_clicked`, and
`navigation_clicked`. App handoffs and resource clicks measure intent, not completed signups or
downloads. Engagement requires 30 visible seconds and half-page depth.

Session recording is disabled in the browser SDK. Capture and PostHog persistence start opted out;
accepting analytics enables them and immediately records the current page, while declining keeps
the browser opted out. The footer's **Cookie settings** control opts capture out and reopens the
choice so consent can be withdrawn or changed.

**Uncovered scenarios:** There is no automatic alert when the site stops sending analytics, and no
server-side request telemetry for failures that occur before a page reaches the browser. OpenAPI
proxy and Markdown negotiation failures are covered by release-time probes rather than continuous
monitoring.

## Production analysis hints

- **Where telemetry lives:** Use the PostHog skill against the Website project (ID 57287). Its primary
  dashboard is [Website outcomes and quality](https://eu.posthog.com/project/57287/dashboard/950305);
  the legacy overview remains at 157068. Event contracts and report definitions are in
  [doc/analytics.md](doc/analytics.md). Never put the project token in queries, documentation, or source code.
- **Configuration:** Set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and, normally,
  `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com` in the build environment. Deploys require
  the project token; the legacy `VITE_POSTHOG_API_KEY` fallback in `next.config.ts` only serves local
  builds.
  `NEXT_PUBLIC_POSTHOG_TOKEN` is not supported. Deploy builds read these from GitHub repository
  variables and fail before the build when one is missing (`scripts/check-cloudflare-vars.sh`).
- **Version attribution:** Match the active Worker deployment's `wicket@<commit>` message to the Git
  commit under analysis.
- **Empty is not zero:** Empty PostHog results can mean no visitors or no event ingestion. Check live
  events and browser requests before treating an empty query as zero traffic.
- **Deployment verification:** After deploy, load a page with analytics accepted, click one
  instrumented CTA, navigate once client-side, and request a deliberately nonexistent path.
  Confirm `$pageview`, `cta_clicked`, and `page_not_found` arrive with the expected properties,
  then use actual broken path data to add redirects rather than retaining the synthetic event.
- **Agent readiness:** Probe `/llms.txt`, `/developers.md`, `/cli.md`, `/api-docs.md`,
  `/api-versioning.md`, and `/openapi.json` for their expected content types. Request `/`, one
  product page, one canonical blog post, and a missing path with `Accept: text/markdown`; repeat
  `GET` and `HEAD` with Markdown first and HTML first to detect cache-key errors, including
  `Accept: text/markdown;q=0`. The `Vary` header must retain Next.js router fields, `Accept`, and
  `Accept-Encoding`.
- **Form verification:** A form submitted on a Worker Preview inserts a real row into the
  production Website project (without email); agree a test entry first, or point a local preview's
  `.dev.vars` at a stand-in Supabase URL to check a form without writing. In production, verify form
  persistence only with an explicitly authorized controlled write, then locate the database record
  before interpreting notification events. Never submit real applicant or customer details as test
  data.
- **Careers optional answers:** The form shipped before its columns existed, so every application
  insert failed until `cool_project` and `motivation` were added by hand on 2026-10-13. They are now
  recorded in `supabase/migrations/`, and `db diff --linked` reports no drift between the
  migrations and production. The insert includes both columns even for blank answers.
  After deploying `send-application-email`, verify that one application notification shows both
  answers.
- **Supabase changes:** Ship the migration in the same pull request as the code. The
  **Supabase check** run on the pull request shows what will apply; on merge, **Deploy production**
  applies it before the Worker deploys. Afterwards, `db diff --linked --schema public` should report no
  changes. See [doc/supabase.md](doc/supabase.md#automatic-deploys).
- **A merge did not reach production:** Open the **Deploy production** run for the commit. A
  failed migration, function deploy, or Worker build or deploy stops the deploy and leaves the
  previous Worker deployment live; fix the cause and re-run it (applied migrations are skipped).
  A cancelled run, or a Worker deploy that exits early saying `main` moved, was superseded by a newer
  commit whose run deploys it. A commit with `[skip ci]` in its message starts no run at all; run
  the workflow by hand to publish it. If Supabase itself is down, the workflow's
  **skip_supabase** option publishes code that needs neither a pending migration nor an Edge
  Function update.
- **Rollback:** `bunx wrangler rollback` (or **Deployments → Rollback** for the `wicket` Worker in
  the Cloudflare dashboard) serves an earlier version immediately. Nothing pins it: the next
  **Deploy production** run deploys `main` again, so follow a rollback with a revert pull request.
  A rollback never reverts a database migration; keep migrations additive.
- **Trust game booth:** `/resources/trust-your-telemetry/booth` sends no analytics. Its play counts live only
  in the booth browser's local storage; staff read them with `S` on the attract screen and copy
  them each day. Setup and keys are in
  [doc/trust-your-telemetry.md](doc/trust-your-telemetry.md#booth-checklist).
- **Security headers:** Probe a representative HTML page, Markdown representation, and
  `/openapi.json` for the CSP, HSTS, referrer policy, `nosniff`, and clickjacking protection. Static
  files, including discovery documents such as `/developers.md`, carry HSTS, `nosniff`,
  `X-Frame-Options` and the referrer policy from `public/_headers`, but no CSP. Browser-check PostHog and Supabase connections after any CSP change.
