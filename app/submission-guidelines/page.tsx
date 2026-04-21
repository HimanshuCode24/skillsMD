import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Submission Guidelines",
  description:
    "Guidelines for submitting high-quality Claude skills and MCP listings to the directory.",
  alternates: {
    canonical: "/submission-guidelines",
  },
};

export default function SubmissionGuidelinesPage() {
  return (
    <InfoPage
      eyebrow="Resources"
      intro="A good listing should be installable, specific, and useful to another builder without private context."
      sections={[
        {
          title: "For skill submissions",
          body: [
            "Include a clear title, a concrete description, and a complete SKILL.md with enough structure that another builder can use it immediately.",
            "Avoid vague prompts, incomplete outlines, or private workflows that cannot be reused by someone else.",
          ],
        },
        {
          title: "For MCP submissions",
          body: [
            "Include structured JSON, official source links when available, and enough setup detail that the integration can be installed safely.",
            "If the MCP requires auth or environment variables, make that obvious in the listing.",
          ],
        },
        {
          title: "Moderation expectations",
          body: [
            "Listings may be reviewed before approval to reduce spam, low-signal submissions, and unsafe integrations.",
            "Rejected listings should include a reason so creators can revise and resubmit.",
          ],
        },
      ]}
      title="Submission guidelines"
    />
  );
}
