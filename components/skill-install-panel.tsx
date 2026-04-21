"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronUp,
  Copy,
  Download,
  FolderPlus,
  PlugZap,
  TerminalSquare,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getInstallCommand,
  getInstallPath,
  slugifySkillName,
  type InstallPlatform,
  type InstallTarget,
} from "@/lib/install";

type SkillInstallPanelProps = {
  title: string;
  skillMd: string;
  contentType?: InstallTarget;
  isLocked?: boolean;
};

const platformLabels: Record<InstallPlatform, string> = {
  mac: "macOS",
  linux: "Linux",
  windows: "Windows",
};

export function SkillInstallPanel({
  title,
  skillMd,
  contentType = "skill",
  isLocked = false,
}: SkillInstallPanelProps) {
  const [platform, setPlatform] = useState<InstallPlatform>("mac");
  const [copied, setCopied] = useState<"path" | "command" | "content" | null>(null);
  const [open, setOpen] = useState(false);

  const slug = useMemo(() => slugifySkillName(title), [title]);
  const installPath = getInstallPath(platform, slug, contentType);
  const installCommand = getInstallCommand(platform, slug, contentType);
  const isMcp = contentType === "mcp";

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("win")) {
      setPlatform("windows");
      return;
    }

    if (userAgent.includes("linux")) {
      setPlatform("linux");
      return;
    }

    setPlatform("mac");
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  async function copyValue(value: string, type: "path" | "command" | "content") {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1800);
  }

  function downloadSkillFile() {
    const blob = new Blob([skillMd], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "SKILL.md";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Card className="overflow-hidden border-border/70 bg-white/80">
        <CardContent className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  aria-label="Open install flow"
                  className="rounded-full border border-border/70 p-2 text-muted-foreground transition-colors hover:bg-muted"
                  onClick={() => setOpen(true)}
                  type="button"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <h3 className="text-3xl font-semibold tracking-tight">
                  {isMcp
                    ? "Add this MCP to your Claude environment"
                    : "Add this skill to your Claude environment"}
                </h3>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-secondary text-secondary-foreground">
                  {isMcp ? "Install MCP" : "Install in Claude"}
                </Badge>
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                  {installPath}
                </p>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
                {isMcp
                  ? "One clean action to open your Claude MCP config, paste the server entry, and connect the integration."
                  : "One clean action to create the target folder, open `SKILL.md`, and install this skill into your local Claude setup."}
              </p>
            </div>

            <Button
              className="rounded-full px-5"
              onClick={() => setOpen(true)}
              type="button"
              variant="outline"
            >
              {isMcp ? "Add MCP to Claude" : "Add to Claude"}
            </Button>
          </div>

          {isLocked ? (
            <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              This {isMcp ? "MCP" : "skill"} is premium, so installation should happen
              after purchase to avoid saving only the preview into Claude.
            </p>
          ) : null}
        </CardContent>
      </Card>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-5xl rounded-[2rem] border border-border/70 bg-background shadow-2xl">
            <button
              aria-label="Close install flow"
              className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted"
              onClick={() => setOpen(false)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="border-b border-border/70 px-6 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge className="bg-secondary text-secondary-foreground">
                      {isMcp ? "Install MCP" : "Install in Claude"}
                    </Badge>
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                      {installPath}
                    </p>
                  </div>
                  <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                    {isMcp ? `Add ${title} MCP to Claude` : `Add ${title} to Claude`}
                  </h3>
                </div>
                <Button
                  className="rounded-full"
                  disabled={isLocked}
                  onClick={downloadSkillFile}
                  variant="outline"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {isMcp ? "Download config snippet" : "Download SKILL.md"}
                    </Button>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-3">
                {(["mac", "linux", "windows"] as InstallPlatform[]).map((item) => (
                  <button
                    key={item}
                    className={`rounded-2xl border px-4 py-3 text-left text-sm transition-colors ${
                      platform === item
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border/70 bg-background/70 text-muted-foreground"
                    }`}
                    onClick={() => setPlatform(item)}
                    type="button"
                  >
                    <p className="font-medium">{platformLabels[item]}</p>
                    <p className="mt-1 font-mono text-xs">Install steps</p>
                  </button>
                ))}
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-border/70 bg-white/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="inline-flex items-center gap-2 text-sm font-medium">
                        {isMcp ? <PlugZap className="h-4 w-4" /> : <FolderPlus className="h-4 w-4" />}
                        {isMcp ? "Step 1: Open Claude MCP config" : "Step 1: Create the skill file"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {isMcp
                          ? "Claude loads MCP servers from its MCP configuration file."
                          : "Claude looks for skills in your local skills folder."}
                      </p>
                    </div>
                    <Button
                      onClick={() => copyValue(installPath, "path")}
                      size="sm"
                      variant="outline"
                    >
                      {copied === "path" ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copied === "path" ? "Copied" : "Copy Path"}
                    </Button>
                  </div>
                  <pre className="mt-4 overflow-x-auto rounded-2xl border border-border/70 bg-card px-4 py-3 font-mono text-sm text-foreground">
                    <code>{installPath}</code>
                  </pre>
                </div>

                <div className="rounded-[1.5rem] border border-border/70 bg-white/70 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="inline-flex items-center gap-2 text-sm font-medium">
                        <TerminalSquare className="h-4 w-4" />
                        {isMcp ? "Step 2: Open the config file" : "Step 2: Run the setup command"}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {isMcp
                          ? "This opens the Claude MCP config file so you can paste the server entry."
                          : "This creates the folder and opens `SKILL.md` for editing."}
                      </p>
                    </div>
                    <Button
                      onClick={() => copyValue(installCommand, "command")}
                      size="sm"
                      variant="outline"
                    >
                      {copied === "command" ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copied === "command" ? "Copied" : "Copy Command"}
                    </Button>
                  </div>
                  <pre className="mt-4 overflow-x-auto rounded-2xl border border-border/70 bg-card px-4 py-3 font-mono text-sm text-foreground">
                    <code>{installCommand}</code>
                  </pre>
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[1fr_280px]">
                <div className="rounded-[1.5rem] border border-border/70 bg-white/70 p-5">
                  <p className="text-sm font-medium">
                    {isMcp ? "Step 3: Paste the MCP config and save" : "Step 3: Paste the skill content and save"}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {isMcp
                      ? "After the file opens, paste the MCP server entry from this page, save the config, then restart Claude so the integration is detected."
                      : "After the file opens, paste the full `SKILL.md` content from this page, save it as `SKILL.md`, then restart Claude or refresh your skills list."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button
                      disabled={isLocked}
                      onClick={() => copyValue(skillMd, "content")}
                      variant="secondary"
                    >
                      {copied === "content" ? (
                        <Check className="mr-2 h-4 w-4" />
                      ) : (
                        <Copy className="mr-2 h-4 w-4" />
                      )}
                      {copied === "content" ? "Copied" : isMcp ? "Copy MCP config" : "Copy SKILL.md"}
                    </Button>
                    <Button disabled={isLocked} onClick={downloadSkillFile} variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      {isMcp ? "Download MCP config" : "Download SKILL.md"}
                    </Button>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-4 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Install flow</p>
                  {isMcp ? (
                    <>
                      <p className="mt-3">1. Open the installer</p>
                      <p>2. Open Claude MCP config</p>
                      <p>3. Paste the MCP server entry</p>
                      <p>4. Restart Claude and connect</p>
                    </>
                  ) : (
                    <>
                      <p className="mt-3">1. Open the installer</p>
                      <p>2. Copy the path or command</p>
                      <p>3. Paste the full `SKILL.md`</p>
                      <p>4. Open Claude and use the skill</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
