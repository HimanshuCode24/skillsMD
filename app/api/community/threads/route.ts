import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(request: Request) {
  const body = (await request.json()) as {
    title?: string;
    slug?: string;
    author?: string;
    role?: string;
    summary?: string;
    body?: string;
    tags?: string[];
    type?: string;
  };

  if (!body.title || !body.author || !body.role || !body.summary || !body.body) {
    return NextResponse.json(
      { message: "Missing required thread fields." },
      { status: 400 },
    );
  }

  const slug = normalizeSlug(body.slug || body.title);
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ mode: "demo", slug });
  }

  const { error } = await supabase.from("community_threads").insert({
    title: body.title,
    slug,
    author: body.author,
    role: body.role,
    summary: body.summary,
    body: body.body,
    tags: body.tags ?? [],
    type: body.type ?? "discussion",
    replies_count: 0,
    likes_count: 0,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ mode: "supabase", slug });
}
