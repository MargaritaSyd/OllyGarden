-- Optional careers answers sent by the application form since PR #98.
-- Production received these columns by hand on 2026-10-13; IF NOT EXISTS makes this a no-op there.
ALTER TABLE "public"."job_applications"
    ADD COLUMN IF NOT EXISTS "cool_project" text,
    ADD COLUMN IF NOT EXISTS "motivation" text;
