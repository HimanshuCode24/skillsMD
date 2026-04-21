import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { SkillGrid } from "@/components/SkillGrid";
import { getSkills } from "@/lib/skills";

export default async function HomePage() {
  const trendingSkills = (await getSkills()).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:py-24">
      <section className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-white/70 px-4 py-2 text-sm font-semibold text-slate-600">
            <Sparkles className="h-4 w-4 text-orange-500" />
            Structured workflows, not prompt snippets
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-7xl">
            Discover plug-and-play Claude Skills
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-8 text-slate-600">
            Reusable AI workflows you can copy and use instantly. Browse curated `SKILL.md` files for research,
            engineering, writing, operations, and more.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/skills"
              className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Browse Skills
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/submit"
              className="inline-flex h-12 items-center justify-center rounded-full border bg-white/80 px-6 text-sm font-semibold text-slate-900 transition hover:bg-white"
            >
              Submit a skill
            </Link>
          </div>
        </div>
        <div className="rounded-[2rem] border bg-slate-950 p-5 text-white shadow-soft">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-orange-300">SKILL.md</p>
            <pre className="mt-5 whitespace-pre-wrap font-mono text-sm leading-7 text-slate-100">{`# PR Review Coach

Review code like a senior engineer.

## Priorities

1. Correctness bugs
2. Security and data-loss risks
3. Behavioral regressions
4. Missing tests

Lead with findings. Be constructive.`}</pre>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-orange-600">Trending</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Skills people are copying now</h2>
          </div>
          <Link href="/skills" className="hidden text-sm font-semibold text-orange-700 sm:inline">
            View all skills
          </Link>
        </div>
        <SkillGrid skills={trendingSkills} />
      </section>
    </div>
  );
}
