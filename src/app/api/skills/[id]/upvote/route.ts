import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request, { params }: { params: { id: string } }) {
  const ip = getClientIp(request);
  const limit = rateLimit(`upvote:${ip}:${params.id}`, { limit: 1, windowMs: 24 * 60 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "You have already upvoted this skill recently." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 86400) } }
    );
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is required for upvotes." }, { status: 503 });
  }

  const { data, error: fetchError } = await supabase
    .from("skills")
    .select("upvotes")
    .eq("id", params.id)
    .eq("status", "approved")
    .single();
  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 404 });
  }

  const { data: updated, error } = await supabase
    .from("skills")
    .update({ upvotes: Number(data.upvotes ?? 0) + 1 })
    .eq("id", params.id)
    .select("upvotes")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ upvotes: updated.upvotes });
}
