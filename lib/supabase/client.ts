import { createClient } from "@supabase/supabase-js";

import { Database } from "@/lib/supabase/types";

let client:
  | ReturnType<typeof createClient<Database>>
  | null = null;

export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  if (!client) {
    client = createClient<Database>(url, anonKey);
  }

  return client;
}
