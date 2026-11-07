# ONEDAY — AI Systems Engineer Learning Roadmap

<p align="center">
  <strong>From Programming Fundamentals to Intelligent, Scalable AI Systems.</strong>
</p>

<p align="center">
  A structured learning platform to plan your journey, master essential technologies, build real-world projects, and track your progress toward becoming an AI Systems Engineer.
</p>

<p align="center">
  <a href="https://oneday-rosy.vercel.app/resources"><strong>🚀 Live Demo</strong></a> •
  <a href="https://github.com/krishgujarati32-debug/ONEDAY"><strong>💻 GitHub Repository</strong></a>
</p>

---

## 📌 About the Project

**ONEDAY** is a personal learning and progress-tracking platform designed around a long-term journey toward becoming an **AI Systems Engineer**.

The platform organizes a comprehensive technical curriculum into structured phases, topics, individual lessons, practical exercises, projects, and curated learning resources.

It is built to make learning more organized, measurable, and practical.

### 📊 Curriculum at a Glance

| Metric | Included |
|---|---:|
| Learning Phases | 12 |
| Original Core Topics | 79 |
| Optional Supporting-Language Topics | 3 |
| Individually Tracked Lessons | 1,291 |
| Guided Projects | 7 |
| Curated Learning Resources | 42 |

*The original curriculum contains 1,276 subtopics, alongside additional supporting-language lessons.*

---

## ✨ Key Features

### 📚 Structured Learning Roadmap
- 12 organized learning phases.
- Detailed topic and lesson pages.
- Study guidance and practical application context.
- Exercises, completion criteria, and learning references.
- English explanations with selected Hinglish learning aids.

### 📈 Progress Tracking
- Four lesson completion statuses.
- Real-time progress calculations.
- Undo support and revision lists.
- Topic and lesson bookmarks.
- Overall, core, optional, and phase-wise progress.

### 🧠 Personal Learning Dashboard
- Actual study logs and weekly activity.
- Learning recommendations.
- Recently visited and completed topics.
- Phase-wise progress overview.
- Study history and completion analytics.

### 🛠️ Project Workspace
- Seven guided projects.
- Project milestones.
- Persistent functional checklists.
- Technology categories.
- Project bookmarks.

### 🔖 Resources & Saved Items
- Curated learning resources.
- Resource filters and topic relationships.
- Searchable saved-items collection.
- Bookmarks for topics, lessons, resources, and projects.

### 📝 Personal Notes
- Private topic, lesson, and project notes.
- Explicit save status.
- Unsaved note drafts survive navigation in the same browser tab.

### ⚡ Search & User Experience
- Global search with `Ctrl/Cmd + K`.
- Roadmap filtering and sorting.
- Light, Dark, and System themes.
- Responsive mobile navigation.

### 🔐 Authentication & Data Management
- Supabase SSR authentication.
- Sign-up, sign-in, email confirmation, and password recovery.
- Session refresh and sign-out.
- PostgreSQL-based private user data with Row Level Security (RLS), when configured.
- Validated JSON import and export.
- Explicit merge/replace confirmation and confirmed reset.
- Clearly labeled browser-local preview mode when Supabase is not configured.

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js App Router | Application framework |
| React | User interface |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling and responsive design |
| Lucide | Icons |
| Zod | Data validation |
| Supabase | Authentication and cloud integration |
| PostgreSQL | Database |
| PGlite | PostgreSQL integration testing |

---

## 🚀 Getting Started

Follow these steps to run ONEDAY locally.

### Prerequisites

- Node.js 22 LTS or another version supported by the installed Next.js release.
- npm
- Git

A Supabase project is optional for browser-local preview mode, but required for cloud accounts and synchronized progress.

### 1. Clone the Repository

```bash
git clone https://github.com/krishgujarati32-debug/ONEDAY.git
```

### 2. Open the Project

```bash
cd ONEDAY
```

### 3. Install Dependencies

```bash
npm ci
```

### 4. Start the Development Server

```bash
npm run dev
```

### 5. Open in Browser

Visit:

```text
http://localhost:3000
```

To use another port:

```bash
npm run dev -- --port 3001
```

**Note:** No environment variables are needed for preview mode. Preview progress is stored in the current browser and origin. Export your progress before switching environments.

---

## 🔐 Environment Configuration

To connect your own Supabase project, copy the example environment file:

```powershell
Copy-Item .env.example .env.local
```

Add your Supabase public configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Get these values from your Supabase project's **Connect** dialog.

### Security Guidelines

- Never commit `.env.local`.
- Never expose database passwords or service-role keys.
- Never put secret API keys in `NEXT_PUBLIC_` variables.
- Use authenticated JWTs and database policies to control access.

This application does not require a paid AI API or a privileged Supabase key.

---

## 🗄️ Supabase Setup

1. Create a Supabase project.
2. Run the migration file in a new project's SQL Editor:

   `supabase/migrations/202611010001_learning_platform.sql`

3. Alternatively, link the Supabase CLI and run:

   ```bash
   supabase db push
   ```

4. Enable email/password authentication.
5. Configure the Site URL and allowed redirect URLs under Authentication → URL Configuration.
6. Add the required environment variables to `.env.local`.
7. Restart the development server.
8. Create an account at `/auth/sign-up`.
9. Confirm your email and sign in.
10. Test account persistence using a second browser.

The migration creates six user-owned tables, RLS policies, and two transactional RPC functions.

**Important:** Public curriculum pages remain available without authentication. When Supabase is configured, `/dashboard`, `/settings`, and `/saved` require a session.

For detailed production verification, see [`docs/deployment.md`](docs/deployment.md).

---

## 💻 Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build production application |
| `npm start` | Run production build |
| `npm run typecheck` | Run strict TypeScript checks |
| `npm run lint` | Run ESLint and React/Next.js checks |
| `npm test` | Run domain and PostgreSQL/RLS integration tests |
| `npm run check:curriculum` | Validate curriculum content and references |
| `npm run curriculum:index` | Regenerate the curriculum index |
| `npm run test:routes` | Run route smoke tests |
| `npm run format` | Format source code and documentation |

For route checks on another port, set `SMOKE_BASE_URL` before running `npm run test:routes`.

---

## 📁 Project Structure

```text
ONEDAY/
│
├── src/
│   ├── app/                  # App Router pages and endpoints
│   ├── components/           # UI components and workspace tools
│   ├── data/
│   │   ├── outline.json      # Curriculum structure
│   │   ├── knowledge.json    # Topic explanations and assignments
│   │   ├── lessons.json      # Individual lesson definitions
│   │   ├── curriculum.ts     # Curriculum assembly and priorities
│   │   ├── index.json        # Generated curriculum index
│   │   ├── ids.json          # Data validation IDs
│   │   ├── projects.ts       # Project plans and milestones
│   │   ├── resources.ts      # Learning resource catalog
│   │   └── technologies.ts   # Technology learning map
│   │
│   ├── lib/                  # State, validation and Supabase logic
│   └── proxy.ts              # Session refresh and private redirects
│
├── supabase/
│   └── migrations/           # PostgreSQL schema and RLS
│
├── tests/                    # Domain and database tests
├── scripts/                  # Validation and utility scripts
├── docs/                     # Technical documentation
│
├── package.json
├── package-lock.json
└── README.md
```

The `.psv` files are editorial source copies. Runtime code imports JSON, so update the corresponding JSON when editing a PSV file.

---

## ☁️ Deployment

ONEDAY can be deployed using **Vercel**.

### Deployment Steps

1. Run the checks and production build locally.
2. Push the repository to GitHub.
3. Import the repository into Vercel.
4. Select the **Next.js** framework preset.
5. Configure:
   - Install Command: `npm ci`
   - Build Command: `npm run build`
   - Output Directory: Framework default
6. Add the two public Supabase environment variables for the intended environments.
7. Deploy the application.
8. Update Supabase Site URL and redirect URLs.
9. Verify authentication, email confirmation, password recovery, and cloud progress.

**Important:** Do not use static export. Authentication, search, and persistence rely on server routes.

---

## 🧪 Testing & Verification

The included test suite covers:

- Curriculum completeness.
- Progress calculations.
- Import validation and rejection.
- Redirect safety.
- Database migrations.
- Owner-only database operations.
- Anonymous access denial.
- State round-trips.
- Stale revision handling.
- Transaction rollback.

The PostgreSQL integration test uses PGlite in memory and mocks only Supabase's `auth.users` and `auth.uid()`. The actual PostgreSQL policies and functions execute unchanged.

### External Verification Still Required

The following require a configured external project and cannot be certified from an unconfigured local preview:

- Live Supabase email delivery.
- Session refresh.
- Two-device synchronization.
- Production Vercel deployment.

See [`docs/testing.md`](docs/testing.md) for testing evidence and remaining checks.

---

## 🔧 Troubleshooting

| Problem | Solution |
|---|---|
| Preview notice still appears | Configure both public Supabase variables and restart or redeploy. |
| Cloud progress cannot load | Check the Supabase project, migration, URL, key, and server logs. |
| Email link is invalid or expired | Request a new link and verify redirect configuration. |
| Data changes in another tab/device | Reload saved data before retrying; copy unsaved notes first. |
| JSON import is rejected | Use a version 1 export with valid curriculum IDs. |
| Preview differs between browsers | This is expected; use export/import or Supabase for account persistence. |
| Turbopack is blocked by a Windows sandbox | Try building in a normal local terminal. |
| Browser storage is unavailable or full | Export regularly or use authenticated cloud mode. |

---

## 🎯 Project Vision

The goal of ONEDAY is to make a complex technical learning journey more structured and achievable.

The roadmap supports a path toward becoming an **AI Systems Engineer**, combining:

- Programming and computer science foundations.
- Machine Learning and Data Science.
- Deep Learning and Large Language Models.
- Backend engineering and APIs.
- System design and scalability.
- Production engineering and cloud technologies.

The platform is intended to evolve alongside the learning journey, with improvements to its curriculum, resources, projects, and tracking experience.

---

## 👨‍💻 Author

**Krish Gujarati**

AI Systems Engineer Learning Journey

- GitHub: [@krishgujarati32-debug](https://github.com/krishgujarati32-debug)
- Project: [ONEDAY — Live Website](https://oneday-rosy.vercel.app/resources)

---

## 📄 License

No license is currently specified. Reuse, distribution, and contribution permissions should be defined in a separate license file if the project is opened for those purposes.

---

<p align="center">
  <strong>Learn Consistently. Build Real Projects. Track Your Progress.</strong>
  <br/>
  <em>One day at a time. 🚀</em>
</p>
