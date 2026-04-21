import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/CodeBlock";
import { UpvoteButton } from "@/components/UpvoteButton";
import { getSkill } from "@/lib/skills";

export default async function SkillDetailPage({ params }: { params: { id: string } }) {
  const skill = await getSkill(params.id);

  if (!skill) {
    notFound();
  }

  const creator = skill.users?.name ?? "Community contributor";

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <Link href="/skills" className="text-sm font-semibold text-orange-700">
        Back to skills
      </Link>
      <div className="mt-6 rounded-[2rem] border bg-white/78 p-6 shadow-soft backdrop-blur sm:p-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <Badge>{skill.category}</Badge>
              <Badge>{skill.difficulty}</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950">{skill.title}</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">{skill.description}</p>
            <p className="mt-4 text-sm text-slate-500">
              Created by{" "}
              {skill.users?.github_url ? (
                <a className="font-semibold text-orange-700" href={skill.users.github_url}>
                  {creator}
                </a>
              ) : (
                <span className="font-semibold">{creator}</span>
              )}
            </p>
          </div>
          <UpvoteButton skillId={skill.id} initialCount={skill.upvotes} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {skill.tags.map((tag) => (
            <Badge key={tag} className="font-mono">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <CodeBlock code={skill.skill_md} title={skill.title} />
      </div>
    </div>
  );
}

