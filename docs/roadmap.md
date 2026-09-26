# Engineering Compass — Roadmap

Implementation plan for the platform specified in [Standard v1.1, Part V](standard/standard-v1.1.md#part-v--platform-specification).

## Stack

- Next.js 16 (App Router, Server Actions), deployed on Vercel.
- Neon PostgreSQL + Drizzle ORM, versioned migrations in `drizzle/`.
- Auth.js with GitHub, restricted to a single owner account.
- Zod at input boundaries, Vitest for unit/integration tests.

## Data ownership

| Where | What |
|---|---|
| `docs/standard/standard-v1.1.md` | Human-readable spec. Frozen. |
| `src/standard/standard-v1.1.json` | Canonical machine-readable Standard with stable codes. Frozen. |
| PostgreSQL | Published Standard versions, assessments, events, projects. |
| `src/progression/` | Pure progression rules (levels, domain status, metrics). No I/O. |

Stable codes (`domain.testing`, `competency.testing.<slug>`, `experience.production-api`, `depth.go.<slug>`) are the persistent identity. Display text and list position never are.

## Phases

### Phase 0 — Domain design
- Seed JSON generated once from the Markdown by `scripts/parse-standard.ts`, then frozen.
- Zod seed schema and a test that asserts 24 domains / 455 competencies (71 · 171 · 188 · 25) / 27 experiences / 8 gates / 42 criteria and unique codes.
- Pure progression rules with unit tests (spec §15 “Required unit tests”).

**Done when:** `pnpm test` covers competency, domain, L1–L4, Not applicable, regression, experience, and Depth Gate rules.

### Phase 1 — Private core
- Drizzle schema, migrations, idempotent `pnpm db:seed`.
- Single-owner auth, enforced in `proxy.ts`, in the private layout, and in every Server Action.
- Dashboard, Domains, Domain detail, competency assessment, Experience Matrix, Depth Gates.

**Done when:** every competency, experience, and depth criterion can be assessed, each change writes an event, and the level is derived.

### Phase 2 — Context and history (completes the MVP)
- Optional notes/evidence Markdown, sanitized rendering, `http`/`https` links only.
- Projects, history timeline, JSON and Markdown export.
- Vercel deploy, GitHub Actions CI (lint, typecheck, test, build, audit), backup/restore notes.

**Done when:** spec §17 “MVP complete” holds.

### Phase 3 — Reflection and focus
Weekly Review, focus items, review reminders, deterministic next-gap recommendation (spec §5.3).

### Phase 4 — Publication
Visibility controls, public profile, allowlisted snapshot for misaellima.com, privacy preview.

### Phase 5 — Standard evolution
Customizations, version drafts, migration between versions, diff and impact.

## Operations

- Env vars: see `.env.example`.
- Migrations: `pnpm db:generate` after schema changes, `pnpm db:migrate` to apply.
- Seed: `pnpm db:seed` (safe to re-run).
- Backup/restore: Neon point-in-time restore covers the database; `/export/json` is the portable user-level backup. Test a restore into a Neon branch before relying on it.
- CI: `.github/workflows/ci.yml` runs lint, typecheck, test, build, and `pnpm audit` on every push and PR.

### First deploy

1. Create a Neon project (or add the Vercel Neon integration). It sets `DATABASE_URL` (pooled) and `DATABASE_URL_UNPOOLED`.
2. Create a GitHub OAuth app. Callback: `https://<domain>/api/auth/callback/github`. Set `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`.
3. Set `AUTH_SECRET` (`openssl rand -base64 32`) and `AUTH_OWNER_GITHUB_ID` (your numeric id from `https://api.github.com/users/<login>`).
4. Locally, with the same values in `.env.local`: `pnpm db:migrate && pnpm db:seed`.
5. Import the repo in Vercel and deploy. Run `pnpm db:migrate` before deploying any later schema change.
