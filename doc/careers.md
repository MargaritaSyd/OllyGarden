# Careers open positions

Open roles on `/careers` are **data-driven**. Add, hide, or remove a card by editing the array in [`src/lib/careers.ts`](../src/lib/careers.ts). No component changes are required for a new listing.

## Files

| File | Role |
| --- | --- |
| [`src/lib/careers.ts`](../src/lib/careers.ts) | Copy + `careersOpenPositions` + shared UI labels |
| [`src/components/careers-join.tsx`](../src/components/careers-join.tsx) | Section: maps active roles, empty state, open-application card |
| [`src/components/careers-job-card.tsx`](../src/components/careers-job-card.tsx) | Expandable job card (View More / View Less) |
| [`src/components/careers-apply-cta.tsx`](../src/components/careers-apply-cta.tsx) | Apply modal → Server Action |

## Position shape

```ts
type CareersPosition = {
  id: string;              // slug → job_applications.job_id
  active: boolean;         // false = keep copy, hide on /careers
  title: string;           // → job_applications.job_title
  location: string;        // e.g. "United States"
  time: "Full-time" | "Part-time";
  description: string;     // always-visible lede
  lookingFor: string[];
  youWillDo: string[];
  bonusPoints: string[];
};
```

Shared chrome (Apply Now, View More/Less, section titles) lives in `careersPositionUi` in the same file — not per role.

## Ops

| Action | Change |
| --- | --- |
| Publish a role | Push an object with `active: true` into `careersOpenPositions` |
| Hide a role (keep copy) | Set `active: false` |
| Delete forever | Remove the object from the array |
| No visible roles | Empty filtered list → show `careersJoin.empty`; open-application card always remains |

`CareersJoin` renders `getActiveCareersPositions()` (`filter(p => p.active)`), then the open-application card.

`id` must be a stable slug (kebab-case). It is what Supabase stores as `job_id` when someone applies to that card.

## Apply payloads

All careers CTAs use the same modal and [`submitJobApplication`](../src/lib/supabase/submissions.ts). See also [`supabase.md`](supabase.md).

**Apply Now** on a listed role uses that role’s `id` / `title`:

```json
{
  "job_id": "founding-enterprise-account-executive",
  "job_title": "Founding Enterprise Account Executive",
  "full_name": "…",
  "email": "…",
  "linkedin_url": null,
  "github_url": null,
  "cool_project": null,
  "motivation": null
}
```

Edge Function body when `SUPABASE_SEND_EMAIL=true`:

```json
{
  "jobId": "founding-enterprise-account-executive",
  "jobTitle": "Founding Enterprise Account Executive",
  "applicant": {
    "fullName": "…",
    "email": "…",
    "linkedinUrl": null,
    "githubUrl": null,
    "coolProject": null,
    "motivation": null
  }
}
```

**Submit Open Application** / interview **Submit Application** (no role context) use the sentinel:

- `job_id` / `jobId`: `open-application`
- `job_title` / `jobTitle`: `Open Application`

The two optional textareas ask “Tell us something cool you built:” and “Why do you want to
become an OllyGardener?”. Answers are trimmed, preserve internal line breaks, and become `null`
when blank. Both listed-role and open applications use these fields. Their columns come from a
migration in `supabase/migrations/`, and the hiring notification email shows them, escaped. See
[`supabase.md`](supabase.md).

## Role pages

A role with its own page under `/careers/<id>` is a `CareersRole` in `src/lib/careers.ts`: the card fields plus `datePosted`, `employmentType`, an optional `applicantCountry`, the hero `locationLine`, `intro`, `outcomes`, and the interview and closing copy. The route file only passes the role to `CareersRolePage` and `careersRoleMetadata` from `src/components/careers-role-page.tsx`, which render the page, `JobPosting` JSON-LD, and the `job_posting_viewed` event.

Adding a role page also means a sitemap entry, a Markdown entry in `src/lib/agent-content.ts`, an Open Graph card with its rendered PNG, and the route in the canonical-content tests (`test/agent-readiness.test.mjs`, `test/build/rss.test.mjs`).
