import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: {
    id: string;
  };
};

export async function POST(_: Request, { params }: RouteContext) {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase is not configured for this environment" },
      { status: 500 },
    );
  }

  const { data: existing, error: fetchError } = await supabase
    .from("skills")
    .select("upvotes")
    .eq("id", params.id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }

  const nextUpvotes = existing.upvotes + 1;
  const { error: updateError } = await supabase
    .from("skills")
    .update({ upvotes: nextUpvotes })
    .eq("id", params.id);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ upvotes: nextUpvotes });
}
