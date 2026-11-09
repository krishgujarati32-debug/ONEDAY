# ONEDAY V5 implementation and verification record

## Coverage

The application publishes one 14-phase AI Systems Engineer roadmap. Its active manifest contains **485 topics**, including all **484 specified V5 topics** in Phases 01–13 and the existing synthesis topic in Phase 14. The app treats each subtopic as one tracked lesson. There are **1,707 lessons, 40 references, 5 portfolio projects and 33 registered technologies**. All 484 V5 profiles passed the exact title, order, level, distinct scope, practice, completion criteria and study-range checks.

| Phase | Active title | Topics | Lessons |
| --- | --- | ---: | ---: |
| 01 | Computer Science, Linux, Networking, and Engineering Foundations | 24 | 103 |
| 02 | Python Programming and Concurrency: Beginner to Professional | 47 | 148 |
| 03 | Data Structures, Algorithms, and Software Engineering | 26 | 99 |
| 04 | SQL, PostgreSQL, and Database Engineering | 25 | 71 |
| 05 | Mathematics, Statistics, and Data Analysis for AI | 35 | 158 |
| 06 | Machine Learning Engineering | 30 | 95 |
| 07 | Deep Learning and Neural Networks | 25 | 90 |
| 08 | NLP, LLM Internals, and Transformer Engineering | 31 | 116 |
| 09 | Python Backend Engineering for AI Systems | 38 | 95 |
| 10 | LLM Application Engineering, Data Ingestion, RAG, Agents, MCP, and AI Safety | 75 | 275 |
| 11 | System Design and Distributed Systems | 44 | 209 |
| 12 | Production Engineering, Cloud, MLOps, LLMOps, Security, and Observability | 58 | 204 |
| 13 | Model Serving, GPU Infrastructure, and Inference Optimization | 26 | 43 |
| 14 | Portfolio Engineering and CCAI Production Capstone | 1 | 1 |

The [exact topic-by-topic target inventory](../src/data/v5-targets.json) records all 484 source titles, positions and L1–L5 assignments. [The curriculum assembler](../src/data/curriculum.ts) applies those targets to the authored profiles and links each to active lessons, practice and its verified sequence. The Phase 14 synthesis has an additional L5 target.

## Staged depth and preserved foundations

- **Phase 01** keeps binary representation, CPU and memory, operating systems, files, Linux, Git and networking ahead of Python. The CLI block covers navigation, permissions, streams, pipes, shell scripting, process and socket diagnosis, SSH, HTTP and REST. L1 awareness topics build toward L2 troubleshooting and L3 practical shell, Git and HTTP work where specified.
- **Phase 02** keeps interpreter use, syntax, functions, collections, files, exceptions, modules, type annotations, virtual environments, tests and packaging. The concurrency sequence distinguishes synchronous I/O, event loops and cancellation, then develops safe async calls, thread and process pools, races and bounded backpressure. Phase 09 applies those skills to a FastAPI service.
- **Phases 03–05** retain arrays, dictionaries, searching, complexity, tests, relational modeling and SQL, probability, statistics, linear algebra, derivatives and basic data preparation. SQL and math remain before database-heavy services and ML respectively.
- **Phases 06–09** preserve classical models, evaluation and leakage checks, PyTorch, tokenizer and transformer fundamentals, API design, and persistent backends. New profiles give these topics independent tests, prerequisites and practice boundaries. Backend concurrency has separate L3 targets for async handlers, clients, slow-call limits, blocking I/O and execution pools.
- **Phase 10 topics 16–29** cover sources, ETL, PDF and HTML extraction, format and API intake, transcript awareness, normalization, provenance, incremental ingestion, replay, security and quality. Audio is L1 and the section comes before embeddings. Topic 33 is L3 chunking with fixed, structural, recursive and semantic comparisons. Topics 46–64 move from a bounded single agent through MCP host, client and server responsibilities, SDK use, permission checks and integration tests.
- **Phase 11** starts with a practical modular monolith, capacity reasoning, a Redis cache, local quotas, background work and retries. Topics 21–22 are L4 for distributed rate limiting and the Redis Lua limiter. Kafka starts at L2 with a justified workload, then reaches L4 for delivery and replay. Topic 44 is the L5 design and measured-load exercise targeting one million requests per day.
- **Phase 12** puts Linux service access, secrets, Docker Compose, CI basics, small AWS deployment, IAM, VPC, managed data, health and rollback in topics 01–16. Terraform and Kubernetes follow at topics 21–27. Local MLflow tracking is L2 at topic 29. Prompt and evaluation operations at topics 35–39 use the specified L2 and L3 targets. Telemetry, security, incident response and load tests follow.
- **Phase 13** compares hosted and self-hosted operation, then covers device and memory basics, vLLM, an instrumented backend and five L4 operating exercises at topics 22–26. GPU-dependent experiments can use an owned environment or a labeled fixture. Measured fixture results support only the fixture workload and environment.

The published technology registry covers Python, Linux, Bash, Git, GitHub, NumPy, Pandas, scikit-learn, PyTorch, Hugging Face, FastAPI, Pydantic, PostgreSQL, pgvector, SQLAlchemy, Alembic, Redis, Kafka, Python LLM provider adapters, pypdf, BeautifulSoup, the official MCP Python SDK, MLflow, Docker and Compose, Kubernetes, AWS, Terraform, vLLM, CUDA awareness, OpenTelemetry, Prometheus, Grafana, pytest and Locust. The [technology registry](../src/data/technologies.ts) identifies its first teaching topic for each entry.

## Projects and checkpoint

| Project | Level | Entry point and final evidence |
| --- | --- | --- |
| Python Engineering Toolkit | L3 | Phase 02. A packaged CLI with tested parsing, invalid-input behavior and a clean install. |
| PostgreSQL-Backed FastAPI Service | L3 | Phase 09. Scoped persistence, verified migrations, deterministic pagination and a timed, bounded async fixture endpoint. |
| End-to-End Machine Learning Pipeline | L3 | Starts in Phase 06. The Phase 12 MLflow milestone compares recorded runs under the same evaluation contract. |
| Data Ingestion, RAG, and MCP Backend | L3 | Phase 10. PDF and HTML, source-aware chunks, replay-safe ingestion, authorized citations, evaluation and a scoped MCP server and client. |
| CCAI Production-Grade Multi-Model AI Platform | L5 | Phase 14. A selective routing policy, bounded tools and retries, operational evidence, capacity measurements and a repeatable rollback. |

The Job-Ready Foundation Checkpoint follows Phase 12 topic 16. It combines completed deployment foundations, eight learner-recorded skill demonstrations and at least two complete L3 project checklists. Its review links cover Python, Linux and Git, DSA, PostgreSQL and FastAPI, concurrency, LLM integration and ingestion, Redis, AWS, security and failure handling. Kubernetes, Terraform, advanced operations and the capstone sit outside its completion conditions. The app records evidence and self-assessment. Hiring decisions and the quality of a learner's portfolio require independent review.

## Progress and data safety

The [V5 migration map](../src/data/v5-migration-map.json) accounts for all 220 prior active topics and all 1,399 prior active lessons. All 1,399 lesson IDs still resolve with their original saved credit. Fifty source topics were split, two were consolidated, and 168 kept a single target. The earlier [migration map](../src/data/curriculum-migration-map.json) still accounts for 1,313 original lessons, including 95 already retired in the earlier scope review. Older frontend and parallel stack topics are historical. Their notes, bookmarks and completed IDs remain readable without contributing to active totals.

Projects retain four active IDs. Both previous RAG and MCP project records and their checks are still readable. Their routes now open the combined project. Previously saved checks stay on the old keys because the combined requirements are different. New practice evidence uses distinct keys in the existing progress record. An old lesson completion never sets a new practice check.

Authentication, the Supabase owner checks, RLS and state revision checks continue through the existing paths. The same local preview key and version 1 export envelope are used. Archived planner data from the prior fix is still validated and round-trips through the existing optional archive. V5 uses the current progress tables. A fresh hosted setup that needs planner preservation should apply the base schema and then the additive planner archive migration after review. No live accounts or stored data were changed.

## Interface and source of truth

The dashboard uses the active lesson denominator and links to the first unfinished lesson or its following topic practice. The roadmap displays the canonical phase and topic order and keeps completed content available for review. The main navigation is Dashboard, Learning Roadmap, Projects and Account & data. Topic and project pages supply scoped references. Existing resource and saved-item URLs remain usable where linked from an existing workflow.

The `src/data/course-v5-*.ts` batches and the retained definitions feed the single assembler. Run `npm run curriculum:index` after edits to rebuild the lean client index, stable ID lists and both migration maps. The active and archived resource inventories are separately checked. Active references use one record per ID and separate moments for revisits.

Inherited lesson definitions and their saved IDs were retained. Some inherited short exercises still use the previous exercise format. Topic-specific practice, concrete examples and evidence requirements supplement those lessons. Lesson targets within a published topic are set at its depth ceiling. Tool and project exercises are learner assignments. The local app verification does not execute all of those Python labs, deploy the CCAI platform, use hosted providers or benchmark real GPUs.

## Active resource audit

Each of the 40 active resource records has a verified HTTPS URL, a primary teaching moment, prerequisite topics, reading focus, start conditions, rationale, a practical task and a separate completion check. Redis, Docker and the MCP SDK have one additional moment each under the same resource ID. The earlier resource IDs remain accepted in saved state. The current HTTPS run reached every active URL. It verifies reachability and redirects, while the curriculum and route checks verify the internal mappings.

| Resource ID | Teaching moments | Primary reading focus | Application |
| --- | --- | --- | --- |
| `pypdf` | Phase 10 · Extracting Text from PDFs with pypdf (including limitations of scanned/image-only PDFs) | Extract Text from a PDF and OCR vs text extraction | Project 04 |
| `beautifulsoup` | Phase 10 · Extracting and Cleaning HTML with BeautifulSoup | Quick Start, Searching the tree, decompose() and get_text() | Project 04 |
| `cs50` | Phase 01 · Bits, Bytes, Binary, and Data Representation (one focused practical topic; do not over-expand digital logic) | Week 0 course notes on binary representation and problem solving | Topic practice |
| `ostep` | Phase 01 · Operating System Fundamentals | Processes and CPU scheduling | Topic practice |
| `linux` | Phase 01 · Linux Permissions, Ownership, Users, and Groups | What is WSL? and Basic commands for WSL, starting an installed Linux distribution | Topic practice |
| `git` | Phase 01 · Git Fundamentals and Version Control | Git Basics, recording changes and inspecting diffs | Topic practice |
| `python` | Phase 02 · Python Installation and Development Setup | Invoking the interpreter and running a script | Project 01 |
| `pytest` | Phase 02 · Unit Testing with pytest | Get Started, assertions and parametrization | Project 01, Project 02 |
| `algorithms` | Phase 03 · Time Complexity and Space Complexity | Asymptotic analysis and data structures | Topic practice |
| `postgres` | Phase 04 · PostgreSQL Installation and Core Features | Getting Started, accessing a database and running the first query | Project 02, Project 04 |
| `linear-algebra` | Phase 05 · Matrix Multiplication | Matrix multiplication and linear transformations | Topic practice |
| `statistics` | Phase 05 · Mean, Median, Variance, and Standard Deviation | Sampling, distributions and inference | Topic practice |
| `numpy` | Phase 05 · NumPy Arrays and Vectorized Operations | Array creation, shape and broadcasting | Topic practice |
| `pandas` | Phase 05 · Pandas Series and DataFrames | DataFrame indexing, missing data and grouping | Topic practice |
| `sklearn` | Phase 06 · Training, Validation, and Cross-Validation | Cross-validation, scoring and model evaluation | Project 03 |
| `pytorch` | Phase 07 · PyTorch Fundamentals | Learn the Basics, Tensors and Build the Neural Network | Topic practice |
| `huggingface` | Phase 08 · Hugging Face Tokenizers, Models, and Datasets | Tokenizer, model and dataset interfaces | Topic practice |
| `fastapi` | Phase 09 · FastAPI Project Setup and Application Structure | First Steps, creating and running a FastAPI application | Project 02, Project 04 |
| `pydantic` | Phase 09 · Request and Response Models with Pydantic | Models, field constraints and serialization | Topic practice |
| `sqlalchemy` | Phase 09 · SQLAlchemy ORM/Core and Safe Query Practices | Transactions and ORM session basics | Project 02 |
| `alembic` | Phase 09 · Alembic Database Migrations | Migration environment, revisions, upgrades and downgrades | Project 02 |
| `pgvector` | Phase 10 · PostgreSQL with pgvector | Exact queries, distance operators and indexing | Project 04 |
| `mcp` | Phase 10 · Model Context Protocol Fundamentals and the problem it solves | Architecture, tools and transports | Project 04 |
| `mcp-sdk` | Phase 10 · Building one MCP Server with the official Python SDK<br>Phase 10 · Connecting one MCP Client and invoking a tool safely | First steps, FastMCP tools and running a server locally | Project 04 |
| `owasp` | Phase 10 · Prompt Injection and Indirect Prompt Injection | Prompt injection, sensitive information and excessive agency | Project 04, Project 05 |
| `builders` | Phase 11 · Retries, Exponential Backoff, Dead-Letter Handling, and Poison Messages | Timeouts, retries and backoff with jitter | Topic practice |
| `redis` | Phase 11 · Caching Fundamentals, Cache Keys, TTL, and Cache-Aside<br>Phase 11 · Redis Lua Scripting for an atomic distributed rate limiter (advanced hands-on exercise) | Data types, key expiry and atomic operations | Project 05 |
| `kafka` | Phase 11 · Kafka Fundamentals and When Kafka Is Justified | Key Concepts and consumer group behavior | Project 05 |
| `docker` | Phase 12 · Docker Fundamentals and Why Containers Are Used<br>Phase 12 · Docker Compose for a Local FastAPI + PostgreSQL + Redis Stack | What is a container? and What is an image? | Project 02, Project 05 |
| `github-actions` | Phase 12 · CI/CD Fundamentals and Automated Test/Build Pipelines | Workflow syntax, jobs and permissions | Topic practice |
| `terraform` | Phase 12 · Terraform Fundamentals, State, and Safe Change Planning | Plan, providers and state | Topic practice |
| `aws` | Phase 12 · Secure Cloud Deployment Principles and Rollback Basics | IAM, VPC, S3 and managed database security | Project 05 |
| `kubernetes` | Phase 12 · Kubernetes Architecture and Core Concepts | Learn Kubernetes Basics, the cluster architecture and application deployment overview | Topic practice |
| `mlflow` | Phase 12 · Experiment Tracking with MLflow | Tracking runs and model artifacts | Project 03 |
| `otel` | Phase 12 · OpenTelemetry Fundamentals | Traces, spans and instrumentation | Topic practice |
| `prometheus` | Phase 12 · Prometheus Metrics and Basic Instrumentation | Metric types, labels and scraping | Topic practice |
| `grafana` | Phase 12 · Grafana Dashboards and Alerts | Dashboards and panels | Topic practice |
| `locust` | Phase 12 · Load Testing with Locust | First test, tasks and reporting | Project 05 |
| `cuda` | Phase 13 · CUDA Concepts and the GPU Software Stack (conceptual and practical usage level; do not require kernel programming) | GPU execution and memory model | Topic practice |
| `vllm` | Phase 13 · vLLM Fundamentals and Architecture | Serving and online benchmarking | Project 05 |

## Verification and handoff

This section records checks against the final worktree. Start local preview with `npm run dev` in the repository and open the displayed localhost URL. Use a distinct origin for test progress. See the [README](../README.md) for environment setup. Real Supabase sign-up and recovery delivery, hosted cross-device sync and Vercel remain environment-specific checks.


| Check | Final local result |
| --- | --- |
| `npm run curriculum:index` | Passed. Rebuilt the active index, IDs and both migration maps. README counts match the generated data. |
| `npm run check:curriculum` | Passed. Validated prerequisites, references, project links, lesson preservation, historical records and generated data parity. |
| `npm run check:curriculum:v5` | Passed. 484/484 exact V5 topic profiles. |
| `npm run typecheck` and `npm run lint` | Passed. |
| `npm test` | 28/28 passed. Includes local PostgreSQL migration and RPC execution, owner isolation, revision conflicts, atomic rollback and V5 evidence and archive round-trips. |
| `npm run build` | Passed. Next.js reported 522/522 generated static entries. |
| `npm start -- --hostname 127.0.0.1 --port 3012` with `SMOKE_BASE_URL=http://127.0.0.1:3012`, then `npm run test:routes` | 516/516 public page routes returned usable HTML. All active lesson anchors, 11 historical route redirects, exact lesson search, reference search, the checkpoint position, the missing-topic 404 and the preview state endpoint passed. |
| `npm run check:resource-internal-links` against the same production origin | 285 references, 175 unique targets across 93 pages, 43 lesson fragments and zero failures. |
| `npm run check:resource-links` | 40/40 active URLs reachable. No unresolved active links. |
| Isolated headless Chrome | Passed zero-progress display, lesson completion and reload, practice gating and persistence, next-topic selection, moved lesson links, project milestones, checkpoint gating and reload, historical records and planner JSON export. No page errors or hydration warnings. Roadmap and lesson width checks passed at 320, 390, 768 and 1440 pixels. |
| `git -c core.safecrlf=false diff --check` | Passed. |

The important implementation files are [the assembler](../src/data/curriculum.ts), [the exact V5 contract](../src/data/v5-targets.json), [the depth validator](../scripts/validate-v5-depth.ts), [the progress rules](../src/lib/progress.ts), [the checkpoint component](../src/components/job-ready-checkpoint.tsx), [the project briefs](../src/data/projects.ts), [resource placements](../src/data/resources.ts) and [the evidence regression tests](../tests/v5-depth.test.ts).

The checkout remains on `main` at base commit `5bb24de` with local changes. No commit, push, production database write or deployment was performed. For a local review, run these commands and open the address shown by Next.js.

```powershell
Set-Location -LiteralPath 'D:\ONEDAY-main\ONEDAY'
npm run dev
```

