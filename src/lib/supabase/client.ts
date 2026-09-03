import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.SUPABASE_URL ?? "";
const supabasePublishableKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

/** Invoke Edge Functions only when this is explicitly enabled. */
export const supabaseSendEmail = process.env.SUPABASE_SEND_EMAIL === "true";

let client: SupabaseClient<Database> | undefined;

export function getSupabase() {
  if (!supabaseConfigured) {
    throw new Error("Supabase is not configured.");
  }
  if (!client) {
    client = createClient<Database>(supabaseUrl, supabasePublishableKey);
  }
  return client;
}
