# Engineering Growth Platform

> Product specification and personal Software Engineering growth standard  
> **Standard:** v1.1  
> **Track:** Backend Engineering + AI  
> **Initial owner:** Misael Lima  
> **Status:** implementation baseline

> **Implementation deviations (recorded 2026-09-24, not part of the Standard text)**
>
> - Part V §3 recommends vinext + Cloudflare. Engineering Compass is built with **Next.js 16** deployed on **Vercel**, with **Neon PostgreSQL** and **Drizzle ORM**.
> - This file is frozen. Changes to the Standard become a new versioned file (for example `standard-v1.2.md`) plus a new seed, never an in-place edit.
> - Machine-readable seed: `src/standard/standard-v1.1.json`.

---

## 1. Purpose

This platform exists to answer four questions using observable criteria:

1. What should I know?
2. What am I able to do?
3. What exactly counts as mastery?
4. What is the next most important gap?

It must not be merely a list of studied topics or a subjective seniority gauge. It should work as a personal, versioned professional-development system in which every competency is specific enough for an honest, objective self-assessment.

The personal target for this track is:

> **L4 — Strong Software Engineer**, with strong depth in backend and AI Engineering.

L5 remains a career reference, but it is not a level that can be completed through study or personal projects alone. It requires a repeated professional track record, work in ambiguous contexts, and technical influence on other people.

---

## 2. Technical positioning of the track

- **Go:** deepest language expertise; backend, concurrency, services, and architecture.
- **TypeScript:** professional proficiency; Node.js, end-to-end applications, integrations, and the web ecosystem. NestJS may be used; it is not the identity of the competency.
- **Python:** working proficiency; AI, data, scripts, notebooks, and small services.
- **Frontend:** enough literacy to build, integrate, and diagnose functional interfaces; it is not a primary specialization.
- **AI Engineering:** building AI-enabled software systems with evaluation, observability, security, cost control, and reliability. The mid-level bar is using models as a production dependency. RAG, agents, and eval loops are L4 on this track.
- **Engineering with AI:** using agents and models to develop software without outsourcing understanding, review, or architectural decisions.

A fourth language is not part of Standard v1.1.

---

## 3. Principles of the Standard

### 3.1 The Standard measures capability, not exposure

Having read about something, watched a lesson, used it once, or recognizing a term is not enough to mark a competency as mastered.

A competency may receive the **Mastered** status only when the following statement is true:

> I can do this independently, consulting documentation when necessary, and I can explain why my solution works.

### 3.2 AI is allowed

Using AI does not invalidate competency. However, the user must still:

- understand the solution;
- review the result critically;
- detect relevant errors;
- debug it when necessary;
- modify the implementation substantially;
- explain decisions and trade-offs;
- take responsibility for what was delivered.

AI-generated code accepted without understanding does not count as mastery.

### 3.3 Knowledge, competency, and experience are different

- **Knowledge:** conceptual map of what should be known.
- **Competency:** a specific, self-assessable operational capability expressed as “I can…”.
- **Experience:** integrated practice in a real system or context.
- **Depth Gate:** depth beyond the L3 baseline in strategic areas, exercised repeatedly or in a real system.
- **Assessment context:** optional Markdown notes or links that help the user remember why a status was chosen; they are not required proof and are not a separate entity.

### 3.4 Competencies must define mastery

The wording of each competency must make the threshold for mastery explicit. Words such as “understand,” “correctly,” “appropriately,” “robust,” or “basic” must not carry an undefined requirement.

A competency is well formed when it states an observable capability, relevant conditions, and—when needed—the trade-off or failure mode the user must be able to explain.

Weak:

> I can use transactions correctly.

Strong:

> I can identify an atomicity boundary, implement commit and rollback paths, keep the transaction scoped to the required database work, test partial failure, and explain how the selected isolation level affects the operation.

If a capability would become unreadable as one sentence, it may include a short **Mastery criteria** list. Those criteria clarify the single assessment; they do not become additional progress checkboxes.

### 3.5 Progress may regress

A competency may move from **Mastered** back to **In progress** when a review reveals that the previous understanding was shallow, outdated, or no longer reproducible. This is diagnosis, not punishment.

### 3.6 Levels are derived

The current level must never be manually editable. It is calculated from the requirements of the active Standard.

### 3.7 The Standard is personal, not a universal certification

This framework guides Misael’s growth and makes progress verifiable. It does not replace market evaluation, professional performance, interviews, or the criteria of a specific company.

### 3.8 Competencies are leveled

Each competency is required at exactly one level: **L1**, **L2**, **L3**, or **L4**.

- Earning Ln requires every competency tagged L1 through Ln, **except L4-only competencies, which never block L3**.
- In each domain, the earliest items are the **Core** of the job at that stage. Later items **Complete** the mid-level bar. Items tagged L4 are **Advanced** and belong to Strong Software Engineer.
- Knowledge topics are not leveled and are never completion checkboxes.
- Textbook vocabulary without a matching production behavior is Knowledge, not a required competency.
- The Experience Matrix is the market check. A competency that only restates a chapter title and has no matching experience should be demoted or removed in a later version.

---

## 4. Statuses and assessment rules

### 4.1 Competency statuses

| Status | Meaning | Counts toward completion? |
|---|---|---:|
| **Not started** | Not yet studied or practiced deliberately | No |
| **In progress** | There is partial understanding or practice, but the capability is not yet reliably reproducible | No |
| **Mastered** | The user can perform and explain every capability stated in the competency without step-by-step guidance | Yes |
| **Review required** | Was previously mastered, but the capability is no longer confidently explainable or reproducible | No |
| **Not applicable** | Excluded only by a versioned track change, never for convenience | Removed from denominator |

### 4.2 Optional notes and evidence

Each assessment may contain two optional Markdown fields:

- **Notes:** personal context, doubts, reminders, or reasoning about the selected status.
- **Evidence:** an optional description or one or more links to relevant code, a project, an article, a PR, or another reference.

Both fields are stored directly on the assessment. They are not separate entities, have no classification system, and never block a status change. URLs written in Markdown must render as safe, clickable links in the interface.

### 4.3 Domain completion rule

A domain is **mid-level complete** when:

- every competency in that domain tagged L1, L2, or L3 is **Mastered**;
- no such competency is in **Review required**.

L4 competencies in that domain do not block mid-level completion.

Knowledge topics are not completion checkboxes. Mastery is determined by the explicit wording and criteria of each competency, not by attached evidence.

---

## 5. Standard v1.1 structure

The Standard contains:

- **24 competency domains, with 455 competencies** (71 L1 · 171 L2 · 188 L3 · 25 L4);
- **27 engineering experiences**;
- **5 progression levels**;
- **8 Depth Gates, with 42 depth criteria**, of which **5** unlock L4 and all **8** form an optional Full Depth badge.

Each domain contains:

1. Knowledge;
2. Competencies grouped by required level;
3. Derived status.

### v1.1 changelog

v1.1 is a compatible revision of v1.0. It does not add domains. It levels existing competencies, removes textbook-only checkboxes, and adds a small set of market-critical capabilities that v1.0 left implicit.

**Removed as required competencies (kept as Knowledge where useful):** implement two sorts; implement linear/binary search; recognize dynamic programming; linked-list mastery; the SOLID tour; ports-and-adapters with two adapters; CAP as its own slogan; SWEBOK maintenance taxonomy; recursive CTE materialization; NestJS as the TypeScript identity; Go `pprof` at L1 (it remains Depth Gate 1).

**Moved later:** window functions, MVCC, deadlock drawing, pool sizing, backfills; WebSockets, distributed rate limits, idempotency stores; OIDC, SSRF, threat modeling, supply-chain pinning; SSR/hydration; full RAG/agents/evals; load and stress tests (already L4 experiences); capacity math and partition keys; distributed locks.

**Moved earlier:** TypeScript; observability core; professional-work core; Go concurrency hygiene.

**Added:** privacy/encryption/data lifecycle; outbox, compensation, circuit breaker; feature flags and progressive delivery; non-relational store choice; AI error analysis, hybrid retrieval, tool contracts, data leaving the boundary; time/money/Unicode; FinOps of a service; multi-tenant isolation; RPO/RTO; fail-closed; short RFC; OpenTelemetry by name; two L4 experiences (privacy lifecycle, cross-store workflow).

**L4 Depth Gates:** Go + Database + one of {Distributed, Reliability, AI} + any two of the remaining five. Completing all eight is a badge, not the L4 unlock.

---

# Part I — Competency Standard

## 1. Programming Fundamentals

### Knowledge

`variables` · `types` · `operators` · `control flow` · `functions` · `scope` · `immutability` · `recursion` · `error handling` · `input/output` · `memory` · `compilation` · `interpretation` · `debugging` · `time zones` · `money` · `Unicode`

### L1 — Core

- [ ] I can break a small problem down into inputs, rules, steps, and outputs.
- [ ] I can choose suitable data types to represent a problem.
- [ ] I can use conditionals and iteration constructs deliberately.
- [ ] I can create small, cohesive functions with clear contracts.
- [ ] I can predict where a variable is accessible, how long its value remains alive, and whether a mutation is visible to other parts of the program.
- [ ] I can explain pass-by-value and the effects of references or pointers in the language being used.
- [ ] I can treat errors as part of program flow.
- [ ] I can read files, process data, and produce outputs.
- [ ] I can explain recursion and decide when an iterative solution is preferable.
- [ ] I can distinguish compile-time errors, runtime errors, and logic errors.
- [ ] I can debug a program using breakpoints, state inspection, and logs.
- [ ] I can read a small unfamiliar codebase and explain its flow.
- [ ] I can explain conceptually how source code becomes a running program.

### L2 — Complete

- [ ] I can write deterministic code when the problem requires it.
- [ ] I can store timestamps in UTC, convert them for display with a named time zone, and identify DST, ambiguous local times, and date-only values as distinct problems.
- [ ] I can represent money as an integer minor-unit or a decimal type with an explicit currency, and reject binary floating point for balances, prices, or FX.
- [ ] I can treat user text as Unicode, normalize when equality or search requires it, and avoid truncating or sorting strings as raw bytes.

---

## 2. Data Structures and Algorithms

### Knowledge

`Big O` · `arrays/slices` · `linked lists` · `stack` · `queue` · `hash table` · `set` · `tree` · `heap` · `graph` · `sorting` · `searching` · `recursion` · `traversal` · `space-time trade-offs` · `dynamic programming`

### L1 — Core

- [ ] I can analyze the time and space complexity of a common solution and say which case — best, average, or worst — matters for its expected input.
- [ ] I can choose among arrays/slices, maps, sets, stacks, and queues from the required lookup, insertion, ordering, and duplication behavior.
- [ ] I can explain trees, heaps, and graphs conceptually and recognize when a library already implements them.
- [ ] I can choose among scanning, indexing, and hashing based on the lookup problem, and explain why production code uses a library sort rather than a hand-written one.
- [ ] I can identify memory-versus-time trade-offs.
- [ ] I avoid sophisticated data structures when a simple one solves the problem.

### L2 — Complete

- [ ] I can traverse a tree or graph with DFS or BFS when the problem is a traversal and explain the choice.
- [ ] I can choose a data structure from the dominant operation in the workload and solve an unfamiliar collection, search, or traversal problem while explaining invariants, complexity, and edge cases.

---

## 3. Go

### Knowledge

`packages` · `modules` · `types` · `structs` · `interfaces` · `methods` · `pointers` · `slices` · `maps` · `errors` · `defer` · `panic/recover` · `generics` · `context` · `goroutines` · `channels` · `toolchain` · `runtime` · `pprof`

### L1 — Core

- [ ] I can organize a Go application into packages with clear responsibilities.
- [ ] I can use modules and manage dependencies.
- [ ] I can model a domain using structs, types, methods, and composition.
- [ ] I can use small interfaces defined by the consumer.
- [ ] I can predict the effects of copying, mutating, and passing structs, pointers, slices, and maps, including their zero-value behavior.
- [ ] I can use slices and maps without ignoring their memory and mutability behavior.
- [ ] I can create and propagate errors with context.
- [ ] I can wrap errors with context and use `errors.Is` or `errors.As` to preserve programmatic inspection through the error chain.
- [ ] I can keep expected failures in the error flow, reserve `panic` for unrecoverable programmer/runtime conditions, and contain a panic at a justified process boundary.
- [ ] I can use `defer` deliberately.
- [ ] I can use generics when they reduce duplication without harming clarity.
- [ ] I can use `context.Context` for cancellation, deadlines, and request-scoped values.
- [ ] I can create HTTP handlers, middleware, and clients using the standard library or a lightweight framework.
- [ ] I can serialize, validate, and process JSON.
- [ ] I can access a relational database idiomatically.
- [ ] I can express repeated input/output cases as a table-driven test and keep behavior requiring distinct setup or assertions in separate tests.
- [ ] I can use `go fmt`, `go test`, `go vet`, and analysis tools.
- [ ] I can create reproducible builds and configure a Go application by environment.
- [ ] I can read standard-library documentation and source code to resolve questions.
- [ ] I can explain the idiomatic decisions in the Go code I deliver.

### L2 — Complete

- [ ] I can use goroutines, channels, mutexes, and synchronization primitives deliberately.
- [ ] I can detect race conditions using the language toolchain.

CPU, heap, and goroutine profiles are Depth Gate 1, not L1.

---

## 4. TypeScript + Node.js

### Knowledge

`JavaScript runtime` · `event loop` · `types` · `narrowing` · `generics` · `unions` · `async/await` · `promises` · `modules` · `Node.js` · `NestJS` · `validation` · `dependency injection` · `package management`

### L2 — Core

- [ ] I can explain that TypeScript checks and transforms source code while JavaScript executes at runtime, and identify cases where runtime validation is still required.
- [ ] I can use inference, annotations, unions, intersections, and narrowing.
- [ ] I can model contracts with `type` and `interface` deliberately.
- [ ] I can use generics when they increase safety and reuse.
- [ ] I avoid `any` and type assertions without justification.
- [ ] I can distinguish compile-time validation from runtime validation.
- [ ] I can work with Promises and `async/await`.
- [ ] I can predict the ordering of synchronous work, promises, timers, and I/O callbacks, and identify CPU-bound or synchronous operations that block the Node.js event loop.
- [ ] I can handle asynchronous errors and propagate context.
- [ ] I can organize modules and dependencies without unnecessary cycles.
- [ ] I can create a Node.js API with validation, authentication, a database, dependency injection I can explain, consistent error handling, and tests.
- [ ] I can configure linting, formatting, type checking, builds, and scripts.
- [ ] I can evaluate dependencies before adding them.
- [ ] I can explain how semantic version ranges select dependency versions, why a lockfile makes installs reproducible, and when the lockfile must be updated.
- [ ] I can diagnose common runtime, module, memory, and asynchronous-concurrency errors.
- [ ] I can explain the behavior of the TypeScript/Node.js code I deliver.

---

## 5. Python — Working Proficiency

### Knowledge

`syntax` · `collections` · `functions` · `modules` · `virtual environments` · `typing` · `exceptions` · `iterators` · `data processing` · `notebooks` · `testing` · `FastAPI` · `AI/data ecosystem` · `packaging`

### L3 — Core

- [ ] I can write readable Python scripts for automation and data processing.
- [ ] I can choose among lists, tuples, dictionaries, and sets from mutability, ordering, uniqueness, and lookup requirements, and keep comprehensions readable.
- [ ] I can create simple functions, modules, and packages.
- [ ] I can use virtual environments and manage dependencies reproducibly.
- [ ] I can use type hints to make contracts clearer.
- [ ] I can handle exceptions without hiding failures.
- [ ] I can read and write JSON, CSV, and tabular files.
- [ ] I can use iterators and generators when they provide a benefit.
- [ ] I can work with notebooks without turning them into disorganized production code.
- [ ] I can write automated tests for Python components.
- [ ] I can consume APIs and create a small API or worker in Python.
- [ ] I can use libraries from the AI/data ecosystem by consulting their documentation.
- [ ] I can integrate a Python component with a Go or TypeScript application.
- [ ] I can decide when Python is more appropriate than Go or TypeScript for a component.

Packaging and deploying a Python service is experience 24, not an L3 checkbox.

---

## 6. Git and Development Workflow

### Knowledge

`repository` · `commit` · `branch` · `merge` · `rebase` · `conflicts` · `remote` · `pull request` · `tags` · `revert` · `bisect` · `hooks` · `release workflow`

### L1 — Core

- [ ] I can initialize, clone, and configure a repository.
- [ ] I can create small, coherent commits with useful messages.
- [ ] I can work with branches and remotes.
- [ ] I can explain merge and rebase and choose deliberately between them.
- [ ] I can resolve conflicts without losing changes.
- [ ] I can review history before publishing a change.
- [ ] I can open a pull request with context, scope, tests, and risks.
- [ ] I can review another person’s pull request.
- [ ] I can use `revert` to undo changes safely.
- [ ] I can recover commits and references without impulsively using destructive operations.
- [ ] I can use `stash` deliberately.
- [ ] I can use `git bisect` or an equivalent strategy to locate a regression.
- [ ] I can create and use tags/releases.
- [ ] I can compare trunk-based development and feature branches in terms of integration frequency, review flow, release strategy, and merge-conflict risk.
- [ ] I can keep secrets, artifacts, and local files out of version control.
- [ ] I can adapt my workflow to the conventions of an existing team and repository.

---

## 7. Linux and Runtime Environment

### Knowledge

`filesystem` · `permissions` · `users/groups` · `processes` · `signals` · `shell` · `environment variables` · `pipes` · `logs` · `services` · `ports` · `resource usage` · `package management`

### L1 — Core

- [ ] I can navigate, search, copy, move, and inspect files from the terminal.
- [ ] I can resolve absolute and relative paths from a known working directory and diagnose errors caused by an unexpected working directory.
- [ ] I can work with permissions, users, and groups without resorting to excessive permissions.
- [ ] I can use pipes and redirection to combine commands.
- [ ] I can search text and files efficiently.
- [ ] I can create small, safe shell scripts.
- [ ] I can configure environment variables and understand environment inheritance.
- [ ] I can list, start, stop, and investigate processes.
- [ ] I can explain and handle `SIGINT` and `SIGTERM` so an application can stop work and release resources gracefully.
- [ ] I can identify processes listening on a port.
- [ ] I can inspect CPU, memory, disk, and network usage and identify the process or resource responsible for an abnormal condition.
- [ ] I can read application and service logs.
- [ ] I can configure a Linux service to start, stop, restart, read configuration from the environment, and expose useful logs.
- [ ] I can use SSH with keys and appropriate practices.
- [ ] I can install and update packages deliberately.
- [ ] I can diagnose why an application works locally but fails on a server.

---

## 8. Software Design and Code Quality

### Knowledge

`cohesion` · `coupling` · `abstraction` · `encapsulation` · `composition` · `SOLID` · `DRY` · `KISS` · `YAGNI` · `dependency inversion` · `design patterns` · `refactoring` · `code smells` · `API design`

SOLID is vocabulary. The competencies below are the job.

### L2 — Core

- [ ] I can choose names that communicate intent.
- [ ] I can create cohesive functions, classes/modules, and packages.
- [ ] I can reduce coupling without introducing unnecessary abstractions.
- [ ] I can encapsulate invariants and hide details that should genuinely remain internal.
- [ ] I can use composition for has-a/capability relationships and reserve inheritance for substitutable subtypes that preserve the parent contract.
- [ ] I can recognize meaningful duplication and distinguish accidental duplication from shared knowledge.
- [ ] I can apply KISS and YAGNI deliberately.
- [ ] I can use dependency inversion when it protects the core from external details.
- [ ] I can recognize code smells and propose incremental refactoring.
- [ ] I can use a design pattern only when I can name the concrete problem it solves and the cost of the extra type.
- [ ] I can design coherent APIs and internal contracts.
- [ ] I can make dependencies and side effects explicit.
- [ ] I can keep a domain rule executable without HTTP or database concerns and explain when introducing that boundary would add more complexity than it removes.
- [ ] I can improve testability through design.
- [ ] I can evaluate readability, maintainability, and cost of change during code review.
- [ ] I can justify why an abstraction exists.
- [ ] I can remove an abstraction when it no longer repays its cost.

---

## 9. Testing

### Knowledge

`unit tests` · `integration tests` · `contract tests` · `end-to-end tests` · `test doubles` · `determinism` · `flaky tests` · `property-based testing` · `regression tests` · `coverage` · `testability`

### L2 — Core

- [ ] I can classify a test as unit, integration, contract, or end-to-end from the boundary it exercises, dependencies it includes, and failure it is intended to detect.
- [ ] I can choose and justify the lowest test level that verifies a behavior without hiding an important integration risk.
- [ ] I can test a business rule through its public inputs and outputs without starting transport or persistence infrastructure.
- [ ] I can use mocks, stubs, and fakes to control external boundaries while avoiding tests coupled to internal implementation details.
- [ ] I can derive edge cases from boundaries, empty values, duplicates, invalid states, and failure conditions.
- [ ] I can make tests deterministic by controlling time, randomness, concurrency, external I/O, and shared state.
- [ ] I can reproduce a bug with a failing automated test, implement the fix, and verify that the test prevents the same behavior from returning.
- [ ] I can use coverage to locate untested risk without treating a coverage percentage as proof of test quality.
- [ ] I can justify leaving code untested from its risk, complexity, lifetime, and existing higher-level coverage.
- [ ] I can isolate side effects, inject uncontrollable dependencies, expose behavior through small contracts, and test without accessing private implementation details.

### L3 — Complete

- [ ] I can test repository behavior against a real database schema, including constraints, transaction behavior, and cleanup isolation.
- [ ] I can test an API’s success, validation, authentication/authorization, and failure responses through its public HTTP contract.
- [ ] I can force dependency, validation, timeout, authorization, and persistence failures and assert the externally visible behavior and side effects.
- [ ] I can diagnose a flaky test by reproducing it, isolating shared state/timing dependencies, and verifying the fix through repeated execution.

---

## 10. Databases and SQL

### Knowledge

`relational modeling` · `normalization` · `SQL` · `joins` · `aggregations` · `CTEs` · `window functions` · `constraints` · `transactions` · `ACID` · `isolation` · `locks` · `MVCC` · `indexes` · `execution plans` · `migrations` · `key-value` · `document` · `search index` · `time-series` · `vector index` · `Redis`

### L2 — Core

- [ ] I can model entities, cardinalities, nullability, uniqueness, ownership, and referential rules as tables, keys, and constraints.
- [ ] I can transform a model with update, insertion, or deletion anomalies into normalized tables and explain the resulting joins.
- [ ] I can denormalize only after identifying a measured read/query need and define how duplicated data remains consistent.
- [ ] I can write parameterized `SELECT`, `INSERT`, `UPDATE`, and `DELETE` statements that affect only the intended rows and return or verify the required result.
- [ ] I can choose and write inner, left, and self joins from required row-preservation and relationship semantics.
- [ ] I can group data, calculate aggregate values, filter groups with `HAVING`, and explain how null values affect the result.
- [ ] I can enforce domain invariants using NOT NULL, UNIQUE, CHECK, primary-key, and foreign-key constraints.
- [ ] I can define foreign-key actions deliberately and explain the consequences of restrict, cascade, and set-null behavior.
- [ ] I can identify an atomicity boundary, implement commit and rollback paths, keep the transaction scoped to required database work, test partial failure, and explain how the selected isolation level affects the operation.
- [ ] I can explain how atomicity, consistency, isolation, and durability apply to a concrete transaction.
- [ ] I can compare common isolation levels by the anomalies they allow and select one for a concrete operation.
- [ ] I can derive a candidate single or composite index from predicates, joins, ordering, cardinality, and column order and verify its use with an execution plan.
- [ ] I can detect N+1 behavior from repeated queries and replace it with an intentional join, batch load, or prefetch without over-fetching.
- [ ] I can choose offset or cursor pagination from dataset size and consistency needs and return stable ordering plus continuation metadata.
- [ ] I can create and execute a migration with compatibility, locking, deployment order, validation, and rollback/roll-forward behavior appropriate to its risk.

### L3 — Complete

- [ ] I can use a scalar, correlated, or set subquery and replace it with a join when the join is clearer or produces a better plan.
- [ ] I can use a CTE to name a multi-step query when it makes the SQL clearer.
- [ ] I can use a window function when rows need ranking, running totals, lag/lead, or partition-level calculations without collapsing the result set.
- [ ] I can explain which rows or resources an operation may lock, how long locks are held, and how concurrent operations may block each other.
- [ ] I can draw the conflicting lock order that produces a deadlock and remove it through consistent ordering, shorter transactions, or retry behavior.
- [ ] I can explain how MVCC lets readers and writers observe different row versions and how long-running transactions affect cleanup and visibility.
- [ ] I can explain an index’s storage, write-amplification, cache, and maintenance costs and remove an index whose workload does not justify them.
- [ ] I can read an execution plan for scans, joins, estimates, actual rows, sorts, and expensive nodes and test a query/index change against the same workload.
- [ ] I can size and configure a connection pool from database limits and application concurrency, and diagnose exhaustion, leaks, and excessive idle connections.
- [ ] I can plan a backfill with batching, resumability, validation, observability, and coexistence between old and new application versions.
- [ ] I can create a database backup, restore it into a separate environment, and verify that schema and representative data are recoverable.
- [ ] I can choose among a relational database, a key-value store, a document store, a search index, a time-series store, and a vector index from access patterns, consistency, query shape, and operational cost, and reject a second store when SQL still fits.
- [ ] I can use Redis or an equivalent store as cache, lock, or ephemeral queue, and state the behavior on eviction, flush, split brain, and process restart.

---

## 11. Networking, HTTP, and APIs

### Knowledge

`IP` · `ports` · `DNS` · `TCP` · `TLS` · `HTTP` · `headers` · `cookies` · `CORS` · `caching` · `REST` · `pagination` · `rate limiting` · `idempotency` · `webhooks` · `WebSockets` · `RPC/gRPC` · `OpenAPI` · `HTTP/2` · `CDN`

### L2 — Core

- [ ] I can explain client → DNS → TCP → TLS → HTTP → server conceptually.
- [ ] I can trace how an IP address and port identify the network endpoint used by a client and server.
- [ ] I can explain connection establishment, ordered delivery, retransmission, and connection termination in TCP at a conceptual level.
- [ ] I can explain how an application uses a socket to read from and write to a network connection.
- [ ] I can trace a hostname through DNS resolution, caching, record selection, and the resulting connection target.
- [ ] I can explain certificate validation, hostname verification, encryption, and the role of TLS in an HTTPS request.
- [ ] I can select GET, POST, PUT, PATCH, DELETE, HEAD, or OPTIONS from safety, idempotency, replacement/partial-update semantics, and the intended resource operation.
- [ ] I can select status codes that distinguish successful creation/retrieval, client validation, authentication, authorization, absence, conflict, rate limiting, and server failure.
- [ ] I can use request and response headers for content negotiation, authentication, caching, tracing, and metadata without placing sensitive values in unsafe locations.
- [ ] I can configure cookies with appropriate scope, expiration, SameSite, Secure, and HttpOnly attributes.
- [ ] I can explain why a browser blocks a cross-origin request and configure the narrowest required origin, method, header, and credential policy.
- [ ] I can define cacheability, freshness, validation, and invalidation using Cache-Control, validators, and request semantics.
- [ ] I can explain how connection reuse reduces handshake overhead and diagnose behavior caused by connection or idle timeouts.
- [ ] I can model resources and relationships with stable URLs, HTTP semantics, consistent representations, validation, authorization, and predictable errors.
- [ ] I can design offset or cursor pagination with stable ordering, limits, continuation metadata, and documented consistency behavior.
- [ ] I can define allowlisted filtering and sorting syntax, validate operators/fields, compose it with pagination, and prevent unbounded queries.
- [ ] I can create an error contract with a stable machine code, safe human message, field details where relevant, correlation identifier, and no leaked internals.
- [ ] I can evolve an API compatibly, identify a breaking change, and define a versioning and deprecation strategy when compatibility cannot be preserved.

### L3 — Complete

- [ ] I can choose a rate-limit identity, algorithm, window/burst policy, storage location, response headers, and behavior for distributed instances.
- [ ] I can accept an idempotency key, atomically store request/result state, handle concurrent duplicates, define mismatch/expiry behavior, and return the original outcome.
- [ ] I can verify webhook authenticity, acknowledge delivery quickly, handle duplicates idempotently, retry outbound delivery with limits, and retain enough state to diagnose failures.
- [ ] I can implement a WebSocket connection lifecycle with authentication, message handling, disconnection cleanup, heartbeats, and bounded resource usage.
- [ ] I can compare REST and RPC/gRPC by contract strength, streaming, latency, browser support, operational complexity, and consumer needs.

---

## 12. Concurrency

### Knowledge

`process` · `thread` · `goroutine/task` · `concurrency` · `parallelism` · `shared state` · `race condition` · `mutex` · `atomics` · `deadlock` · `starvation` · `cancellation` · `timeouts` · `bounded concurrency`

### L2 — Core

- [ ] I can explain which memory and resources are isolated or shared among processes, OS threads, and language-level goroutines/tasks.
- [ ] I can distinguish overlapping progress from simultaneous execution and predict whether a design improves latency, throughput, or neither.
- [ ] I can trace every reader and writer of mutable state and identify which accesses may overlap.
- [ ] I can propagate cancellation from caller to every blocking operation and make cleanup happen exactly once.
- [ ] I can prove every started goroutine/task has a termination path on success, error, cancellation, and shutdown.

### L3 — Complete

- [ ] I can describe an interleaving that violates an invariant and confirm it with a race detector, stress test, or controlled reproduction.
- [ ] I can protect the smallest invariant-preserving critical section with a mutex and avoid copying locks, inconsistent lock order, or lock-held external I/O.
- [ ] I can identify when a read-modify-write operation must be atomic and choose an atomic primitive or lock that preserves the invariant.
- [ ] I can construct a wait-for cycle that causes deadlock and prevent it through lock ordering, timeouts, or reduced lock scope.
- [ ] I can recognize starvation caused by unfair scheduling or lock acquisition and change the design so work eventually progresses.
- [ ] I can start multiple tasks, collect results/errors, define fail-fast or collect-all behavior, and wait for every started task to terminate.
- [ ] I can place deadlines around bounded operations, distinguish timeout from other failure, and avoid leaving work running after the caller gives up.
- [ ] I can bound concurrent work with a semaphore/worker pool and define queueing or rejection behavior when capacity is exhausted.
- [ ] I can test a concurrent component with controlled synchronization, repeated/stress execution, cancellation assertions, and race detection.
- [ ] I can reproduce a concurrency bug, identify the violated ordering/ownership invariant, and verify the fix under race/stress tooling.

---

## 13. Distributed Systems and Messaging

### Knowledge

`partial failure` · `timeouts` · `retry` · `backoff` · `jitter` · `idempotency` · `consistency` · `delivery semantics` · `ordering` · `queues` · `dead-letter queue` · `pub/sub` · `distributed locks` · `backpressure` · `CAP` · `transactional outbox` · `inbox` · `saga / compensation` · `circuit breaker` · `bulkhead` · `CDC`

### L3 — Complete

- [ ] I can enumerate timeout, refusal, reset, partial response, malformed response, overload, and ambiguous-success behavior for each remote call.
- [ ] I can set connect/request/operation timeouts from the caller’s latency budget and ensure cancellation reaches the network operation.
- [ ] I can retry only transient and safe/idempotent operations, cap attempts and elapsed time, use backoff/jitter, and expose final failure.
- [ ] I can calculate an exponential-backoff sequence, cap its growth, and explain how it reduces repeated pressure on a failing dependency.
- [ ] I can add jitter to retry timing and explain how it prevents synchronized clients from retrying together.
- [ ] I can define an idempotency identity and atomically prevent a retry from duplicating persistence, messages, or external side effects.
- [ ] I can describe which stale states a user may observe under eventual consistency, what a network partition makes impossible to guarantee at once, and design reconciliation or UX for those states.
- [ ] I can identify an operation that requires reading the latest committed value and explain the latency/availability cost of that guarantee.
- [ ] I can design a consumer that detects or safely tolerates duplicate delivery.
- [ ] I can state whether a workflow requires global, per-key, or no ordering and design partitioning/sequence handling accordingly.
- [ ] I can compare at-most-once and at-least-once delivery by their loss and duplication risks and choose one for a concrete workflow.
- [ ] I can configure a queue with explicit delivery, acknowledgement, retention, visibility/lease, ordering, and capacity behavior for a workflow.
- [ ] I can publish a versioned message and consume it with validation, idempotency, acknowledgement only after success, and graceful shutdown.
- [ ] I can classify retryable failures and define attempts, backoff, jitter, delay, timeout, and final disposition.
- [ ] I can move exhausted messages to a dead-letter path with failure context, alerting, inspection, and a safe replay procedure.
- [ ] I can design a pub/sub flow in which publishers do not address individual subscribers and explain fan-out, subscription lifecycle, and delivery-failure behavior.
- [ ] I can recognize when producers exceed consumer capacity and apply bounded queues, rate limiting, batching, load shedding, or flow control.
- [ ] I can keep a database write and a message publish consistent using a transactional outbox or an equivalent atomic handoff, and explain what duplicate or lost events look like if I publish after commit.
- [ ] I can split a multi-system workflow into local transactions plus compensating actions, define what happens after a partial failure, and reject a saga when a single atomic boundary would suffice.
- [ ] I can isolate a failing dependency with a circuit breaker and a bulkhead/limit so retries and slow calls cannot exhaust the caller’s threads, connections, or event loop.
- [ ] I can explain when CQRS or event sourcing would pay for their operational cost and when a modular monolith plus an outbox is the smaller correct design.
- [ ] I can trace a critical workflow and identify every component, dependency, credential, data store, or operator action whose loss stops the whole workflow.

### L4 — Advanced

- [ ] I can implement or reject a distributed lock from unique ownership, bounded lease, safe release, pause or lost-connectivity failure, and whether idempotency or a single-writer queue is the smaller design.

---

## 14. Architecture and System Design

### Knowledge

`functional requirements` · `non-functional requirements` · `constraints` · `layered architecture` · `ports and adapters` · `modular monolith` · `microservices` · `event-driven architecture` · `boundaries` · `capacity estimation` · `scaling` · `load balancing` · `caching` · `replication` · `sharding` · `ADRs` · `FinOps`

### L3 — Complete

- [ ] I can turn stakeholder needs into explicit actors, triggers, flows, rules, outputs, errors, and acceptance criteria.
- [ ] I can define measurable latency, throughput, availability, consistency, security, privacy, operability, and cost requirements where they matter.
- [ ] I can identify fixed technology, budget, deadline, compliance, team, data, integration, and deployment constraints and separate them from preferences.
- [ ] I can assign a concrete rule or dependency to domain, application, or infrastructure and keep dependencies pointing toward the stable business core.
- [ ] I can map responsibilities and allowed dependencies across layers and identify a dependency that violates the layering rule.
- [ ] I can define independently testable modules inside one deployment and enforce boundaries without network calls.
- [ ] I can identify the independent deployment, data ownership, failure, and operational responsibilities introduced by a microservice boundary.
- [ ] I can choose a monolith, modular monolith, or microservices from team autonomy, deployment boundaries, data ownership, scaling, failure isolation, and operational capacity.
- [ ] I can model an event-producing workflow, define event ownership and schema, handle duplicate/out-of-order delivery, and explain when asynchronous coupling is worth its operational cost.
- [ ] I can define a module/service around cohesive business capability and data ownership, list its public contracts, and identify prohibited cross-boundary access.
- [ ] I can compare increasing resources on one instance with adding instances and identify the state, cost, and bottleneck constraints of each approach.
- [ ] I can design request handling so any healthy instance can serve the request, or explicitly identify and externalize required state.
- [ ] I can place multiple instances behind a load balancer, choose a distribution/health-check strategy, and explain the effect of unhealthy instances and sticky sessions.
- [ ] I can identify a repeated expensive read, define key/value/TTL/invalidation/consistency behavior, and reject caching when correctness or invalidation cost dominates.
- [ ] I can explain leader/follower replication, replication lag, failover, and the consistency behavior visible to reads and writes.
- [ ] I can enumerate component, dependency, overload, network, deployment, data, and operator failure modes and define detection, containment, recovery, and user impact.
- [ ] I can trace a critical workflow and identify every dependency whose loss prevents completion, then define redundancy or an accepted risk.
- [ ] I can compare at least two solutions against the same requirements, complexity, cost, failure modes, reversibility, and expected evolution.
- [ ] I can record context, decision, alternatives, consequences, status, and revisit triggers in an ADR.
- [ ] I can remove or defer a component whose current requirement is already met by a simpler design and state the trigger for reconsidering it.
- [ ] I can attribute a service’s cost to compute, data store, network, logs/traces, and third-party APIs, and change a design after a measured cost problem rather than after a monthly surprise.

### L4 — Advanced

- [ ] I can estimate average and peak requests/events per second and storage growth from stated assumptions, show the calculation and uncertainty, and reject planet-scale design when a single instance still fits.
- [ ] I can choose a candidate partition key and explain its effect on data locality, skew, cross-partition operations, and rebalancing — or state why the workload does not need sharding.

---

## 15. Security

### Knowledge

`authentication` · `authorization` · `password hashing` · `sessions` · `JWT` · `OAuth 2.0` · `OpenID Connect` · `RBAC` · `least privilege` · `secrets` · `injection` · `XSS` · `CSRF` · `SSRF` · `access control` · `supply chain` · `threat modeling` · `encryption at rest` · `encryption in transit` · `key management` · `data classification` · `data minimization` · `retention/deletion` · `PII` · `LGPD/GDPR` · `SBOM` · `multi-tenancy` · `fail closed`

### L2 — Core

- [ ] I can separate identity verification from permission checks and locate both controls in a request flow.
- [ ] I can hash and verify passwords with a password-specific adaptive algorithm, unique salts, safe parameters, and a rehash strategy.
- [ ] I can implement session creation, secure cookie delivery, server-side lookup, rotation, expiration, logout/revocation, and fixation protection.
- [ ] I can validate a JWT’s signature, issuer, audience, expiration, and allowed algorithm, and explain revocation and data-exposure limitations.
- [ ] I can define roles and permissions, enforce them server-side on every protected operation, and test allowed and denied paths.
- [ ] I can assign the minimum permissions required by a user, service, or credential and identify permissions that can be removed.
- [ ] I can keep secrets out of code, images, logs, client bundles, and version control and detect accidental exposure before release.
- [ ] I can demonstrate how SQL injection occurs and prevent it through parameterized queries, input boundaries, and restricted database privileges.
- [ ] I can validate type, shape, range, length, format, and business invariants at the trust boundary and return a safe, consistent error.
- [ ] I can throttle authentication attempts by appropriate identities, introduce progressive delay/lockout without easy denial of service, and monitor attack patterns.
- [ ] I can fail closed on authentication, authorization, validation, and payment or inventory uncertainty, and fail open only for a named non-critical degradation.
- [ ] I can classify data as public, internal, confidential, or personal/sensitive and apply collection, access, logging, retention, and sharing rules from that class.
- [ ] I can keep secrets, tokens, and personal data out of logs, traces, error reports, and eval datasets, and test that a failure path does not leak them.

### L3 — Complete

- [ ] I can trace an OAuth 2.0 authorization-code flow with PKCE and distinguish client, resource owner, authorization server, and resource server.
- [ ] I can explain how OpenID Connect adds identity to OAuth 2.0 and validate the ID token and nonce in a login flow.
- [ ] I can provision secrets per environment with least access, rotation, revocation, auditability, and documented ownership.
- [ ] I can prevent stored and reflected XSS through contextual output encoding and safe APIs, and explain when a Content-Security-Policy adds defense in depth.
- [ ] I can explain when browser credentials make a request vulnerable to CSRF and apply SameSite cookies, anti-CSRF tokens, or origin checks.
- [ ] I can identify server-side requests influenced by untrusted input and constrain schemes, hosts, redirects, DNS resolution, and network access to prevent SSRF.
- [ ] I can isolate tenant data in queries, caches, jobs, and search indexes, test cross-tenant leakage, and treat a missing tenant predicate as an incident.
- [ ] I can enforce role and resource-ownership checks server-side for every operation and test horizontal and vertical privilege escalation.
- [ ] I can constrain upload size/type/count, verify content rather than trusting names, generate safe storage names, isolate storage, control retrieval, and scan when risk requires it.
- [ ] I can identify vulnerable direct and transitive dependencies, assess reachability/severity, update or mitigate, and verify the application afterward.
- [ ] I can pin and verify dependencies/build inputs, protect CI credentials, review installation scripts, and restrict who can publish or change the release path.
- [ ] I can log authentication, authorization, credential, administrative, and suspicious-input events with actor/time/outcome/correlation context and no secrets.
- [ ] I can revoke and rotate a compromised credential, identify its access and exposure window, inspect relevant logs, limit impact, and document preventive action.
- [ ] I can map assets, actors, trust boundaries, entry points, abuse cases, mitigations, and residual risks for a feature before implementation.
- [ ] I can encrypt data in transit with current TLS and data at rest with a managed key, describe where the key lives, who can use it, and how rotation or revocation works without rewriting application records.
- [ ] I can trace personal data from collection through processing, storage, logs, backups, analytics, model prompts, and third-party APIs, then implement access, retention, and deletion that reach each copy.

---

## 16. Docker, CI/CD, and Infrastructure

### Knowledge

`containers` · `images` · `layers` · `multi-stage build` · `volumes` · `networking` · `Compose` · `CI` · `CD` · `artifacts` · `rollback` · `environments` · `DNS` · `HTTPS` · `reverse proxy` · `cloud primitives` · `IAM` · `IaC` · `Kubernetes basics` · `feature flags` · `blue-green` · `canary` · `progressive delivery`

### L2 — Core

- [ ] I can create a minimal, non-root, reproducible Docker image with explicit runtime dependencies, configuration boundaries, and a health-aware startup command.
- [ ] I can order Dockerfile instructions to maximize reusable layers and explain which change invalidates each cached layer.
- [ ] I can separate dependency/build/runtime stages so build tools and source artifacts do not remain in the final image.
- [ ] I can choose between ephemeral container storage, a bind mount, and a managed volume and verify persistence across container replacement.
- [ ] I can connect containers through an isolated network, resolve services by name, and distinguish container ports from published host ports.
- [ ] I can define a local multi-service environment with networks, volumes, health checks, dependencies, and reproducible startup/teardown in Docker Compose.
- [ ] I can separate non-secret configuration from secrets, validate required values at startup, and prevent environment-specific values from entering source or images.
- [ ] I can create a CI pipeline triggered by repository events with isolated dependency install, static checks, tests, build, caching, and clear failure output.
- [ ] I can make the pipeline run the same deterministic test commands used locally and fail before build/deploy when a required check fails.
- [ ] I can generate an immutable versioned artifact/image, attach source/version metadata, and promote the same artifact between environments.
- [ ] I can deploy an immutable artifact with controlled configuration, health verification, migration ordering, and a failure strategy.
- [ ] I can restore the previous working application/configuration version and verify service health without corrupting newer data.
- [ ] I can define which configuration, data, access, deployment, and observability controls differ across development, staging, and production.

### L3 — Complete

- [ ] I can configure the required DNS records, verify propagation/resolution, and distinguish apex, subdomain, CNAME, and address-record behavior.
- [ ] I can provision and renew a certificate, redirect HTTP safely, validate hostname/TLS configuration, and avoid exposing the origin through an insecure path.
- [ ] I can configure a reverse proxy to terminate TLS, forward requests, preserve client/proxy headers safely, and route traffic to an application.
- [ ] I can map an application requirement to compute, managed database, object storage, and load-balancing services and explain the operational responsibility of each.
- [ ] I can define an IAM principal, role/policy, resource, and action and reduce a policy to the minimum permissions required.
- [ ] I can describe infrastructure as declarative, reviewable, repeatable state and explain planning, applying, drift, state storage, and rollback concerns.
- [ ] I can explain how a Kubernetes Deployment maintains Pods, how a Service reaches them, and how Ingress exposes them, without needing to operate a cluster.
- [ ] I can hide an incomplete or risky behavior behind a server-side flag with a default-safe state, independent of deploy, and remove the flag after the change is the default.
- [ ] I can choose between rolling, blue-green, canary, and immediate rollback from blast radius, schema compatibility, and how quickly a bad release must leave traffic.

---

## 17. Observability and Reliability

### Knowledge

`structured logs` · `log levels` · `correlation IDs` · `metrics` · `latency` · `traffic` · `errors` · `saturation` · `tracing` · `OpenTelemetry` · `dashboards` · `alerts` · `availability` · `SLI` · `SLO` · `SLA` · `health checks` · `degradation` · `incidents` · `postmortems` · `RPO` · `RTO` · `on-call` · `toil`

### L2 — Core

- [ ] I produce machine-parseable logs with timestamp, level, event/message, service/version, correlation context, and structured fields rather than concatenated text.
- [ ] I can assign debug, info, warn, and error levels from operational meaning so normal behavior is not logged as failure and actionable failures are not hidden.
- [ ] I accept or generate a request/correlation ID, propagate it across boundaries, and include it in logs and responses without trusting unsafe external values.
- [ ] I can use propagated correlation context to reconstruct one request across application and database logs.

### L3 — Complete

- [ ] I can choose counter, gauge, or histogram metrics with stable names/labels and avoid unbounded-cardinality dimensions.
- [ ] I can measure end-to-end and dependency latency as distributions and inspect p50, p95, and p99 over a stated window.
- [ ] I can measure requests/events/bytes per unit time and segment traffic by meaningful bounded dimensions.
- [ ] I can define eligible operations and measure failed operations as a rate segmented by stable error category.
- [ ] I can observe CPU, memory, threads/goroutines, connections, queue depth, disk, and dependency capacity and identify the limiting resource.
- [ ] I can instrument a service with vendor-neutral traces and metrics (OpenTelemetry or equivalent), propagate context across HTTP and queues, and use a trace to locate latency or failure without logging the whole payload.
- [ ] I can build a dashboard that answers current user impact, latency/traffic/errors/saturation, dependency health, and recent-change questions for a service.
- [ ] I can create an alert tied to user impact or imminent exhaustion with threshold/window, owner, severity, runbook, deduplication, and recovery behavior.
- [ ] I can define and calculate availability from eligible successful service events over a stated time window.
- [ ] I can define a measurable SLI from the user-visible behavior of a service and its valid/invalid event criteria.
- [ ] I can set an SLO with a target and time window and use its error budget to guide reliability work.
- [ ] I can distinguish an internal SLO from a contractual SLA and explain the consequence of violating each.
- [ ] I can separate liveness, readiness, and startup checks and keep them fast, bounded, and representative without creating dependency cascades.
- [ ] I can identify a non-critical dependency, define a fallback or reduced-capability response, and prevent its failure from taking down the core user flow.
- [ ] I can identify affected users, operations, tenants, regions, versions, data, and time window during a failure.
- [ ] I can decide whether rollback is safe from schema/data compatibility, execute it, and verify user-visible recovery.
- [ ] I can construct an incident timeline from telemetry and changes, test causal hypotheses, and separate trigger, contributing conditions, and impact.
- [ ] I can write a blameless postmortem with impact, detection, timeline, causes, response analysis, and owned preventive actions.
- [ ] I can state RPO and RTO for a service, map them to backup, replica, and multi-instance strategy, and run a restore or failover that meets those numbers or revises them.

---

## 18. Performance

### Knowledge

`baseline` · `p50/p95/p99` · `throughput` · `CPU` · `memory` · `I/O` · `profiling` · `benchmarks` · `load tests` · `stress tests` · `slow queries` · `caching` · `batching` · `async processing` · `connection pools`

Load and stress tests are experiences 18–19 and Depth Gate 7. They are not L3 checkboxes.

### L3 — Complete

- [ ] I do not optimize without measuring.
- [ ] I can define a representative workload/environment and record latency, throughput, errors, CPU, memory, I/O, and saturation before changing the system.
- [ ] I can collect a latency distribution over a stated workload/window and interpret p50, p95, and p99 rather than relying on an average.
- [ ] I can measure completed operations per unit time alongside latency and errors so higher throughput is not mistaken for improvement when quality degrades.
- [ ] I can measure process/container/host CPU utilization and profiling samples and distinguish CPU saturation from waiting.
- [ ] I can measure working set, heap, allocation rate, garbage collection, and retention over time and distinguish pressure from a leak.
- [ ] I can measure disk/network/database I/O latency, throughput, queueing, and wait time and connect it to the responsible operation.
- [ ] I can capture and interpret a profiler output, identify a measured hotspot, and avoid optimizing code that is not responsible for meaningful cost.
- [ ] I can create a reproducible benchmark with controlled inputs, warmup, repeated samples, allocation/resource reporting, and regression comparison.
- [ ] I can identify whether a bottleneck is in the application, database, network, or external dependency.
- [ ] I can identify slow/high-impact queries from database telemetry, reproduce them, inspect their plans and data distribution, and verify a fix.
- [ ] I can evaluate caching from read frequency, computation/I/O cost, acceptable staleness, key design, invalidation, and measured hit rate.
- [ ] I can evaluate batching from per-operation overhead, acceptable latency, batch size, partial failure, and memory limits.
- [ ] I can evaluate asynchronous processing from response-time requirements, delivery guarantees, retries, observability, and user-visible completion state.
- [ ] I can evaluate connection-pool changes from database limits, request concurrency, wait time, utilization, and connection lifetime.
- [ ] I can compare the same workload/environment before and after a change, including confidence/variance and regressions in other resources.
- [ ] I can state the target metric, measured improvement, experimental conditions, trade-offs, and why the difference is attributable to the change.

---

## 19. Maintenance and Evolution

### Knowledge

`program comprehension` · `impact analysis` · `corrective maintenance` · `adaptive maintenance` · `perfective maintenance` · `preventive maintenance` · `incremental refactoring` · `dependency updates` · `backward compatibility` · `deprecation` · `data migration` · `technical debt`

SWEBOK maintenance names stay in Knowledge. The job is the items below.

### L3 — Complete

- [ ] I can trace an unfamiliar codebase from entry points through domain logic, persistence, side effects, configuration, and tests and document the relevant flow.
- [ ] I can identify callers, contracts, data, migrations, side effects, tests, deployments, and consumers affected by a proposed behavior change.
- [ ] I can fix a bug without using it as an excuse to rewrite half the system.
- [ ] I can preserve behavior with tests, make one reviewable structural change at a time, keep the system deployable, and stop without requiring a rewrite.
- [ ] I can update a dependency by reviewing release notes and security impact, running relevant tests, checking transitive changes, and defining a rollback path.
- [ ] I can evolve an interface or schema without breaking current consumers, or provide a versioned migration and deprecation path when compatibility is impossible.
- [ ] I can define replacement guidance, compatibility period, consumer communication, telemetry, removal criteria, and target dates for a deprecation.
- [ ] I can migrate data through validated, resumable, observable steps while preserving a recoverable source or rollback/roll-forward path.
- [ ] I can identify technical debt from recurring delivery, reliability, security, operability, or comprehension cost rather than mere stylistic preference.
- [ ] I can document debt with context, impact, risk, workaround, proposed direction, owner/revisit trigger, and avoid presenting uncertain rewrites as commitments.
- [ ] I can improve a system I did not create.

---

## 20. Product, Requirements, and Domain

### Knowledge

`problem framing` · `stakeholders` · `user needs` · `business rules` · `edge cases` · `assumptions` · `acceptance criteria` · `scope decomposition` · `technical risk` · `trade-offs` · `scope negotiation` · `business impact`

### L2 — Core

- [ ] I can turn a vague need into questions about user, problem, current behavior, desired outcome, frequency, constraints, exceptions, and success.
- [ ] I can identify people who use, approve, operate, fund, support, provide data to, or are affected by a change and state their conflicting interests.
- [ ] I can distinguish the person requesting a feature from the person performing the workflow and validate needs with the actual user.
- [ ] I can describe the user/problem/outcome independently of an implementation and compare multiple possible solutions.
- [ ] I can express business rules as inputs, conditions, decisions, outputs, invariants, exceptions, and examples.
- [ ] I can derive edge cases from boundaries, missing/duplicate data, invalid states, concurrency, retries, permissions, and partial failure.
- [ ] I can record each assumption, why it is believed, its risk if false, and how/when it will be validated.
- [ ] I can write acceptance criteria with observable preconditions, action, expected result, errors, and relevant non-functional constraints.
- [ ] I can split a feature into independently valuable, deployable vertical slices rather than horizontal technical layers.
- [ ] I can identify technical risks by likelihood/impact, define an early validation or mitigation, and make residual uncertainty visible before implementation.
- [ ] I can explain trade-offs to a non-technical person.
- [ ] I can challenge a technically poor requirement without simply saying “no.”
- [ ] I can present must-have outcomes, removable behavior, sequencing alternatives, cost/risk trade-offs, and agree on an explicit smaller delivery.
- [ ] I can connect a technical decision to user or business impact.

---

## 21. Professional Work and Autonomy

### Knowledge

`ownership` · `ambiguity` · `decomposition` · `estimation` · `risk communication` · `decision scope` · `asking for help` · `documentation` · `technical presentation` · `code review` · `mentoring` · `accountability` · `RFC` · `ethics`

### L2 — Core

- [ ] I can receive a reasonably defined feature and drive it from start to deployment.
- [ ] I can decompose a problem into reviewable tasks with dependencies, outputs, validation, and an integration/deployment path.
- [ ] I can estimate work as a range, state assumptions and unknowns, separate effort from elapsed time, and revise the estimate when evidence changes.
- [ ] I can ask for help with the problem, expected and actual behavior, attempted hypotheses, relevant evidence, and the smallest remaining uncertainty.
- [ ] I can communicate a blocker before it threatens delivery, stating impact, attempted work, needed decision/help, owner, and next checkpoint.
- [ ] I can review a change for behavior, design fit, security, data, concurrency, tests, operability, and maintainability and leave prioritized, actionable feedback.
- [ ] I can take responsibility for a failure in something I delivered and drive its correction.
- [ ] I can work productively in a codebase I did not create.

### L3 — Complete

- [ ] I can receive a partially ambiguous problem and discover the missing information.
- [ ] I can identify product, data, dependency, security, migration, operational, and schedule risks and define an owner or mitigation before starting.
- [ ] I can make local technical decisions without needing approval for every detail.
- [ ] I can recognize when a decision exceeds my scope and requires involving someone else.
- [ ] I can document an important decision with context, options, choice, rationale, consequences, and revisit conditions.
- [ ] I can write a short RFC or design note that a teammate can implement without a meeting: context, options, decision, risks, rollout, and rollback.
- [ ] I can present a solution’s problem, constraints, architecture, critical flow, trade-offs, validation, operational behavior, and remaining risks.
- [ ] I can defend a decision with arguments and evidence.
- [ ] I can change my mind in response to better evidence.
- [ ] I can help a less experienced person understand part of the system.
- [ ] I can refuse a change that is unsafe, dishonest, or illegal, and escalate with the evidence.

---

## 22. AI Engineering

### Knowledge

`LLM APIs` · `sampling parameters` · `structured outputs` · `tool calling` · `streaming` · `state` · `prompt construction` · `prompt versioning` · `tokens` · `context windows` · `cost` · `evals` · `embeddings` · `semantic search` · `RAG` · `chunking` · `agents` · `prompt injection` · `human-in-the-loop` · `hybrid search` · `reranking` · `error analysis` · `LLM-as-judge` · `offline vs online evals` · `MCP / tool protocol` · `model routing` · `prompt/semantic cache` · `PII in prompts` · `data residency` · `fairness`

Calling a model as a production dependency is L3. RAG, agents, and eval loops are L4 on this track.

### L3 — Core

- [ ] I can integrate an LLM API with authenticated configuration, typed request/response handling, timeout, cancellation, error mapping, and usage metadata.
- [ ] I can vary temperature/sampling, output limits, stop behavior, and reasoning controls where supported and measure their effect on quality, determinism, latency, and cost.
- [ ] I can define a schema, request structured output, validate it at runtime, reject/repair invalid output with limits, and keep model text from bypassing domain validation.
- [ ] I can stream model output with cancellation, partial UI state, error handling, final usage capture, and no duplicated final message.
- [ ] I can assemble prompts from versioned instructions, trusted context, user input, and tool results while preserving clear trust boundaries.
- [ ] I can estimate how input, output, tools, and retrieved content consume tokens and design truncation or summarization behavior for context-window limits.
- [ ] I can estimate per-request and end-to-end flow cost from input/output/cached tokens, model pricing, retries, tool calls, and expected traffic.
- [ ] I can apply timeout/cancellation, retry only eligible failures with limits, and define a fallback that preserves safety and communicates reduced capability.
- [ ] I can record model/provider/version, prompt version, latency, token usage, retries, tool calls, error class, and estimated cost without logging sensitive content.
- [ ] I can decide what data may leave the trust boundary to a third-party model, redact or refuse the rest, and record that decision as part of the feature design.
- [ ] I can identify when an AI feature can cause unfair, unsafe, or irreversible effects on people, define a human override, and refuse silent autonomy on that path.
- [ ] I can state which data, logs, and model calls an AI feature makes, who can access them, and which retention, residency, consent, or review rule would change the design.
- [ ] I can reject AI when deterministic logic, search, rules, templates, or conventional software meet the quality requirement with lower cost, latency, risk, or operational complexity.

### L4 — Advanced

- [ ] I can expose a tool with a narrow schema and description, validate and authorize arguments server-side, execute it safely, and return bounded results to the model.
- [ ] I can select, persist, trim, summarize, and reconstruct conversation state without mixing users or exceeding the context budget.
- [ ] I can assign an immutable prompt version to each execution and compare/rollback versions through evaluation rather than editing production text silently.
- [ ] I can keep trusted system/developer instructions separate from untrusted user/retrieved content and prevent that content from being treated as higher-priority instructions.
- [ ] I can create representative normal, boundary, adversarial, and failure evaluation cases with expected behavior and scoring criteria.
- [ ] I can run the same evaluation set against two versions, compare quality/latency/cost regressions, inspect failures, and make a release decision.
- [ ] I can inspect traces, cluster failures by cause (retrieval miss, bad chunk, tool error, instruction conflict, hallucination, eval mismatch), and change the stage that actually failed instead of rewriting the prompt at random.
- [ ] I can choose among exact/code-based checks, LLM-as-judge, and human review, state how the judge can be gamed or disagree with users, and keep a small labeled set to evaluate the evaluator.
- [ ] I can explain how embeddings map content to vectors for similarity comparison and identify semantic-search cases where keyword search or structured filtering is preferable.
- [ ] I can ingest content, create embeddings, store metadata, query by similarity with structured filters, return ranked results, and evaluate retrieval relevance against keyword search.
- [ ] I can combine lexical and vector retrieval, apply metadata filters, add a reranker when ranking quality is the bottleneck, and measure whether the change improved retrieval before touching generation.
- [ ] I can build a RAG flow with ingestion, chunking, metadata, retrieval, context construction, grounded generation, citations where appropriate, and separate retrieval/generation evaluation.
- [ ] I can choose chunk boundaries, size, overlap, and metadata from document structure and retrieval needs, then evaluate whether the choice improves relevant retrieval.
- [ ] I can score whether retrieval returned the necessary relevant context before judging whether generation used that context faithfully.
- [ ] I can expose tools through a narrow, authenticated contract (MCP or equivalent), version that contract, and keep the model from inventing tools or arguments the server does not allow.
- [ ] I can implement an agent loop that selects from narrow tools, records state, handles tool/model errors, and terminates with a user-visible result.
- [ ] I can enforce maximum iterations, time, tokens/cost, repeated-call detection, cancellation, and an explicit terminal condition.
- [ ] I can validate tool schemas and results, authorize each call for the current user/resource, apply least privilege, and require confirmation for risky effects.
- [ ] I account for prompt injection and untrusted data.
- [ ] I can identify irreversible, external, financial, permission, privacy, or destructive effects and require an informed human confirmation immediately before execution.
- [ ] I can route or cache model calls (model choice, prompt cache, semantic cache) from latency, cost, and staleness constraints, and prove a cache hit cannot leak another user’s context.
- [ ] I can use Python when a library/model does not make sense in Go or TypeScript.

---

## 23. Frontend Literacy

### Knowledge

`semantic HTML` · `CSS layout` · `browser JavaScript` · `DOM` · `forms` · `storage` · `API consumption` · `client authentication` · `components` · `state` · `rendering` · `CSR/SSR` · `devtools` · `React/Next.js` · `accessibility` · `responsive design`

### L2 — Core

- [ ] I can structure a page with meaningful landmarks, headings, lists, buttons, links, labels, tables, and form controls instead of generic containers.
- [ ] I can build a responsive one- or two-dimensional layout with normal flow, Flexbox, Grid, sizing, spacing, and overflow without relying on arbitrary positioning.
- [ ] I can explain and debug how browser JavaScript handles events, asynchronous requests, modules, and access to Web APIs.
- [ ] I can inspect and modify the DOM through events and selectors while avoiding unnecessary direct manipulation inside React.
- [ ] I can build an accessible form with labels, native controls, client/server validation, submission states, and error feedback.
- [ ] I can choose among cookies, localStorage, sessionStorage, and IndexedDB from lifetime, size, server access, and security requirements.
- [ ] I can call an API with loading, success, empty, validation, unauthorized, rate-limited, server-error, timeout, and cancellation states.
- [ ] I can support login/logout/session refresh in the client without exposing secrets, treat server authorization as authoritative, and handle expired sessions safely.
- [ ] I can split an interface into components with clear inputs, responsibilities, and composition boundaries.
- [ ] I can place state at the smallest shared owner, derive values instead of duplicating them, and avoid using state for constants or computable values.
- [ ] I can inspect request URL/method/headers/body, CORS/preflight, cookies, timing, response, cache, and initiator in browser devtools to locate a client/server failure.
- [ ] I can implement a React screen with routing, forms, API/data access, authentication state, errors, loading, and accessible interaction.
- [ ] I can provide semantic structure, keyboard access, visible focus, labels, meaningful names, sufficient contrast, and non-color status cues for a simple interface.
- [ ] I can make an interface usable across narrow and wide viewports without horizontal overflow, inaccessible controls, or unreadable content.

### L3 — Complete

- [ ] I can explain what triggers a render, identify an unnecessary render, and keep side effects outside rendering.
- [ ] I can choose client-side or server-side rendering from interactivity, data access, SEO, latency, caching, and hydration requirements.

Depth in animation, design systems, advanced CSS, or frontend performance is not required to complete this track.

---

## 24. Engineering with AI

### Knowledge

`task delegation` · `context engineering` · `diff review` · `architecture compliance` · `hallucination verification` · `agent-generated tests` · `AI-assisted debugging` · `technical investigation` · `human judgment` · `high-risk review` · `verifiers` · `multi-agent` · `sandbox`

### L2 — Core

- [ ] I can delegate a task with explicit goal, boundaries, relevant files/contracts, constraints, acceptance criteria, validation commands, and prohibited changes.
- [ ] I can provide the agent with current architecture, ownership boundaries, data flow, conventions, constraints, and the specific decision it must not make autonomously.
- [ ] I can give an agent a verifier it can run itself (tests, typecheck, lint, a failing repro, or an eval) so the loop ends on evidence rather than on a confident summary.
- [ ] I can keep an agent away from production credentials, live databases, and irreversible cloud changes, and use a disposable environment when the task needs execution.
- [ ] I can review every changed file for intended behavior, unrelated changes, architecture fit, security/data risk, error paths, tests, and dependency/API validity before merge.
- [ ] I can trace a generated change against dependency direction, module ownership, public contracts, data ownership, and side-effect boundaries and reject violations.
- [ ] I can identify a generated layer, interface, factory, service, or generic abstraction with no second use case or protected boundary and simplify it.
- [ ] I can verify a generated library/API against installed versions and authoritative documentation and replace nonexistent, deprecated, or misused calls.
- [ ] I can require tests for the change’s behavior and failure paths, inspect whether they can fail for the right reason, and run them rather than trusting generated assertions.
- [ ] I can reproduce an AI-produced defect, form and test my own hypotheses, trace the causal chain, and implement/verify the correction.
- [ ] I can change the generated control flow, data model, contract, or design without needing the agent to regenerate the feature from scratch.
- [ ] I can explain the merged change’s control flow, state, dependencies, failure behavior, tests, security implications, and architectural fit.
- [ ] I can conduct a technical investigation without accepting the AI’s first hypothesis.
- [ ] I can use AI to accelerate exploration without delegating the architectural decision.
- [ ] I can stop a failing agent path, revert or isolate its changes, preserve verified work, reduce the task, provide corrected context, or continue manually.
- [ ] I can identify AI-generated changes involving authentication, authorization, secrets, destructive operations, concurrency, migrations, money, personal data, or external side effects and apply stricter human review before execution or merge.

### L3 — Complete

- [ ] I can split a large change across agents or sessions with explicit ownership of files/contracts, a shared spec, and a human merge of conflicting edits.

---

# Part II — Engineering Experience Matrix

Knowledge does not replace experience. An experience may be marked complete only when the user personally performed and can explain the work described by the item. Optional notes or links may record context, but they are not required.

The experience matrix is the market check. Completing the L3 experiences is what makes “Software Engineer” a fair self-description. Completing the L4 experiences is what makes “one of the good ones” a fair self-description on this track.

## Required experiences for L3 — Software Engineer / Mid-level

- [ ] **1. Production API** — I built and deployed an API with authentication, authorization, validation, and a relational database.
- [ ] **2. Real relational model** — I modeled a non-trivial domain with multiple entities, constraints, and relationships.
- [ ] **3. Transaction** — I solved a real problem that required atomicity/a transaction.
- [ ] **4. Migration** — I changed schema/data in an existing system while preserving data.
- [ ] **5. External integration** — I integrated an external API and handled errors, timeouts, and retries.
- [ ] **6. Authentication** — I implemented OAuth/OIDC or another real authentication flow.
- [ ] **7. Authorization** — I implemented authorization through roles, permissions, or resource ownership.
- [ ] **8. Background processing** — I built asynchronous processing outside the main request.
- [ ] **9. Queue** — I implemented a producer/consumer with retries and failed-message handling.
- [ ] **10. Cache** — I used caching to solve a measurable problem and defined an invalidation strategy.
- [ ] **11. Webhook** — I implemented authenticated webhook delivery or receipt with idempotency, bounded retries, duplicate handling, and failure diagnostics.
- [ ] **12. CI/CD** — I configured automated builds, tests, and deployment.
- [ ] **13. Observability** — I instrumented structured logs, metrics, and correlation IDs in a system.
- [ ] **14. Production debugging** — I investigated and fixed a failure in a deployed environment.
- [ ] **15. Existing codebase** — I implemented a significant change in a codebase I did not start.

**L3 rule:** experiences 1–15, plus every competency tagged L1–L3.

## Additional experiences for L4 — Strong Software Engineer

- [ ] **16. Concurrency** — I built a concurrent feature that protects shared state, propagates cancellation, bounds concurrency, and terminates without leaked work.
- [ ] **17. Distributed coordination** — I solved a real coordination problem across processes/instances, such as distributed locking, distributed idempotency, an outbox, or compensation.
- [ ] **18. Performance investigation** — I found a bottleneck using metrics/profiling and quantitatively demonstrated the improvement.
- [ ] **19. Load test** — I ran load/stress tests and used the results to change the system.
- [ ] **20. Incident** — I participated in a meaningful failure, helped mitigate it, found the cause, and implemented prevention.
- [ ] **21. Architecture ownership** — I designed a non-trivial subsystem, documented decisions, and followed its implementation through production.
- [ ] **22. RAG system** — I built RAG with ingestion, retrieval, generation, and evaluation.
- [ ] **23. Agent system** — I built an agent with tools, state, execution limits, observability, and failure handling.
- [ ] **24. Python AI component** — I built a real Python component or service related to AI/data and integrated it with the rest of a system.
- [ ] **25. Significant refactor/evolution** — I substantially evolved an existing system without disrupting users or simply rewriting it.
- [ ] **26. Privacy / data lifecycle** — I classified, encrypted or isolated, and implemented deletion or retention for personal data in a real feature.
- [ ] **27. Cross-store workflow** — I shipped a workflow that needed an outbox, compensation, or an explicit single-atom alternative, and can explain why I chose that shape.

**L4 rule:** all 27 experiences, completed L3, every L4 competency, and the L4 Depth Gate rule in Part IV.

Experiences 22–24 are this track’s AI amplifier. They are required for L4 *on this track*. They are not what the market means by “senior backend” in general.

## Optional experience context

An experience assessment may contain optional Markdown fields for:

- notes about the context, role, decisions, outcome, or lessons learned;
- evidence links to code, a PR, article, diagram, or other reference.

These fields exist only as memory aids. They do not form an Evidence entity, do not require attachments or classification, and do not block completion.

---

# Part III — Levels

| Level | Name | Definition of Done |
|---|---|---|
| **L1** | Programmer | All L1 competencies; can build simple applications and use Git. |
| **L2** | Junior Software Engineer | L1 + all L2 competencies + one integrated deployed application. Can deliver scoped tasks in existing systems. |
| **L3** | Software Engineer / Mid-level | All L1–L3 competencies + experiences 1–15. Can own a feature area including its failure modes. |
| **L4** | Strong Software Engineer | L3 + all L4 competencies + experiences 16–27 + the L4 Depth Gate rule. |
| **L5** | Senior/Exceptional Engineer | L4 + repeated autonomy over complex subsystems + technical influence on others + a consistent history of sound decisions in ambiguous situations. |

L1 is a programmer. L2 is a junior who can ship scoped work. L3 is a hireable mid-level software engineer. L4 is one of the good ones on this track. L5 is not unlocked by study.

## Level calculation rules

### L1 — Programmer

Requires **Mastered** on every competency tagged **L1**.

That is the Core of domains 1, 2, 3, 6, and 7.

### L2 — Junior Software Engineer

Requires L1 and **Mastered** on every competency tagged **L2**.

That adds TypeScript, design, testing Core, SQL Core, HTTP Core, concurrency hygiene, security Core, Docker/CI Core, observability Core, product, professional-work Core, frontend Core, and Engineering with AI Core.

It also requires having built and deployed at least one integrated application rather than completing only isolated exercises.

### L3 — Software Engineer / Mid-level

Requires:

- every competency tagged L1, L2, or L3 **Mastered**;
- experiences 1–15 completed;
- no required L1–L3 competency in Review required.

L4-only competencies do not block L3. Domain 22 Advanced (RAG, agents, evals) is L4.

### L4 — Strong Software Engineer

Requires:

- completed L3;
- every competency tagged L4 **Mastered**;
- all 27 experiences;
- the L4 Depth Gate rule in Part IV.

### L5 — Senior/Exceptional Engineer

L5 must not be unlocked through a simple automated count. The platform should display it as a reference level and require narrative assessment based on:

- repetition over time;
- impact on systems and people;
- autonomy under ambiguity;
- technical influence and leadership;
- important decisions evaluated retrospectively;
- work extending beyond a single project.

L5 is not the current target of the track.

---

# Part IV — L4 Depth Gates

Each gate is complete only when all criteria are mastered and the capability has been exercised repeatedly or in a real system. Optional notes or links may record context but are not completion requirements.

Market seniors are T-shaped. L4 does **not** require all eight gates.

### L4 Depth Gate rule

L4 requires:

1. **Go** completed;
2. **Database Engineering** completed;
3. **one** of {Distributed Systems, Reliability/Operations, AI Engineering} completed;
4. **any two** of the remaining five gates completed.

Five completed gates in that pattern unlock L4, together with L4 competencies and experiences 16–27.

### Full Depth badge

Completing all **8** gates is a visible mastery badge. It does not change the level name and is not required to call the user a Strong Software Engineer.

---

## 1. Go

- [ ] I can repeatedly review Go code for API design, error handling, cancellation, concurrency, ownership, and idiomatic use and propose changes that improve it.
- [ ] I can reproduce a Go concurrency failure, identify the violated synchronization/cancellation invariant with race traces or runtime evidence, and verify the fix.
- [ ] I can use profiles and runtime metrics to locate a Go CPU, allocation, heap-retention, or goroutine problem and quantify the improvement.
- [ ] I can design packages with cohesive responsibilities, minimal consumer-defined interfaces, explicit ownership, and APIs that make invalid use difficult.
- [ ] I can explain how scheduling, garbage collection, allocation, escape behavior, or goroutine management affects a concrete Go design.

## 2. Database Engineering

- [ ] I can use execution plans, row estimates, runtime statistics, and query rewrites to locate and correct a complex query bottleneck.
- [ ] I can design and validate indexes from real predicates, joins, ordering, cardinality, and write frequency rather than indexing columns in isolation.
- [ ] I can predict lock acquisition and transaction interaction for a concurrent workflow and prevent blocking, deadlock, or lost-update behavior.
- [ ] I can design a high-risk schema/data migration with staged rollout, compatibility window, validation, monitoring, and a tested rollback or roll-forward strategy.
- [ ] I can state the consistency guarantee a workflow needs, quantify the performance/operational cost, and reject a stronger guarantee when it provides no user value.

## 3. Distributed Systems

- [ ] I can enumerate remote failure, timeout, retry, overload, and recovery behavior for every network dependency in a design.
- [ ] I can define the required duplication, ordering, and consistency semantics per workflow and handle violations explicitly.
- [ ] I can choose among a synchronous request, queue, and pub/sub from latency, coupling, fan-out, durability, ordering, and failure-handling requirements.
- [ ] I can carry an idempotency identity across request, persistence, message, and external-side-effect boundaries and define its retention/concurrency behavior.
- [ ] I can correlate logs, traces, metrics, message state, and deployment changes to isolate a failure spanning multiple services.
- [ ] I can implement or reject a distributed lock from uniqueness, lease, pause/lost-connectivity failure, and whether a smaller design exists.

## 4. Architecture

- [ ] I can turn ambiguous requirements into explicit functional flows, quality attributes, constraints, boundaries, data ownership, failure behavior, and an incremental implementation plan.
- [ ] I can compare at least two architectural options using the same requirements, operational costs, risks, reversibility, and expected evolution.
- [ ] I can identify where a likely change propagates across modules/services and move a boundary only when it measurably reduces that coupling.
- [ ] I can simplify an architecture by removing an unnecessary layer, service, abstraction, synchronization point, or duplicated source of truth without losing a requirement.
- [ ] I can review architecture proposed by an engineer or AI, verify its assumptions, expose missing failure/operational concerns, and propose a simpler valid alternative.

## 5. Reliability/Operations

- [ ] I can select logs, traces, latency, traffic, errors, saturation, dependency health, and recent changes relevant to a concrete failure.
- [ ] I can maintain a timeline of observations and tested hypotheses and distinguish measured facts from assumptions during an investigation.
- [ ] I can choose and execute the lowest-risk mitigation—rollback, traffic reduction, feature disablement, failover, or degradation—before completing root-cause analysis.
- [ ] I can turn an incident cause into a concrete prevention, detection, containment, recovery, or process improvement and verify that it was implemented.
- [ ] I can define an SLI and SLO from user-visible success, select a meaningful window/target, and connect the error budget to operational decisions.

## 6. Security

- [ ] I can map assets, actors, trust boundaries, entry points, abuse cases, mitigations, and residual risks for a feature before implementation.
- [ ] I can trace identity and permission checks through a code change and detect missing object ownership, role, tenant, or server-side enforcement.
- [ ] I can trace sensitive data from collection through processing, storage, logging, sharing, retention, and deletion and remove unnecessary exposure.
- [ ] I can reduce user, service, database, and infrastructure permissions to the minimum actions and resources required by the workflow.
- [ ] I can add explicit security requirements and abuse cases to design and acceptance criteria before implementation begins.

## 7. Performance

- [ ] I can establish a baseline, narrow a bottleneck across application/database/network/dependency layers, profile the responsible resource, and reproduce it with a controlled workload.
- [ ] I can state competing performance hypotheses and select measurements that can falsify each before changing code.
- [ ] I can correlate profiles with latency percentiles, throughput, errors, saturation, and workload characteristics.
- [ ] I can implement an improvement and demonstrate a meaningful before/after change under the same workload without hiding regressions.
- [ ] I can quantify the added memory, infrastructure, complexity, staleness, maintenance, or failure cost introduced by an optimization.

## 8. AI Engineering

- [ ] I can define an LLM feature’s user outcome, quality bar, data flow, prompt/model/tool boundaries, failure behavior, observability, evaluation, and staged production rollout.
- [ ] I can create representative evaluation cases, scoring criteria, baselines, and regression checks and use them to compare two versions.
- [ ] I can measure retrieval relevance/coverage separately from answer faithfulness/helpfulness and change the correct stage of the pipeline.
- [ ] I can budget and measure model calls, tokens, latency, concurrency, retries, timeouts, and fallback behavior against a service target.
- [ ] I can constrain agent tools through schemas, authorization, least privilege, iteration/time/cost limits, untrusted-data handling, and human approval for risky effects.
- [ ] I can choose Go, TypeScript, or Python for a component from runtime needs, ecosystem/library fit, team ownership, deployment, performance, and integration cost.

# Part V — Platform Specification

## 1. Product vision

### Proposition

A personal application for tracking software-engineering growth through explicit mastery criteria, honest self-assessment, and real experiences.

### Initial user

Misael Lima. The MVP is **single-user**. Multi-user support, organizations, a standards marketplace, and social features are out of scope.

### Desired outcome

When opening the platform, the user should know:

- current level;
- requirements missing for the next level;
- domains in progress;
- competencies requiring review;
- completed and missing experiences;
- current focus;
- recent assessment changes;
- recommended next gap.

### Product principle

> The platform should reduce the question “How far am I from becoming good?” to “What is the next demonstrable gap?”

---

## 2. Digital presence architecture

### Domains and applications

- `misaellima.com` — public portfolio.
- `misaellima.com/engineering` or `misaellima.com/progress` — optional public journey summary.
- `skills.misaellima.com` — complete authenticated platform.

### Repositories

The portfolio and the platform should be in **separate repositories/apps**.

Reasons:

- different responsibilities and lifecycles;
- authentication and persistence exist only in the platform;
- independent deployments;
- lower coupling;
- the platform itself can be presented as a portfolio project.

Both products should share a visual identity, but they do not need to share code in the MVP. Visual tokens may initially be duplicated and extracted into a shared package only when the duplication creates a real cost.

### Public integration

The portfolio may expose only a public snapshot:

- current level;
- completed domains;
- completed experiences;
- current focus;
- link to a public journey page.

It must never consume or expose private notes, candid self-assessments, optional evidence text, or internal links.

---

## 3. Recommended MVP stack

- **Application:** vinext + TypeScript.
- **Runtime/deployment:** Cloudflare.
- **Database:** PostgreSQL.
- **Authentication:** single-owner login in the MVP.
- **Validation:** shared schemas at input boundaries.
- **Persistence:** typed database access with versioned migrations.
- **Testing:** unit tests for calculation rules, integration tests for persistence, and E2E tests for critical flows.

Do not create a separate Go backend merely to use Go. Introduce a Go or Python service only when a concrete need justifies independent operation and deployment.

### Architectural constraints

- start as a single full-stack application;
- avoid microservices;
- avoid queues until real asynchronous work exists;
- avoid caching until there is a measured problem;
- avoid event sourcing;
- keep progression logic separate from UI and persistence;
- treat the Standard as versioned data, not conditionals scattered throughout the codebase.

---

## 4. Functional scope

### 4.1 Dashboard

The dashboard must show:

- Current Level;
- next level;
- missing requirements for the next level;
- Competency Coverage;
- Mid-level Domains;
- Engineering Experiences;
- Strong Engineer Depth;
- current focus;
- competencies requiring review;
- recent activity;
- latest weekly-review summary.

Example:

> **Current Level: L2 — Junior Software Engineer**  
> Mid-level domains: 11/24  
> Engineering experiences: 7/15  
> Current focus: Database Transactions  
> Next milestone: L3 — Software Engineer

This example must not be used as Misael’s real initial state without assessment.

### 4.2 Domains

List all 24 domains with:

- name;
- description;
- mastered/total L1–L3 competency count, plus outstanding L4 items when present;
- required level of the next incomplete item;
- status;
- active focus;
- items requiring review.

Derived domain statuses:

- Not started;
- In progress;
- Review required;
- Mid-level complete (all L1–L3 items mastered);
- Advanced in progress (mid-level complete, L4 items open).

### 4.3 Domain detail

Each domain page must contain:

- Knowledge;
- Competencies grouped by required level (L1 / L2 / L3 / L4);
- mid-level progress and, when present, L4 progress;
- personal notes;
- customizations;
- relevant history;
- a “Set as focus” action.

### 4.4 Competency detail

It must allow the user to:

- read the statement, criterion, and required level;
- change status;
- write optional Markdown notes;
- write optional Markdown evidence, including clickable links;
- view change history;
- record the latest review date;
- schedule a future review;
- indicate confidence;
- see whether the item belongs to the Standard or is customized.

The interface must display the complete competency wording or Mastery criteria before a user selects **Mastered**. Notes and evidence remain optional and never block the status change.

### 4.5 Engineering Experience Matrix

It must display:

- experiences 1–15 as Core/L3;
- experiences 16–27 as Strong/L4;
- status of each experience;
- related projects;
- optional Markdown notes and evidence links;
- incomplete requirements.

### 4.6 Depth Gates

It must display:

- all 8 gates;
- mastered/total criteria;
- derived status;
- an explanation that L4 requires Go + Database + one of {Distributed, Reliability, AI} + any two remaining gates; all eight is an optional Full Depth badge.

### 4.7 Optional assessment context

Every competency, experience, and depth-criterion assessment may contain:

- **Notes:** optional Markdown for context, doubts, reminders, or reasoning.
- **Evidence:** optional Markdown for a short description and one or more links.

These values are simple nullable columns on the corresponding assessment. There is no Evidence entity, library, type, strength, attachment, or many-to-many relationship.

Markdown must be sanitized before rendering. Standard `http` and `https` URLs must become safe, clickable links that open with appropriate security attributes.

### 4.8 Projects

Project records may include:

- Edge/NAIA;
- FelixHub/ÉlidaHub;
- EduNex;
- future projects.

Each project should aggregate:

- description;
- role;
- period;
- stack;
- environment;
- visibility;
- covered experiences;
- demonstrated competencies.

### 4.9 Weekly Review

Guided flow:

1. What did I learn?
2. Which competency can I now perform and explain according to its full criteria?
3. Which statuses changed?
4. Does any competency need to regress or be reviewed?
5. What is the next gap?
6. What will be the focus next week?

Generated summary:

- newly mastered items;
- domains that progressed;
- completed experiences;
- level/milestone changes;
- next focus;
- notes.

### 4.10 History

Timeline of:

- status changes;
- optional note/evidence-text changes;
- weekly reviews;
- Standard changes;
- customizations;
- focus changes;
- derived level changes.

### 4.11 Public profile

Optional, user-controlled page containing:

- name and positioning;
- current level;
- selected metrics;
- completed domains;
- focus;
- public experiences;
- related projects/case studies.

The public profile should present progress as a personal framework, not as a self-issued certification. Optional assessment notes and evidence must remain private unless a future explicit allowlist-based publishing feature is added.

---

## 5. Metrics

### 5.1 Primary metrics

| Metric | Calculation |
|---|---|
| **Competency Coverage** | mastered competencies / applicable Standard competencies |
| **Mid-level Domains** | domains whose L1–L3 competencies are mastered / 24 |
| **Engineering Experiences** | completed experiences / 27 |
| **Core Experiences** | completed experiences 1–15 / 15 |
| **Strong Engineer Depth** | L4 Depth Gate rule satisfied, plus completed gates / 8 |

### 5.2 Percentage rules

- Show percentages only for factual coverage.
- Do not display “87% Senior” or equivalent labels.
- Levels are gates, not interpolated percentages.
- Not applicable items leave the denominator only in a new track version.
- Customizations do not change Standard progress unless a new version formally promotes them.

### 5.3 Recommended next gap

The MVP may use deterministic rules:

1. required for the next level;
2. part of the current focus;
3. has completed prerequisites;
4. is In progress or Review required;
5. lowest estimated effort among items with equal impact.

AI is not required to choose the next gap in the MVP.

---

## 6. Standard, customizations, and versioning

### 6.1 Two layers

#### Standard v1.1

Stable baseline in this specification (v1.1 revises v1.0). It cannot be silently overwritten.

#### My Customizations

Personal items added by Misael, for example:

> I can use pg_stat_statements to find a hot query in a service I own.

Customizations may:

- add Knowledge;
- add competencies;
- add personal experiences;
- add notes and resources;
- specialize an item without changing its original text.

### 6.2 Editing the Standard

The Standard may evolve only through an explicit version:

- v1.1 → v1.2 for compatible adjustments;
- v1.x → v2.0 for structural or criteria changes.

Each change must record:

- author;
- date;
- reason;
- change type;
- previous text;
- new text;
- impact on progression;
- migration strategy.

### 6.3 Historical immutability

An old assessment must continue to reference the version active at the time. Updating the Standard must not retroactively rewrite history.

### 6.4 Migration

When activating a new version:

- equivalent competencies preserve status, notes, and evidence Markdown;
- split competencies require individual review;
- removed competencies remain in history;
- new items start as Not started;
- any resulting level change must be explained.

### 6.5 Fields that are not manually editable

- current level;
- derived counters;
- domain status;
- gate completion;
- original event date;
- identity and version of a Standard item.

---

## 7. Conceptual data model

### Main entities

| Entity | Responsibility |
|---|---|
| `User` | Account owner |
| `Track` | Backend Engineering + AI track |
| `StandardVersion` | Immutable Standard version |
| `Domain` | One of the 24 domains |
| `KnowledgeTopic` | Syllabus topic |
| `Competency` | Verifiable capability |
| `CompetencyAssessment` | Current status plus optional Markdown notes/evidence |
| `AssessmentEvent` | Status-change history |
| `Experience` | Experience Matrix item 1–27 |
| `ExperienceAssessment` | Status plus optional Markdown notes/evidence |
| `DepthGate` | One of the 8 depth areas |
| `DepthCriterion` | Criterion within a gate |
| `DepthCriterionAssessment` | Status plus optional Markdown notes/evidence |
| `Project` | Optional context for experiences and learning |
| `WeeklyReview` | Periodic review |
| `FocusItem` | Current or historical focus |
| `Customization` | Personal item outside the baseline |
| `PublicProfileSettings` | Granular publication control |

### Essential relationships

- A Track has many StandardVersions.
- A StandardVersion has Domains, Experiences, and DepthGates.
- A Domain has KnowledgeTopics and Competencies.
- A Competency has one current CompetencyAssessment per user and many AssessmentEvents.
- An Experience and DepthCriterion have equivalent per-user assessment records.
- A Project may be referenced by an experience assessment as optional context.
- A WeeklyReview references changes and defines the next FocusItem.
- PublicProfileSettings controls which entities are exposed.

### Minimum `Competency` fields

- `id`;
- `standard_version_id`;
- `domain_id`;
- `stable_code`;
- `statement` containing the observable capability;
- optional `mastery_criteria` array for clarifying a compound capability;
- `required_level` (`L1` | `L2` | `L3` | `L4`);
- `required`;
- `order`;
- `created_at`.

`mastery_criteria` are explanatory subcriteria for one assessment, not independently scored checkboxes. A competency must not rely on undefined terms such as “correctly,” “appropriately,” or “understand” without stating the observable behavior those terms represent.

### Minimum `CompetencyAssessment` fields

- `user_id`;
- `competency_id`;
- `status`;
- optional `confidence`;
- optional `notes_markdown TEXT`;
- optional `evidence_markdown TEXT`;
- `last_reviewed_at`;
- optional `review_due_at`;
- `updated_at`.

`ExperienceAssessment` and `DepthCriterionAssessment` follow the same pattern, replacing `competency_id` with their respective item ID. Markdown fields are simple nullable columns, stored as source text and rendered through a sanitized Markdown pipeline. Links must allow only `http` and `https`, open with `rel="noopener noreferrer"` when using a new tab, and never execute embedded HTML or scripts.

### Events instead of simple overwrites

Current status may be materialized for fast reads, but every important change must create an `AssessmentEvent`. This preserves evolution history without adopting event sourcing as the full architecture.

---

## 8. Business rules

### BR-01 — Competency completion

Only Mastered counts toward progress.

### BR-02 — Explicit mastery criteria

A competency may be marked Mastered only as an intentional self-assessment against its complete statement and any embedded Mastery criteria. The system does not require proof, but the Standard must not use undefined mastery terms.

### BR-03 — Domain completion

A domain is mid-level complete only when all applicable L1–L3 competencies are mastered. L4 competencies do not block that status.

### BR-04 — Experience completion

An experience is complete when the user personally performed and can explain the work described by the full item. Notes and evidence links are optional.

### BR-05 — Depth Gate completion

A gate is complete when all of its criteria are Mastered. L4 requires the Depth Gate rule in Part IV, not all eight gates. Each criterion must describe observable repeated or real-system capability rather than rely on proof records.

### BR-06 — Derived level

The current level is the highest level whose requirements are fully satisfied. L4 uses the Depth Gate rule in Part IV (five gates in the required pattern), not 8/8. L4-only competencies never block L3.

### BR-07 — Valid regression

Changing Mastered to In progress or Review required preserves history and recalculates the level.

### BR-08 — Privacy

Assessments, notes, and evidence Markdown are private by default. Making a project or progress summary public does not publish these fields.

### BR-09 — Immutable Standard

Editing the text of a Standard item creates a new version; it does not retroactively alter the active version.

### BR-10 — Isolated customization

A custom item does not alter the level requirements of the active Standard.

### BR-11 — Optional context

Notes and evidence Markdown never affect completion calculations. Clearing either field does not change the assessment status.

### BR-12 — Safe Markdown

Rendered Markdown must be sanitized, block executable HTML and unsafe protocols, and make valid links clickable without allowing script execution or opener access.

---

## 9. Privacy and publication

### Visibility

- **Private:** authenticated user only.
- **Anonymized:** public content without names, links, or sensitive information.
- **Public:** shown on the public profile.

### Rules

- private by default;
- assessment notes and evidence Markdown are never made public automatically;
- secrets, personal data, school data, and internal information must not be stored in public text;
- internal links must remain private;
- the public page must use a content allowlist, not a blacklist;
- a preview must show exactly what will be published.

---

## 10. UX and navigation

### Primary navigation

- Dashboard
- Domains
- Experience Matrix
- Depth Gates
- Projects
- Weekly Reviews
- History
- Public Profile
- Settings

### Essential interactions

- global search across competencies, topics, experiences, and projects;
- filters by domain, status, level, project, and visibility;
- quick actions to change status, edit optional context, and change focus;
- deep links for every item;
- clear explanations of why a level has not yet been reached;
- responsive interface;
- keyboard accessibility and no reliance on color alone.

### “Next milestone” page

It must answer:

- what is missing;
- why it is required;
- what the full mastery criteria require;
- which current projects may help develop that capability;
- which item is blocking the most progress.

---

## 11. Non-functional requirements

### Security

- authentication required in the private area;
- server-side authorization;
- CSRF protection appropriate to the authentication mechanism;
- validation of every input;
- rate limiting on sensitive endpoints;
- secrets only in the environment;
- logs without confidential content;
- dependency checks in CI.

### Reliability

- versioned migrations;
- tested backup and restore;
- idempotent write operations where necessary;
- observable errors;
- assessment audit trail;
- no silent loss of long-form text.

### Performance

- dashboard and primary lists should feel fast;
- pagination for long history and project lists;
- avoid recalculating the entire tree on the client;
- indexes for frequent filters and links;
- optimize only after measuring.

### Accessibility

- semantic HTML;
- keyboard navigation;
- form labels;
- visible focus;
- adequate contrast;
- text accompanying status colors;
- basic screen-reader support.

### Portability

- complete JSON export;
- human-readable Markdown export;
- future import based on schema version;
- user data must not be trapped in the interface.

---

## 12. Critical flows and acceptance criteria

### Flow A — Assess a competency

1. User opens a competency.
2. Reads the complete statement and any Mastery criteria.
3. Selects Not started, In progress, Mastered, or Review required.
4. Optionally writes notes or evidence Markdown.
5. System records the event and recalculates domain and level.

**Acceptance:**

- no notes or evidence are required to save a status;
- valid Markdown links render as clickable `http`/`https` links;
- unsafe HTML and protocols do not execute;
- history preserves the previous status;
- dashboard and next-milestone calculations reflect the change.

### Flow B — Edit optional context

1. User opens a competency.
2. Writes or edits notes/evidence Markdown.
3. Previews rendered Markdown.
4. Saves the assessment.

**Acceptance:**

- both fields accept plain text and Markdown;
- both fields may be empty;
- links are safe and clickable;
- editing context does not change status or progress automatically;
- the content remains private.

### Flow C — Regression

1. User changes Mastered to In progress.
2. Optionally records a reason.
3. System preserves optional notes and evidence Markdown.
4. System recalculates domain and level.

**Acceptance:**

- no optional context is deleted;
- regression appears in history;
- impact is shown without punitive language.

### Flow D — Weekly Review

1. System gathers changes since the previous review.
2. User answers the guided questions.
3. Confirms newly mastered items and regressions.
4. Sets the next focus.
5. System records the summary.

**Acceptance:**

- the review lists every status change since the previous completed review, without duplicates or omissions;
- a review may be saved as a draft;
- only one primary focus is active;
- the prior summary remains immutable unless an explicit edit creates history.

### Flow E — New Standard version

1. User creates a version draft.
2. Edits items.
3. Previews impact.
4. Publishes/activates the version.
5. Migrates assessments.

**Acceptance:**

- previous version remains available;
- no change happens silently;
- split or ambiguous items move to review;
- history points to the correct version.

### Flow F — Publish progress

1. User selects public summary fields.
2. Views a preview.
3. Publishes the snapshot.

**Acceptance:**

- only allowlisted content appears;
- private links do not leak;
- revoking publication removes public content;
- the portfolio receives only public data.

---

## 13. MVP

### Included

- single-user authentication;
- seeded Standard v1.1;
- dashboard;
- list and detail pages for all 24 domains;
- competency statuses;
- optional Markdown notes and evidence columns on assessments;
- Experience Matrix;
- Depth Gates;
- projects;
- current focus;
- basic history;
- level calculation;
- JSON/Markdown export;
- minimum profile settings.

### Immediately after MVP

- guided Weekly Review;
- review reminders;
- public page;
- portfolio-consumable snapshot;
- Standard version comparison;
- deterministic next-gap recommendation.

### Out of initial scope

- multi-user support;
- teams;
- social feed;
- arbitrary points-based gamification;
- ranking;
- standards marketplace;
- automatic AI-generated competencies;
- general chatbot;
- Evidence entity, evidence library, attachments, or E1–E5 classification;
- microservices;
- native mobile app;
- automatic GitHub/Linear synchronization;
- AI independently deciding that a competency is mastered.

---

## 14. Recommended implementation order

### Phase 0 — Domain design

- turn this Markdown into a versioned seed;
- define stable IDs for domains, competencies, experiences, and gates;
- model calculation rules;
- create progression tests before the complete UI.

### Phase 1 — Private core

- authentication;
- read-only Standard;
- assessments;
- dashboard;
- Domains;
- Experience Matrix;
- Depth Gates.

### Phase 2 — Context and history

- optional assessment notes/evidence Markdown;
- safe Markdown rendering and clickable links;
- Projects;
- assessment history;
- validation and privacy rules.

### Phase 3 — Reflection and focus

- Weekly Review;
- Focus;
- review-required state;
- deterministic recommendation.

### Phase 4 — Publication

- visibility controls;
- public profile;
- snapshot for `misaellima.com`;
- privacy preview.

### Phase 5 — Standard evolution

- customizations;
- drafts;
- versioning;
- migration between versions;
- diff and impact.

---

## 15. Testing strategy

### Required unit tests

- competency status calculation;
- domain calculation;
- L1–L4 calculation;
- removal of Not applicable from the denominator;
- level regression;
- experience completion;
- Depth Gate completion;
- visibility rules;
- version migration.

### Integration tests

- persistence of an assessment plus event;
- persistence of optional notes/evidence Markdown without affecting progress;
- sanitized rendering of Markdown and safe clickable links;
- transaction when publishing a new version;
- dashboard queries;
- authorization.

### E2E

- login;
- master and regress a competency;
- edit and clear optional notes/evidence Markdown;
- complete an experience;
- perform a Weekly Review;
- publish and revoke a public item;
- export data.

---

## 16. Seed and stable identity

Every Standard item must have a stable semantic identifier independent of displayed text.

Examples:

- `domain.programming-fundamentals`
- `competency.testing.failure-paths`
- `experience.production-api`
- `depth.ai-engineering.evals`

The seed must contain:

- `standard_version`;
- order;
- stable code;
- title;
- description;
- requirement type;
- optional Mastery criteria;
- required level (`L1` | `L2` | `L3` | `L4`);
- relationships;
- English text.

Do not use list position as persistent identity.

---

## 17. Product Definitions of Done

### MVP complete

The MVP is complete when:

- Standard v1.1 is seeded and immutable;
- the user can assess every competency;
- optional notes/evidence Markdown can be saved and rendered safely;
- each domain status and count match its required applicable competency assessments;
- all 27 experiences and 8 gates can be tracked;
- L1–L4 are automatically derived;
- changes generate history;
- data can be exported;
- tests cover critical rules;
- the application is deployed and protected.

### Platform fulfilling its purpose

The platform fulfills its purpose when Misael can complete a Weekly Review and answer, without outside interpretation:

- what progressed;
- what is still only familiarity;
- what each incomplete competency explicitly requires for mastery;
- which requirement blocks the next level;
- which project can develop the next capability or experience.

---

# Part VI — Usage Guidelines

## Initial assessment

Do not begin by marking items based on vague memory. For each domain:

1. read Knowledge;
2. read the full competency statement and any Mastery criteria;
3. choose In progress whenever there is doubt;
4. optionally add notes or an evidence link when it will be useful later;
5. use Mastered only when every stated capability can be explained and reproduced without step-by-step guidance;
6. select at most one primary focus and two secondary focuses, preferring the next incomplete item required for the current target level;
7. do not treat L4 items as a reason to withhold L3.

## Weekly review

- review real changes from the week;
- reassess against the full competency wording rather than familiarity with the topic;
- do not create artificial work merely to increase percentages;
- use Edge, FelixHub/ÉlidaHub, EduNex, and future projects to cover natural gaps;
- record regressions honestly;
- choose the next gap based on career/project value, not ease of completion — prefer the next experience or competency that actually blocks the target level.

## Quarterly Standard review

- check whether criteria remain relevant;
- identify redundancy;
- identify new track capabilities;
- create a new-version draft;
- do not alter the active baseline impulsively;
- compare impact before publishing.

## Final rule

> The goal is not to complete checkboxes. It is to build real, demonstrable, transferable capability.

---

# Appendix A — Implementation Summary

## Product

Single-user authenticated application at `skills.misaellima.com`, separate from the portfolio at `misaellima.com`.

## Core

`Versioned Standard → Domains → Competencies → Assessments → Experiences → Depth Gates → Derived Level`

## Metrics

- Competency Coverage;
- Mid-level Domains;
- Core/Total Engineering Experiences;
- Strong Engineer Depth (L4 rule + 8/8 badge);
- Current Level;
- Next Milestone.

## Invariant rules

- level is never manual;
- the Standard is never overwritten;
- mastery is defined by explicit capabilities, not required proof records;
- notes and evidence are optional Markdown fields on assessments;
- everything is private by default;
- customization does not corrupt the baseline;
- regression is allowed and auditable;
- AI does not grant mastery automatically.

## Target

> **L4 — Strong Software Engineer**, with T-shaped depth: Go, databases, and selected gates. Full Depth (8/8) is optional.

---

# Appendix B — Conceptual References

The Standard is designed as a personal, practical framework inspired by bodies of knowledge and professional references, without claiming formal equivalence to them:

- [SWEBOK — Software Engineering Body of Knowledge](https://www.computer.org/education/bodies-of-knowledge/software-engineering)
- [SFIA — Levels of Responsibility](https://sfia-online.org/en/sfia-9/responsibilities)
- [OWASP Top 10:2025](https://owasp.org/Top10/2025/)
- [Codility Engineering Skills Model 2.1](https://www.codility.com/lab/engineering-skills-model/)
- [Andrew Ng / DeepLearning.AI AI Engineering Skills Map](https://www.deeplearning.ai/the-batch/the-ai-engineering-skills-map)
- [Google SRE — Monitoring Distributed Systems](https://sre.google/sre-book/monitoring-distributed-systems/)
- [Google SRE — Incident Management Guide](https://sre.google/resources/practices-and-processes/incident-management-guide/)

These references help calibrate breadth and practice. The criteria, levels, and gates of this platform remain defined by the versioned personal Standard above.

## Standard Storage and Data Ownership

The Standard must not be hardcoded into UI components. Domains, knowledge topics, competencies, experiences, and depth criteria must be stored as structured records in PostgreSQL and rendered dynamically by the application.

The repository must also contain a versioned seed file—such as `standard-v1.1.json` or a TypeScript equivalent—that represents the reproducible definition of Standard v1.1. The seed initializes the database, but the application reads the published Standard from PostgreSQL at runtime.

Use the following ownership rules:

* **Repository seed:** canonical and reproducible definition of each Standard version.
* **PostgreSQL:** published Standard versions, assessments with optional notes/evidence Markdown, projects, history, reviews, and customizations.
* **Application code:** presentation, validation, business rules, and level calculations.
* **Markdown document:** human-readable specification and reference.

Every Standard item must have a stable semantic identifier, such as `competency.testing.failure-paths`. List position or displayed text must never be used as persistent identity.

Editing an item through the platform must not overwrite the original Standard. The change must create either a personal customization or a draft of a new Standard version. Published versions and their historical assessments must remain immutable.
