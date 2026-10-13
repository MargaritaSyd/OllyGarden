-- Create rose_leads table to store Rose research preview inquiries
CREATE TABLE IF NOT EXISTS "public"."rose_leads" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "company" "text",
    "notes" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL
);

-- Add comment describing the table
COMMENT ON TABLE "public"."rose_leads" IS 'Stores Rose research preview inquiries from the landing page, capturing customer information and instrumentation needs';

-- Add comments for columns
COMMENT ON COLUMN "public"."rose_leads"."notes" IS 'Details about instrumentation needs, languages, services, and challenges';

-- Set table owner
ALTER TABLE "public"."rose_leads" OWNER TO "postgres";

-- Add primary key constraint
ALTER TABLE ONLY "public"."rose_leads"
    ADD CONSTRAINT "rose_leads_pkey" PRIMARY KEY ("id");

-- Create indexes for common query patterns
CREATE INDEX "rose_leads_created_at_idx" ON "public"."rose_leads" USING btree ("created_at" DESC);
CREATE INDEX "rose_leads_email_idx" ON "public"."rose_leads" USING btree ("email");

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION "public"."update_rose_leads_updated_at"()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at on row updates
CREATE TRIGGER "rose_leads_updated_at_trigger"
    BEFORE UPDATE ON "public"."rose_leads"
    FOR EACH ROW
    EXECUTE FUNCTION "public"."update_rose_leads_updated_at"();

-- Enable Row Level Security
ALTER TABLE "public"."rose_leads" ENABLE ROW LEVEL SECURITY;

-- Create RLS policy to allow anonymous users to insert leads (public form)
CREATE POLICY "Allow anyone to insert rose leads"
    ON "public"."rose_leads"
    FOR INSERT
    TO "anon"
    WITH CHECK (true);

-- Create RLS policy to allow authenticated users to view all leads
CREATE POLICY "Allow authenticated users to view all rose leads"
    ON "public"."rose_leads"
    FOR SELECT
    TO "authenticated"
    USING (true);

-- Grant necessary permissions
GRANT ALL ON TABLE "public"."rose_leads" TO "anon";
GRANT ALL ON TABLE "public"."rose_leads" TO "authenticated";
GRANT ALL ON TABLE "public"."rose_leads" TO "service_role";
