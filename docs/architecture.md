# Application architecture

ONEDAY uses the existing Next.js App Router application. The ordered roadmap, projects, resources and lesson rooms are public. Account routes use Supabase SSR cookies. The request proxy refreshes sessions. The data API validates the signed-in owner independently of route redirects.

- `src/data/curriculum.ts` composes the canonical path and retained content.
- `scripts/build-manifest.ts` derives the client index, active IDs, historical migration maps and deterministic route redirects.
- `src/lib/progress.ts` reads the same ordered index for dashboard continuation, numbering and previous/next lesson links.
- `src/lib/state.ts` validates active and historical IDs. `LearningProvider` keeps the existing local preview and cloud-save paths.
- The base SQL migration creates owner-scoped tables and read/save RPCs. The additive planner archive migration preserves the optional version 1 planner payload. V5 practice and checkpoint records use the existing revision-protected progress table.
- The resource index and older deep links preserve known entry points. The combined ingestion, RAG and MCP project uses new milestone keys. Earlier keys remain valid in saved state.

The curriculum uses Python and backend-first projects. The learning site's React interface and its authentication and persistence implementation remain separate from the technologies taught by the roadmap.

Related details live in [curriculum](curriculum.md), [progress](progress.md), [database](database.md) and [authentication](authentication.md).
