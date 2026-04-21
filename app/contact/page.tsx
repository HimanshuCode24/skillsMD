import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact information for Claude Skills Directory.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      intro="Use a dedicated support email or contact form here before launch so creators and buyers have a clear path for help."
      sections={[
        {
          title: "General support",
          body: [
            "Use this page for platform questions, listing issues, and account-related help once the production support channel is configured.",
          ],
        },
        {
          title: "Creator support",
          body: [
            "Creators should have a way to ask about listing reviews, premium content, payout status, and moderation decisions.",
          ],
        },
        {
          title: "Partnerships and feedback",
          body: [
            "This is also a good place to collect launch feedback, partnership requests, and requests for featured integrations or MCP coverage.",
          ],
        },
      ]}
      title="Contact"
    />
  );
}
