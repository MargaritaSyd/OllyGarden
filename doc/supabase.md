# Supabase

Contact and careers forms submit through Next.js Server Actions to the OllyGarden Supabase project. The browser never receives the Supabase URL or key. Never put a secret / `service_role` key in this repo.

Env names are server-only (`SUPABASE_*`, no `NEXT_PUBLIC_`).

## Environment

Copy [`.env.example`](../.env.example) and set:

| Variable | Role |
| --- | --- |
| `SUPABASE_URL` | Project URL (`https://….supabase.co`) |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable / anon key — stays on the server |
| `SUPABASE_SEND_EMAIL` | `true` to invoke Edge Functions after insert. Anything else (`false`, unset) **inserts only** — no mail |

On Vercel, add these as regular (or Sensitive) env vars. Do not use the `NEXT_PUBLIC_` prefix.

Restart `next dev` after changing these.

## Flows

```mermaid
flowchart LR
  Contact["/contact"] --> ActionC["Server Action"]
  ActionC --> InsertC["insert contact_submissions"]
  InsertC --> GateC{"SEND_EMAIL true?"}
  GateC -->|yes| FnC["send-contact-email"]
  Careers["/careers both CTAs"] --> ActionJ["Server Action"]
  ActionJ --> InsertJ["insert job_applications"]
  InsertJ --> GateJ{"SEND_EMAIL true?"}
  GateJ -->|yes| FnJ["send-application-email"]
```

**Contact** ([`src/components/contact-form.tsx`](../src/components/contact-form.tsx)): name, work email, optional message → Server Action → `contact_submissions` → optional `send-contact-email`.

**Careers** ([`src/components/careers-apply-cta.tsx`](../src/components/careers-apply-cta.tsx)): **Submit Open Application** and **Submit Application** share one modal and one submit path. Fields: full name, email, optional LinkedIn and GitHub → Server Action → `job_applications` → optional `send-application-email`.

`job_applications.job_id` is NOT NULL in Postgres even though this site has no job listings. Both CTAs send the sentinel `job_id: "open-application"` and `job_title: "Open Application"` ([`src/lib/supabase/submissions.ts`](../src/lib/supabase/submissions.ts)). If that column is a UUID, the insert will fail until product provides a real id.

There is no message field on job applications in the current schema.

## Client

| File | What |
| --- | --- |
| [`src/lib/supabase/client.ts`](../src/lib/supabase/client.ts) | Server-only `createClient`; skips init when URL/key are missing |
| [`src/lib/supabase/submissions.ts`](../src/lib/supabase/submissions.ts) | Server Actions: insert + gated `functions.invoke` |
| [`src/lib/supabase/types.ts`](../src/lib/supabase/types.ts) | Hand-written `Database` type from the previous app’s insert payloads, not `supabase gen types` |

Package: `@supabase/supabase-js` only. No `@supabase/ssr` (no sessions).

## Local test without mail

1. Set URL + publishable key.
2. Leave `SUPABASE_SEND_EMAIL` as `false`.
3. Submit `/contact` and the careers modal.
4. Check Table Editor: `contact_submissions` and `job_applications`.

When you want the first real notification, set `SUPABASE_SEND_EMAIL=true` and restart. That flag only skips **our** `functions.invoke`. A database trigger or webhook on insert would still fire.

## RLS

Inserts still use the publishable key (`anon`) on the server. Keep RLS tight: `anon` may insert, and must not `SELECT` other people’s rows. Policy changes live in the Supabase project, not in this repo.
