import type { Metadata } from "next";

import { SkillFilters } from "@/components/skill-filters";
import { SkillGrid } from "@/components/skill-grid";
import { getSkills } from "@/lib/skills";

export const metadata: Metadata = {
  title: "Browse Claude Skills and MCP Servers",
  description:
    "Search a directory of Claude skills, SKILL.md workflows, and MCP servers with install help for Claude Code, Cursor, and VS Code.",
  keywords: [
    "Claude skills directory",
    "MCP servers directory",
    "Claude Code MCP servers",
    "SKILL.md examples",
    "add MCP to Cursor",
    "add MCP to VS Code",
  ],
  alternates: {
    canonical: "/skills",
  },
};

type SkillsPageProps = {
  searchParams: {
    category?: string;
    difficulty?: string;
    type?: string;
    query?: string;
  };
};

export default async function SkillsPage({ searchParams }: SkillsPageProps) {
  const skills = await getSkills(searchParams);
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a Claude skill?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Claude skill is a reusable workflow stored in a SKILL.md file that helps Claude perform a specific task in a consistent way.",
        },
      },
      {
        "@type": "Question",
        name: "What is an MCP server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "An MCP server connects Claude Code, Cursor, or VS Code to external tools and data sources through the Model Context Protocol.",
        },
      },
      {
        "@type": "Question",
        name: "Can I add MCPs to Cursor and VS Code?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Directory entries can include install actions for Cursor, VS Code, and Claude Code so builders can add MCP servers directly.",
        },
      },
    ],
  };
  const activeTypeLabel =
    searchParams.type === "mcp"
      ? "MCPs"
      : searchParams.type === "skill"
        ? "skills"
        : "skills and MCPs";

  return (
    <main className="container py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <div className="space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Directory
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Browse reusable Claude skills and MCPs
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Explore structured SKILL.md workflows and MCP integrations built for
          debugging, shipping, research, design reviews, and everything in between.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="rounded-full border border-border/70 bg-white/70 px-4 py-2 font-medium text-foreground">
            {skills.length} results
          </span>
          <span>Showing {activeTypeLabel}</span>
          {searchParams.query ? (
            <span className="rounded-full border border-border/70 bg-white/70 px-4 py-2">
              Search: {searchParams.query}
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-10 space-y-8">
        <SkillFilters />
        <SkillGrid skills={skills} />
        <section className="rounded-[2rem] border border-border/70 bg-white/70 p-8">
          <div className="max-w-4xl space-y-5">
            <h2 className="text-3xl font-semibold tracking-tight">
              Find Claude skills, SKILL.md examples, and MCP servers faster
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              This directory is designed for long-tail discovery around Claude
              skills, `SKILL.md` workflow templates, and MCP server installs. It
              covers the questions developers usually have before adoption:
              what the workflow does, how to install it, and whether it works in
              Claude Code, Cursor, or VS Code.
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-border/70 bg-card p-5">
                <p className="font-medium">Install Claude skills</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Copy or download `SKILL.md` files and add them to your Claude environment.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-card p-5">
                <p className="font-medium">Add MCP to Cursor</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use direct install actions for Cursor-compatible MCP setups.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-border/70 bg-card p-5">
                <p className="font-medium">Add MCP to VS Code</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use VS Code install links and Claude Code commands from each MCP page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
