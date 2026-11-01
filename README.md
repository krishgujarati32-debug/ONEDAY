# AI Systems Engineer — Learning Roadmap

**From Programming Fundamentals to Intelligent, Scalable AI Systems.**

A personal learning platform built with Next.js App Router, React, strict TypeScript, Tailwind CSS, Lucide, Zod and Supabase. Includes all 12 requested phases, all 79 original topics, 3 optional supporting-language topics, 1,291 individually tracked lessons, 7 detailed projects and a curated official-source library.

## What works

- Public career introduction, complete roadmap, phase overviews and dedicated topic pages.
- Distinct definitions for all original 1,276 subtopics, plus supporting-language lessons. Every lesson includes study guidance, application context, an exercise, completion criteria and references.
- Four lesson statuses, immediate progress calculations, undo, revision lists, topic and lesson bookmarks, resource bookmarks and project bookmarks.
- Private topic, lesson and project notes with explicit save status. Unsaved note drafts survive navigation in the same browser tab.
- Dashboard with actual study logs, weekly activity, overall/core/optional completion, phase progress, recommendations and recently visited/completed topics.
- Project milestones, persistent functional checklists, technology categories, resource filters and a searchable saved-items collection.
- Global search with Ctrl/Cmd+K; roadmap filters and sorting; light, dark and system themes; mobile navigation.
- Validated JSON import with explicit merge/replace confirmation, export and confirmed reset.
- Supabase SSR sign-up, sign-in, confirmation, password recovery, session refresh and sign-out. Private state is stored in PostgreSQL with RLS when configured.
- A clearly labeled browser-local preview when Supabase is absent. No hardcoded demo account or fabricated progress.

## Run locally

Use Node.js 22 LTS or another supported current Node release (at least the minimum documented by the installed Next.js version). This workspace was checked with Node 26.

```powershell
cd D:\ONEDAY
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). To choose a different port:

```powershell
npm run dev -- --port 3001
```

No environment variables are needed for preview mode. Preview progress is saved only in the current browser and origin. Changing the port or switching between `localhost` and `127.0.0.1` creates a separate preview store. Export before changing environments.

## Environment

Copy the example, then enter your own project's **public** values:

```powershell
Copy-Item .env.example .env.local
```

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Get these values from the Supabase project's Connect dialog. A publishable key is intentionally browser-visible; access is controlled by the authenticated JWT and database policies. Never put a database password, service-role key or secret API key in a `NEXT_PUBLIC_` variable. This application needs no privileged key and no paid AI API.

Restart development after changing environment variables. On Vercel these variables are embedded during build, so redeploy after changing them.

## Supabase setup

1. Create a Supabase project. Use separate projects for production and experiments when practical.
2. Run `supabase/migrations/202611010001_learning_platform.sql` in the SQL editor of a **new** project. It creates six user-owned tables, RLS policies and two transactional RPC functions. Alternatively link the Supabase CLI and run `supabase db push`.
3. Enable email/password authentication. Keep email confirmation enabled for production. Choose an appropriate password policy and configure production SMTP if required by your email volume.
4. Under Authentication → URL Configuration, set the Site URL to your canonical deployed origin. Add exact allowed redirects for `http://localhost:3000/auth/callback`, `http://localhost:3000/auth/callback?next=/auth/update-password`, and the corresponding production URLs. If using port 3001, add that origin too. Restrict preview URLs to environments you control.
5. The app supports the default PKCE email redirect through `/auth/callback`. It also supports token-hash templates through `/auth/confirm`:
   - Confirmation: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`
   - Recovery: `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery`
     Use a Site URL appropriate to the project/environment. Check real emails before launch.
6. Set the environment values, restart the app and create your first account at `/auth/sign-up`.
7. Confirm the email and sign in. The header now reflects account storage. A new account starts at 0%.
8. If you learned in preview, export your progress first, then import it after signing in. Preview data is never silently merged into your account.
9. Sign in from a second browser and verify progress, notes and study history. Complete the [production verification checklist](docs/deployment.md).

Public curriculum stays viewable without authentication. When Supabase is configured, `/dashboard`, `/settings` and `/saved` require a session. Unauthenticated lesson edits redirect to sign-in; they do not silently fall back to local persistence.

## Commands

| Command                    | Purpose                                                      |
| -------------------------- | ------------------------------------------------------------ |
| `npm run dev`              | Start the development server                                 |
| `npm run build`            | Build the production application                             |
| `npm start`                | Serve the production build                                   |
| `npm run typecheck`        | Strict TypeScript checks                                     |
| `npm run lint`             | ESLint and React/Next.js checks                              |
| `npm test`                 | Domain tests and real local PostgreSQL/RLS integration test  |
| `npm run check:curriculum` | Validate content, IDs, prerequisites and references          |
| `npm run curriculum:index` | Regenerate the lean client index after curriculum edits      |
| `npm run test:routes`      | Smoke-test a running server; default `http://localhost:3000` |
| `npm run format`           | Format source, data, tests and documentation                 |

For route checks on a different port, set `SMOKE_BASE_URL` before running `npm run test:routes`.

## Structure

```text
src/app/                  App Router pages, search and authenticated state endpoints
src/components/           Responsive shell, lesson room, dashboard and workspace tools
src/data/outline.json     Original curriculum structure and ordered lesson titles
src/data/knowledge.json   Topic-specific explanations and practical assignments
src/data/lessons.json     Individual subtopic definitions, indexed by stable topic ID
src/data/curriculum.ts    Typed curriculum assembly and priority rules
src/data/index.json       Generated lean index without full lesson content
src/data/ids.json         Generated ID allowlists for data validation
src/data/projects.ts      Seven project plans and milestones
src/data/resources.ts     Verified resource catalog and topic relationships
src/data/technologies.ts  Technology learning map
src/lib/                  State validation, progress logic and Supabase clients
src/proxy.ts              Next.js 16 session refresh and private-page redirects
supabase/migrations/      Reproducible PostgreSQL schema, RLS and transactional RPCs
tests/                    Domain and PostgreSQL isolation tests
scripts/                  Curriculum indexing, validation and HTTP smoke checks
docs/                     Architecture, data, progress, auth, RLS and deployment guides
```

The `.psv` files are readable editorial source copies for the initial lesson and topic packs. Runtime code imports the JSON. If editing PSV, update the corresponding JSON too; there is no implicit PSV runtime loader.

## Deploy to Vercel

1. Run the checks and production build locally.
2. Create a GitHub repository and push this directory, including `package-lock.json`. Do not commit `.env.local` or generated output.
3. Import the repository into Vercel. Select the **Next.js** preset; use `npm ci` and `npm run build`. Leave the output directory at its framework default.
4. Configure the two public Supabase variables for the intended Preview and Production environments. Prefer a separate preview database; never copy private keys into frontend variables.
5. Deploy. Update Supabase Site URL and redirect allowlist for the actual canonical domain.
6. Verify account creation, real email confirmation, password recovery, sign-out and a fresh session on the deployed domain. Check two-account isolation and cross-device persistence.

Do not use static export: authentication, search and persistence use server routes. A Vercel-specific config file is unnecessary because the supported framework preset discovers this app.

## Testing status and limits

The included suite exercises curriculum completeness, progress math, import rejection, redirect safety, database migrations, owner-only SELECT/INSERT/UPDATE/DELETE, anonymous access denial, state round-trips, stale revisions and transaction rollback. The PostgreSQL integration test uses PGlite in memory and mocks only Supabase's `auth.users` and `auth.uid()`; actual PostgreSQL policies and functions execute unchanged.

Live Supabase email delivery, session refresh, two-device synchronization and Vercel deployment require your external project and credentials. These cannot be certified from a local unconfigured preview. See [testing notes](docs/testing.md) for verification evidence and remaining checks.

Hinglish aids are supplied for selected topics; every topic retains English explanations. Lesson estimates are planning aids, not promises, and project/revision time may exceed them. Lessons are structured study guides paired with authoritative references, rather than a replacement for the full referenced textbooks or documentation.

## Troubleshooting

- **Preview notice still showing:** set both public variables, then restart or redeploy.
- **Could not load cloud progress:** confirm the migration ran in the project selected by your URL/key. Check the browser's network status and server logs.
- **Invalid or expired email link:** request a fresh link, check Site URL/redirect configuration and verify the template uses a supported callback.
- **Change in another tab/device:** the revision check prevented an overwrite. Reload saved data before retrying; copy an unsaved note first if needed.
- **Import rejected:** use a version 1 export with IDs from this curriculum. Invalid records are rejected before any write.
- **Local preview differs between browsers:** this is expected. Use export/import or connect Supabase for account persistence.
- **Turbopack worker connection blocked by a Windows sandbox:** build in a normal local terminal. The application does not need a network service during build.
- **Development origin blocked:** use the exact local URL printed by the server. Production does not depend on development HMR endpoints.
- **Browser storage disabled/full:** preview saves roll back and show an error; export regularly and use cloud mode for durable authenticated storage.
#   O N E D A Y  
 #   O N E D A Y  
 