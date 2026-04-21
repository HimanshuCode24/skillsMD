import { categories, difficulties, sampleSkills } from "@/lib/sample-data";
import { getSupabaseClient } from "@/lib/supabase";
import type { Difficulty, Skill } from "@/lib/types";

export async function getSkills(filters?: { category?: string; difficulty?: string }) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return filterSkills(sampleSkills, filters);
  }

  let query = supabase
    .from("skills")
    .select("*, users(name, github_url)")
    .eq("status", "approved")
    .order("upvotes", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters?.category && categories.includes(filters.category)) {
    query = query.eq("category", filters.category);
  }

  if (filters?.difficulty && difficulties.includes(filters.difficulty as Difficulty)) {
    query = query.eq("difficulty", filters.difficulty);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Failed to fetch skills", error);
    return filterSkills(sampleSkills, filters);
  }

  return data as Skill[];
}

export async function getSkill(id: string) {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return sampleSkills.find((skill) => skill.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("skills")
    .select("*, users(name, github_url)")
    .eq("id", id)
    .eq("status", "approved")
    .single();

  if (error) {
    console.error("Failed to fetch skill", error);
    return sampleSkills.find((skill) => skill.id === id) ?? null;
  }

  return data as Skill;
}

function filterSkills(skills: Skill[], filters?: { category?: string; difficulty?: string }) {
  return skills.filter((skill) => {
    if (filters?.category && filters.category !== skill.category) return false;
    if (filters?.difficulty && filters.difficulty !== skill.difficulty) return false;
    return true;
  });
}
