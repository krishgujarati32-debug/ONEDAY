# ONEDAY

ONEDAY is a sequential curriculum for learning to build, evaluate, operate and troubleshoot Python-based AI systems. The existing application runs on Next.js, React, TypeScript and Supabase. Frontend development is outside the learner curriculum. The application interface continues to use its existing frontend.

**Active curriculum** · 14 phases, 485 topics, 1,707 lessons, 40 references and 5 portfolio projects. The 485 topics include all 484 specified V5 topics and the Phase 14 capstone synthesis.

Every topic has an explicit L1–L5 target, a scope boundary, practical evidence, completion criteria and a study range. See the [V5 coverage and verification record](docs/v5-implementation.md).

## Learning sequence

1. Computer Science, Linux, Networking, and Engineering Foundations
2. Python Programming and Concurrency: Beginner to Professional
3. Data Structures, Algorithms, and Software Engineering
4. SQL, PostgreSQL, and Database Engineering
5. Mathematics, Statistics, and Data Analysis for AI
6. Machine Learning Engineering
7. Deep Learning and Neural Networks
8. NLP, LLM Internals, and Transformer Engineering
9. Python Backend Engineering for AI Systems
10. LLM Application Engineering, Data Ingestion, RAG, Agents, MCP, and AI Safety
11. System Design and Distributed Systems
12. Production Engineering, Cloud, MLOps, LLMOps, Security, and Observability
13. Model Serving, GPU Infrastructure, and Inference Optimization
14. Portfolio Engineering and CCAI Production Capstone

Start at the dashboard. Continue opens the first unfinished lesson or the topic practice that follows it. Lesson pages show the sequence, explanation, exercise, completion criteria and relevant references. Record progress after reproducing the exercise. Completed material remains available for review.

The Job-Ready Foundation Checkpoint appears after Phase 12 topic 16. It records deployment foundations, skill demonstrations and two completed project checklists. It describes evidence of preparation for early-career work.

## Engineering stack

Python, Linux, Bash, Git and GitHub form the development foundation. PostgreSQL, NumPy, Pandas, scikit-learn, PyTorch and Hugging Face support data and models. Backend work uses FastAPI, Pydantic, SQLAlchemy, Alembic and pytest. AI services use Python provider adapters, pypdf, BeautifulSoup, pgvector and the official MCP Python SDK. Distributed and production work uses Redis, Kafka, Docker Compose, AWS, Terraform, Kubernetes, MLflow, OpenTelemetry, Prometheus, Grafana, Locust and vLLM.

## Portfolio

1. Python Engineering Toolkit
2. PostgreSQL-Backed FastAPI Service
3. End-to-End Machine Learning Pipeline
4. Data Ingestion, RAG, and MCP Backend
5. CCAI Production-Grade Multi-Model AI Platform

Projects link prerequisite lessons and include milestones, architecture, acceptance tests and delivery requirements. They become relevant during the associated phases. The capstone is a guided build and evidence requirement. Run capacity tests against an owned environment and report the measured workload.

## Run locally

Use Node.js compatible with the installed Next.js version and npm. From the repository root:

```powershell
npm ci
npm run dev
```

Open [the local app](http://localhost:3000). With no Supabase configuration, learning state stays in this browser and origin. Account forms describe preview mode.

For cloud sync, copy `.env.example` to `.env.local` and set the public Supabase URL and publishable key for your own project. Follow [authentication](docs/authentication.md) and [deployment](docs/deployment.md) for recovery redirects, environment separation and verification. For a fresh Supabase project, review and apply `supabase/migrations/202611010001_learning_platform.sql` first, followed by `supabase/migrations/202611080001_preserve_planner_archive.sql` for planner archive compatibility. V5 uses the existing progress schema.

Use **Account & data** to export or import version 1 JSON. Existing notes, bookmarks, study sessions, lesson timestamps and legacy project checks remain part of the backup. Only active lessons count in the dashboard. See [progress and retained records](docs/progress.md).

## Curriculum and checks

`src/data/curriculum.ts` assembles the ordered phase sequence, authored V5 topic profiles and retained lesson definitions. The exact V5 topic contract is in `src/data/v5-targets.json`. Regenerate the active index, IDs and migration maps together. The frozen historical manifests track earlier IDs.

```powershell
npm run curriculum:index
npm run check:curriculum
npm run check:curriculum:v5
npm run typecheck
npm run lint
npm test
npm run build
npm start
```

With the server running, use `npm run test:routes` and `npm run check:resource-internal-links`. Set `SMOKE_BASE_URL` for a different local port. `npm run check:resource-links` performs a live URL check. See [testing](docs/testing.md) for scope and external checks.

Deployment uses the existing Next.js build and Supabase configuration. See the [Vercel setup guide](docs/deployment.md). Live email, cross-device sync, provider credentials, deployment and actual capstone scale measurements require verification in the learner's own environment.
