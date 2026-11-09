import type { Project } from "@/lib/types";
import { slugify } from "@/lib/slug";

type Brief = {
  key: string;
  title: string;
  phase: number;
  completionPhase?: number;
  purpose: string;
  technologies: string[];
  prerequisiteLessons: string[];
  architecture: string;
  folderStructure: string;
  milestones: string[];
  checks: string[];
  deployment: string;
  result: string;
};
const briefs: Brief[] = [
  {
    key: "python-toolkit",
    title: "Python Engineering Toolkit",
    phase: 2,
    purpose:
      "Build reusable CLI tools that validate JSON and CSV, report errors predictably and install cleanly.",
    technologies: ["Python", "pytest", "Git"],
    prerequisiteLessons: ["v2-python-package"],
    architecture:
      "CLI → input parser → validation and transformations → output and exit status",
    folderStructure:
      "src/toolkit/, tests/, fixtures/, pyproject.toml, README.md",
    milestones: [
      "Define file contracts and exit codes.",
      "Implement pathlib input, parsing, typed transformations and logging.",
      "Package the CLI and write valid, malformed and missing-file tests.",
      "Install the built distribution in a clean environment and document its commands.",
    ],
    checks: [
      "An invalid file fails without overwriting the output.",
      "A fresh install runs the same tests and exposes the documented entry point.",
    ],
    deployment:
      "Build a local distribution and install it in a fresh virtual environment. Record the tested Python and dependency versions.",
    result:
      "An installable CLI toolkit with fixtures, passing tests and usage documentation.",
  },
  {
    key: "postgres-api",
    title: "PostgreSQL-Backed FastAPI Service",
    phase: 9,
    purpose:
      "Serve authenticated, tenant-scoped records through a documented Python API.",
    technologies: [
      "Python",
      "FastAPI",
      "Pydantic",
      "PostgreSQL",
      "SQLAlchemy",
      "Alembic",
      "pytest",
    ],
    prerequisiteLessons: [
      "v2-postgres-window",
      "v2-sqlalchemy-alembic",
      "v5-async-limits-study",
      "v5-async-http-study",
      "v5-api-migrations-study",
      "v5-api-concurrency-study",
    ],
    architecture:
      "API client → FastAPI/auth → Pydantic → service → SQLAlchemy session → PostgreSQL",
    folderStructure:
      "app/api/, app/services/, app/db/, migrations/, tests/, README.md",
    milestones: [
      "Define the API contract and ownership schema.",
      "Add a reproducible PostgreSQL migration and scoped data access.",
      "Implement validation, authentication and consistent errors.",
      "Test duplicate writes, cross-tenant denial, rollback and OpenAPI examples.",
      "Add stable pagination and an async fixture endpoint with a deadline and bounded concurrent calls.",
    ],
    checks: [
      "A caller cannot read or mutate another tenant's record.",
      "Tied sort values paginate deterministically. A delayed fixture times out and observed in-flight calls stay within the configured limit.",
      "A fresh PostgreSQL database upgrades through all revisions and the duplicate-write case leaves one row.",
    ],
    deployment:
      "Run the service against a disposable PostgreSQL database and document migration order, readiness and rollback.",
    result:
      "A backend API with real persistence, OpenAPI examples, structured logs and a repeatable migration.",
  },
  {
    key: "ml-pipeline",
    title: "End-to-End Machine Learning Pipeline",
    phase: 6,
    completionPhase: 12,
    purpose:
      "Train a reproducible scikit-learn model from a documented dataset and report its limitations.",
    technologies: [
      "Python",
      "NumPy",
      "Pandas",
      "scikit-learn",
      "MLflow",
      "pytest",
    ],
    prerequisiteLessons: [
      "v2-split-before-transform",
      "v2-ml-threshold",
      "v5-ml-end-to-end-study",
    ],
    architecture:
      "Dataset → analysis → split → preprocessing and estimator → evaluation → versioned artifact",
    folderStructure:
      "data/README.md, src/pipeline/, tests/, reports/, artifacts/",
    milestones: [
      "Record dataset provenance, license and target definition.",
      "Build leakage-safe preprocessing and a simple baseline.",
      "Train and evaluate against the chosen metric with fixed seeds and split.",
      "Serialize the trusted model and document feature and failure cases.",
      "During Phase 12, record a baseline and an improved run in local MLflow with parameters, metrics and the evaluation artifact.",
    ],
    checks: [
      "Changing held-out rows leaves training-only preprocessing unchanged.",
      "An independent run can reproduce the metric within a documented tolerance.",
      "Both MLflow runs use a traceable dataset revision and report the same evaluation contract.",
    ],
    deployment:
      "Keep the artifact private. Reproduce the build from a versioned dataset and load only an artifact you built or verified.",
    result:
      "A repeatable pipeline, artifact and evaluation report with real baseline results.",
  },
  {
    key: "data-ingestion-rag-mcp",
    title: "Data Ingestion, RAG, and MCP Backend",
    phase: 10,
    purpose:
      "Ingest source documents into an authorized retrieval service and return evaluated answers. Expose a bounded tool through an MCP client and server.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "pypdf",
      "BeautifulSoup",
      "Hugging Face",
      "LLM provider adapters",
      "Official MCP Python SDK",
      "pytest",
    ],
    prerequisiteLessons: [
      "v2-sqlalchemy-alembic",
      "v5-ingest-pdf-study",
      "v5-ingest-html-study",
      "v5-ingest-chunk-provenance-study",
      "v5-ingest-replay-study",
      "8.2.2",
      "8.3.19",
      "v2-mcp-sdk",
    ],
    architecture:
      "Authorized source → parser → normalized chunks → versioned tenant store → embeddings and filtered retrieval → cited answer. A separately authorized MCP host calls a scoped fixture tool.",
    folderStructure:
      "app/ingest/, app/retrieval/, app/providers/, app/tools/, evals/, migrations/, tests/fixtures/",
    milestones: [
      "Create a licensed synthetic corpus with text PDFs and HTML. Extract text, record provenance and report image-only PDF pages separately.",
      "Normalize content and compare structural and semantic chunk boundaries. Retain document, revision, page or section, tenant and extractor version.",
      "Use bounded retries and tenant-scoped idempotency keys. Verify a replay preserves row counts and a failed replacement keeps the previous revision searchable.",
      "Build pgvector retrieval with tenant filters and cite authorized chunk IDs in answers. Add an explicit no-evidence response.",
      "Connect a local MCP server and client. Validate tool inputs at the server and require host approval for mutations.",
      "Evaluate retrieval and citation correctness on a fixed corpus. Record latency, token use, cost and denial behavior.",
    ],
    checks: [
      "A PDF page and HTML section resolve from their citations. An image-only page has a reported extraction outcome.",
      "A replay creates no duplicates, and an interrupted replacement exposes no partial revision.",
      "Wrong-tenant retrieval and tool calls are denied. An unanswerable case returns no-evidence behavior.",
      "The host denies a mutation with missing approval. The server denies a cross-tenant argument even when the tool call is well formed.",
    ],
    deployment:
      "Run locally with a deterministic provider and MCP stdio fixture. Store credentials outside the repository and exercise source deletion, parser failure and a bounded retry before considering remote exposure.",
    result:
      "A reproducible ingestion and RAG API with source provenance, an evaluation report, scoped tools and tested replay behavior.",
  },
  {
    key: "ccai",
    title: "CCAI Production-Grade Multi-Model AI Platform",
    phase: 14,
    purpose:
      "Combine the earlier backends into a production-oriented multi-provider system with verified tenant boundaries and measured performance.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Kafka",
      "Official MCP Python SDK",
      "Docker",
      "Kubernetes",
      "AWS",
      "Terraform",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
      "Locust",
      "vLLM",
    ],
    prerequisiteLessons: [
      "v2-ccai-evidence",
      "v2-kafka-replay",
      "v2-redis-atomic",
      "v2-locust-capacity",
      "v2-vllm-benchmark",
    ],
    architecture:
      "API client → FastAPI gateway → authorization and validation → task planner → model router → provider adapters or vLLM. Context and retrieval use PostgreSQL/pgvector. Redis guards limits and caching. Kafka feeds background workers. Telemetry and evaluation span the flow.",
    folderStructure:
      "app/gateway/, app/orchestration/, app/retrieval/, app/workers/, migrations/, infra/, tests/, evals/, load/, runbooks/",
    milestones: [
      "Write the architecture, API contract, request model, workload assumptions and tenant threat model.",
      "Implement authenticated request intake, model capability registry, context policy and deterministic provider selection.",
      "Connect authorized retrieval, bounded MCP tools, atomic Redis limits and replay-safe Kafka jobs.",
      "Add repeatable contract, isolation, regression and failure-injection tests with mock providers.",
      "Capture measured latency, quality, model usage, cost and capacity using a documented workload.",
      "Document Docker, AWS and Kubernetes delivery, dashboards, recovery and a tested rollback.",
      "Demonstrate one conversation and RAG workflow with approved MCP tool use. Explain the Redis Lua atomic boundary and justify the use of Kafka or a bounded durable worker.",
    ],
    checks: [
      "A wrong-tenant lookup is denied at every storage and tool boundary.",
      "A replay or provider timeout does not double-charge the request.",
      "Reports distinguish local mock tests from live providers and contain no unsupported production scale claim.",
      "The runbook describes alert response, backup restoration and a repeatable rollback.",
      "The request trace records one initial routing decision with an eligibility reason. Any fallback respects the original deadline, usage budget and required capability.",
      "The evaluation demonstrates authorized ingestion, grounded citations, denied MCP actions and scoped conversation state. Record actual token and cost figures for the tested fixture.",
    ],
    deployment:
      "Start with Docker Compose and a disposable local environment. Document an AWS path using Terraform and Kubernetes, with private data services, secret references, probes, budgets and rollback. Deploy only after review.",
    result:
      "A measured backend portfolio with routing, tenant isolation, observability, load evidence, runbooks and documented limitations.",
  },
];

export const projects: Project[] = briefs.map((brief, index) => ({
  id: "portfolio-" + brief.key,
  slug: slugify(brief.title),
  title: brief.title,
  subtitle: "Project " + String(index + 1).padStart(2, "0"),
  purpose: brief.purpose,
  difficulty:
    index === 0 ? "beginner" : index < 4 ? "intermediate" : "advanced",
  phases: brief.completionPhase
    ? [brief.phase, brief.completionPhase]
    : [brief.phase],
  targetDepth: brief.key === "ccai" ? "L5" : "L3",
  technologies: brief.technologies,
  requirements: brief.milestones,
  milestones: brief.milestones,
  extensions: [],
  deployment: brief.deployment,
  result: brief.result,
  prerequisiteLessons: brief.prerequisiteLessons,
  architecture: brief.architecture,
  folderStructure: brief.folderStructure,
  checks: brief.checks,
}));
export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
);
