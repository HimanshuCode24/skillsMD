"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { PlugZap, Search, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES, DIFFICULTIES } from "@/lib/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SkillFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "All";
  const difficulty = searchParams.get("difficulty") ?? "All";
  const type = searchParams.get("type") ?? "All";
  const query = searchParams.get("query") ?? "";

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "All") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/skills${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-border/70 bg-white/70 p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Button
              className="rounded-full px-5"
              onClick={() => updateFilter("type", type === "skill" ? "All" : "skill")}
              type="button"
              variant={type === "skill" ? "default" : "outline"}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Skills
            </Button>
            <Button
              className="rounded-full px-5"
              onClick={() => updateFilter("type", type === "mcp" ? "All" : "mcp")}
              type="button"
              variant={type === "mcp" ? "default" : "outline"}
            >
              <PlugZap className="mr-2 h-4 w-4" />
              MCPs
            </Button>
          </div>

          <div className="relative w-full lg:max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-11"
              defaultValue={query}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  updateFilter("query", event.currentTarget.value.trim() || "All");
                }
              }}
              placeholder="Search skills, MCPs, tags..."
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Select value={category} onValueChange={(value) => updateFilter("category", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              {CATEGORIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={difficulty}
            onValueChange={(value) => updateFilter("difficulty", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All difficulties</SelectItem>
              {DIFFICULTIES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
