# Engineering Compass — Career path v2.0

Reviewed: 2026-10-05. Canonical data: `src/growth/catalog-v2.json`.

## Purpose

Track professional development: record what you studied, assess what you can do, compare that evidence with a chosen career milestone, and identify the next useful topic. The product does not prescribe courses or generate learning activities.

The v2 path organizes all 455 existing v1.1 competencies into 92 study topics across 24 domains. Existing competency codes and assessments remain valid. The v1.1 Standard is frozen as a reference; its old level ladder is not the personalized career path.

## Model and granularity

- A career profile selects Backend or Backend + AI, a primary language (Go, TypeScript/Node.js, Python), tool priorities and a target milestone.
- A domain contains topics; a topic groups 2–10 related observable competencies around a coherent area of study. Topic scope says what to cover without becoming a course syllabus. Topics are not time estimates or single study sessions.
- A study entry has one topic, a calendar date, optional notes and an optional HTTP(S) reference. Multiple entries are allowed. Dates are date-only values, not UTC instants. Entries can be corrected or deleted.
- A competency assessment expresses practical capability. Existing statuses retain their database identity: not_started = not assessed yet, in_progress = can do with help, mastered = can do independently, review_required = needs reassessment. Historical in_progress entries should be reviewed under the clarified meaning; no study records are fabricated from them.
- Notes or evidence support the assessment but are not externally verified. Study counts never satisfy competency requirements. Evidence coverage is shown separately.

Example: **Database transactions and isolation** covers transaction boundaries, commit/rollback, ACID and isolation anomalies. Its three existing competencies are required from Mid-level onward. Reading about isolation creates a study record; assessing a competency is a separate action.

## Milestones and interpretation

Milestones are cumulative, based only on competencies in the selected career path:

1. **Programming foundations**: small programs, core language concepts, debugging, collections, terminal use and reviewable Git changes.
2. **Junior Software Engineer**: scoped implementation with review and guidance; core service delivery, SQL, tests, safe inputs, deployment basics, communication and accessible interface literacy.
3. **Mid-level Software Engineer**: feature ownership, local technical decisions, transactions, modular architecture, production diagnosis and reliable integrations. Backend + AI adds responsible model integration and evaluation at this stage.
4. **Strong Software Engineer**: cross-system failure reasoning, scaling, performance, recovery, advanced AI workflows where selected, and technical communication/mentoring.

“Independent” is relative to the bounded competency statement; a junior still receives direction and review on feature scope. Completing a milestone means its explicit self-assessment requirements are met. It is not a hiring credential, SFIA certification, job-title assignment, or a guarantee of sustained workplace performance. The Strong milestone is intentionally not labeled Senior: organizational impact and leadership expectations vary.

Milestone placements and topic groupings are original editorial judgments, informed by the references below. Sources do not endorse these exact cutoffs. Requirements and counts are visible so this judgment can be reviewed rather than hidden behind a career percentage.

## Stack and recommendations

The primary language determines the required language competencies. Unselected languages remain browsable. For Backend + AI, Python is a supporting Mid-level requirement when it is not the primary language. Selecting Backend alone removes the AI-engineering requirements. Frontend, security and infrastructure literacy remain part of engineering capability.

The target is explicit; completing it prompts the owner to choose another rather than silently changing the goal. Within its unsatisfied topics, recommendation order is:

1. Earliest incomplete prerequisite milestone.
2. Competencies marked for reassessment.
3. Existing study activity or practical progress.
4. Primary language (+10), selected tool affinity (+8), backend systems focus (+6), AI focus if selected (+6).
5. Stable catalog order as tie-breaker.

Tool affinities are explicit in `src/growth/progress.ts`; they change priority, not the definition of competence. No LLM, opaque score, learning-time forecast or content-consumption completion rule is used. Full-catalog browsing remains available when the owner wants a different focus. A `not_applicable` assessment cannot silently remove a requirement from this published path.

## Research and source mapping

Primary sources were checked on 2026-10-05. Each topic carries source IDs, and its page links to the corresponding references. The references serve different purposes: professional frameworks support breadth/autonomy, language manuals support language scope, and system documentation supports technical distinctions. References are reading starting points; the product does not reproduce their chapters.

| Reference | Used for | Limits |
| --- | --- | --- |
| [SFIA 9: Programming/software development](https://sfia-online.org/en/sfia-9/skills/programming-software-development) | Incremental autonomy, task complexity, collaboration and responsibility | No one-to-one mapping between SFIA levels and Compass job titles |
| [IEEE Computer Society: SWEBOK v4](https://www.computer.org/education/bodies-of-knowledge/software-engineering) | Breadth across requirements, design, testing, maintenance and professional practice | Knowledge areas guide organization; they do not prescribe a junior checklist |
| [MIT: Introduction to Algorithms](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/pages/syllabus/) | Data structures, algorithm reasoning and complexity | This path uses practical subsets, not an academic course completion requirement |
| [Effective Go](https://go.dev/doc/effective_go), [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html), [Node.js event loop](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop), [Python Tutorial](https://docs.python.org/3/tutorial/) | Language and runtime topic boundaries | Effective Go is a foundational guide, not complete coverage of modern modules/generics |
| [Pro Git](https://git-scm.com/book/en/v2) | Change management, collaboration and recovery | Team workflow still varies |
| [PostgreSQL docs](https://www.postgresql.org/docs/current/), [transactions](https://www.postgresql.org/docs/current/tutorial-transactions.html), [isolation](https://www.postgresql.org/docs/current/transaction-iso.html) | SQL, constraints, atomicity, isolation and operational database behavior | Engine-specific details are not universal database behavior |
| [IETF RFC 9110](https://www.rfc-editor.org/rfc/rfc9110.html) | HTTP semantics and contracts | API product design remains a separate engineering judgment |
| [MIT Distributed Systems](https://pdos.csail.mit.edu/6.824/schedule.html) | Consistency, replication, failure and distributed coordination | No requirement to implement every academic algorithm |
| [OWASP Top 10](https://owasp.org/projects/top-ten) | Security risk coverage and trust boundaries | An awareness framework, not an exhaustive security verification standard |
| [Docker overview](https://docs.docker.com/get-started/docker-overview/) | Containers, images, networks and storage | Cloud and rollout topics also use SRE references |
| [Google SRE](https://sre.google/sre-book/table-of-contents/), [OpenTelemetry primer](https://opentelemetry.io/docs/concepts/observability-primer/) | Reliability, telemetry, operational diagnosis and capacity | Large-scale practices should be adapted to actual service needs |
| [Google AI structured outputs](https://ai.google.dev/gemini-api/docs/structured-output), [function calling](https://ai.google.dev/gemini-api/docs/function-calling), [RAG overview](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/rag-engine/rag-overview), [evaluation](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/models/evaluation-overview) | Runtime schemas, tool boundaries, retrieval stages and evaluation methods | Provider examples illustrate implementation; the path remains provider-neutral |
| [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) | AI risk, evaluation, governance, data boundaries and human oversight | Does not prescribe SDKs or every RAG/tool implementation detail; those capabilities are retained from v1.1 |
| [MDN core web development](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core) | Accessible interface, browser and frontend literacy | Supporting knowledge for this backend-oriented path |

## Compatibility and future changes

The catalog is a versioned extension, not a destructive replacement of competency identities. Topic/competency relationships and first milestones are seeded into additive tables; runtime path definitions use the frozen, tested JSON. `pnpm db:seed` creates missing catalog rows and refreshes bibliography IDs for the same catalog version without rewriting topic semantics or owner data. Editing a published topic's semantic meaning requires a new catalog policy/version and an explicit migration; do not silently reuse a code for a different skill.

Exports include the full path snapshot, career profile, study history and milestone counts alongside legacy assessments/projects/events. The older Standard remains available through the reference section for comparison.
