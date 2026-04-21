import type { Metadata } from "next";

import "@/app/globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl, primaryKeywords } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Claude Skills Directory | Claude Skills, MCP Servers, and SKILL.md Workflows",
    template: "%s | Claude Skills Directory",
  },
  description:
    "Discover Claude skills, SKILL.md workflows, and MCP servers for Claude Code, Cursor, and VS Code.",
  keywords: [...primaryKeywords],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Claude Skills Directory",
    description:
      "Discover Claude skills, SKILL.md workflows, and MCP servers for Claude Code, Cursor, and VS Code.",
    url: "/",
    siteName: "Claude Skills Directory",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Skills Directory",
    description:
      "Discover Claude skills, SKILL.md workflows, and MCP servers for Claude Code, Cursor, and VS Code.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <SiteHeader />
        <div className="flex min-h-[calc(100vh-5rem)] flex-col">
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
