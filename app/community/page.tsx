import type { Metadata } from "next";

import { CommunityBoard } from "@/components/community-board";
import { getCommunityThreads } from "@/lib/community";

export const metadata: Metadata = {
  title: "Claude Skills Community",
  description:
    "Join the Claude skills community to discuss SKILL.md workflows, MCP servers, packaging, pricing, and creator tactics.",
  alternates: {
    canonical: "/community",
  },
};

export default async function CommunityPage() {
  const communityTopics = await getCommunityThreads();

  return <CommunityBoard posts={communityTopics} />;
}
