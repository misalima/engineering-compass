# Engineering Compass

Personal professional-development tracker, published at [skills.misaellima.com](https://skills.misaellima.com).

- Career path v2: [topics, milestones and research](docs/standard/career-path-v2.md)
- Architecture: [boundaries, cache and rollout](docs/architecture.md)
- Original Standard: [docs/standard/standard-v1.1.md](docs/standard/standard-v1.1.md)
- Implementation plan: [docs/roadmap.md](docs/roadmap.md)

```bash
pnpm install
cp .env.example .env.local   # fill in the values
pnpm db:migrate && pnpm db:seed
pnpm dev
```

## Scripts

- `pnpm test`: unit and integration tests (Vitest)
- `pnpm typecheck`, `pnpm lint`
- `pnpm db:generate`: create a migration after editing `src/db/schema.ts`
- `pnpm db:migrate`: apply migrations
- `pnpm db:seed`: load Standard v1.1 + career path v2 topics, subtopics and links (idempotent)

## Structure

- `src/growth/`: career goals, topics, milestones, validation and pure recommendation rules
- `src/standard/`: frozen seed (`standard-v1.1.json`) and its schema
- `src/progression/`: pure level, domain, and metric rules
- `src/db/`: Drizzle schema, client, and query functions (take a `db`, no auth, tested on PGlite)
- `src/data/`: server-only data access layer; checks the owner, then calls `src/db/`. Pages, components, actions, and route handlers only import this (enforced by ESLint)
- `src/app/`: routes and thin Server Actions (validate → `src/data/` → invalidate owner views); everything except `/login` requires the owner session
- `src/components/`, `src/lib/`: UI and pure helpers (validation, links, owner check)
- `src/styles/tokens.css`: color tokens as `light-dark(light, dark)`; the theme (system, light, dark) is a `theme` cookie read by the root layout. Wrap always-dark areas (the Depth Gate images) in `.scheme-dark`

## Study checklist (path v2.1)

All 92 topics have curated study units (475 in total). Topic pages put the checklist before practical assessments. Checking a unit records a study dated in the browser's local calendar; unchecking removes current coverage but preserves historical studies. Notes and links can be edited in Study history. Checklist progress never grants a competency or advances a career milestone. The JSON/Markdown exports include checklist progress.

The subtopics refine each topic's existing scope and inherit its primary references. Collection details were checked against the Python Tutorial and MDN collections documentation. Codes identify study units independently of wording or order: preserve codes when changing a label, and give a new code to a new learning unit.

Before deploying this version, run `pnpm db:migrate` then `pnpm db:seed` against **each intended Neon branch**, including production. The new migration adds `study_subtopics` and `subtopic_completions`; it preserves existing studies and assessments. Deploying application code does not migrate a different database branch automatically. Set `DATABASE_URL` and `DATABASE_URL_UNPOOLED` to the same intended branch for these commands; explicit process environment variables take precedence over local env files.
