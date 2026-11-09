# ONEDAY Technology Stack

## Restoration

The `/technology-stack` route uses the existing ONEDAY shell, page heading, pills and technology-card styles. The original library in commit `5bb24de` and the written design brief supplied the layout reference. The attachment folder contained the written brief. Visual QA used the rendered page and its specified layout and interaction requirements.

The page uses one card per tool or practice. The grid switches from three to two to one column as the viewport narrows. Search and the category filter recalculate counts from visible cards. Native disclosures give each card a keyboard-operated detail panel. The phase label opens the current starter lesson, and the panel links to its roadmap phase, prerequisites and later applications.

**Core** identifies the tools required on the main path. **Supporting** identifies tools that help implement or operate that path. **Advanced** identifies tools introduced later in the same sequence. Badges describe the role of a technology. The existing curriculum order and milestone rules still apply.

## Categories

| Category | Cards |
| --- | ---: |
| Operating system & developer workflow | 5 |
| Python engineering & developer tooling | 7 |
| Algorithms & software engineering | 2 |
| Database & data access | 6 |
| Mathematics & data science | 4 |
| Machine learning | 2 |
| Deep learning | 2 |
| LLMs & model ecosystem | 5 |
| Python backend | 5 |
| AI providers & LLM application integration | 3 |
| Data ingestion & document processing | 4 |
| RAG, embeddings & evaluation | 3 |
| Agents & MCP | 2 |
| Cache & rate limiting | 2 |
| Message queues | 3 |
| Containers & CI/CD | 3 |
| Cloud platforms | 7 |
| Infrastructure & orchestration | 4 |
| MLOps, LLMOps, observability & security | 8 |
| Model serving & GPU | 4 |
| Project documentation & architecture | 3 |
| **Total** | **84** |

## Mapping and changes

| Former catalog group | Current homes |
| --- | --- |
| Development and Testing | Operating system, Python tooling, algorithms, and operations |
| Data and Models | Database access, data science, machine learning, deep learning, and LLM ecosystem |
| Backend | Python backend, database access, and documentation |
| AI systems and Data ingestion | Providers, ingestion, retrieval, agents, and MCP |
| Distributed systems | Cache and rate limiting, message queues |
| Production and Serving | Containers and CI, cloud, orchestration, operations and security, and model serving |

The previous 33 cards became 32 retained or revised identities and 52 additions. Git and GitHub are combined, with the old GitHub fragment retained. Linux now specifies Ubuntu on WSL2. The original Hugging Face, Docker, provider-adapter and Kafka identities lead to the more specific Transformers, Docker Engine, OpenAI-compatible adapters and Apache Kafka cards. Project briefs keep their existing technology names through catalog aliases.

- **Developer workflow and Python.** Added GitHub CLI, Linux diagnostics, uv, Ruff, mypy, HTTPX, JupyterLab, Python DSA and LeetCode.
- **Data and models.** Added Psycopg, DBeaver, SciPy, Matplotlib, joblib, TensorBoard, Hugging Face Tokenizers and Datasets, PEFT and Safetensors.
- **Backend and AI.** Added Uvicorn, PyJWT, pwdlib with Argon2, OpenAI and Gemini SDKs, python-docx, ETL patterns, Sentence Transformers, Ragas, cross-encoder reranking and Python-native orchestration.
- **Distributed systems and production.** Added redis-py, Celery, RabbitMQ, Docker Compose, GitHub Actions, AWS IAM, ECS with Fargate, ECR, S3, RDS, CloudWatch, EKS, Helm, pip-audit, Bandit and the OWASP API Security Top 10 reference.
- **Serving and documentation.** Added NVIDIA CUDA, NVIDIA Container Toolkit, nvidia-smi, Mermaid, OpenAPI with Swagger UI, and README and runbook practices.

The backend references the existing HTTPX, SQLAlchemy and Alembic cards. SQLAlchemy and Alembic use Phase 04 foundations and link back to their explicit Phase 09 implementation lessons. Pgvector stays in Database & data access with its starter in Phase 10. PyTorch retains its Phase 07 starter and a Phase 13 application link. LangGraph stays out of the catalog because the active curriculum uses a Python-native agent workflow.

### Jobs and cloud

Redis and redis-py support caching, quotas and rate limiting. Celery runs Python tasks and manages retries. RabbitMQ is the selected broker for the page’s durable-job exercise. Kafka covers independently consumed event streams, partition ordering and replay. The Celery and RabbitMQ exercises use the existing Phase 11 durable-jobs lesson as a foundation.

AWS is the single cloud path. The first container deployment exercise links Docker and GitHub Actions to ECR, ECS with Fargate and CloudWatch. IAM, S3 and RDS have their own roles. ECS and ECR have exercises on the stack page using existing Phase 12 deployment foundations. Terraform and Kubernetes come later, with EKS and Helm exercises anchored after the Kubernetes basics. The page changes leave the Phase 12 lesson sequence intact.

## Releases and compatibility

The November 9, 2026 snapshot contains **61 verified releases**. The catalog links each displayed version directly to its official evidence. Sources include official PyPI project releases, vendor and project release pages, and official GitHub project releases and tags. The Python, PostgreSQL, Docker, Kafka, Kubernetes, Redis, RabbitMQ, Terraform, Prometheus and AWS RDS entries use their respective project or vendor sources.

Python **3.15.2** is newer than the 3.15.0 initial release in the research brief. The compatibility baseline is **3.14.10**. PyPI lists the first file for Pydantic 2.14.3 on November 5. The brief used November 4, and the card records the verified version and check date. [Python 3.15.2](https://www.python.org/downloads/release/python-3152/), [Python 3.14.10](https://www.python.org/downloads/release/python-31410/), [Pydantic 2.14.3](https://pypi.org/project/pydantic/2.14.3/)

Published package constraints were checked for the selected backend, training and serving groups on Python 3.14.10. The official `python:3.14-slim-bookworm` base tag is published for backend exercises. For serving, vLLM 0.33.0 requires Python below 3.15, PyTorch 2.14.0 and Transformers from 5.16.1 up to but excluding 5.21. The separate training snapshot shows PyTorch 2.15.0 and Transformers 5.22.2. Use the selected vLLM wheel or official image to determine the CUDA runtime and minimum host driver. These checks establish published metadata compatibility for the selected packages. A full environment install and GPU workload were outside the app verification. [Python official image](https://hub.docker.com/_/python), [vLLM release](https://pypi.org/project/vllm/0.33.0/), [vLLM GPU installation](https://docs.vllm.ai/en/latest/getting_started/installation/gpu/)

RDS lists support for PostgreSQL 18.6. Check its availability and extension support in the deployment Region before provisioning. Provider cards link to live official pricing pages and leave model and quota selection to the provider documentation. [RDS PostgreSQL versions](https://docs.aws.amazon.com/AmazonRDS/latest/PostgreSQLReleaseNotes/postgresql-versions.html), [OpenAI pricing](https://developers.openai.com/api/docs/pricing), [Gemini pricing](https://ai.google.dev/gemini-api/docs/pricing)

Versions are omitted for the 23 cards where one version would be misleading. These are Ubuntu on WSL2, Bash, Git & GitHub, the Linux diagnostic CLI, the Python DSA toolkit, LeetCode, OpenAI-compatible adapters, Python ETL patterns, cross-encoder reranking, Python-native orchestration, GitHub Actions, AWS, IAM, ECS with Fargate, ECR, S3, CloudWatch, EKS, the OWASP reference, CUDA, nvidia-smi, OpenAPI with Swagger UI, and README and runbooks. Several are practices or managed services. The OS and GPU tools depend on the selected distribution, driver or container runtime. The combined tools and standards have separate component versions.

## Maintaining the snapshot

1. Recheck the official release and date for each version in `src/data/technology-releases.ts`. Prefer stable, non-yanked releases published by the audit date.
2. Check Python version requirements, wheel or image support and cross-package constraints before changing the compatibility notes. Keep the backend, training and serving environments separate when their dependency requirements differ.
3. Recheck official documentation and provider links, then update the snapshot date after the full review.
4. Run `npm run check:technology-links` and `npm run check:curriculum`. Review the page at desktop, tablet and mobile widths after metadata or layout changes.

## Files and verification

The existing route, shared library, stylesheet, catalog, project display and search consumer were inspected along with AGENTS.md, the installed Next.js guidance, Git history, curriculum metadata and existing validators. The restored component sits next to the route. The four catalog sections feed `src/data/technologies.ts`, with release metadata in `src/data/technology-releases.ts`. Styles are scoped to the technology UI. Search and project description lookup consume the revised names. Curriculum validation checks the new catalog, and the separate link command performs the HTTPS check.


| Check | Result |
| --- | --- |
| `npm run check:curriculum` | Passed. Validates 84 cards, category IDs, badges, unique names and anchors, release fields, and exact phase, topic, prerequisite and lesson mappings. |
| `npm run check:curriculum:v5` | Passed, 484/484 V5 profiles. |
| `npm run typecheck` and `npm run lint` | Passed. |
| `npm test` | Passed, 28/28 tests, including local PostgreSQL, RLS, saved-state and planner archive tests. |
| `npm run build` | Passed, 522/522 generated static entries. |
| `SMOKE_BASE_URL=http://127.0.0.1:3014` with `npm run test:routes` | Passed, 516/516 public pages against an isolated production server. |
| Headless Chrome | Verified 84 cards, 21 rendered category counts, 169 unique internal destinations, keyboard disclosure, filters, related-card navigation, lesson anchors and isolated progress persistence. Dark-mode checks passed at 1440, 1024, 768, 390 and 320 pixels, with three, two, two, one and one columns, aligned tool counts and zero overflow. No page errors or hydration warnings. |
| `npm run check:technology-links` | Automated HTTPS reached 153 of 154 links. LeetCode returned HTTP 403 in this environment. Its official study plan was independently opened and checked. |
| `git -c core.safecrlf=false diff --check` | Passed. |

The LeetCode response is the remaining automated link-check exception. [Official LeetCode 75 study plan](https://leetcode.com/studyplan/leetcode-75/)

The core edits are [the route and its component](../src/app/technology-stack/page.tsx), [the catalog assembler](../src/data/technologies.ts), [the release snapshot](../src/data/technology-releases.ts), [the stylesheet](../src/app/globals.css), and [the catalog validator](../scripts/validate-technology-stack.ts). Supporting edits cover search aliases, project technology descriptions, the external link script and this guide.

The worktree is on `main` with base commit `70dd69b`. No commit, push or deployment was performed. Hosted Supabase, live providers, AWS provisioning and a GPU runtime were outside the local checks. To review the page, open `/technology-stack` in your running ONEDAY app.

