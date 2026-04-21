import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service role key is required for upvotes." }, { status: 503 });
  }

  const { data, error: fetchError } = await supabase.from("skills").select("upvotes").eq("id", params.id).single();
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

