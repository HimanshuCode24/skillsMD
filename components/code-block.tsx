"use client";

import { useState } from "react";
import { Check, Copy, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  fileName: string;
  contentType?: "skill" | "mcp";
  className?: string;
};

export function CodeBlock({
  code,
  fileName,
  contentType = "skill",
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function handleDownload() {
    const blob = new Blob([code], {
      type:
        contentType === "mcp"
          ? "application/json;charset=utf-8"
          : "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className={cn("overflow-hidden rounded-[1.75rem] border border-border bg-slate-950", className)}>
      <div className="flex flex-col gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm text-slate-200">{fileName}</p>
          <p className="text-xs text-slate-400">
            {contentType === "mcp" ? "Structured MCP configuration" : "Structured skill instructions"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={handleCopy}>
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <pre className="max-h-[640px] overflow-x-auto p-5 text-sm leading-7 text-slate-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}
