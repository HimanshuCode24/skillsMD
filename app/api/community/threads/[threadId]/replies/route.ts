import { NextResponse } from "next/server";

import { getSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: {
    threadId: string;
  };
};

export async function POST(request: Request, { params }: RouteContext) {
  const body = (await request.json()) as {
    author?: string;
    role?: string;
    body?: string;
  };

  if (!body.author || !body.role || !body.body) {
    return NextResponse.json(
      { message: "Missing required reply fields." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ mode: "demo" });
  }

  const { error } = await supabase.from("community_replies").insert({
    thread_id: params.threadId,
    author: body.author,
    role: body.role,
    body: body.body,
    likes_count: 0,
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ mode: "supabase" });
}
