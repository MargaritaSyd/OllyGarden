# Website analytics

The Website project is [PostHog 57287](https://eu.posthog.com/project/57287).
[Website outcomes and quality](https://eu.posthog.com/project/57287/dashboard/950305)
contains production traffic, referrer and UTM acquisition, popular pages, CTA intent,
persisted submissions, submission attempts, contact/careers conversion funnels, quiz completion,
engaged visits by page/device, browser failures, and P90 Web Vitals.
Every report filters `$host=ollygarden.com`; localhost and local previews are excluded.
The 30-day window spans the website migration. Historical paths and event semantics must be
considered when comparing releases.

## Collection and privacy

Capture requires current analytics consent, including the SDK `before_send` check at capture time.
Declining or withdrawing consent disables new capture and SDK persistence. Events accepted
while consent was valid may still finish delivery through the SDK batch or retry queue. No interactions from
before consent are replayed. Session replay and network timing are disabled. Autocapture masks
DOM text and attributes; custom events never include form values, raw errors, or personal identities.
Automatic and custom URL properties strip queries, fragments, and credentials. Mail and telephone
links are excluded. UTM dimensions remain available separately: campaign authors must use
campaign identifiers, never names or email addresses. Do not put personal information in URL paths.

The trust game's booth kiosk (`/trust-your-telemetry/booth`) never initializes PostHog or Apollo and
shows no consent banner: one shared screen on conference wifi would only produce junk records.

Apollo's website visitor tracker identifies visiting companies from their network, for sales
prioritization in Apollo's Website Visitors view. It follows the same consent record: the script loads
only after analytics consent and when `NEXT_PUBLIC_APOLLO_APP_ID` is set, and declining or withdrawing
consent clears its local storage (a loaded script stops at the next page load). Apollo receives the
full page URL, referrer, and UTM parameters with an anonymous ID. Contact-level identification is not
used: the CSP blocks the LiveIntent resolver it depends on.

HubSpot's tracking code records page views and clicks on HubSpot's visitor and contact timelines, so
sales can see which organizations and known contacts are engaging. It loads only after analytics
consent and when `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` is set. HubSpot receives the full page URL, referrer,
page title, click targets, and the `hubspotutk` visitor cookie. A visitor who is already a HubSpot
contact, for example after clicking a tracked email link, has these visits added to their record.

The tracking code records only full page loads, so `WebsiteAnalytics` reports App Router navigations
through `trackHubSpotPageView` when the pathname changes, sending the path with its current query
string. Query-only changes are not separate page views. Navigations before the script finishes loading
are covered by its own initial page view.

Our banner is the only consent source: the loader runs with `disableHubSpotCookieBanner` and
`setHubSpotConsent` (analytics and functionality, no advertising). Declining before HubSpot loads
means it never loads. Withdrawing consent after it loaded pushes `revokeCookieConsent`: HubSpot sends
one cookie-less revocation request and stops tracking page views and clicks at once. Either way, every
`__hs*` and `hubspotutk` cookie is deleted, including any set while the script was still loading.
The script itself stays in memory until the next page load, and granting consent again in the same
page restores HubSpot's consent. Withdrawing consent does not delete visits already recorded in
HubSpot; those follow our CRM retention practices.

The CSP allows the loader, analytics, and banner scripts and `track.hubspot.com`, and blocks
`js.hscollectedforms.net`, so HubSpot cannot capture our form submissions.

The implementation uses the [PostHog JavaScript configuration](https://posthog.com/docs/libraries/js/config)
and [event sanitization hook](https://posthog.com/docs/libraries/js/usage#amending-or-sampling-events).
Custom events include `page_path`, a cleaned `current_url`, and `analytics_version=2`.
The version identifies this event contract, not the deployed commit.
Confirmed app handoffs and outbound/download clicks use beacon transport, which stays synchronous
when the SDK enables gzip compression and the current document is about to unload.

## Event contract

| Event | Meaning | Properties beyond page context |
| --- | --- | --- |
| `$pageview`, `$pageleave` | SDK navigation, duration, and scroll-depth measurements | SDK acquisition, device, page and previous-page dimensions |
| `cta_clicked` | A named conversion CTA was clicked | `button_id`, `button_text`, `section`, optional cleaned `destination_url` |
| `app_handoff_opened` | The account-creation handoff dialog opened | CTA ID/section when supplied, destination |
| `app_handoff_confirmed` | The visitor followed the app link, including modifier/middle clicks | Same context; `method=dialog`, `modified_click`, or `middle_click` |
| `app_handoff_cancelled` | The visitor dismissed the open dialog by button, backdrop, or Escape | Same context |
| `form_started` | First edit or submit attempt after consent for this mounted form | `form_name` |
| `form_submission_attempted` | Submit handler invoked, before validation | `form_name` |
| `form_submitted` | Server Action returned after successful persistence | `form_name`, existing job/tier context where applicable |
| `form_submission_failed` | Validation or persistence failed | `form_name`, `failure_type=validation` or `persistence` |
| `form_notification_failed` | Persistence succeeded but notification failed | `form_name`, `failure_type=notification` |
| `page_engaged` | At least 30 seconds with the tab visible and 50% of the page reached | `engaged_seconds`, `max_scroll_percent`; once per route visit/consent period |
| `outbound_link_clicked` | HTTP(S) link to another origin followed | Cleaned destination, destination host, header/footer/content section |
| `file_download_clicked` | Download-marked or recognized document/archive link clicked | Same destination context; this is intent, not proof the download completed |
| `navigation_clicked` | A same-origin link inside navigation was clicked | Destination path and section |
| `job_posting_viewed` | Job page viewed after consent, including consent granted on the page | Job ID/title and page path |
| `$web_vitals` | SDK LCP, FCP, INP and CLS observations | SDK metric values; loading and responsiveness use milliseconds, CLS is unitless |

Product-specific lead, job, Rose, and quiz compatibility events remain available.
Use `form_submitted` for persisted outcomes; do not sum it with `lead_generated` or the
product-specific success events. Form identifiers are `contact_form`, `job_application_form`,
and `rose_open_source` (see the corresponding component constants).

## Interpreting outcomes

An app handoff is **not a signup**. Confirmed account creation and activation require app-side
instrumentation and an explicitly designed cross-domain identity/consent strategy. The website
does not identify visitors or decorate app links with visitor IDs.

Form funnels require the same `form_name` at each step. The saved contact and careers funnels
measure start → persisted submission within 30 minutes. Attempts and failure classes explain
friction and retries; notification failure does not mean submission failure. These are browser
observations of Server Action results, not a server-side audit ledger.

`page_engaged` is a visible-tab/depth heuristic, not proof of reading. Short pages can satisfy the
depth condition without scrolling. The timer resets on route changes and consent changes, and
background time is excluded. SDK pageleave scroll/duration metadata describes the **previous**
page; analyze it using `$prev_pageview_pathname`, not the new route's `$pathname`.

Web Vitals arrive on different events; their counts are not comparable. Missing INP can mean no
interaction. Keep CLS separate from millisecond metrics. P90 charts show the slow tail; assess
Core Web Vitals targets using the appropriate percentile in PostHog Web Analytics.

Consent, blocked requests and bot filtering limit coverage. These statistics describe observed,
consenting browsers, not all site visitors. Missing events are not evidence of zero traffic.

## Release verification and additional reports

1. Match the Worker deployment commit (`wicket@<commit>`) to the reviewed commit. SDK bot filtering can suppress automated
   browsers; use native browser input for the live checks without changing production bot filtering.
2. Run the isolated browser regression script described below. It uses a fake token, serves SDK
   extensions locally, intercepts ingestion, and mocks form Server Actions; it performs no database writes.
3. On the deployed site, reject analytics and verify no capture/persistence. Reopen Cookie settings,
   accept, navigate client-side, click a named CTA, dismiss and confirm its app dialog, and request
   a uniquely named missing route. Verify `$pageview`, `cta_clicked`, `page_not_found` and handoff
   events in project 57287, with cleaned URLs and no duplicate pageviews or cancellations.
4. Verify `page_engaged` after 30 visible seconds and half-page depth, plus outbound/resource
   clicks and Web Vitals. Withdraw consent and repeat interactions to confirm capture stops.
5. Verify persisted form behavior only with explicitly authorized controlled data; distinguish
   the database outcome from notification delivery.

After the new events are observed, add these reports to dashboard 950305 using a production host
filter and a date range beginning at deployment:

- App dialog opened → confirmed, ordered within 30 minutes, holding `button_id` constant.
  Filter confirmation `method=dialog`; modifier/middle clicks bypass the opening step and belong
  in a separate confirmed-handoff trend. Show cancellations by CTA alongside the funnel.
- Start → attempted → submitted, separate funnels for each of the three forms, holding `form_name`
  constant. Break failures down by `failure_type`.
- Pageview → engaged page, holding page path constant, broken down by landing page and device.
- Outbound clicks by destination host/path (documentation, GitHub, community and video resources),
  with download intent in a separate report. A video link click is not a video play.

The new-event reports require observed schema before they can be validated. Existing traffic and
conversion reports are already saved and validated against project data.

Run the browser regression against a local production build. Build with the fake token and start the optimized server:

```sh
NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=phc_analytics_test bun run build
bun run start --port 3100
```

In another terminal:

```sh
uv run --with playwright python test/browser-analytics.py
```

Chromium must be installed for Playwright (`uv run --with playwright playwright install chromium`).
The mock remote configuration exercises PostHog’s ingestion endpoint and gzip compression.
The script intercepts all external hosts; it must never target production.
