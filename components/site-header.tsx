"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthControls } from "@/components/auth-controls";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/skills", label: "Directory" },
  { href: "/community", label: "Community" },
  { href: "/pricing", label: "Pricing" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
      <div className="container flex flex-col gap-4 py-4 lg:h-20 lg:flex-row lg:items-center lg:justify-between lg:py-0">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-primary/20 bg-primary text-sm font-semibold text-primary-foreground shadow-sm">
            <span className="font-mono text-xs">CS</span>
          </div>
          <div>
            <p className="text-sm font-semibold">Claude Skills Directory</p>
            <p className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground sm:block">
              Skills, MCPs, and reusable workflows
            </p>
          </div>
        </Link>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <nav className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
            {navItems.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: active ? "secondary" : "ghost" }),
                    "shrink-0",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/submit" className={cn(buttonVariants(), "shrink-0")}>
              Submit
            </Link>
          </nav>
          <AuthControls />
        </div>
      </div>
    </header>
  );
}
