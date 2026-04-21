import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">
        The page you requested does not exist
      </h1>
      <Link href="/" className={cn(buttonVariants(), "mt-8")}>
        Return home
      </Link>
    </main>
  );
}
