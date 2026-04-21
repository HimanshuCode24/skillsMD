"use client";

import { ArrowUp } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

export function UpvoteButton({ skillId, initialCount }: { skillId: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [didVote, setDidVote] = useState(false);
  const [isPending, startTransition] = useTransition();

  function upvote() {
    if (didVote) return;
    setDidVote(true);
    setCount((value) => value + 1);

    startTransition(async () => {
      const response = await fetch(`/api/skills/${skillId}/upvote`, { method: "POST" });
      if (!response.ok) {
        setDidVote(false);
        setCount((value) => Math.max(0, value - 1));
      }
    });
  }

  return (
    <Button type="button" variant="secondary" onClick={upvote} disabled={didVote || isPending}>
      <ArrowUp className="mr-2 h-4 w-4" />
      {count} upvotes
    </Button>
  );
}

