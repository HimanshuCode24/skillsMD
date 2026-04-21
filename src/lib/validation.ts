import { z } from "zod";
import { categories, difficulties } from "@/lib/sample-data";

export const skillSubmissionSchema = z.object({
  title: z.string().trim().min(3).max(90),
  description: z.string().trim().min(20).max(320),
  skill_md: z.string().trim().min(80).max(20000),
  tags: z.array(z.string().trim().min(1).max(28)).min(1).max(8),
  category: z.enum(categories as [string, ...string[]]),
  difficulty: z.enum(difficulties)
});

