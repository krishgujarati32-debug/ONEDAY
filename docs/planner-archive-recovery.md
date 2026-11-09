# Planner archive recovery

The preview provider reads `engineer-learning-preview-v1` from localStorage after hydration. A snapshot saved by the earlier planner build can contain a top-level `planner` object. Before this fix, the strict state schema rejected that key and the provider entered its paused state. The HTTP 200 for the page covered the rendered application shell. The browser read happened later. The hosted read path used the same strict state schema, but reported a generic HTTP 422 when validation failed.

The state schema now recognizes an optional version 1 planner archive, or null. The archive is bounded JSON and is retained in full. The current application does not interpret it as a live planner. Other top-level keys and current learning records retain strict validation. Older version 1 exports remain readable. The historical personal-study session ID and planner-era resource bookmarks are accepted in stored data. Ordinary saves and imports without a planner field keep the existing archive. A merge of two different archives asks the learner to export the current copy and explicitly choose which snapshot to restore. An unreadable preview snapshot stays in place and can be downloaded exactly from **Account & data**.

## Supabase

Browser-only recovery requires no database change. For hosted planner-bearing backups, review and apply [the additive archive migration](../supabase/migrations/202611080001_preserve_planner_archive.sql) after the base learning migration. It adds a nullable column if needed and defines owner-scoped read and save RPCs. The save uses the existing revision check and transaction. Existing settings and learning rows are not rewritten when the migration is applied.

Before applying it, back up the project and use the SQL Editor to check the schema without selecting user data.

```sql
select
  exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'user_settings'
      and column_name = 'planner'
  ) as has_planner_column,
  to_regprocedure('public.read_learning_workspace()') is not null as has_read_rpc,
  to_regprocedure('public.save_learning_workspace(jsonb,bigint)') is not null as has_save_rpc;
```

If the planner column exists, an authorized database operator can count affected rows with `select count(*) from public.user_settings where planner is not null;`. Keep existing backups. The earlier RPCs still support ordinary learning state on projects that lack the archive migration. A save that carries a planner field stops with a migration message if the archive RPC is missing. Existing hosted users and records were outside the local test environment.

## Hydration

The installed 1ClickVPN Proxy for Chrome extension, version 1.17.15, registers its processor at document start. The processor builds `__processed_<id>__` and sets it to `true` on `document.body`. The attribute was absent in ONEDAY's HTTP response and in extension-free Chrome. For a browser that still reports it, disable the extension's access to the ONEDAY origin or use an extension-free profile. [Next.js hydration guidance](https://nextjs.org/docs/messages/react-hydration-error)

## Local verification

`npm run check:curriculum`, `npm run typecheck`, `npm run lint`, `npm test` (25 tests), and `npm run build` passed. The production smoke test passed all 252 page routes.

An isolated browser reproduced the original Zod rejection with fixture data. On the fixed production build it verified fresh preview, existing progress, lesson completion after reload, planner export, exact download of invalid raw data, retry after restoring valid data, and protection from a stale tab. A local authentication and PostgREST fixture backed by real PostgreSQL exercised the actual Next.js cloud API. The tests covered the legacy fallback, the no-write guard when the planner RPC is missing, archive persistence, owner isolation, revision conflicts, and invalid snapshots. Hosted sign-in and cross-device sync remain external checks.
