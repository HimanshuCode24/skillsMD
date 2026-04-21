export type InstallPlatform = "mac" | "linux" | "windows";
export type InstallTarget = "skill" | "mcp";

export function slugifySkillName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getInstallPath(
  platform: InstallPlatform,
  slug: string,
  target: InstallTarget,
) {
  if (target === "mcp") {
    if (platform === "windows") {
      return `%APPDATA%\\Claude\\claude_desktop_config.json`;
    }

    if (platform === "linux") {
      return `~/.config/Claude/claude_desktop_config.json`;
    }

    return `~/Library/Application Support/Claude/claude_desktop_config.json`;
  }

  if (platform === "windows") {
    return `%USERPROFILE%\\.claude\\skills\\${slug}\\SKILL.md`;
  }

  return `~/.claude/skills/${slug}/SKILL.md`;
}

export function getInstallCommand(
  platform: InstallPlatform,
  slug: string,
  target: InstallTarget,
) {
  if (target === "mcp") {
    switch (platform) {
      case "mac":
        return `mkdir -p ~/Library/Application\\ Support/Claude && touch ~/Library/Application\\ Support/Claude/claude_desktop_config.json && open -e ~/Library/Application\\ Support/Claude/claude_desktop_config.json`;
      case "linux":
        return `mkdir -p ~/.config/Claude && touch ~/.config/Claude/claude_desktop_config.json && nano ~/.config/Claude/claude_desktop_config.json`;
      case "windows":
        return `New-Item -ItemType Directory -Force "$env:APPDATA\\Claude" | Out-Null; New-Item -ItemType File -Force "$env:APPDATA\\Claude\\claude_desktop_config.json" | Out-Null; notepad "$env:APPDATA\\Claude\\claude_desktop_config.json"`;
    }
  }

  switch (platform) {
    case "mac":
      return `mkdir -p ~/.claude/skills/${slug} && touch ~/.claude/skills/${slug}/SKILL.md && open -e ~/.claude/skills/${slug}/SKILL.md`;
    case "linux":
      return `mkdir -p ~/.claude/skills/${slug} && touch ~/.claude/skills/${slug}/SKILL.md && nano ~/.claude/skills/${slug}/SKILL.md`;
    case "windows":
      return `New-Item -ItemType Directory -Force "$env:USERPROFILE\\.claude\\skills\\${slug}" | Out-Null; New-Item -ItemType File -Force "$env:USERPROFILE\\.claude\\skills\\${slug}\\SKILL.md" | Out-Null; notepad "$env:USERPROFILE\\.claude\\skills\\${slug}\\SKILL.md"`;
  }
}
