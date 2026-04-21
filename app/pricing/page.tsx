import type { Metadata } from "next";
import Link from "next/link";

import { PricingCard } from "@/components/pricing-card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  buyerFlow,
  buyerPlans,
  creatorFlow,
  creatorPlans,
} from "@/lib/billing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing for Claude Skills and Creators",
  description:
    "See buyer pricing for premium Claude skills and creator pricing for selling SKILL.md workflows and MCP listings.",
  alternates: {
    canonical: "/pricing",
  },
};

type PricingPageProps = {
  searchParams?: {
    flow?: string;
    skill?: string;
  };
};

export default function PricingPage({ searchParams }: PricingPageProps) {
  const flow = searchParams?.flow === "creators" ? "creators" : "skills";
  const highlightedSkill = searchParams?.skill;

  return (
    <main className="container py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="bg-primary/10 text-primary">Pricing flows</Badge>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight">
          Separate pricing for premium skill buyers and creators
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted-foreground">
          Buyers should understand how to unlock paid skills. Creators should
          understand how to monetize them. This page now splits those journeys.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/pricing?flow=skills"
            className={cn(
              buttonVariants({ variant: flow === "skills" ? "default" : "outline" }),
            )}
          >
            Skill Pricing
          </Link>
          <Link
            href="/pricing?flow=creators"
            className={cn(
              buttonVariants({ variant: flow === "creators" ? "default" : "outline" }),
            )}
          >
            Creator Pricing
          </Link>
        </div>
      </div>

      {flow === "skills" ? (
        <>
          <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-border/70 bg-white/70 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Buyer Flow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Unlock premium skills without subscribing as a creator
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              This is the path for users buying access to premium SKILL.md files or
              curated skill bundles.
              {highlightedSkill ? ` You came from premium skill ${highlightedSkill}.` : ""}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {buyerFlow.map((step, index) => (
                <div key={step} className="rounded-[1.25rem] border border-border/70 bg-background/80 p-4">
                  <p className="font-mono text-xs text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {buyerPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mx-auto mt-12 max-w-5xl rounded-[2rem] border border-border/70 bg-white/70 p-8">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Creator Flow
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Monetize premium skills and get paid as a creator
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              This is the path for builders who want premium listings, featured
              discovery, analytics, and repeatable revenue.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {creatorFlow.map((step, index) => (
                <div key={step} className="rounded-[1.25rem] border border-border/70 bg-background/80 p-4">
                  <p className="font-mono text-xs text-muted-foreground">
                    Step {index + 1}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {creatorPlans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}
