"use client";

import { useEffect, useState } from "react";

import { CommunityReplyList } from "@/components/community-reply-list";
import { CommunityReply } from "@/lib/community";

type CommunityClientRepliesProps = {
  initialReplies: CommunityReply[];
  threadId: string;
};

const LOCAL_REPLY_KEY = "community-local-replies";

export function CommunityClientReplies({
  initialReplies,
  threadId,
}: CommunityClientRepliesProps) {
  const [replies, setReplies] = useState(initialReplies);

  useEffect(() => {
    const localReplies = JSON.parse(localStorage.getItem(LOCAL_REPLY_KEY) ?? "[]") as CommunityReply[];
    const matching = localReplies.filter((reply) => reply.thread_id === threadId);

    if (matching.length === 0) {
      return;
    }

    setReplies([...initialReplies, ...matching]);
  }, [initialReplies, threadId]);

  return <CommunityReplyList replies={replies} />;
}
