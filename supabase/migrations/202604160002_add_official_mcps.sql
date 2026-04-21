insert into public.skills (
  id,
  content_type,
  title,
  description,
  skill_md,
  source_url,
  docs_url,
  tags,
  category,
  difficulty,
  creator_id,
  listing_status,
  is_premium,
  featured
)
values
  (
    '6e1e5f20-4f6d-4a52-a8e4-d2d2c1a2a101',
    'mcp',
    'Stripe MCP',
    'Official Stripe MCP server for payments, subscriptions, customer operations, and Stripe documentation search.',
    '{
  "mcpServers": {
    "stripe": {
      "type": "http",
      "url": "https://mcp.stripe.com"
    }
  }
}',
    'https://docs.stripe.com/mcp',
    'https://docs.stripe.com/mcp',
    array['mcp', 'stripe', 'payments', 'billing'],
    'Backend',
    'Beginner',
    null,
    'approved',
    false,
    true
  ),
  (
    '6e1e5f20-4f6d-4a52-a8e4-d2d2c1a2a102',
    'mcp',
    'Notion MCP',
    'Official Notion MCP server for workspace search, docs, task management, and writing directly inside Notion.',
    '{
  "mcpServers": {
    "notion": {
      "type": "http",
      "url": "https://mcp.notion.com/mcp"
    }
  }
}',
    'https://developers.notion.com/docs/mcp',
    'https://developers.notion.com/guides/mcp/get-started-with-mcp',
    array['mcp', 'notion', 'workspace', 'documentation'],
    'Productivity',
    'Beginner',
    null,
    'approved',
    false,
    true
  ),
  (
    '6e1e5f20-4f6d-4a52-a8e4-d2d2c1a2a103',
    'mcp',
    'Linear MCP',
    'Official Linear MCP server for issues, projects, comments, and product planning workflows inside developer tools.',
    '{
  "mcpServers": {
    "linear": {
      "type": "http",
      "url": "https://mcp.linear.app/mcp"
    }
  }
}',
    'https://linear.app/docs/mcp',
    'https://linear.app/docs/mcp',
    array['mcp', 'linear', 'issues', 'product'],
    'Productivity',
    'Intermediate',
    null,
    'approved',
    false,
    true
  ),
  (
    '6e1e5f20-4f6d-4a52-a8e4-d2d2c1a2a104',
    'mcp',
    'Asana MCP',
    'Official Asana MCP server for tasks, projects, and Work Graph access through compatible AI clients.',
    '{
  "mcpServers": {
    "asana": {
      "type": "http",
      "url": "https://mcp.asana.com/v2/mcp"
    }
  }
}',
    'https://developers.asana.com/docs/mcp-server',
    'https://developers.asana.com/docs/using-asanas-mcp-server',
    array['mcp', 'asana', 'tasks', 'project-management'],
    'Productivity',
    'Intermediate',
    null,
    'approved',
    false,
    false
  ),
  (
    '6e1e5f20-4f6d-4a52-a8e4-d2d2c1a2a105',
    'mcp',
    'Cloudflare API MCP',
    'Official Cloudflare API MCP server for DNS, Workers, R2, Zero Trust, and other Cloudflare platform actions.',
    '{
  "mcpServers": {
    "cloudflare-api": {
      "type": "http",
      "url": "https://mcp.cloudflare.com/mcp"
    }
  }
}',
    'https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/',
    'https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/',
    array['mcp', 'cloudflare', 'infrastructure', 'devops'],
    'DevOps',
    'Intermediate',
    null,
    'approved',
    false,
    true
  ),
  (
    '6e1e5f20-4f6d-4a52-a8e4-d2d2c1a2a106',
    'mcp',
    'Cloudflare Docs MCP',
    'Official Cloudflare documentation MCP server for up-to-date product reference and setup guidance.',
    '{
  "mcpServers": {
    "cloudflare-docs": {
      "type": "http",
      "url": "https://docs.mcp.cloudflare.com/mcp"
    }
  }
}',
    'https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/',
    'https://developers.cloudflare.com/agents/model-context-protocol/mcp-servers-for-cloudflare/',
    array['mcp', 'cloudflare', 'docs', 'reference'],
    'Research',
    'Beginner',
    null,
    'approved',
    false,
    false
  )
on conflict (id) do nothing;
