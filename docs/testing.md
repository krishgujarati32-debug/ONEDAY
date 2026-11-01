# Testing and verification

## Automated

`npm test` currently contains 13 tests. Domain checks cover original curriculum coverage/order, data integrity, real empty-state behavior, fractional progress, separate core/optional totals, revision, continuation, weekly calendar boundaries, export round-trips, invalid import rejection, safe merging and local-only auth redirects.

The PostgreSQL integration test uses an in-memory PGlite database. It runs the actual migration and checks both RPCs, all six tables' RLS SELECT/INSERT/UPDATE/DELETE isolation, anonymous denial, stale revisions and rollback of a failing multi-table save. No external database or credentials are necessary for this test. Supabase authentication identity is represented by a minimal local auth schema.

`npm run check:curriculum` validates all IDs, original topic/subtopic order, educational fields, references and generated indexes. After curriculum edits, regenerate the index before running checks.

`npm run test:routes` checks every concrete page route against a running server, along with a missing-topic 404, a lesson-fragment search result and the state endpoint. Set `SMOKE_BASE_URL` for a non-default port.

Strict TypeScript, ESLint and an optimized production build are separate checks. Build commands may need a normal host terminal when Windows sandbox networking prevents Turbopack's local worker connection.

## Browser QA

Use an isolated local origin for interaction tests so test progress does not populate the user's normal preview. Verify status changes, undo, note save and reload, bookmarks, search, filters, study logs, project requirements, appearance and mobile navigation. Check desktop, tablet and mobile widths and ensure the document does not overflow horizontally.

Test modal confirmations before import/reset and verify input validation. Native dialogs provide focus containment; mobile navigation traps focus and supports Escape. Unsaved note drafts are scoped to the browser tab and account. They are recovery copies, not cross-device saves.

## Still external

No real Supabase credentials were provided. Live sign-up email delivery, recovery emails, token refresh, two-account hosted isolation, cross-device sync and actual Vercel behavior must be verified using the configured environment and the deployment checklist. Do not interpret a passing local SQL test as proof that an external project has applied the migration correctly.

The UI's knowledge guides and resource catalog need periodic editorial review. The app does not claim mastery, job readiness, a fixed completion date or large-scale capacity from checkbox completion.

## Local verification record — November 1, 2026

- Strict TypeScript passed; full ESLint passed without warnings.
- All 13 automated tests passed, including the actual PostgreSQL migration and RLS test.
- Optimized Next.js production build generated 119 routes/assets in its build report.
- HTTP smoke check: 113/113 concrete page routes returned usable HTML; missing-topic 404, exact lesson-fragment search and state endpoint also passed.
- Browser verified: roadmap topic search; lesson checkbox and 5.3% topic calculation for 1/19 lessons; reload persistence; topic bookmark; explicit note save; revision and undo; a study log appearing in the weekly chart; exact subtopic navigation from global search; project checklist calculation of 12.5% for 1/8 requirements; JSON export; validated import and confirmed merge.
- Responsive checks covered 1440px desktop, 768px tablet, 390px mobile and 320px narrow mobile. Mobile navigation opened and linked to the dashboard. Measured document width did not exceed the viewport.
- Interaction data was created on the isolated production QA origin on port 3002, separate from the user's normal preview on port 3001. No dummy progress is seeded in source.
- Live Supabase, email delivery and Vercel remain external verification tasks.
