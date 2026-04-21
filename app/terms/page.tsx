import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms and marketplace usage guidelines for Claude Skills Directory.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      intro="This is an MVP placeholder for terms and should be reviewed by legal counsel before public launch."
      sections={[
        {
          title: "Using the directory",
          body: [
            "Users should only submit listings they have the right to publish and should avoid harmful, misleading, or abusive content.",
          ],
        },
        {
          title: "Creator responsibilities",
          body: [
            "Creators are responsible for the accuracy, legality, and safety of their skills and MCP listings, including links, setup instructions, and monetized content.",
          ],
        },
        {
          title: "Marketplace terms",
          body: [
            "Paid listings, refunds, payout timing, and platform fees will depend on the marketplace rules defined when Stripe Connect is enabled.",
          ],
        },
      ]}
      title="Terms"
    />
  );
}
