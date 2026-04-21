import type { Metadata } from "next";

import { InfoPage } from "@/components/info-page";

export const metadata: Metadata = {
  title: "Install Guide",
  description:
    "Learn how to install Claude skills and MCP servers in Claude Code, Cursor, and VS Code.",
  alternates: {
    canonical: "/install-guide",
  },
};

export default function InstallGuidePage() {
  return (
    <InfoPage
      eyebrow="Resources"
      intro="Use this guide to install reusable SKILL.md workflows and MCP servers without guessing where files or config need to live."
      sections={[
        {
          title: "Install Claude skills",
          body: [
            "Open a skill detail page, copy or download the SKILL.md file, and place it in your local Claude skills directory.",
            "The app already shows the exact path and terminal command for macOS, Linux, and Windows so builders can install quickly.",
          ],
        },
        {
          title: "Install MCP servers",
          body: [
            "MCP listings include install-ready JSON plus direct actions for Cursor, VS Code, and Claude Code.",
            "For Claude Code, copy the generated `claude mcp add` command. For Cursor and VS Code, use the install actions from the MCP detail page.",
          ],
        },
        {
          title: "Troubleshooting",
          body: [
            "If a skill or MCP does not show up immediately, restart the editor or Claude client and verify that the config path matches your operating system.",
            "For MCPs, also check environment variables and authentication requirements in the linked source or docs page.",
          ],
        },
      ]}
      title="Install Claude skills and MCPs"
    />
  );
}
