export const primaryKeywords = [
  "Claude skills directory",
  "Claude skills",
  "SKILL.md",
  "Claude Code MCP",
  "MCP servers directory",
  "MCP servers for Claude Code",
  "add MCP to Cursor",
  "add MCP to VS Code",
  "install Claude skills",
  "Claude workflow templates",
] as const;

export function getSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;

  if (explicit) {
    return explicit;
  }

  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return "http://localhost:3000";
}
