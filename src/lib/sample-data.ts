import type { Skill } from "@/lib/types";

export const categories = ["Research", "Writing", "Engineering", "Marketing", "Operations", "Data"];
export const difficulties = ["Beginner", "Intermediate", "Advanced"] as const;

export const sampleSkills: Skill[] = [
  {
    id: "literature-review-scout",
    title: "Literature Review Scout",
    description: "Finds, compares, and summarizes research papers into a structured evidence brief.",
    tags: ["research", "papers", "summary"],
    category: "Research",
    difficulty: "Intermediate",
    creator_id: null,
    upvotes: 142,
    created_at: "2026-02-12T10:00:00.000Z",
    users: { name: "Maya Chen", github_url: "https://github.com/example" },
    skill_md: `# Literature Review Scout

Use this skill to turn a research question into a concise evidence brief.

## Workflow

1. Restate the research question and scope.
2. Identify relevant search terms and inclusion criteria.
3. Compare methods, sample sizes, and limitations.
4. Summarize consensus, disagreement, and open questions.

## Output

- Executive summary
- Paper comparison table
- Evidence confidence rating
- Recommended next searches`
  },
  {
    id: "api-integration-planner",
    title: "API Integration Planner",
    description: "Converts third-party API docs into implementation plans, edge cases, and test scenarios.",
    tags: ["engineering", "api", "testing"],
    category: "Engineering",
    difficulty: "Advanced",
    creator_id: null,
    upvotes: 98,
    created_at: "2026-02-21T10:00:00.000Z",
    users: { name: "Jon Bell", github_url: null },
    skill_md: `# API Integration Planner

Use this skill when integrating an external API.

## Inputs

- API documentation
- Auth model
- Required endpoints
- Product behavior

## Process

Map endpoints to product actions, call out rate limits, design retry behavior, and generate contract tests.

## Deliverables

- Integration checklist
- Data model notes
- Error handling plan
- Test matrix`
  },
  {
    id: "launch-copy-lab",
    title: "Launch Copy Lab",
    description: "Generates and critiques landing page copy for developer-focused products.",
    tags: ["copywriting", "landing-page", "positioning"],
    category: "Marketing",
    difficulty: "Beginner",
    creator_id: null,
    upvotes: 120,
    created_at: "2026-03-02T10:00:00.000Z",
    users: { name: "Ari Lane", github_url: null },
    skill_md: `# Launch Copy Lab

Create clear launch copy for a technical audience.

## Steps

1. Define user, pain, and desired outcome.
2. Draft headline, subheadline, proof, and CTA.
3. Remove vague claims and jargon.
4. Produce three variants with different angles.

## Style

Specific, useful, concise, and credible.`
  },
  {
    id: "incident-retro-facilitator",
    title: "Incident Retro Facilitator",
    description: "Turns incident notes into a blameless retrospective with action items.",
    tags: ["ops", "incident", "retrospective"],
    category: "Operations",
    difficulty: "Intermediate",
    creator_id: null,
    upvotes: 84,
    created_at: "2026-03-11T10:00:00.000Z",
    users: null,
    skill_md: `# Incident Retro Facilitator

Use this after outages, regressions, or high-severity bugs.

## Output

- Timeline
- Customer impact
- Detection gaps
- What went well
- What could improve
- Action items with owners

Keep the language blameless and evidence-based.`
  },
  {
    id: "sql-debugger",
    title: "SQL Debugger",
    description: "Explains slow or incorrect SQL queries and proposes safer replacements.",
    tags: ["sql", "data", "debugging"],
    category: "Data",
    difficulty: "Advanced",
    creator_id: null,
    upvotes: 76,
    created_at: "2026-03-18T10:00:00.000Z",
    users: { name: "Priya Shah", github_url: "https://github.com/example" },
    skill_md: `# SQL Debugger

Analyze a SQL query for correctness, performance, and maintainability.

## Checklist

- Validate joins and cardinality
- Find filter placement issues
- Check indexes and scan risks
- Explain null handling
- Suggest a rewritten query

Always describe tradeoffs before changing semantics.`
  },
  {
    id: "pr-review-coach",
    title: "PR Review Coach",
    description: "Reviews pull requests with a focus on bugs, regressions, and missing tests.",
    tags: ["code-review", "quality", "tests"],
    category: "Engineering",
    difficulty: "Intermediate",
    creator_id: null,
    upvotes: 165,
    created_at: "2026-03-24T10:00:00.000Z",
    users: null,
    skill_md: `# PR Review Coach

Review code like a senior engineer.

## Priorities

1. Correctness bugs
2. Security and data-loss risks
3. Behavioral regressions
4. Missing tests
5. Maintainability

Lead with findings. Include file references. Keep tone constructive.`
  }
];

