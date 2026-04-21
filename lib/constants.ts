import { Difficulty } from "@/lib/types";

export const CATEGORIES = [
  "Debugging",
  "Frontend",
  "Backend",
  "DevOps",
  "Research",
  "Productivity",
];

export const DIFFICULTIES: Difficulty[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const CONTENT_TYPES = [
  { value: "skill", label: "Claude Skill" },
  { value: "mcp", label: "MCP" },
] as const;

export const DASHBOARD_SAMPLE_CREATOR_ID =
  "00000000-0000-0000-0000-000000000006";
