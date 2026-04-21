"use client";

import { Check, Copy, Download } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

export function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  function downloadCode() {
    const blob = new Blob([code], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${slugify(title) || "skill"}.SKILL.md`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="overflow-hidden rounded-3xl border bg-slate-950 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-orange-300">SKILL.md</p>
          <h2 className="text-lg font-semibold text-white">Skill source</h2>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" size="sm" onClick={copyCode}>
            {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button type="button" variant="secondary" size="sm" onClick={downloadCode}>
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
      <pre className="max-h-[720px] overflow-auto p-5 font-mono text-sm leading-7 text-slate-100">
        <code>{code}</code>
      </pre>
    </section>
  );
}

