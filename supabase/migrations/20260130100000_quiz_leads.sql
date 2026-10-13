CREATE TABLE "public"."quiz_leads" (
    "id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    "name" text NOT NULL,
    "email" text NOT NULL UNIQUE,
    "company" text,
    "score" integer NOT NULL,
    "total_questions" integer NOT NULL DEFAULT 10,
    "answers" jsonb NOT NULL,
    "topic_scores" jsonb NOT NULL,
    "leaderboard_opt_in" boolean NOT NULL DEFAULT false,
    "display_name" text,
    "event" text NOT NULL DEFAULT 'kubecon-eu-2026',
    "created_at" timestamptz DEFAULT now() NOT NULL,
    "updated_at" timestamptz DEFAULT now() NOT NULL
);

-- Indexes
CREATE INDEX quiz_leads_created_at_idx ON quiz_leads (created_at DESC);
CREATE INDEX quiz_leads_email_idx ON quiz_leads (email);
CREATE INDEX quiz_leads_leaderboard_idx ON quiz_leads (leaderboard_opt_in, score DESC)
    WHERE leaderboard_opt_in = true;
CREATE INDEX quiz_leads_event_idx ON quiz_leads (event);

-- Auto updated_at trigger
CREATE OR REPLACE FUNCTION update_quiz_leads_updated_at() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER quiz_leads_updated_at_trigger
    BEFORE UPDATE ON quiz_leads FOR EACH ROW
    EXECUTE FUNCTION update_quiz_leads_updated_at();

-- RLS
ALTER TABLE quiz_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anyone to insert quiz leads"
    ON quiz_leads FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anyone to read leaderboard"
    ON quiz_leads FOR SELECT TO anon
    USING (leaderboard_opt_in = true);

CREATE POLICY "Allow authenticated to view all"
    ON quiz_leads FOR SELECT TO authenticated USING (true);

GRANT ALL ON TABLE quiz_leads TO anon, authenticated, service_role;
