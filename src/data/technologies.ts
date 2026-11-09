import type { Technology } from "@/lib/types";
import { slugify } from "@/lib/slug";
import { phaseForTopic } from "./course-sequence";

const stack = [
  [
    "Linux",
    "Development",
    "Use the shell, files, permissions and process tools.",
    "0.4",
  ],
  [
    "Bash",
    "Development",
    "Automate small repeatable operating-system tasks.",
    "1.6-bash",
  ],
  ["Git", "Development", "Track and review code changes.", "0.5"],
  [
    "GitHub",
    "Development",
    "Collaborate through pull requests and automated checks.",
    "0.5",
  ],
  [
    "Python",
    "Development",
    "Build CLI tools, data pipelines, models and backend services.",
    "1.1",
  ],
  [
    "pytest",
    "Testing",
    "Verify repeatable success, failure and isolation cases.",
    "1.5",
  ],
  [
    "PostgreSQL",
    "Data",
    "Store durable relational records with constraints and transactions.",
    "3.2",
  ],
  [
    "NumPy",
    "Data",
    "Apply array operations and inspect numerical shapes.",
    "4.1",
  ],
  ["Pandas", "Data", "Inspect, clean and aggregate tables.", "4.1"],
  [
    "scikit-learn",
    "Models",
    "Train and evaluate repeatable classical ML pipelines.",
    "4.2",
  ],
  [
    "PyTorch",
    "Models",
    "Train small neural networks and inspect gradients.",
    "5.2",
  ],
  [
    "Hugging Face",
    "Models",
    "Use documented tokenizers, model artifacts and datasets.",
    "6.6",
  ],
  ["FastAPI", "Backend", "Build typed HTTP APIs and OpenAPI contracts.", "7.2"],
  [
    "Pydantic",
    "Backend",
    "Validate input and serialize output at service boundaries.",
    "v5-api-pydantic",
  ],
  [
    "SQLAlchemy",
    "Backend",
    "Scope database sessions and transactions.",
    "v5-api-sqlalchemy",
  ],
  [
    "Alembic",
    "Backend",
    "Version and test relational schema migrations.",
    "v5-api-migrations",
  ],
  [
    "LLM provider adapters",
    "AI systems",
    "Use stable Python interfaces for distinct model providers.",
    "7.4",
  ],
  [
    "pypdf",
    "Data ingestion",
    "Extract text with page-level provenance and report image-only pages.",
    "v5-ingest-pdf",
  ],
  [
    "BeautifulSoup",
    "Data ingestion",
    "Extract relevant HTML text and retain section boundaries.",
    "v5-ingest-html",
  ],
  [
    "pgvector",
    "AI systems",
    "Run PostgreSQL similarity search with permission filters.",
    "8.2",
  ],
  [
    "Official MCP Python SDK",
    "AI systems",
    "Connect scoped tools and services through MCP.",
    "8.8",
  ],
  [
    "Redis",
    "Distributed systems",
    "Cache data and enforce shared rate limits.",
    "9.2",
  ],
  [
    "Kafka",
    "Distributed systems",
    "Process background events with replay and partition ordering.",
    "9.4",
  ],
  [
    "Docker",
    "Production",
    "Package services and exercise local deployments with Compose.",
    "v5-prod-docker",
  ],
  [
    "Terraform",
    "Production",
    "Review versioned infrastructure changes and protect state.",
    "10.7",
  ],
  [
    "AWS",
    "Production",
    "Operate a private data layer and a monitored API deployment.",
    "v5-prod-aws-compute",
  ],
  [
    "Kubernetes",
    "Production",
    "Operate containerized services with probes and rollbacks.",
    "v5-prod-kubernetes",
  ],
  [
    "MLflow",
    "Production",
    "Record experiments and manage artifact promotion.",
    "v5-prod-mlflow",
  ],
  [
    "OpenTelemetry",
    "Production",
    "Trace requests across service boundaries.",
    "v5-prod-otel",
  ],
  [
    "Prometheus",
    "Production",
    "Collect bounded service metrics.",
    "v5-prod-prometheus",
  ],
  [
    "Grafana",
    "Production",
    "Visualize latency, errors and capacity.",
    "v5-prod-grafana",
  ],
  [
    "Locust",
    "Testing",
    "Measure workload limits with controlled experiments.",
    "9.8",
  ],
  [
    "vLLM",
    "Serving",
    "Serve and benchmark language-model inference.",
    "v2-vllm",
  ],
] as const;

export const technologies: Technology[] = stack.map(
  ([name, category, description, topic]) => ({
    id: slugify(name),
    name,
    category,
    description,
    why: description,
    phase: phaseForTopic(topic)!,
    priority: "core",
    topicIds: [topic],
  }),
);
