-- Create tulip_leads table to store Tulip support inquiries
CREATE TABLE IF NOT EXISTS "public"."tulip_leads" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "company" "text",
    "support_tier" "text" NOT NULL,
    "notes" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

-- Add comment describing the table
COMMENT ON TABLE "public"."tulip_leads" IS 'Stores Tulip support inquiries from the landing page, capturing customer information and support tier preferences';

-- Add comments for columns
COMMENT ON COLUMN "public"."tulip_leads"."support_tier" IS 'Support tier preference: either "standard" or "enterprise"';
COMMENT ON COLUMN "public"."tulip_leads"."notes" IS 'Deployment notes and specific requirements provided by the customer';

-- Set table owner
ALTER TABLE "public"."tulip_leads" OWNER TO "postgres";

-- Add primary key constraint
ALTER TABLE ONLY "public"."tulip_leads"
    ADD CONSTRAINT "tulip_leads_pkey" PRIMARY KEY ("id");

-- Add check constraint for support_tier values
ALTER TABLE "public"."tulip_leads"
    ADD CONSTRAINT "tulip_leads_support_tier_check"
    CHECK ("support_tier" IN ('standard', 'enterprise'));

-- Create indexes for common query patterns
CREATE INDEX "tulip_leads_created_at_idx" ON "public"."tulip_leads" USING btree ("created_at" DESC);
CREATE INDEX "tulip_leads_support_tier_idx" ON "public"."tulip_leads" USING btree ("support_tier");
CREATE INDEX "tulip_leads_email_idx" ON "public"."tulip_leads" USING btree ("email");

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION "public"."update_tulip_leads_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on row updates
CREATE TRIGGER "tulip_leads_updated_at_trigger"
    BEFORE UPDATE ON "public"."tulip_leads"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_tulip_leads_updated_at"();

-- Enable Row Level Security
ALTER TABLE "public"."tulip_leads" ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow anonymous users to insert leads (public form)
CREATE POLICY "Allow anyone to insert tulip leads"
    ON "public"."tulip_leads"
    FOR INSERT
    TO "anon"
    WITH CHECK (true);

-- Create RLS policy to allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view all tulip leads"
    ON "public"."tulip_leads"
    FOR SELECT
    TO "authenticated"
    USING (true);

-- Grant necessary permissions
GRANT ALL ON TABLE "public"."tulip_leads" TO "anon";
GRANT ALL ON TABLE "public"."tulip_leads" TO "authenticated";
GRANT ALL ON TABLE "public"."tulip_leads" TO "service_role";
