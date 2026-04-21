import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Creator Guide",
  description:
    "A guide for creators publishing Claude skills, MCP listings, and premium workflows.",
  alternates: {
    canonical: "/creator-guide",
  },
};

export default function CreatorGuidePage() {
  return (
    <InfoPage
      eyebrow="Creators"
      intro="This guide covers how creators should think about quality, packaging, and monetization before publishing to the directory."
      sections={[
        {
          title: "Package for reuse",
          body: [
            "The best listings solve a repeatable problem. A strong skill or MCP should be understandable and useful without a DM or custom walkthrough.",
          ],
        },
        {
          title: "Write better previews",
          body: [
            "If you plan to monetize, the preview should prove the listing is real and structured without giving away the full paid value.",
          ],
        },
        {
          title: "Monetize carefully",
          body: [
            "Premium listings should save time, reduce decision friction, or unlock a workflow people will reuse often.",
            "For payouts, the intended path is Stripe Connect so creators can connect their own Stripe account and receive their share automatically.",
          ],
        },
      ]}
      title="Creator guide"
    />
  );
}
