-- Add kind column to rose_leads to distinguish preview inquiries from open source applications
ALTER TABLE "public"."rose_leads"
    ADD COLUMN IF NOT EXISTS "kind" text NOT NULL DEFAULT 'preview';

COMMENT ON COLUMN "public"."rose_leads"."kind" IS 'Lead source: preview (research preview inquiry) or open_source (open source plan application)';

CREATE INDEX IF NOT EXISTS "rose_leads_kind_idx" ON "public"."rose_leads" USING btree ("kind");
