import { getSupabaseServerClient } from "@/lib/supabase/server";

export type CommunityThreadType = "discussion" | "showcase" | "feedback";

export type CommunityChannel = {
  name: string;
  description: string;
  threads: string;
};

export type CommunityThread = {
  id: string;
  title: string;
  slug: string;
  author: string;
  role: string;
  summary: string;
  body: string;
  tags: string[];
  replies_count: number;
  likes_count: number;
  activity: string;
  type: CommunityThreadType;
  created_at: string;
};

export type CommunityReply = {
  id: string;
  thread_id: string;
  author: string;
  role: string;
  body: string;
  likes_count: number;
  created_at: string;
};

type CommunityThreadRow = {
  id: string;
  title: string;
  slug: string;
  author: string;
  role: string;
  summary: string;
  body: string;
  tags: string[];
  replies_count: number;
  likes_count: number;
  type: CommunityThreadType;
  created_at: string;
};

type CommunityReplyRow = {
  id: string;
  thread_id: string;
  author: string;
  role: string;
  body: string;
  likes_count: number;
  created_at: string;
};

export const communityChannels: CommunityChannel[] = [
  {
    name: "Build Logs",
    description: "Share skills in progress, launch notes, and lessons learned.",
    threads: "142 threads",
  },
  {
    name: "Feedback Swaps",
    description: "Post a draft SKILL.md and get sharp feedback from other builders.",
    threads: "89 threads",
  },
  {
    name: "Monetization",
    description: "Talk pricing, premium packs, creator funnels, and conversion.",
    threads: "54 threads",
  },
];

function threadActivityLabel(createdAt: string) {
  const hours = Math.max(
    0,
    Math.floor((Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60)),
  );

  if (hours < 1) {
    return "Active just now";
  }

  if (hours === 1) {
    return "Active 1h ago";
  }

  return `Active ${hours}h ago`;
}

function mapThread(row: CommunityThreadRow): CommunityThread {
  return {
    ...row,
    activity: threadActivityLabel(row.created_at),
  };
}

export async function getCommunityThreads(): Promise<CommunityThread[]> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("community_threads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as CommunityThreadRow[]).map(mapThread);
}

export async function getCommunityThreadBySlug(
  slug: string,
): Promise<CommunityThread | null> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("community_threads")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return null;
  }

  return mapThread(data as CommunityThreadRow);
}

export async function getCommunityReplies(threadId: string): Promise<CommunityReply[]> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("community_replies")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data as CommunityReply[];
}

export function getCommunityThreadFallbacks() {
  return [];
}
