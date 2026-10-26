# Operations — Wicket

Operational characteristics of the OllyGarden marketing website. Read this before diagnosing
production behavior.

## Runtime shape

- **Business role:** Public marketing, product, company, and resource website.
- **Deployment:** Next.js 16 application configured for Netlify. Production builds start only from
  the **Deploy production** GitHub Actions workflow, after Supabase migrations and Edge Functions.
  `NEXT_PUBLIC_SITE_URL` defines the canonical production origin at build time.
- **Hot path:** Server-rendered and statically generated pages, with client-side navigation after
  hydration.
- **State:** Page content is built into the deployment. Visitor analytics consent is stored for one
  year in browser local storage under `ollygarden-cookie-consent`.

## Failure scenarios

| Scenario                                             | Status       | Symptom                                                                    | Likely cause                                                                                                                    | Covering telemetry                                                                                                      |
| ---------------------------------------------------- | ------------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Website traffic is absent from PostHog               | hypothesized | `$pageview` stops after a deploy                                           | Missing `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (or legacy `VITE_POSTHOG_API_KEY`) at build time, invalid host, or blocked requests | Browser network requests and the PostHog Website project's live events                                                  |
| A published or legacy URL returns 404                | hypothesized | Visitor sees the not-found page                                            | Missing page or redirect                                                                                                        | PostHog's **Page not found** action, plus `page_not_found` with `page_path`, `current_url`, and `referrer`              |
| A key call to action attracts no engagement          | hypothesized | Visitors view a page but do not click its primary actions                  | Broken link, unclear offer, or page-specific friction                                                                           | `cta_clicked` with `button_id`, `button_text`, `section`, `page_path`, and `current_url`                                |
| Client-side code fails                               | hypothesized | Interaction stops or page behavior degrades                                | Browser exception or rejected promise                                                                                           | `client_side_error` and `unhandled_promise_rejection`                                                                   |
| A lead or application is not persisted               | hypothesized | Form keeps the entered values and shows an error                           | Supabase configuration, validation, policy, or database failure                                                                 | `form_submission_failed` with `failure_type=persistence`                                                                |
| A persisted submission does not notify the team      | hypothesized | Visitor sees success, but the notification Edge Function fails             | Edge Function or email-provider failure                                                                                         | `form_notification_failed` with `failure_type=notification`; the database record remains authoritative                  |
| Agent clients receive HTML or stale API instructions | hypothesized | A Markdown request returns HTML, or `/openapi.json` disagrees with the API | Netlify content negotiation or upstream OpenAPI failure                                                                         | HTTP probes for the discovery resources, representative HTML routes with `Accept: text/markdown`, and the OpenAPI proxy |

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
| `quiz_started`, `quiz_question_answered`, `quiz_explanation_viewed`, `quiz_completed`, `quiz_results_viewed`, `quiz_abandoned`, `quiz_retake`, `quiz_shared`, `quiz_product_cta_clicked` | event  | PostHog Website project (57287)                | OpenTelemetry quiz progression and product intent                  | Question IDs, topics, correctness, score, and channel are safe; the quiz collects no lead data                                      |
| `trust_game_started`, `trust_game_answered`, `trust_game_completed`, `trust_game_results_viewed`, `trust_game_abandoned`, `trust_game_retake`, `trust_game_shared`, `trust_game_product_cta_clicked` | event | PostHog Website project (57287) | Trust Game progression and product intent | Case IDs, signals, correctness, score, and channel are safe; the game collects no lead data |

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
  `NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com` in the build environment. The legacy
  `VITE_POSTHOG_API_KEY` remains a temporary token fallback for deployment continuity.
  `NEXT_PUBLIC_POSTHOG_TOKEN` is not supported. Netlify's values are remote and must include Build
  scope; `netlify.toml` only controls the public-value secret-scanner allowlist. Netlify builds fail
  before `next build` when neither supported token variable is present.
- **Version attribution:** Match the active Netlify deploy commit to the Git commit under analysis.
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
- **Form verification:** Use non-production data in deploy previews. In production, verify form
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
  applies it before Netlify builds. Afterwards, `db diff --linked --schema public` should report no
  changes. See [doc/supabase.md](doc/supabase.md#automatic-deploys).
- **A merge did not reach production:** Open the **Deploy production** run for the commit. A
  failed migration, function deploy, or build-hook call stops the deploy and leaves the previous
  one live; fix the cause and re-run it (applied migrations are skipped). A cancelled run was
  superseded by a newer commit. A Netlify production deploy that fails in `prebuild` either was not
  started by the workflow (no hook body: run the workflow instead) or built a newer commit than the
  workflow migrated (the log names both commits: the newer commit's run publishes it). A commit
  with `[skip ci]` in its message starts no run at all; run the workflow by hand to publish it. If Supabase itself is down, the workflow's
  **skip_supabase** option publishes code that needs neither a pending migration nor an Edge
  Function update.
- **Security headers:** Probe a representative HTML page, Markdown representation, static discovery
  document, and `/openapi.json` for the CSP, HSTS, referrer policy, `nosniff`, and clickjacking
  protection. Browser-check PostHog and Supabase connections after any CSP change.
