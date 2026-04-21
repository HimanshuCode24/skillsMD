import Link from "next/link";
import { SkillGrid } from "@/components/SkillGrid";
import { Button } from "@/components/ui/button";
import { categories, difficulties } from "@/lib/sample-data";
import { getSkills } from "@/lib/skills";

export default async function SkillsPage({
  searchParams
}: {
  searchParams: { category?: string; difficulty?: string };
}) {
  const skills = await getSkills(searchParams);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-orange-600">Directory</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Browse Claude Skills</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Find reusable `SKILL.md` workflows and drop them into your Claude setup.
          </p>
        </div>
        <Link href="/submit">
          <Button>Submit skill</Button>
        </Link>
      </div>

      <form className="mb-8 grid gap-3 rounded-3xl border bg-white/72 p-4 shadow-soft sm:grid-cols-[1fr_1fr_auto]">
        <select name="category" defaultValue={searchParams.category ?? ""} className="h-11 rounded-2xl border bg-white px-4 text-sm">
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          name="difficulty"
          defaultValue={searchParams.difficulty ?? ""}
          className="h-11 rounded-2xl border bg-white px-4 text-sm"
        >
          <option value="">All difficulties</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
        <Button type="submit">Filter</Button>
      </form>

      <SkillGrid skills={skills} />
    </div>
  );
}

