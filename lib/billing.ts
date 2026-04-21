import { BillingPlan } from "@/lib/types";

export const creatorProHref =
  process.env.NEXT_PUBLIC_STRIPE_CREATOR_PRO_URL || "/dashboard";

export const teamHref =
  process.env.NEXT_PUBLIC_STRIPE_TEAM_URL || "/dashboard";

export const skillPackHref =
  process.env.NEXT_PUBLIC_STRIPE_SKILL_PACK_URL || "/pricing?flow=skills";

export function getSkillPurchaseHref(skillId?: string) {
  const base =
    process.env.NEXT_PUBLIC_STRIPE_SKILL_CHECKOUT_BASE_URL ||
    "/pricing?flow=skills";

  if (!skillId) {
    return base;
  }

  return base.startsWith("http")
    ? `${base}${base.includes("?") ? "&" : "?"}skill=${skillId}`
    : `/pricing?flow=skills&skill=${skillId}`;
}

export const buyerPlans: BillingPlan[] = [
  {
    name: "Single Skill",
    eyebrow: "For Buyers",
    description: "Unlock one premium workflow when you know exactly what you need.",
    priceLabel: "From $19",
    ctaLabel: "Buy Premium Skill",
    href: getSkillPurchaseHref(),
    highlighted: true,
    features: [
      "One-time premium skill purchase",
      "Instant access to the full SKILL.md",
      "Best for targeted workflows",
      "Simple path from discovery to checkout",
    ],
    note: "Use this flow when a single premium skill solves the job.",
  },
  {
    name: "Skill Pack",
    eyebrow: "For Buyers",
    description: "Buy a curated bundle of premium skills for a specific role or workflow.",
    priceLabel: "$49+",
    ctaLabel: "Get Skill Pack",
    href: skillPackHref,
    features: [
      "Multiple related premium skills",
      "Lower cost per workflow",
      "Good for repeat users and teams",
      "Ideal for role-based toolkits",
    ],
    note: "Use this flow when you want a bundle instead of a single unlock.",
  },
];

export const creatorPlans: BillingPlan[] = [
  {
    name: "Free",
    eyebrow: "For Creators",
    description: "For browsing, copying public skills, and discovering creators.",
    priceLabel: "$0",
    ctaLabel: "Start Free",
    href: "/skills",
    features: [
      "Browse public skills",
      "Copy public SKILL.md files",
      "Submit community skills",
      "Basic profile presence",
    ],
  },
  {
    name: "Creator Pro",
    eyebrow: "For Creators",
    description: "For creators who want to sell premium skills and get discovered.",
    priceLabel: "$19/mo",
    ctaLabel: "Upgrade to Pro",
    href: creatorProHref,
    highlighted: true,
    features: [
      "Sell premium skills",
      "Featured placement eligibility",
      "Creator analytics dashboard",
      "Verified creator badge",
    ],
  },
  {
    name: "Team",
    eyebrow: "For Creators",
    description: "For companies building an internal library of reusable Claude workflows.",
    priceLabel: "$99/mo",
    ctaLabel: "Start Team Plan",
    href: teamHref,
    features: [
      "Private team directory",
      "Shared collections and governance",
      "Usage analytics and reporting",
      "Priority onboarding support",
    ],
  },
];

export const buyerFlow = [
  "Discover a premium skill from the directory or a direct creator link.",
  "Preview the structure and outcome before paying.",
  "Purchase one premium skill or a curated pack.",
  "Unlock the full workflow instantly and reuse it in your stack.",
];

export const creatorFlow = [
  "Upgrade to Creator Pro to unlock premium listings and creator analytics.",
  "Publish a premium skill with a public preview and price point.",
  "Route buyers through Stripe Payment Links or your own checkout layer.",
  "Track performance and revenue from the creator dashboard.",
];
