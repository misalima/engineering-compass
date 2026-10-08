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
- `pnpm db:seed`: load Standard v1.1 + career path v2 topics and links (idempotent)

## Structure

- `src/growth/`: career goals, topics, milestones, validation and pure recommendation rules
- `src/standard/`: frozen seed (`standard-v1.1.json`) and its schema
- `src/progression/`: pure level, domain, and metric rules
- `src/db/`: Drizzle schema, client, and query functions (take a `db`, no auth, tested on PGlite)
- `src/data/`: server-only data access layer; checks the owner, then calls `src/db/`. Pages, components, actions, and route handlers only import this (enforced by ESLint)
- `src/app/`: routes and thin Server Actions (validate → `src/data/` → invalidate owner views); everything except `/login` requires the owner session
- `src/components/`, `src/lib/`: UI and pure helpers (validation, links, owner check)
- `src/styles/tokens.css`: color tokens as `light-dark(light, dark)`; the theme (system, light, dark) is a `theme` cookie read by the root layout. Wrap always-dark areas (the Depth Gate images) in `.scheme-dark`
