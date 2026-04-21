import { Link2, Triangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CommunityThread } from "@/lib/community";

type CommunityBoardItemProps = {
  post: CommunityThread;
  rank: number;
};

export function CommunityBoardItem({ post, rank }: CommunityBoardItemProps) {
  return (
    <article className="grid gap-4 rounded-[1.5rem] border border-border/60 bg-white/85 p-5 transition-colors hover:border-primary/20 md:grid-cols-[auto_1fr_auto] md:items-start">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-background/80 font-mono text-sm font-semibold text-muted-foreground">
        {rank.toString().padStart(2, "0")}
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md border border-border/70 bg-muted text-[11px] font-semibold text-foreground">
            {post.author.charAt(0)}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
            {post.author}
          </span>
          <span className="rounded-full bg-accent/55 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-foreground">
            {post.role}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-[1.45rem] font-semibold tracking-tight">{post.title}</h3>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="max-w-4xl text-base leading-7 text-muted-foreground">
            {post.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge className="font-mono uppercase tracking-[0.12em]">{post.type}</Badge>
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} className="bg-muted/80 font-mono">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end md:pt-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 font-mono text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{post.likes_count}</span>
          <Triangle className="h-3.5 w-3.5" />
        </div>
      </div>
    </article>
  );
}
