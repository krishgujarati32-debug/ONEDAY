import raw from "./projects-outline.json";
import { slugify } from "@/lib/slug";
import type { Project } from "@/lib/types";
const packs = [
  {
    subtitle: "Your first complete application",
    purpose:
      "Turn Python knowledge into a usable command-line student records application. Practice validation, persistence and modular code before introducing AI libraries.",
    phases: [0, 1],
    technologies: ["Python", "JSON", "Pytest"],
    milestones: [
      "Define the student record schema and validation rules.",
      "Implement create, update, delete and search as independently tested functions.",
      "Add a repository interface and JSON file persistence with safe error handling.",
      "Build the CLI, exercise malformed input and document usage.",
    ],
    extensions: ["SQLite persistence", "CSV export", "A small web interface"],
    deployment:
      "Run locally in a documented virtual environment. Publish source and tests to a repository; no cloud service is required.",
    result:
      "A command-line program that persists valid student records and survives invalid input.",
  },
  {
    subtitle: "From raw data to a defensible prediction",
    purpose:
      "Analyze a public dataset, build a simple prediction baseline and explain what the evaluation does and does not establish.",
    phases: [1, 2, 3, 4],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"],
    milestones: [
      "Choose a licensed public dataset and define a prediction target.",
      "Split data before fitting preprocessing; profile quality and possible leakage.",
      "Fit a baseline and a second model using a preprocessing pipeline.",
      "Evaluate on held-out data, inspect errors and save the full pipeline.",
    ],
    extensions: [
      "Calibration study",
      "Subgroup error report",
      "A reproducible experiment comparison",
    ],
    deployment:
      "Keep a reproducible notebook and dependency file. Save model artifacts with training metadata and the data license.",
    result:
      "A reproducible analysis and model with measured held-out results and documented limitations.",
  },
  {
    subtitle: "Give your model a reliable interface",
    purpose:
      "Expose a trained model through a validated Python API with predictable input, output and failure behavior.",
    phases: [3, 4, 7],
    technologies: ["FastAPI", "Pydantic", "Scikit-learn", "Pytest", "Docker"],
    milestones: [
      "Define request and response schemas with boundary cases.",
      "Load the complete saved pipeline once and expose a prediction route.",
      "Add health checks, structured errors and request logs.",
      "Test valid, invalid and failing requests; package and document the service.",
    ],
    extensions: [
      "Batch prediction",
      "Model version endpoint",
      "Request-level latency metrics",
    ],
    deployment:
      "Use an ASGI host or container platform with environment configuration, health checks and a private model artifact.",
    result:
      "A documented prediction API with validation and meaningful integration tests.",
  },
  {
    subtitle: "Answers grounded in your documents",
    purpose:
      "Build a document assistant that retrieves authorized evidence, answers with sources and admits when the corpus cannot answer.",
    phases: [3, 6, 7, 8],
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "An embedding model",
    ],
    milestones: [
      "Collect permitted documents and preserve source IDs during parsing.",
      "Implement chunking, embeddings and tenant-aware storage.",
      "Build retrieval and a generation adapter with source references.",
      "Evaluate answerable and unanswerable questions; test denied access and ingestion failure.",
    ],
    extensions: [
      "Hybrid retrieval",
      "Reranking",
      "Document deletion and re-indexing",
    ],
    deployment:
      "Store provider credentials only on the server. Use protected object storage, durable metadata and a background worker for ingestion.",
    result:
      "A PDF-capable assistant with traceable sources, permission-filtered retrieval and an evaluation report.",
  },
  {
    subtitle: "Follow the connections between ideas",
    purpose:
      "Compare relationship-aware retrieval with a vector baseline on questions requiring connected evidence. Document where the graph does not help.",
    phases: [3, 6, 7, 8],
    technologies: ["Python", "Neo4j", "pgvector", "FastAPI"],
    milestones: [
      "Select a small corpus with explicit relationship questions.",
      "Extract and resolve entities, preserving provenance on every edge.",
      "Implement bounded graph retrieval and optionally combine vector candidates.",
      "Compare recall, answer support, latency and extraction errors against the baseline.",
    ],
    extensions: [
      "Confidence-weighted edges",
      "Graph update workflow",
      "Human-reviewed entity resolution",
    ],
    deployment:
      "Configure private graph access, backups and source deletion propagation. Record extraction cost and graph maintenance requirements.",
    result:
      "A measured graph-assisted retrieval experiment with inspectable nodes, edges and source provenance.",
  },
  {
    subtitle: "The flagship · Centralized Contextual AI",
    purpose:
      "Build CCAI: a platform that classifies requests and chooses a suitable model using capability, context length, quality, cost, latency and provider availability.",
    phases: [3, 6, 7, 8, 9, 10, 11],
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Provider adapters",
      "OpenTelemetry",
    ],
    milestones: [
      "Define a task taxonomy, evaluation set and model capability registry.",
      "Build authenticated request intake, provider adapters and a deterministic routing baseline.",
      "Enforce context limits, token budgets, tenant quotas and atomic usage accounting.",
      "Add bounded retries, fallback, request history and routing decision logs.",
      "Compare routing quality, cost and latency against a fixed-model baseline.",
      "Harden secrets, permissions, observability and deployment; document architecture decisions.",
    ],
    extensions: [
      "Task planner and context manager",
      "RAG and graph retrieval",
      "Approved tool workflows",
      "Queued long-running jobs",
    ],
    deployment:
      "Use your own provider credentials or mocked adapters. Deploy behind TLS with per-user access policies, database migrations and monitoring. The learning website itself needs no paid model API.",
    result:
      "A functioning, evaluated multi-provider router with honest cost and reliability measurements.",
  },
  {
    subtitle: "A system you can operate with confidence",
    purpose:
      "Turn a working AI backend into a secure, observable service whose capacity and recovery behavior are measured and documented.",
    phases: [7, 9, 10, 11],
    technologies: [
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Celery",
      "Docker",
      "GitHub Actions",
      "OpenTelemetry",
      "k6",
    ],
    milestones: [
      "Define service-level objectives and document a modest expected workload.",
      "Add tenant isolation, distributed limits, queue idempotency and fallback.",
      "Create container builds, CI checks and a repeatable deployment pipeline.",
      "Instrument logs, traces, metrics and actionable alerts.",
      "Run small controlled load and failure tests, then test backup restoration.",
      "Publish environment-specific latency, errors, throughput, CPU and memory results.",
    ],
    extensions: [
      "Canary rollout",
      "Infrastructure as Code",
      "One additional region when justified",
    ],
    deployment:
      "Choose one cloud provider. Restrict IAM, configure budgets and backups, separate environments and prove rollback before expanding traffic.",
    result:
      "A deployable platform with a reproducible capacity report, security tests and recovery playbook. No unsupported million-request claims.",
  },
];
export const projects: Project[] = raw.map((p, i) => ({
  id: `project-${p.number}`,
  slug: slugify(p.title),
  title: p.title,
  difficulty: i < 1 ? "beginner" : i < 4 ? "intermediate" : "advanced",
  requirements: p.requirements,
  ...packs[i],
}));
export const projectBySlug = Object.fromEntries(
  projects.map((p) => [p.slug, p]),
);
