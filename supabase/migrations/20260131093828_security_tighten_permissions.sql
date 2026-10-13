-- Security remediation for findings #1, #2, #3, #6, #10
-- See: local/tasks/E-supabase-security-audit/report.md

-- ============================================================
-- Finding #1: Revoke excessive grants from anon and authenticated
-- Keep only the minimum permissions each role actually needs.
-- Admin access goes through service_role via the Supabase Dashboard.
-- ============================================================

-- contact_submissions: anon needs INSERT only
REVOKE ALL ON TABLE public.contact_submissions FROM anon;
GRANT INSERT ON TABLE public.contact_submissions TO anon;

REVOKE ALL ON TABLE public.contact_submissions FROM authenticated;

-- job_applications: anon needs INSERT only
REVOKE ALL ON TABLE public.job_applications FROM anon;
GRANT INSERT ON TABLE public.job_applications TO anon;

REVOKE ALL ON TABLE public.job_applications FROM authenticated;

-- waitlist: anon needs INSERT only
REVOKE ALL ON TABLE public.waitlist FROM anon;
GRANT INSERT ON TABLE public.waitlist TO anon;

REVOKE ALL ON TABLE public.waitlist FROM authenticated;

-- Also revoke sequence grant (only needed for INSERT, which is implicitly handled)
REVOKE ALL ON SEQUENCE public.waitlist_id_seq FROM anon;
GRANT USAGE ON SEQUENCE public.waitlist_id_seq TO anon;

REVOKE ALL ON SEQUENCE public.waitlist_id_seq FROM authenticated;

-- tulip_leads: anon needs INSERT only
REVOKE ALL ON TABLE public.tulip_leads FROM anon;
GRANT INSERT ON TABLE public.tulip_leads TO anon;

REVOKE ALL ON TABLE public.tulip_leads FROM authenticated;

-- rose_leads: anon needs INSERT only
REVOKE ALL ON TABLE public.rose_leads FROM anon;
GRANT INSERT ON TABLE public.rose_leads TO anon;

REVOKE ALL ON TABLE public.rose_leads FROM authenticated;

-- quiz_leads: anon needs INSERT + SELECT (for leaderboard view, granted below)
REVOKE ALL ON TABLE public.quiz_leads FROM anon;
GRANT INSERT ON TABLE public.quiz_leads TO anon;

REVOKE ALL ON TABLE public.quiz_leads FROM authenticated;

-- Fix default privileges to stop auto-granting ALL to anon/authenticated
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
    REVOKE ALL ON TABLES FROM anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
    REVOKE ALL ON TABLES FROM authenticated;

-- ============================================================
-- Finding #2: Fix waitlist SELECT policy (was applying to all roles)
-- ============================================================

DROP POLICY IF EXISTS "Only administrators can see waitlist" ON public.waitlist;

-- ============================================================
-- Finding #3: Drop unnecessary authenticated SELECT policies
-- Admin access works through service_role via the Dashboard.
-- ============================================================

DROP POLICY IF EXISTS "Allow authenticated users to view all contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only administrators can view applications" ON public.job_applications;
DROP POLICY IF EXISTS "Allow authenticated users to view all tulip leads" ON public.tulip_leads;
DROP POLICY IF EXISTS "Allow authenticated users to view all rose leads" ON public.rose_leads;
DROP POLICY IF EXISTS "Allow authenticated to view all" ON public.quiz_leads;

-- ============================================================
-- Finding #6: Replace direct anon SELECT on quiz_leads with a
-- view that exposes only leaderboard-safe columns.
-- ============================================================

DROP POLICY IF EXISTS "Allow anyone to read leaderboard" ON public.quiz_leads;

CREATE VIEW public.quiz_leaderboard AS
SELECT id, display_name, score, total_questions, event, created_at
FROM public.quiz_leads
WHERE leaderboard_opt_in = true;

ALTER VIEW public.quiz_leaderboard OWNER TO postgres;

GRANT SELECT ON public.quiz_leaderboard TO anon;

-- ============================================================
-- Finding #10: Revoke anon/authenticated access to views that
-- bypass RLS. Drop the test view entirely.
-- ============================================================

REVOKE ALL ON TABLE public.new_applicants FROM anon;
REVOKE ALL ON TABLE public.new_applicants FROM authenticated;

DROP VIEW IF EXISTS public.test_applicants;
