"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const LOCAL_THREAD_KEY = "community-local-threads";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CommunityThreadForm() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    author: "",
    role: "",
    summary: "",
    body: "",
    tags: "",
    type: "discussion",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);

    const payload = {
      ...form,
      tags: form.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      slug: slugify(form.title),
    };

    try {
      const response = await fetch("/api/community/threads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        mode?: "demo" | "supabase";
        slug?: string;
        message?: string;
      };

      if (!response.ok) {
        throw new Error(data.message || "Unable to create thread.");
      }

      if (data.mode === "demo") {
        const existing = JSON.parse(localStorage.getItem(LOCAL_THREAD_KEY) ?? "[]") as unknown[];
        localStorage.setItem(
          LOCAL_THREAD_KEY,
          JSON.stringify([
            {
              id: crypto.randomUUID(),
              ...payload,
              likes_count: 0,
              replies_count: 0,
              activity: "Active just now",
              created_at: new Date().toISOString(),
            },
            ...existing,
          ]),
        );
      }

      router.push(`/community/${data.slug ?? payload.slug}`);
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create thread.");
    } finally {
      setPending(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start a discussion</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="thread-title">Title</Label>
              <Input
                id="thread-title"
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                placeholder="What are you trying to figure out?"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thread-author">Name</Label>
              <Input
                id="thread-author"
                value={form.author}
                onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
                placeholder="Your name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thread-role">Role</Label>
              <Input
                id="thread-role"
                value={form.role}
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                placeholder="Creator Pro"
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="thread-summary">Summary</Label>
              <Textarea
                id="thread-summary"
                rows={3}
                value={form.summary}
                onChange={(event) =>
                  setForm((current) => ({ ...current, summary: event.target.value }))
                }
                placeholder="A short summary that tells builders why this thread matters."
                required
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="thread-body">Body</Label>
              <Textarea
                id="thread-body"
                rows={8}
                value={form.body}
                onChange={(event) => setForm((current) => ({ ...current, body: event.target.value }))}
                placeholder="Share context, your current thinking, and the kind of feedback you want."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thread-tags">Tags</Label>
              <Input
                id="thread-tags"
                value={form.tags}
                onChange={(event) => setForm((current) => ({ ...current, tags: event.target.value }))}
                placeholder="pricing, premium, creator"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="thread-type">Thread type</Label>
              <select
                id="thread-type"
                className="flex h-11 w-full rounded-2xl border border-input bg-white/80 px-4 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              >
                <option value="discussion">Discussion</option>
                <option value="showcase">Showcase</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
          </div>
          {message ? <p className="text-sm text-muted-foreground">{message}</p> : null}
          <Button disabled={pending} size="lg" type="submit">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {pending ? "Publishing..." : "Publish Thread"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
