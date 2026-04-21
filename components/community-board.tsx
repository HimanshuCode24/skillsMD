"use client";

import { useMemo, useState } from "react";
import { Activity, Command, TerminalSquare } from "lucide-react";

import { CommunityAuthModal } from "@/components/community-auth-modal";
import { CommunityBoardItem } from "@/components/community-board-item";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CommunityThread } from "@/lib/community";

type CommunityBoardProps = {
  posts: CommunityThread[];
};

export function CommunityBoard({ posts }: CommunityBoardProps) {
  const [open, setOpen] = useState(false);
  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => b.likes_count - a.likes_count),
    [posts],
  );

  return (
    <>
      <section className="container py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] border border-border/70 bg-white/72 p-7 shadow-glow">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-4">
                <Badge className="w-fit bg-secondary text-secondary-foreground">
                  Builder board
                </Badge>
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    /community/board
                  </p>
                  <h1 className="text-4xl font-semibold tracking-tight">
                    Trending in Claude Skills
                  </h1>
                </div>
                <p className="max-w-2xl text-base text-muted-foreground">
                  Explore what the builder community is shipping, testing, and talking
                  about.
                </p>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2">
                    <TerminalSquare className="h-4 w-4" />
                    Dev-native board
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2">
                    <Activity className="h-4 w-4" />
                    Live builder posts
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-3 py-2">
                    <Command className="h-4 w-4" />
                    Minimal signal-first UI
                  </div>
                </div>
              </div>
              <Button
                className="rounded-full"
                onClick={() => setOpen(true)}
                type="button"
                variant="outline"
              >
                Create Post
              </Button>
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                Board Feed
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Ranked by momentum and builder interest
              </p>
            </div>
            <div className="font-mono text-xs text-muted-foreground">
              {sortedPosts.length.toString().padStart(2, "0")} active posts
            </div>
          </div>

          {sortedPosts.length > 0 ? (
            <div className="mt-6 space-y-4">
              {sortedPosts.map((post, index) => (
                <CommunityBoardItem key={post.id} post={post} rank={index + 1} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[1.75rem] border border-border/70 bg-background/80 p-8 text-sm leading-7 text-muted-foreground">
              No community posts yet. Once real threads are created in Supabase, they
              will appear here.
            </div>
          )}
        </div>
      </section>

      <CommunityAuthModal onClose={() => setOpen(false)} open={open} />
    </>
  );
}
