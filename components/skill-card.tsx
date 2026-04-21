import Link from "next/link";
import { ArrowUpRight, Lock, PlugZap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skill } from "@/lib/types";

type SkillCardProps = {
  skill: Skill;
};

export function SkillCard({ skill }: SkillCardProps) {
  const viewsLabel = `${Intl.NumberFormat("en-US", { notation: "compact" }).format(
    skill.views_count,
  )} views`;
  const upvotesLabel = `${Intl.NumberFormat("en-US", { notation: "compact" }).format(
    skill.upvotes,
  )} upvotes`;

  return (
    <Link href={`/skills/${skill.id}`} className="group block h-full">
      <Card className="h-full border-border/70 bg-white/80 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-primary/30 group-hover:shadow-lg">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
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
                    ${((skill.price_cents ?? 0) / 100).toFixed(0)}
                  </Badge>
                ) : null}
              </div>
              <CardTitle className="text-xl tracking-tight">{skill.title}</CardTitle>
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <CardDescription className="line-clamp-3 text-sm leading-6">
            {skill.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {skill.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} className="bg-muted/80">
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4 text-sm">
            <div className="min-w-0">
              {skill.content_type === "mcp" ? (
                <>
                  <p className="truncate font-medium text-foreground">Official MCP</p>
                  <p className="text-muted-foreground">Integration</p>
                </>
              ) : (
                <>
                  <p className="truncate font-medium text-foreground">
                    {skill.creator_name ?? "Anonymous"}
                  </p>
                  <p className="text-muted-foreground">Creator</p>
                </>
              )}
            </div>
            <div className="text-right font-medium text-muted-foreground">
              <p>{upvotesLabel}</p>
              <p>{viewsLabel}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
