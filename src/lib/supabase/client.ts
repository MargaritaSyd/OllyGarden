import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

let client: SupabaseClient<Database> | undefined;

export function getSupabase() {
  if (!client) {
    const url = process.env.SUPABASE_URL ?? "";
    const key = process.env.SUPABASE_PUBLISHABLE_KEY ?? "";

    if (!url || !key) {
      throw new Error("Supabase is not configured.");
    }

    client = createClient<Database>(url, key);
  }
  return client;
}

export function supabaseSendEmail() {
  return process.env.SUPABASE_SEND_EMAIL === "true";
}
