import type { Metadata } from "next";
import Link from "next/link";

import { DashboardOverview } from "@/components/dashboard-overview";
import { DashboardSkillList } from "@/components/dashboard-skill-list";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCreatorDashboardData } from "@/lib/skills";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Creator Dashboard",
  description: "Track skill performance, conversions, and monetization in the creator dashboard.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage() {
  const { skills, summary } = await getCreatorDashboardData();

  return (
    <main className="container py-16">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <Badge className="bg-secondary text-secondary-foreground">Creator dashboard</Badge>
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">
              Measure what sells, not just what gets upvotes
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-muted-foreground">
              This dashboard runs in demo mode without auth and switches cleanly to
              live creator data when Supabase auth is connected.
            </p>
          </div>
        </div>

        <Link href="/pricing?flow=creators" className={cn(buttonVariants({ size: "lg" }))}>
          Upgrade to Creator Pro
        </Link>
      </div>

      <div className="mt-10 space-y-8">
        <DashboardOverview summary={summary} />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <DashboardSkillList skills={skills} />
          <Card>
            <CardHeader>
              <CardTitle>Monetization checklist</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>Connect Stripe payment links for Pro and Team plans.</p>
              <p>Turn top-performing workflows into premium gated skills.</p>
              <p>Use featured placement on launch week for new premium drops.</p>
              <p>Watch copy-to-download conversion to identify the best upsell point.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
