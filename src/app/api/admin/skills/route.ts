import { NextResponse } from "next/server";
import { isSkillStatus, verifyAdminRequest } from "@/lib/admin";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const authError = verifyAdminRequest(request);
  if (authError) return authError;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is required for moderation." }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") ?? "pending";

  if (!isSkillStatus(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("skills")
    .select("*, users(name, github_url)")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ skills: data });
}

export async function PATCH(request: Request) {
  const authError = verifyAdminRequest(request);
  if (authError) return authError;

  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is required for moderation." }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const id = body?.id;
  const status = body?.status;

  if (typeof id !== "string" || !isSkillStatus(status)) {
    return NextResponse.json({ error: "Skill id and valid status are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("skills")
    .update({ status })
    .eq("id", id)
    .select("*, users(name, github_url)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ skill: data });
}

