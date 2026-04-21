import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skill } from "@/lib/types";

type DashboardSkillListProps = {
  skills: Skill[];
};

function currency(value: number | null) {
  if (!value) {
    return "Free";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
}

export function DashboardSkillList({ skills }: DashboardSkillListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <div
              key={skill.id}
              className="flex flex-col gap-4 rounded-[1.25rem] border border-border/70 p-4 md:flex-row md:items-center md:justify-between"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Badge>{skill.category}</Badge>
                  <Badge className="bg-muted/80">{skill.difficulty}</Badge>
                  {skill.is_premium ? (
                    <Badge className="bg-primary/10 text-primary">
                      Premium {currency(skill.price_cents)}
                    </Badge>
                  ) : null}
                  {skill.featured ? (
                    <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                  ) : null}
                </div>
                <div>
                  <Link href={`/skills/${skill.id}`} className="text-lg font-semibold">
                    {skill.title}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {skill.views_count.toLocaleString("en-US")} views,{" "}
                    {skill.copies_count.toLocaleString("en-US")} copies,{" "}
                    {skill.downloads_count.toLocaleString("en-US")} downloads
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {skill.upvotes} upvotes
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[1.25rem] border border-border/70 p-4 text-sm leading-7 text-muted-foreground">
            No creator listings yet. Once you publish real skills or MCPs, they will
            show up here.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
