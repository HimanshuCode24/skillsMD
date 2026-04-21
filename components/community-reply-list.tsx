import { Heart } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityReply } from "@/lib/community";

type CommunityReplyListProps = {
  replies: CommunityReply[];
};

export function CommunityReplyList({ replies }: CommunityReplyListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Replies</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {replies.length === 0 ? (
          <p className="text-sm leading-7 text-muted-foreground">
            No replies yet. Start the conversation and set the tone.
          </p>
        ) : (
          replies.map((reply) => (
            <div
              key={reply.id}
              className="rounded-[1.25rem] border border-border/70 bg-white/60 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{reply.author}</p>
                  <p className="text-sm text-muted-foreground">{reply.role}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(reply.created_at))}
                </p>
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                {reply.body}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                {reply.likes_count} likes
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
