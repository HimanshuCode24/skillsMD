import { AdminModerationPanel } from "@/components/AdminModerationPanel";

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12">
      <div className="mb-8 max-w-3xl">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-orange-600">Admin</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-950">Moderate submitted skills</h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          Review pending `SKILL.md` submissions before they become visible in the public directory.
        </p>
      </div>
      <AdminModerationPanel />
    </div>
  );
}

