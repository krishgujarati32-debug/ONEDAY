# ONEDAY Version 2.0 migration inventory

The working checkout is at `D:\ONEDAY-main\ONEDAY`. The clean baseline is `5bb24de` on `main`. The installed Next.js and Supabase application are the migration target.

## Baseline

The curriculum validator reported 12 phases, 83 topics, 1,313 lessons, 51 resources, 7 projects and 53 technologies. All 23 baseline tests passed, including PostgreSQL owner isolation, transactional rollback and revision conflict checks.

`src/data/curriculum.ts` assembles the ordered outline, topic knowledge, lesson definitions and resource relationships. Generated `index.json` and `ids.json` currently serve both active curriculum and persistence validation. Separate those two roles before removing any active item. The text in the existing topic packs and lesson definitions supplies candidate content. A lesson's original priority and its old phase position do not determine whether it belongs in the new path.

## Phase inventory

| Current phase | Candidate destination and review |
| --- | --- |
| 0 · Computer Science and Development Foundations | 01 for computer, OS, Git and network foundations. Place detailed GPU concepts in 13. |
| 1 · Programming Languages and Python Engineering | 02 for Python, 01 for introductory Bash, 04 for SQL. Retire frontend, Java, Go and C++ tracks. |
| 2 · Mathematics, DSA, and Problem Solving | 03 for algorithms and data structures. 05 for mathematics, probability and statistics. |
| 3 · Software Engineering, Databases, and Data Engineering | 03 for design and testing, 04 for PostgreSQL, 05 for dataset work, 09 for the service integration, 10 for document ingestion. Retire the parallel document database track. |
| 4 · Data Science and Machine Learning | 05 for analysis and data preparation, 06 for training and evaluation. |
| 5 · Deep Learning and PyTorch | 07 for training and model fundamentals, 13 for detailed inference hardware. |
| 6 · NLP, Transformers, and Large Language Models | 08 for internals and adaptation, 10 for application prompting and context management. |
| 7 · Backend, AI Application Engineering, and LLM Integration | 09 for FastAPI and backend engineering, 10 for providers and reliability. |
| 8 · RAG, Graph RAG, Agents, and Knowledge Systems | 10 for retrieval, agents, MCP and safety. Retire dedicated graph and alternative tool tracks. |
| 9 · System Design, Distributed Systems, and Scalability | 11 for Redis, queues, distributed systems and capacity, 12 for practical load testing. |
| 10 · Security, Testing, Cloud, DevOps, and MLOps | 03 for test foundations, 09 for API tests and access control, 10 for AI-specific evaluation, 12 for AWS and production operations. |
| 11 · Advanced AI Systems Architecture | 10 for routing, 11 for reliability, 13 for serving and 14 for CCAI. |

## Projects and relationships

The student CLI, ML pipeline, prediction API, document assistant and CCAI offer reusable architecture and assignments. Graph RAG and the stand-alone scaling project should leave the active portfolio. Preserve all seven legacy project IDs and indexed checklist keys for stored records. A legacy checklist item represents its original requirement. Its position does not carry completion to a different milestone.

Resources are shared across learning moments. Select only references that match the new fixed stack and verified lesson scope. Keep every existing resource ID readable in backups, including retired resources. The old resource and technology audit records are historical inputs.

## Persistence and product

Supabase authentication, ownership, revision checks and row-level security are independent of curriculum order. Keep the existing six tables and RPC functions. Accept original IDs when reading or exporting data and count only active IDs when calculating progress. Reuse a lesson ID only where the objective matches. Leave uncertain and retired records intact with no completion credit in the active path. Project notes, sessions, preferences and bookmarks remain in JSON even where their UI is reduced.

The existing application uses Next.js, React and TypeScript for the interface. Keep that application while narrowing primary navigation and removing frontend development from the learner curriculum.

## Version 2.0 implementation and coverage

The active sequence has 14 phases, 220 topics, 1399 lessons, 38 references and 6 portfolio projects. The complete phase list and stack are in the README. The phases and topics below describe the authored scope rather than a claim that every retained lesson meets the new brief.

| Phase | Status |
| --- | --- |
| 01 · Foundations | All 23 requested topics, each with a worked exercise or dedicated lab. |
| 02 · Python | All 36 requested topics. Retained definitions and a packaging lab preserve the original objectives. |
| 03 · Algorithms and software engineering | All 26 requested topics, with specific fixtures and test tasks. |
| 04 · PostgreSQL | All 25 requested topics, including windows, roles and restore verification. |
| 05 · Mathematics and data analysis | All 35 requested topics, with numeric examples and data leakage practice. |
| 06 · Machine learning | Active grouped material and threshold-selection lab. Exact topic split and per-lesson review remain. |
| 07 · Deep learning | Active grouped material and a verified-by-calculation PyTorch step exercise. Exact topic split and per-lesson review remain. |
| 08 · NLP and LLM internals | Active grouped material and masked-attention trace. Exact topic split and per-lesson review remain. |
| 09 · Backend | Active grouped FastAPI material and Pydantic, SQLAlchemy and Alembic lab. Exact topic split and per-lesson review remain. |
| 10 · LLM applications | Active grouped material covering provider policy, retrieval, agents, MCP and safety. Exact topic split and per-lesson review remain. |
| 11 · Distributed systems | Active grouped material with Redis atomicity and Kafka replay labs. Exact topic split and per-lesson review remain. |
| 12 · Production | Active grouped material with AWS, observability and Locust labs. Exact topic split and per-lesson review remain. |
| 13 · Model serving | All 25 requested topics with latency, memory and throughput exercises. GPU execution remains learner-run. |
| 14 · Portfolio | Six project briefs with prerequisite lessons, data flow, repository layout, milestones, acceptance and delivery. CCAI is a specification and integration exercise; there is no existing CCAI implementation in this checkout. |

The topic split keeps historical lesson IDs under their new parent. Old topic URLs with moved lesson fragments resolve to the current lesson in the browser. Known retired topic routes return to the roadmap. Known legacy project paths lead to a successor brief or the project index. The frozen legacy course files and [generated migration map](../src/data/curriculum-migration-map.json) account for all 12 old phases, 83 topics, 1,313 lessons, 51 resources and seven projects. The map retains 1,218 lesson IDs and classifies 95 as retired. All 95 remain readable with no active credit. The original completion timestamp remains on its original lesson ID. There is no fuzzy progress transfer and no new SQL migration.

The learner navigation now prioritizes Dashboard, Learning Roadmap, Projects and Account & data. Existing notes and backup functionality remain. Direct resource URLs use a compact index that links contextual references. Frontend courses and alternative language/framework tracks were removed from the active path. PostgreSQL/pgvector, Kafka, Locust and vLLM replace competing tool tracks where the objectives called for them.

The active external link check reached 37 of 38 sources. The host received HTTP 429 for vLLM. The official [vLLM documentation](https://docs.vllm.ai/en/latest/) and [serving benchmark reference](https://docs.vllm.ai/en/latest/cli/bench/serve/) opened separately and their scope was checked. Existing dated verification was preserved for retained references. The uninspected legacy India privacy reference stays outside the active set.

## Verification and handoff

| Check | Result |
| --- | --- |
| `npm run curriculum:index` | Generated the active index, ID lists and migration map. |
| `npm run check:curriculum` | Passed with 14 phases, 220 topics, 1,399 lessons, 38 references, six projects and 31 technologies. |
| `npm run typecheck` and `npm run lint` | Passed. |
| `npm test` | 23/23 passed. The actual PostgreSQL migration test verified owner isolation, revision conflicts, rollback and new and retired data in the same snapshot. |
| `npm run build` | Passed. Next.js generated 258 static pages in its build report. |
| `npm run test:routes` | 252/252 page routes returned usable HTML. All 1,399 active lesson anchors, search, the retired frontend redirect, the missing-topic 404 and the state endpoint were checked. |
| `npm run check:resource-internal-links` | 207 references across 123 unique targets and 50 pages, including 36 unique lesson fragments. Zero failures. |
| `npm run check:resource-links` | 37/38 returned success. vLLM returned HTTP 429 to the checker and its official documentation was independently inspected. |
| Headless Chrome with Playwright | Passed fresh progress, lesson and milestone reload persistence, next lesson, a historical moved fragment, export of retired records and navigation and layout at 390px and 320px. |
| `git diff --check` | Passed. |

Local browser verification ran against the production build on port 3011 in isolated temporary browser contexts. The Playwright install was temporary and outside project dependencies. No hosted account or production database was used. The existing database migration is needed only when setting up a fresh Supabase project.

The branch remains `main` with local changes. There was no commit, push or deployment. The original configured directory was absent. The verified checkout used for this work was `D:\ONEDAY-main\ONEDAY`, based on `5bb24de`. It did not contain the earlier uncommitted planner changes.

To continue reviewing in the app, run `npm run dev` from that checkout and open Dashboard → Open lesson. The next curriculum batch is Phase 06, using the existing Phase 05 batch pattern to assign preserved objectives, new worked exercises and verified references to the requested individual topics.
