import { notFound } from "next/navigation";

import { CommunityClientReplies } from "@/components/community-client-replies";
import { CommunityReplyComposer } from "@/components/community-reply-composer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getCommunityReplies,
  getCommunityThreadBySlug,
  getCommunityThreadFallbacks,
} from "@/lib/community";

type CommunityThreadPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return getCommunityThreadFallbacks();
}

export default async function CommunityThreadPage({
  params,
}: CommunityThreadPageProps) {
  const thread = await getCommunityThreadBySlug(params.slug);

  if (!thread) {
    notFound();
  }

  const replies = await getCommunityReplies(thread.id);

  return (
    <main className="container py-16">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{thread.type}</Badge>
            {thread.tags.map((tag) => (
              <Badge key={tag} className="bg-muted/80">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight">{thread.title}</h1>
            <p className="text-lg leading-8 text-muted-foreground">{thread.summary}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{thread.author}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>{thread.role}</p>
              <p>{thread.activity}</p>
              <p>
                {thread.likes_count} likes · {thread.replies_count} replies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thread body</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="whitespace-pre-wrap text-sm leading-8 text-muted-foreground">
                {thread.body}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <CommunityClientReplies initialReplies={replies} threadId={thread.id} />
          <CommunityReplyComposer threadId={thread.id} />
        </div>
      </div>
    </main>
  );
}
