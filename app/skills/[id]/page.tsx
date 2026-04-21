import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock, PlugZap } from "lucide-react";

import { CodeBlock } from "@/components/code-block";
import { McpInstallPanel } from "@/components/mcp-install-panel";
import { SkillInstallPanel } from "@/components/skill-install-panel";
import { UpvoteButton } from "@/components/upvote-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSkillPurchaseHref } from "@/lib/billing";
import { getSkillById } from "@/lib/skills";
import { cn } from "@/lib/utils";

type SkillDetailPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params,
}: SkillDetailPageProps): Promise<Metadata> {
  const skill = await getSkillById(params.id);

  if (!skill) {
    return {
      title: "Not found",
    };
  }

  const descriptor = skill.content_type === "mcp" ? "MCP server" : "Claude skill";

  return {
    title: `${skill.title} ${descriptor === "MCP server" ? "| MCP Server" : "| Claude Skill"}`,
    description: `${skill.description} Browse install steps, source links, and reusable ${descriptor} details.`,
    alternates: {
      canonical: `/skills/${skill.id}`,
    },
    openGraph: {
      title: skill.title,
      description: skill.description,
      url: `/skills/${skill.id}`,
      type: "article",
    },
  };
}

export default async function SkillDetailPage({ params }: SkillDetailPageProps) {
  const skill = await getSkillById(params.id);

  if (!skill) {
    notFound();
  }

  const codeToRender = skill.is_premium ? skill.preview_md ?? skill.skill_md : skill.skill_md;
  const fileName = skill.content_type === "mcp" ? "mcp.json" : `${skill.title}.md`;

  return (
    <main className="container py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className={skill.content_type === "mcp" ? "bg-secondary text-secondary-foreground" : ""}>
              {skill.content_type === "mcp" ? (
                <>
                  <PlugZap className="mr-1 h-3 w-3" />
                  MCP
                </>
              ) : (
                "Skill"
              )}
            </Badge>
            <Badge>{skill.category}</Badge>
            <Badge className="bg-accent text-accent-foreground">
              {skill.difficulty}
            </Badge>
            {skill.is_premium ? (
              <Badge className="bg-primary/10 text-primary">
                <Lock className="mr-1 h-3 w-3" />
                Premium ${(skill.price_cents ?? 0) / 100}
              </Badge>
            ) : null}
            {skill.tags.map((tag) => (
              <Badge key={tag} className="bg-muted/80">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight">{skill.title}</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              {skill.description}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{skill.content_type === "mcp" ? "MCP details" : "Skill details"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              {skill.content_type === "skill" ? (
                <p>
                  <span className="font-medium text-foreground">Creator:</span>{" "}
                  {skill.creator_name ? (
                    skill.creator_github_url ? (
                      <a
                        href={skill.creator_github_url}
                        className="text-primary"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {skill.creator_name}
                      </a>
                    ) : (
                      skill.creator_name
                    )
                  ) : (
                    "Anonymous"
                  )}
                </p>
              ) : null}
              <p>
                <span className="font-medium text-foreground">Created:</span>{" "}
                {new Intl.DateTimeFormat("en", {
                  dateStyle: "medium",
                }).format(new Date(skill.created_at))}
              </p>
              <p>
                <span className="font-medium text-foreground">Engagement:</span>{" "}
                {skill.views_count.toLocaleString("en-US")} views,{" "}
                {skill.copies_count.toLocaleString("en-US")} copies,{" "}
                {skill.downloads_count.toLocaleString("en-US")} downloads
              </p>
              {skill.content_type === "mcp" && (skill.source_url || skill.docs_url) ? (
                <p>
                  <span className="font-medium text-foreground">Official links:</span>{" "}
                  {skill.source_url ? (
                    <a href={skill.source_url} className="text-primary" rel="noreferrer" target="_blank">
                      Source
                    </a>
                  ) : null}
                  {skill.source_url && skill.docs_url ? " · " : null}
                  {skill.docs_url ? (
                    <a href={skill.docs_url} className="text-primary" rel="noreferrer" target="_blank">
                      Docs
                    </a>
                  ) : null}
                </p>
              ) : null}
              <div className="pt-2">
                <UpvoteButton skillId={skill.id} initialCount={skill.upvotes} />
              </div>
            </CardContent>
          </Card>

          {skill.is_premium ? (
            <Card className="border-primary/20 bg-primary/[0.04]">
              <CardHeader>
                <CardTitle>Unlock the full skill</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  This premium skill shows a public preview in the directory and
                  reserves the full workflow for paying users.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={getSkillPurchaseHref(skill.id)}
                    className={cn(buttonVariants())}
                  >
                    Buy this skill
                  </Link>
                  <Link
                    href={`/pricing?flow=skills&skill=${skill.id}`}
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    View buyer pricing
                  </Link>
                </div>
                <p className="text-xs text-muted-foreground">
                  Buyers purchase premium skills directly. Creators upgrade separately
                  to list and sell premium workflows.
                </p>
                <Link href="/pricing?flow=creators" className="text-sm font-medium text-primary">
                  Want to sell your own premium skills?
                </Link>
              </CardContent>
            </Card>
          ) : null}
        </div>

        <div className="space-y-6">
          <CodeBlock
            code={codeToRender}
            contentType={skill.content_type}
            fileName={fileName}
          />
          {skill.content_type === "mcp" ? (
            <McpInstallPanel
              docsUrl={skill.docs_url}
              sourceUrl={skill.source_url}
              skillMd={skill.skill_md}
              title={skill.title}
            />
          ) : (
            <SkillInstallPanel
              title={skill.title}
              skillMd={skill.skill_md}
              contentType={skill.content_type}
              isLocked={skill.is_premium}
            />
          )}
        </div>
      </div>
    </main>
  );
}
