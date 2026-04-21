import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SkillNotFound() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Skill not found
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        This skill is missing from the directory
      </h1>
      <p className="mt-4 max-w-lg text-lg text-muted-foreground">
        It may have been removed, or your local database has not been seeded yet.
      </p>
      <Link href="/skills" className={cn(buttonVariants(), "mt-8")}>
        Back to directory
      </Link>
    </main>
  );
}
