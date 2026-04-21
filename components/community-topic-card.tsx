import Link from "next/link";
import { ArrowUpRight, Heart, MessageSquare, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommunityThread } from "@/lib/community";

type CommunityTopicCardProps = {
  topic: CommunityThread;
};

export function CommunityTopicCard({ topic }: CommunityTopicCardProps) {
  return (
    <Link href={`/community/${topic.slug}`} className="group block h-full">
      <Card className="h-full transition-transform duration-200 group-hover:-translate-y-1">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <Badge>{topic.type}</Badge>
              {topic.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} className="bg-muted/80">
                  #{tag}
                </Badge>
              ))}
            </div>
            <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl leading-tight">{topic.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {topic.author} · {topic.role}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-sm leading-7 text-muted-foreground">{topic.summary}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {topic.replies_count} replies
            </div>
            <div className="inline-flex items-center gap-2">
              <Heart className="h-4 w-4" />
              {topic.likes_count} likes
            </div>
            <div className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              {topic.activity}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
