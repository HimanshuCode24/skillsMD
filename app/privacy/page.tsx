import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy information for Claude Skills Directory.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      intro="This is a lightweight MVP privacy page and should be replaced with final legal copy before launch."
      sections={[
        {
          title: "What we collect",
          body: [
            "The product may store account information, submitted listings, engagement events, and payment-related metadata needed to operate the marketplace.",
          ],
        },
        {
          title: "How data is used",
          body: [
            "Data is used to run the directory, review submissions, improve discovery, and support creator payouts when payments are enabled.",
          ],
        },
        {
          title: "Third-party services",
          body: [
            "The app relies on infrastructure such as Supabase, Vercel, and Stripe. Their services may process data needed to authenticate users, store listings, and handle transactions.",
          ],
        },
      ]}
      title="Privacy"
    />
  );
}
