import type { Metadata } from "next";

import { SkillForm } from "@/components/skill-form";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Submit a Claude Skill or MCP",
  description:
    "Submit a Claude skill, SKILL.md workflow, or MCP server listing for Claude Code, Cursor, and VS Code users.",
  alternates: {
    canonical: "/submit",
  },
};

export default function SubmitPage() {
  const configured = hasSupabaseEnv();

  return (
    <main className="container py-16">
      <div className="mb-10 max-w-3xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Submit
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Publish a new skill or MCP
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Add a production-ready SKILL.md or MCP config so other builders can
          install it, adapt it, and move faster.
        </p>
        {!configured ? (
          <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Supabase is not configured yet. You can still review the form UI, but
            submissions will stay disabled until `.env.local` is added.
          </p>
        ) : null}
      </div>
      <SkillForm configured={configured} />
    </main>
  );
}
