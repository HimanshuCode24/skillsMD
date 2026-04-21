"use client";

import { useMemo, useState } from "react";
import { Check, Copy, ExternalLink, FileJson, PackagePlus, TerminalSquare } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getClaudeCodeInstallCommand,
  getCursorInstallHref,
  getMcpConfigFileName,
  getVsCodeInstallHref,
  parseMcpConfig,
} from "@/lib/mcp";
import { cn } from "@/lib/utils";

type McpInstallPanelProps = {
  title: string;
  skillMd: string;
  sourceUrl?: string | null;
  docsUrl?: string | null;
};

export function McpInstallPanel({
  title,
  skillMd,
  sourceUrl,
  docsUrl,
}: McpInstallPanelProps) {
  const [copied, setCopied] = useState<"json" | "claude" | null>(null);
  const parsedConfig = useMemo(() => parseMcpConfig(skillMd), [skillMd]);

  async function copyValue(value: string, type: "json" | "claude") {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1800);
  }

  function downloadJson() {
    const blob = new Blob([skillMd], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getMcpConfigFileName(parsedConfig?.name ?? title);
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!parsedConfig) {
    return (
      <Card className="border-border/70 bg-white/80">
        <CardHeader>
          <CardTitle>Install this MCP</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            This MCP entry does not use the structured JSON format needed for one-click
            installation yet. You can still copy the config manually from the code block above.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={() => copyValue(skillMd, "json")} variant="secondary">
              {copied === "json" ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}
              {copied === "json" ? "Copied" : "Copy MCP config"}
            </Button>
            <Button onClick={downloadJson} variant="outline">
              <FileJson className="mr-2 h-4 w-4" />
              Download JSON
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const cursorHref = getCursorInstallHref(parsedConfig);
  const vscodeHref = getVsCodeInstallHref(parsedConfig);
  const claudeCommand = getClaudeCodeInstallCommand(parsedConfig);

  return (
    <Card className="overflow-hidden border-border/70 bg-white/80">
      <CardHeader className="space-y-4">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            MCP Install
          </p>
          <CardTitle className="text-3xl tracking-tight">
            Add this MCP to Cursor, VS Code, or Claude Code
          </CardTitle>
          <p className="max-w-3xl text-sm leading-7 text-muted-foreground">
            Install directly into your preferred environment, then use the official
            source links below to verify setup details and authentication requirements.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-3 md:grid-cols-3">
          <a
            href={cursorHref}
            className={cn(
              buttonVariants(),
              "w-full justify-start rounded-2xl px-4 py-6",
            )}
          >
            <PackagePlus className="mr-2 h-4 w-4" />
            Add to Cursor
          </a>
          <a
            href={vscodeHref}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full justify-start rounded-2xl px-4 py-6",
            )}
          >
            <PackagePlus className="mr-2 h-4 w-4" />
            Add to VS Code
          </a>
          <Button
            className="justify-start rounded-2xl px-4 py-6"
            onClick={() => copyValue(claudeCommand, "claude")}
            type="button"
            variant="outline"
          >
            {copied === "claude" ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <TerminalSquare className="mr-2 h-4 w-4" />
            )}
            {copied === "claude" ? "Claude command copied" : "Copy Claude Code command"}
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="rounded-[1.5rem] border border-border/70 bg-card px-5 py-4">
            <p className="text-sm font-medium text-foreground">Claude Code command</p>
            <pre className="mt-3 overflow-x-auto rounded-2xl border border-border/70 bg-background px-4 py-3 font-mono text-sm text-foreground">
              <code>{claudeCommand}</code>
            </pre>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button onClick={() => copyValue(skillMd, "json")} variant="secondary">
                {copied === "json" ? (
                  <Check className="mr-2 h-4 w-4" />
                ) : (
                  <Copy className="mr-2 h-4 w-4" />
                )}
                {copied === "json" ? "Config copied" : "Copy MCP JSON"}
              </Button>
              <Button onClick={downloadJson} variant="outline">
                <FileJson className="mr-2 h-4 w-4" />
                Download JSON
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border/70 bg-white/70 px-5 py-4 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Official links</p>
            <div className="mt-4 space-y-3">
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-foreground transition-colors hover:bg-muted"
                >
                  <span>Source</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ) : null}
              {docsUrl ? (
                <a
                  href={docsUrl}
                  rel="noreferrer"
                  target="_blank"
                  className="flex items-center justify-between rounded-2xl border border-border/70 px-4 py-3 text-foreground transition-colors hover:bg-muted"
                >
                  <span>Docs</span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </a>
              ) : null}
              <div className="rounded-2xl border border-border/70 px-4 py-3">
                <p className="font-medium text-foreground">Direct install support</p>
                <p className="mt-2 leading-6">
                  Cursor uses its MCP deeplink flow, VS Code uses the `vscode:mcp/install`
                  protocol, and Claude Code uses `claude mcp add`.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
