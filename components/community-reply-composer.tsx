"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type CommunityReplyComposerProps = {
  threadId: string;
};

const LOCAL_REPLY_KEY = "community-local-replies";

export function CommunityReplyComposer({ threadId }: CommunityReplyComposerProps) {
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("");
  const [body, setBody] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const payload = {
      threadId,
      author,
      role,
      body,
    };

    try {
      const response = await fetch(`/api/community/threads/${threadId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { mode?: "demo" | "supabase"; message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Unable to post reply.");
      }

      if (data.mode === "demo") {
        const existing = JSON.parse(localStorage.getItem(LOCAL_REPLY_KEY) ?? "[]") as unknown[];
        localStorage.setItem(
          LOCAL_REPLY_KEY,
          JSON.stringify([
            ...existing,
            {
              id: crypto.randomUUID(),
              thread_id: threadId,
              author,
              role,
              body,
              likes_count: 0,
              created_at: new Date().toISOString(),
            },
          ]),
        );
      }

      setAuthor("");
      setRole("");
      setBody("");
      setMessage("Reply posted. Refreshing the thread...");
      window.location.reload();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to post reply.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reply to thread</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="reply-author">Name</Label>
              <Input
                id="reply-author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply-role">Role</Label>
              <Input
                id="reply-role"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                placeholder="Staff Engineer"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-body">Reply</Label>
            <Textarea
              id="reply-body"
              rows={5}
              value={body}
              onChange={(event) => setBody(event.target.value)}
              placeholder="Add your perspective, feedback, or follow-up question."
              required
            />
          </div>
          {message ? (
            <p className="text-sm text-muted-foreground">{message}</p>
          ) : null}
          <Button disabled={pending} type="submit">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {pending ? "Posting..." : "Post Reply"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
