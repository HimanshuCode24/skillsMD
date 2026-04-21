"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories, difficulties } from "@/lib/sample-data";

export function SkillForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const payload = {
      title: String(form.get("title") ?? ""),
      description: String(form.get("description") ?? ""),
      skill_md: String(form.get("skill_md") ?? ""),
      tags: String(form.get("tags") ?? "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      category: String(form.get("category") ?? categories[0]),
      difficulty: String(form.get("difficulty") ?? difficulties[0])
    };

    startTransition(async () => {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        setError(body?.error ?? "Could not submit skill. Check your Supabase configuration.");
        return;
      }

      router.push("/skills");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border bg-white/80 p-6 shadow-soft backdrop-blur">
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p> : null}
      <div>
        <label className="mb-2 block text-sm font-semibold">Title</label>
        <Input name="title" required placeholder="e.g. Product Requirements Reviewer" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">Description</label>
        <Textarea name="description" required placeholder="What does this skill help Claude do?" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">SKILL.md</label>
        <Textarea
          name="skill_md"
          required
          className="min-h-[320px] font-mono"
          placeholder="# Skill Name&#10;&#10;Describe the workflow, inputs, and expected output..."
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold">Tags</label>
        <Input name="tags" required placeholder="research, summarization, workflow" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold">Category</label>
          <select name="category" className="h-11 w-full rounded-2xl border bg-white px-4 text-sm outline-none">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold">Difficulty</label>
          <select name="difficulty" className="h-11 w-full rounded-2xl border bg-white px-4 text-sm outline-none">
            {difficulties.map((difficulty) => (
              <option key={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>
      <Button disabled={isPending} className="w-full">
        {isPending ? "Submitting..." : "Submit skill"}
      </Button>
    </form>
  );
}

