insert into public.users (id, name, github_url) values
  ('00000000-0000-0000-0000-000000000001', 'Maya Chen', 'https://github.com/example'),
  ('00000000-0000-0000-0000-000000000002', 'Jon Bell', null)
on conflict (id) do nothing;

insert into public.skills (title, description, skill_md, tags, category, difficulty, creator_id, status, upvotes) values
(
  'Literature Review Scout',
  'Finds, compares, and summarizes research papers into a structured evidence brief.',
  '# Literature Review Scout

Use this skill to turn a research question into a concise evidence brief.

## Workflow

1. Restate the research question and scope.
2. Identify relevant search terms and inclusion criteria.
3. Compare methods, sample sizes, and limitations.
4. Summarize consensus, disagreement, and open questions.',
  array['research', 'papers', 'summary'],
  'Research',
  'Intermediate',
  '00000000-0000-0000-0000-000000000001',
  'approved',
  142
),
(
  'API Integration Planner',
  'Converts third-party API docs into implementation plans, edge cases, and test scenarios.',
  '# API Integration Planner

Use this skill when integrating an external API.

## Deliverables

- Integration checklist
- Data model notes
- Error handling plan
- Test matrix',
  array['engineering', 'api', 'testing'],
  'Engineering',
  'Advanced',
  '00000000-0000-0000-0000-000000000002',
  'approved',
  98
),
(
  'PR Review Coach',
  'Reviews pull requests with a focus on bugs, regressions, and missing tests.',
  '# PR Review Coach

Review code like a senior engineer.

## Priorities

1. Correctness bugs
2. Security and data-loss risks
3. Behavioral regressions
4. Missing tests

Lead with findings. Include file references. Keep tone constructive.',
  array['code-review', 'quality', 'tests'],
  'Engineering',
  'Intermediate',
  null,
  'approved',
  165
);
