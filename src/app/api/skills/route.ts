import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import { difficulties } from "@/lib/sample-data";
import type { SkillInput } from "@/lib/types";

export async function POST(request: Request) {
  const body = (await request.json()) as SkillInput;

  if (!body.title?.trim() || !body.description?.trim() || !body.skill_md?.trim()) {
    return NextResponse.json({ error: "Title, description, and SKILL.md are required." }, { status: 400 });
  }

  if (!difficulties.includes(body.difficulty)) {
    return NextResponse.json({ error: "Invalid difficulty." }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is required for submissions." }, { status: 503 });
  }

  const { error } = await supabase.from("skills").insert({
    title: body.title.trim(),
    description: body.description.trim(),
    skill_md: body.skill_md.trim(),
    tags: body.tags,
    category: body.category,
    difficulty: body.difficulty,
    creator_id: null
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

