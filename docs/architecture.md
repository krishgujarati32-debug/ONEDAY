# Architecture

The public curriculum is versioned TypeScript/JSON content, independent of personal learning records. App Router Server Components generate the homepage and individual phase, topic and project wrappers. Interactive components receive the relevant lesson or lean metadata, rather than shipping all full lesson definitions in the global shell.

`LearningProvider` owns one validated client snapshot and its server revision. In unconfigured preview it reads/writes one browser-local key. In configured mode it calls authenticated `/api/state`; no local progress becomes the account's source of truth. The provider uses an in-flight lock, optimistic updates, transactional persistence, rollback on failure and clear errors. Notes have explicit saves; per-tab drafts are a recovery aid, scoped to user ID and note target, and are not cloud data.

The state API verifies the user with `auth.getUser()`, validates the full payload against Zod and curriculum ID allowlists, checks mutation Origin, bounds the request size and calls an invoker-rights PostgreSQL RPC. PostgreSQL RLS supplies the actual ownership boundary. A locked settings revision prevents stale device snapshots from overwriting newer changes.

`src/proxy.ts` refreshes cookie sessions using `getClaims()` and redirects unauthenticated visitors from private workspace routes. Each data endpoint independently verifies identity. Public content never contains private records. Private API responses use `Cache-Control: private, no-store`.

Search runs on the server across all curriculum content and the project, technology and resource catalogs. Its result URLs point to actual pages or lesson fragments. The client debounces input and cancels outdated requests.

The app uses semantic HTML, native disclosure elements, labeled controls, native modal dialogs, focus indicators, a skip link and reduced-motion handling. Charts are small data-driven SVG/CSS views with accessible labels; no large charting dependency is needed.

A personal workspace snapshot is intentionally small. Saving replaces the user's normalized rows in one transaction; this favors atomic import and simple, predictable recovery over partial client reconciliation. For much larger collaborative workloads, evolve to row-level mutation endpoints and a change log without removing RLS or optimistic concurrency.
