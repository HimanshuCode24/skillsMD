import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Skill } from "@/lib/types";

export function SkillCard({ skill }: { skill: Skill }) {
  return (
    <Link href={`/skills/${skill.id}`} className="group block h-full">
      <Card className="flex h-full flex-col transition duration-200 group-hover:-translate-y-1 group-hover:border-orange-300">
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <Badge>{skill.category}</Badge>
            <span className="text-xs font-semibold text-slate-500">{skill.difficulty}</span>
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-slate-950">{skill.title}</h3>
          <p className="line-clamp-3 text-sm leading-6 text-slate-600">{skill.description}</p>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex flex-wrap gap-2">
            {skill.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} className="font-mono">
                #{tag}
              </Badge>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
            <span>{skill.upvotes} upvotes</span>
            <span className="font-semibold text-orange-600">View skill</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

