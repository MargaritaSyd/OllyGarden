#!/usr/bin/env bash
# Fails a Cloudflare build before it starts when a repository variable it needs is unset: an
# unset NEXT_PUBLIC_SITE_URL would build localhost canonical URLs, an unset PostHog token would
# silently drop analytics, and an unset Supabase value would break every form.
set -euo pipefail
missing=""
for name in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN NEXT_PUBLIC_POSTHOG_HOST \
  CLOUDFLARE_ACCOUNT_ID SUPABASE_URL SUPABASE_PUBLISHABLE_KEY SUPABASE_SEND_EMAIL; do
  [ -n "${!name:-}" ] || missing="$missing $name"
done
if [ -n "$missing" ]; then
  echo "::error::Missing repository variables:$missing."
  exit 1
fi
# The Worker (src/edge/responses.ts) serves this origin only.
if [ "$NEXT_PUBLIC_SITE_URL" != "https://ollygarden.com" ]; then
  echo "::error::NEXT_PUBLIC_SITE_URL is $NEXT_PUBLIC_SITE_URL; the Worker serves https://ollygarden.com."
  exit 1
fi
