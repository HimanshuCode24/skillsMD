export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type ContentType = "skill" | "mcp";

export type Skill = {
  id: string;
  title: string;
  description: string;
  content_type: ContentType;
  skill_md: string;
  source_url?: string | null;
  docs_url?: string | null;
  preview_md?: string | null;
  tags: string[];
  category: string;
  difficulty: Difficulty;
  creator_id: string | null;
  creator_name?: string | null;
  creator_github_url?: string | null;
  upvotes: number;
  is_premium: boolean;
  price_cents: number | null;
  featured: boolean;
  copies_count: number;
  downloads_count: number;
  views_count: number;
  created_at: string;
};

export type SkillFormValues = {
  contentType: ContentType;
  title: string;
  description: string;
  skillMd: string;
  tags: string;
  category: string;
  difficulty: Difficulty;
};

export type BillingPlan = {
  name: string;
  description: string;
  priceLabel: string;
  ctaLabel: string;
  href: string;
  eyebrow?: string;
  note?: string;
  highlighted?: boolean;
  features: string[];
};

export type CreatorDashboardSummary = {
  totalSkills: number;
  premiumSkills: number;
  totalUpvotes: number;
  totalViews: number;
  totalCopies: number;
  totalDownloads: number;
  estimatedRevenueCents: number;
  featuredSkills: number;
};
