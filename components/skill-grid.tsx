import { SkillCard } from "@/components/skill-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skill } from "@/lib/types";

type SkillGridProps = {
  skills: Skill[];
};

export function SkillGrid({ skills }: SkillGridProps) {
  if (skills.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No matching results yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Try a different search or filter combination, or submit the first skill
            or MCP in this category to help other Claude users move faster.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}
