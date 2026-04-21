import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BillingPlan } from "@/lib/types";
import { cn } from "@/lib/utils";

type PricingCardProps = {
  plan: BillingPlan;
};

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <Card className={cn(plan.highlighted ? "border-primary/30 bg-white" : "")}>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            {plan.eyebrow ? (
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                {plan.eyebrow}
              </p>
            ) : null}
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription className="mt-2 leading-6">
              {plan.description}
            </CardDescription>
          </div>
          {plan.highlighted ? (
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Most popular
            </div>
          ) : null}
        </div>
        <p className="pt-4 text-4xl font-semibold tracking-tight">{plan.priceLabel}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          {plan.features.map((feature) => (
            <p key={feature} className="text-sm leading-6 text-muted-foreground">
              {feature}
            </p>
          ))}
        </div>
        {plan.note ? (
          <p className="rounded-2xl bg-muted/70 px-4 py-3 text-sm text-muted-foreground">
            {plan.note}
          </p>
        ) : null}
        <Link
          href={plan.href}
          className={cn(
            buttonVariants({
              variant: plan.highlighted ? "default" : "outline",
            }),
            "w-full",
          )}
        >
          {plan.ctaLabel}
        </Link>
      </CardContent>
    </Card>
  );
}
