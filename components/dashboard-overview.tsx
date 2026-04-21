import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatorDashboardSummary } from "@/lib/types";

type DashboardOverviewProps = {
  summary: CreatorDashboardSummary;
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value / 100);
}

export function DashboardOverview({ summary }: DashboardOverviewProps) {
  const cards = [
    { label: "Published skills", value: summary.totalSkills.toString() },
    { label: "Premium skills", value: summary.premiumSkills.toString() },
    { label: "Total views", value: summary.totalViews.toLocaleString("en-US") },
    { label: "Copies", value: summary.totalCopies.toLocaleString("en-US") },
    { label: "Downloads", value: summary.totalDownloads.toLocaleString("en-US") },
    { label: "Estimated revenue", value: currency(summary.estimatedRevenueCents) },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{card.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
