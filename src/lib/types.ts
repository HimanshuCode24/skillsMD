export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type UserProfile = {
  id: string;
  name: string | null;
  github_url: string | null;
  created_at: string;
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  skill_md: string;
  tags: string[];
  category: string;
  difficulty: Difficulty;
  creator_id: string | null;
  status?: "pending" | "approved" | "rejected";
  upvotes: number;
  created_at: string;
  users?: Pick<UserProfile, "name" | "github_url"> | null;
};

export type SkillInput = {
  title: string;
  description: string;
  skill_md: string;
  tags: string[];
  category: string;
  difficulty: Difficulty;
};
