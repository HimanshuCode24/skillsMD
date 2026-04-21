import { SkillCard } from "@/components/SkillCard";
import type { Skill } from "@/lib/types";

export function SkillGrid({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed bg-white/60 p-12 text-center">
        <h3 className="text-lg font-semibold">No skills found</h3>
        <p className="mt-2 text-sm text-slate-600">Try a different filter or submit the first skill in this category.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
}

