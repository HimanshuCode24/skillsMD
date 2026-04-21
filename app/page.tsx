import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Lock, Sparkles } from "lucide-react";

import { SkillCard } from "@/components/skill-card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getFeaturedPremiumSkills, getTrendingSkills } from "@/lib/skills";
import { getSiteUrl, primaryKeywords } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Claude Skills Directory and MCP Servers",
  description:
    "Browse Claude skills, SKILL.md templates, and MCP servers with install guides for Claude Code, Cursor, and VS Code.",
  keywords: [...primaryKeywords, "Claude Code skills", "Cursor MCP", "VS Code MCP"],
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  const trendingSkills = await getTrendingSkills(3);
  const premiumSkills = await getFeaturedPremiumSkills(3);
  const siteUrl = getSiteUrl();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Claude Skills Directory",
    url: siteUrl,
    description:
      "Browse Claude skills, SKILL.md templates, and MCP servers with install guides for Claude Code, Cursor, and VS Code.",
    keywords: primaryKeywords.join(", "),
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <section className="container py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-8">
            <Badge className="w-fit bg-secondary text-secondary-foreground">
              Structured workflows for Claude
            </Badge>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
                Discover plug-and-play Claude skills and MCPs
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                Reusable AI workflows you can copy and use instantly. Explore
                production-ready SKILL.md files and MCP integrations for
                engineering, research, design, and daily developer work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/skills" className={cn(buttonVariants({ size: "lg" }))}>
                Browse Directory
              </Link>
              <Link
                href="/submit"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
              >
                Submit Your Skill
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-border/70 bg-white/70 p-6 shadow-glow backdrop-blur">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-slate-50">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm text-slate-300">SKILL.md</p>
                  <p className="mt-1 text-xl font-semibold">
                    Claude Skill Packager
                  </p>
                </div>
                <Sparkles className="h-5 w-5 text-amber-300" />
              </div>
              <pre className="overflow-x-auto text-sm leading-7 text-slate-200">
                <code>{`## Goal
Turn repeated prompting into a reusable skill.

## Include
- When to use this skill
- Inputs required
- Step-by-step workflow
- Output format
- Guardrails`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Trending skills
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              What developers are copying this week
            </h2>
          </div>
          <Link href="/skills" className="text-sm font-medium text-primary">
            View all skills
          </Link>
        </div>

        {trendingSkills.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {trendingSkills.map((skill) => (
              <SkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-border/70 bg-white/70 p-8 text-sm leading-7 text-muted-foreground">
            No published skills yet. Submit the first live listing to start the directory.
          </div>
        )}
      </section>

      <section className="container pb-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Monetize
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              Premium skills creators can actually sell
            </h2>
          </div>
          <Link href="/pricing" className="text-sm font-medium text-primary">
            See pricing
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {premiumSkills.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {premiumSkills.slice(0, 2).map((skill) => (
                <SkillCard key={skill.id} skill={skill} />
              ))}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-border/70 bg-white/70 p-8 text-sm leading-7 text-muted-foreground">
              Premium listings will appear here once creators publish them.
            </div>
          )}

          <div className="rounded-[2rem] border border-primary/20 bg-primary/[0.04] p-8">
            <Badge className="w-fit bg-primary/10 text-primary">
              <Lock className="mr-1 h-3 w-3" />
              Creator Pro
            </Badge>
            <h3 className="mt-5 text-3xl font-semibold tracking-tight">
              Turn repeatable Claude workflows into a product
            </h3>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Publish premium skills, earn from downloads, unlock featured placement,
              and track what people actually copy.
            </p>
            <Link
              href="/pricing"
              className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
            >
              View Plans
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="container pb-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] border border-secondary/50 bg-secondary/40 p-8">
            <Badge className="w-fit bg-white text-foreground">Community</Badge>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">
              Meet the people actually building Claude skills
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Join discussions about packaging, pricing, versioning, and what makes
              a skill worth copying. The new community tab gives builders a place to
              learn from each other instead of shipping in isolation.
            </p>
            <Link
              href="/community"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "mt-8 inline-flex")}
            >
              Explore Community
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6">
              <p className="text-sm font-semibold text-muted-foreground">Build Logs</p>
              <p className="mt-3 text-xl font-semibold">
                Share what shipped, what broke, and what converted
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6">
              <p className="text-sm font-semibold text-muted-foreground">Feedback Swaps</p>
              <p className="mt-3 text-xl font-semibold">
                Get direct critique on draft SKILL.md files before publishing
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border/70 bg-card p-6 md:col-span-2">
              <p className="text-sm font-semibold text-muted-foreground">Monetization</p>
              <p className="mt-3 text-xl font-semibold">
                Compare premium pricing, preview gating, and creator dashboard tactics
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
