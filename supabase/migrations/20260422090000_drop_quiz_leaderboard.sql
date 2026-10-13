-- Drop the public leaderboard view. It was the only anon SELECT path into
-- quiz_leads, so removing it leaves anon with INSERT-only access and ensures
-- PII (names, emails, companies, display names) is not queryable outside
-- service_role.

DROP VIEW IF EXISTS public.quiz_leaderboard;

-- Defensive: assert anon/authenticated have no SELECT on quiz_leads.
REVOKE ALL ON TABLE public.quiz_leads FROM anon;
GRANT INSERT ON TABLE public.quiz_leads TO anon;

REVOKE ALL ON TABLE public.quiz_leads FROM authenticated;
