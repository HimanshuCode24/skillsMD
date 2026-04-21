type McpTransport = "stdio" | "http" | "sse";

type McpServerConfig = {
  type?: McpTransport;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
  url?: string;
};

type ParsedMcpConfig = {
  name: string;
  config: McpServerConfig;
};

function encodeBase64(value: string) {
  if (typeof window === "undefined") {
    return Buffer.from(value, "utf8").toString("base64");
  }

  return window.btoa(unescape(encodeURIComponent(value)));
}

export function parseMcpConfig(skillMd: string): ParsedMcpConfig | null {
  try {
    const parsed = JSON.parse(skillMd) as {
      mcpServers?: Record<string, McpServerConfig>;
    };

    const firstEntry = Object.entries(parsed.mcpServers ?? {})[0];

    if (!firstEntry) {
      return null;
    }

    const [name, config] = firstEntry;
    return {
      name,
      config,
    };
  } catch {
    return null;
  }
}

export function getCursorInstallHref(config: ParsedMcpConfig) {
  const payload = JSON.stringify({
    [config.name]: config.config,
  });

  return `cursor://anysphere.cursor-deeplink/mcp/install?name=${encodeURIComponent(config.name)}&config=${encodeURIComponent(encodeBase64(payload))}`;
}

export function getVsCodeInstallHref(config: ParsedMcpConfig) {
  const payload = JSON.stringify({
    name: config.name,
    ...config.config,
  });

  return `vscode:mcp/install?${encodeURIComponent(payload)}`;
}

export function getClaudeCodeInstallCommand(config: ParsedMcpConfig) {
  const { name } = config;

  if (config.config.type === "http" || config.config.type === "sse") {
    return `claude mcp add --transport ${config.config.type} ${name} ${config.config.url ?? ""}`.trim();
  }

  const envArgs = Object.entries(config.config.env ?? {})
    .map(([key, value]) => `--env ${key}=${value}`)
    .join(" ");
  const commandParts = [config.config.command, ...(config.config.args ?? [])]
    .filter(Boolean)
    .join(" ");

  return `claude mcp add ${name} ${envArgs} -- ${commandParts}`.replace(/\s+/g, " ").trim();
}

export function getMcpConfigFileName(name: string) {
  return `${name}.json`;
}
