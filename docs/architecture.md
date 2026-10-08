# Architecture and data flow

## Dependency direction

- `src/growth/`: framework-independent career model, published catalog, input schemas and pure progression/recommendation functions. No React, Next.js, authentication or database dependencies.
- `src/progression/`: original v1.1 rules retained for the Standard reference screens.
- `src/db/`: Drizzle adapters accepting a database handle. Schema, transactions, indexes, reads, writes and additive seeding live here. No auth or UI dependencies.
- `src/data/`: server-only application boundary. Authenticates the owner, validates commands, composes repositories and feeds pure rules. Private data is never placed in a shared process cache.
- `src/app/`: route composition and thin Server Actions. Actions parse transport values, call application functions and invalidate cached owner views after successful writes.
- `src/components/growth/`: forms, topic browser and history presentation. Client components receive small view models rather than database objects or the whole competency catalog.

ESLint enforces the important dependency boundaries. This is a modular application; no service containers, repository factories or cross-process infrastructure are needed for a single-owner tracker.

## Data model

`study_topics` references existing domains; `topic_competencies` links existing competency IDs. `study_entries` references a topic and stores study calendar dates, notes and links. `career_profiles` is a singleton with goal, primary language, tools and target. Existing competencies, assessments, projects and event history are untouched.

The catalog and its source registry are immutable application data. The database stores its identities/relationships to enforce foreign keys for owner records; seeding is an explicit deployment step, never a read-path side effect. Pure rules read the same catalog JSON, validated for full unique coverage of all v1.1 competencies. Existing v1.1 query round-trip tests verify the base Standard.

## Cache and performance policy

- Neon standalone queries use HTTP through `Pool.query()` (`poolQueryViaFetch`); interactive repository transactions retain WebSocket sessions through `Pool.connect()`. WebSocket connections have a 10-second acquisition timeout and idle expiry, with a five-minute maximum lifetime. This avoids keeping persistent sessions for ordinary page reads; it does not retry failed writes.
- Next.js browser Router Cache stores dynamic route segments for 60 seconds and prefetched/static segments for 180 seconds (`experimental.staleTimes`, documented by the installed Next.js version). This is in-memory navigation caching, not localStorage or offline persistence.
- Every owner mutation invalidates the root layout via `src/data/invalidate.ts`. This covers both new and existing actions so revisiting a page does not retain stale career, study or assessment results after a write. No optimistic completion is shown before the server accepts a change.
- Auth.js sign-out invalidates the session cookie; subsequent server reads remain owner-protected. No personalized data is shared across users or requests in a global data cache. Changes made from a different tab/device may remain visible until the route cache expires or the page is refreshed; realtime cross-device synchronization is out of scope.
- React `cache` deduplicates repeated data/auth reads within a server render. The published Standard is bundled; its active database identity is cached per server process after the owner check, replacing seven catalog reconstruction queries on cold requests.
- Career screens query only competency status and evidence presence, profile and grouped study counts. Legacy experience/depth assessments are loaded only by pages needing the original overview.
- Study history is paginated and indexed by date/id and topic/date. Recommendation input uses SQL grouped counts/latest dates, not all notes or study history. Dashboard history is limited to five rows.
- The topic browser opens with the complete catalog across every domain, language and milestone. The optional milestone filter shows hidden-topic counts and a direct action to reveal them, so later/optional topics never look like missing catalog data.
- Topic search/domain/path filters operate on compact client props immediately, without a server request per keystroke. The full catalog and competency mapping stay out of the filter component's imports.
- New routes have loading boundaries. The initial view and private data are rendered on the server; interactivity is limited to forms and filters.

There is no production performance benchmark implied by these structural improvements. Measure warm navigation, cold requests and database latency against the same dataset before claiming a numerical speedup. Cache times are intentionally short and can be tuned after measurement.

## Validation and rollout

Run `pnpm test`, `pnpm lint`, `pnpm typecheck`, `pnpm build`. Integration tests apply the actual SQL migrations to fresh PGlite/Postgres databases, seed the legacy Standard and the new catalog, and verify idempotency, constraints, profile isolation, study CRUD and unchanged assessments. Pure tests cover milestone cumulativity, regression, stack selection, goal changes, ranking, study/capability separation and complete-catalog integrity.

Deployment order: `pnpm db:migrate`, then `pnpm db:seed`, then deploy the application. The migration only adds tables/types/indexes, allowing the previous application to continue running during rollout. Rollback the application without dropping study or career tables. Never roll back by deleting owner records.
