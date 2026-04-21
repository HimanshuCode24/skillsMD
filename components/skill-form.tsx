"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES, CONTENT_TYPES, DIFFICULTIES } from "@/lib/constants";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const formSchema = z.object({
  contentType: z.enum(["skill", "mcp"]),
  title: z.string().min(3, "Add a more descriptive title."),
  description: z.string().min(12, "A short summary helps people discover it."),
  skillMd: z.string().min(20, "Paste the full SKILL.md content."),
  tags: z.string().min(2, "Add at least one tag."),
  category: z.string().min(1, "Choose a category."),
  difficulty: z.enum(["Beginner", "Intermediate", "Advanced"]),
  isPremium: z.boolean(),
  price: z.string(),
});

type FormSchema = z.infer<typeof formSchema>;

type SkillFormProps = {
  configured?: boolean;
};

export function SkillForm({ configured = true }: SkillFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      contentType: "skill",
      skillMd: "",
      tags: "",
      category: CATEGORIES[0],
      difficulty: "Beginner",
      isPremium: false,
      price: "19",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  async function onSubmit(values: FormSchema) {
    setSubmitError(null);
    const supabase = getSupabaseBrowserClient();

    if (!supabase) {
      setSubmitError(
        "Supabase environment variables are missing. Add them to .env.local before submitting new skills.",
      );
      return;
    }

    const payload = {
      title: values.title,
      description: values.description,
      content_type: values.contentType,
      skill_md: values.skillMd,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      category: values.category,
      difficulty: values.difficulty,
      creator_id: null,
      is_premium: values.isPremium,
      price_cents: values.isPremium ? Number(values.price) * 100 : null,
      preview_md: values.isPremium ? values.skillMd.split("\n").slice(0, 10).join("\n") : null,
    };

    const { error } = await supabase.from("skills").insert(payload);

    if (error) {
      setSubmitError(error.message);
      return;
    }

    router.push("/skills");
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a new directory listing</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={watch("contentType")}
                onValueChange={(value) =>
                  setValue("contentType", value as FormSchema["contentType"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CONTENT_TYPES.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="Incident Timeline Builder" {...register("title")} />
              {errors.title ? (
                <p className="text-sm text-red-600">{errors.title.message}</p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input id="tags" placeholder="incident, timeline, sre" {...register("tags")} />
              {errors.tags ? (
                <p className="text-sm text-red-600">{errors.tags.message}</p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder={
                watch("contentType") === "mcp"
                  ? "Explain what the MCP integration lets Claude connect to or do."
                  : "Explain what the skill helps Claude do."
              }
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-red-600">{errors.description.message}</p>
            ) : null}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={watch("category")}
                onValueChange={(value) => setValue("category", value, { shouldValidate: true })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select
                value={watch("difficulty")}
                onValueChange={(value) =>
                  setValue("difficulty", value as FormSchema["difficulty"], {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {DIFFICULTIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_220px]">
            <label className="flex items-center gap-3 rounded-2xl border border-input bg-white/70 px-4 py-3 text-sm">
              <input type="checkbox" className="h-4 w-4" {...register("isPremium")} />
              Make this a premium skill
            </label>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input id="price" type="number" min="1" step="1" {...register("price")} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillMd">
              {watch("contentType") === "mcp" ? "MCP config or install snippet" : "SKILL.md"}
            </Label>
            <Textarea
              id="skillMd"
              rows={18}
              className="font-mono"
              placeholder={
                watch("contentType") === "mcp"
                  ? '{\n  "mcpServers": {\n    "your-server": {\n      "command": "npx"\n    }\n  }\n}'
                  : "# Skill Title&#10;&#10;## Purpose&#10;..."
              }
              {...register("skillMd")}
            />
            {errors.skillMd ? (
              <p className="text-sm text-red-600">{errors.skillMd.message}</p>
            ) : null}
          </div>

          {submitError ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </p>
          ) : null}

          <Button type="submit" size="lg" disabled={isSubmitting || !configured}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {!configured
              ? "Configure Supabase to submit"
              : isSubmitting
                ? "Saving skill..."
                : "Publish Skill"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
