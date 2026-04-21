"use client";

import { useState, useTransition } from "react";
import { ArrowBigUp } from "lucide-react";

import { Button } from "@/components/ui/button";

type UpvoteButtonProps = {
  skillId: string;
  initialCount: number;
};

export function UpvoteButton({ skillId, initialCount }: UpvoteButtonProps) {
  const [count, setCount] = useState(initialCount);
  const [pending, startTransition] = useTransition();

  function handleUpvote() {
    startTransition(async () => {
      const response = await fetch(`/api/skills/${skillId}/upvote`, {
        method: "POST",
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as { upvotes: number };
      setCount(data.upvotes);
    });
  }

  return (
    <Button onClick={handleUpvote} variant="secondary" disabled={pending}>
      <ArrowBigUp className="mr-2 h-4 w-4" />
      {pending ? "Voting..." : `${count} upvotes`}
    </Button>
  );
}
