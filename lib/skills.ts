import { DASHBOARD_SAMPLE_CREATOR_ID } from "@/lib/constants";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { CreatorDashboardSummary, Skill } from "@/lib/types";

type SkillRow = Omit<Skill, "creator_name" | "creator_github_url"> & {
  users?:
    | {
        name: string | null;
        github_url: string | null;
      }
    | {
        name: string | null;
        github_url: string | null;
      }[]
    | null;
};

function mapSkill(row: SkillRow): Skill {
  const user = Array.isArray(row.users) ? row.users[0] : row.users;

  return {
    ...row,
    creator_name: user?.name ?? null,
    creator_github_url: user?.github_url ?? null,
  };
}

export async function getSkills(filters?: {
  category?: string;
  difficulty?: string;
  type?: string;
  query?: string;
}): Promise<Skill[]> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  let query = supabase
    .from("skills")
    .select("*, users(name, github_url)")
    .order("upvotes", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters?.category && filters.category !== "All") {
    query = query.eq("category", filters.category);
  }

  if (filters?.difficulty && filters.difficulty !== "All") {
    query = query.eq("difficulty", filters.difficulty);
  }

  if (filters?.type && filters.type !== "All") {
    query = query.eq("content_type", filters.type);
  }

  if (filters?.query?.trim()) {
    query = query.or(
      `title.ilike.%${filters.query.trim()}%,description.ilike.%${filters.query.trim()}%`,
    );
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  return data.map((row) => mapSkill(row as SkillRow));
}

export async function getSkillById(id: string): Promise<Skill | null> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("skills")
    .select("*, users(name, github_url)")
    .eq("id", id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapSkill(data as SkillRow);
}

export async function getTrendingSkills(limit = 3) {
  return (await getSkills()).slice(0, limit);
}

export async function getFeaturedPremiumSkills(limit = 3) {
  return (await getSkills())
    .filter((skill) => skill.is_premium)
    .sort((a, b) => b.views_count - a.views_count)
    .slice(0, limit);
}

export async function getCreatorDashboardData(
  creatorId = DASHBOARD_SAMPLE_CREATOR_ID,
): Promise<{
  skills: Skill[];
  summary: CreatorDashboardSummary;
}> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    const skills: Skill[] = [];
    return {
      skills,
      summary: summarizeCreatorSkills(skills),
    };
  }

  const { data, error } = await supabase
    .from("skills")
    .select("*, users(name, github_url)")
    .eq("creator_id", creatorId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    const skills: Skill[] = [];
    return {
      skills,
      summary: summarizeCreatorSkills(skills),
    };
  }

  const skills = data.map((row) => mapSkill(row as SkillRow));

  return {
    skills,
    summary: summarizeCreatorSkills(skills),
  };
}

function summarizeCreatorSkills(skills: Skill[]): CreatorDashboardSummary {
  return skills.reduce<CreatorDashboardSummary>(
    (acc, skill) => {
      acc.totalSkills += 1;
      acc.premiumSkills += skill.is_premium ? 1 : 0;
      acc.totalUpvotes += skill.upvotes;
      acc.totalViews += skill.views_count;
      acc.totalCopies += skill.copies_count;
      acc.totalDownloads += skill.downloads_count;
      acc.estimatedRevenueCents += skill.is_premium
        ? Math.round(skill.price_cents ?? 0) * Math.max(1, Math.floor(skill.downloads_count / 8))
        : 0;
      acc.featuredSkills += skill.featured ? 1 : 0;
      return acc;
    },
    {
      totalSkills: 0,
      premiumSkills: 0,
      totalUpvotes: 0,
      totalViews: 0,
      totalCopies: 0,
      totalDownloads: 0,
      estimatedRevenueCents: 0,
      featuredSkills: 0,
    },
  );
}
