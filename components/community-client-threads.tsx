"use client";

import { useEffect, useState } from "react";

import { CommunityTopicCard } from "@/components/community-topic-card";
import { CommunityThread } from "@/lib/community";

type CommunityClientThreadsProps = {
  initialThreads: CommunityThread[];
};

const LOCAL_THREAD_KEY = "community-local-threads";

export function CommunityClientThreads({ initialThreads }: CommunityClientThreadsProps) {
  const [threads, setThreads] = useState(initialThreads);

  useEffect(() => {
    const localThreads = JSON.parse(localStorage.getItem(LOCAL_THREAD_KEY) ?? "[]") as CommunityThread[];

    if (localThreads.length === 0) {
      return;
    }

    setThreads([...localThreads, ...initialThreads]);
  }, [initialThreads]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {threads.map((topic) => (
        <CommunityTopicCard key={`${topic.id}-${topic.slug}`} topic={topic} />
      ))}
    </div>
  );
}
