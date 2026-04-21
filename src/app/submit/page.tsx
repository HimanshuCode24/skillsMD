import { SkillForm } from "@/components/SkillForm";

export default function SubmitPage() {
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-[0.85fr_1.15fr]">
      <div>
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-orange-600">Submit</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Share a reusable Claude Skill</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Add a complete `SKILL.md` with clear instructions, inputs, workflows, and output expectations. Keep it useful,
          portable, and easy for another Claude user to adopt.
        </p>
      </div>
      <SkillForm />
    </div>
  );
}

