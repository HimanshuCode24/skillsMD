import { NextResponse } from "next/server";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { skillSubmissionSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`submit:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });

  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter ?? 3600) } }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = skillSubmissionSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid skill submission.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is required for submissions." }, { status: 503 });
  }

  const body = parsed.data;
  const { error } = await supabase.from("skills").insert({
    title: body.title,
    description: body.description,
    skill_md: body.skill_md,
    tags: body.tags,
    category: body.category,
    difficulty: body.difficulty,
    creator_id: null,
    status: "pending"
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status: "pending" });
}
