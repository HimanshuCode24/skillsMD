import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about Claude skills, SKILL.md workflows, MCP servers, and creator listings.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      intro="A quick reference for the questions most builders and buyers ask before they use, submit, or monetize listings."
      sections={[
        {
          title: "What is a Claude skill?",
          body: [
            "A Claude skill is a reusable workflow stored in a SKILL.md file. It gives Claude a repeatable way to handle a specific task.",
          ],
        },
        {
          title: "What is an MCP?",
          body: [
            "An MCP server connects Claude or an editor to external tools and data sources using the Model Context Protocol.",
          ],
        },
        {
          title: "Can anyone submit a listing?",
          body: [
            "Yes, but the backend is designed for moderation. Listings should be reviewed before they are approved for public discovery.",
          ],
        },
        {
          title: "How do paid skills work?",
          body: [
            "Free skills can be copied and installed immediately. Paid skills are intended to unlock after checkout once Stripe Connect and entitlements are fully wired.",
          ],
        },
      ]}
      title="Frequently asked questions"
    />
  );
}
