import type { Resource, ResourceLearningMoment } from "@/lib/types";
import { resources as legacyResources } from "./legacy-resources";
import { phaseForTopic } from "./course-sequence";
import { referenceGuidance } from "./reference-guidance";

const newReferences = [
  [
    "pypdf",
    "Extract text from a PDF",
    "pypdf",
    "https://pypdf.readthedocs.io/en/stable/user/extract-text.html",
    "PDF page extraction, layout limits and image-only input.",
  ],
  [
    "beautifulsoup",
    "Beautiful Soup documentation",
    "Beautiful Soup",
    "https://www.crummy.com/software/BeautifulSoup/bs4/doc/#get-text",
    "Extract text from a selected HTML subtree.",
  ],
  [
    "pydantic",
    "Pydantic validation documentation",
    "Pydantic",
    "https://pydantic.dev/docs/validation/latest/get-started/",
    "Validation of Python API input and output.",
  ],
  [
    "sqlalchemy",
    "SQLAlchemy 2.0 Unified Tutorial",
    "SQLAlchemy",
    "https://docs.sqlalchemy.org/en/20/tutorial/",
    "Database sessions, transactions and durable application models.",
  ],
  [
    "alembic",
    "Alembic Tutorial",
    "SQLAlchemy",
    "https://alembic.sqlalchemy.org/en/latest/tutorial.html",
    "Versioned migrations and development upgrade and downgrade workflows.",
  ],
  [
    "kafka",
    "Apache Kafka Documentation",
    "Apache Software Foundation",
    "https://kafka.apache.org/documentation/",
    "Partitions, delivery behavior and consumer groups for event processing.",
  ],
  [
    "locust",
    "Locust first test",
    "Locust",
    "https://docs.locust.io/en/stable/quickstart.html",
    "Python workload scripts for a controlled load experiment.",
  ],
  [
    "prometheus",
    "Prometheus overview",
    "Prometheus",
    "https://prometheus.io/docs/introduction/overview/",
    "Scraped metrics and time-series labels.",
  ],
  [
    "grafana",
    "Grafana documentation",
    "Grafana Labs",
    "https://grafana.com/docs/grafana/latest/",
    "Dashboards and visualization of service behavior.",
  ],
  [
    "mcp-sdk",
    "MCP Python SDK",
    "Model Context Protocol",
    "https://py.sdk.modelcontextprotocol.io/",
    "Official Python server, client and test documentation.",
  ],
] as const;

const placements = [
  [
    "pypdf",
    "v5-ingest-pdf",
    "Extract Text from a PDF and OCR vs text extraction",
    "Extract text from a two-page fixture and record which page needs OCR.",
  ],
  [
    "beautifulsoup",
    "v5-ingest-html",
    "Quick Start, Searching the tree, decompose() and get_text()",
    "Extract the main content and heading IDs without script or navigation text.",
  ],
  [
    "cs50",
    "v2-binary",
    "Week 0 course notes on binary representation and problem solving",
    "Explain the same byte value in binary and decimal.",
  ],
  [
    "ostep",
    "0.2",
    "Processes and CPU scheduling",
    "Draw the state changes of one waiting process.",
  ],
  [
    "linux",
    "v2-linux-permissions",
    "What is WSL? and Basic commands for WSL, starting an installed Linux distribution",
    "Check access to a disposable directory from the shell.",
  ],
  [
    "git",
    "0.5",
    "Git Basics, recording changes and inspecting diffs",
    "Inspect the staged and unstaged changes in a throwaway repository.",
  ],
  [
    "python",
    "1.1",
    "Invoking the interpreter and running a script",
    "Run the same local script through the selected interpreter and confirm which installation ran it.",
  ],
  [
    "pytest",
    "1.5",
    "Get Started, assertions and parametrization",
    "Run one test over both a success case and malformed input.",
  ],
  [
    "algorithms",
    "v2-dsa-cost",
    "Asymptotic analysis and data structures",
    "Count the operations for a failed lookup on a short input.",
  ],
  [
    "postgres",
    "3.2",
    "Getting Started, accessing a database and running the first query",
    "Connect to a disposable PostgreSQL database and identify its database and server version.",
  ],
  [
    "linear-algebra",
    "v2-math-matmul",
    "Matrix multiplication and linear transformations",
    "Multiply two small matrices and state their input and output dimensions.",
  ],
  [
    "statistics",
    "2.3",
    "Sampling, distributions and inference",
    "Record what can be inferred from a small synthetic sample.",
  ],
  [
    "numpy",
    "4.1",
    "Array creation, shape and broadcasting",
    "Predict an array operation's output shape before running it.",
  ],
  [
    "pandas",
    "v2-data-pandas",
    "DataFrame indexing, missing data and grouping",
    "Write an aggregation and check it against the input rows.",
  ],
  [
    "sklearn",
    "v5-ml-validation",
    "Cross-validation, scoring and model evaluation",
    "Explain which data set was used to choose a model and which was used to report its score.",
  ],
  [
    "pytorch",
    "5.2",
    "Learn the Basics, Tensors and Build the Neural Network",
    "Check input and output shapes and inspect named parameters for one CPU module.",
  ],
  [
    "huggingface",
    "6.6",
    "Tokenizer, model and dataset interfaces",
    "Record how the selected tokenizer transforms a fixed sentence.",
  ],
  [
    "fastapi",
    "7.2",
    "First Steps, creating and running a FastAPI application",
    "Create an application with two routes, verify the local response and record the startup command.",
  ],
  [
    "pydantic",
    "v5-api-pydantic",
    "Models, field constraints and serialization",
    "Compare an accepted body with an invalid field type.",
  ],
  [
    "sqlalchemy",
    "v5-api-sqlalchemy",
    "Transactions and ORM session basics",
    "Show what the session does after a unique constraint error.",
  ],
  [
    "alembic",
    "v5-api-migrations",
    "Migration environment, revisions, upgrades and downgrades",
    "Rebuild a disposable schema from its migration history.",
  ],
  [
    "pgvector",
    "8.2",
    "Exact queries, distance operators and indexing",
    "Check ordered nearest neighbors on a tiny fixture.",
  ],
  [
    "mcp",
    "8.8",
    "Architecture, tools and transports",
    "Explain which component discovers tools and which enforces user permissions.",
  ],
  [
    "mcp-sdk",
    "v5-mcp-server",
    "First steps, FastMCP tools and running a server locally",
    "Run a fixture lookup with valid and malformed inputs.",
  ],
  [
    "owasp",
    "10.2",
    "Prompt injection, sensitive information and excessive agency",
    "Show a malicious document cannot authorize a fixture write.",
  ],
  [
    "builders",
    "v5-sys-retries",
    "Timeouts, retries and backoff with jitter",
    "Explain how a retry budget bounds amplification during an outage.",
  ],
  [
    "redis",
    "9.2",
    "Data types, key expiry and atomic operations",
    "Verify a tenant-specific key expires at its declared TTL.",
  ],
  [
    "kafka",
    "9.4",
    "Key Concepts and consumer group behavior",
    "Explain which events can replay after a failure before the offset commit.",
  ],
  [
    "docker",
    "v5-prod-docker",
    "What is a container? and What is an image?",
    "Run a fixture image twice with different settings and record image and container identity.",
  ],
  [
    "github-actions",
    "v5-prod-ci",
    "Workflow syntax, jobs and permissions",
    "Make an invalid fixture fail a local test before publishing its workflow.",
  ],
  [
    "terraform",
    "10.7",
    "Plan, providers and state",
    "Inspect a plan and identify a change that requires explicit review.",
  ],
  [
    "aws",
    "v5-prod-secure-release",
    "IAM, VPC, S3 and managed database security",
    "Diagram a private data boundary and a least-privilege service role.",
  ],
  [
    "kubernetes",
    "v5-prod-kubernetes",
    "Learn Kubernetes Basics, the cluster architecture and application deployment overview",
    "Trace two replicas from an API request through scheduling and workload readiness.",
  ],
  [
    "mlflow",
    "v5-prod-mlflow",
    "Tracking runs and model artifacts",
    "Compare two reproducible runs using saved parameters and metrics.",
  ],
  [
    "otel",
    "v5-prod-otel",
    "Traces, spans and instrumentation",
    "Trace one timeout across an API and its provider adapter.",
  ],
  [
    "prometheus",
    "v5-prod-prometheus",
    "Metric types, labels and scraping",
    "Count two fixture calls without high-cardinality request ID labels.",
  ],
  [
    "grafana",
    "v5-prod-grafana",
    "Dashboards and panels",
    "Plot fixture error rate against a labeled time axis.",
  ],
  [
    "locust",
    "9.8",
    "First test, tasks and reporting",
    "Run an owned fixture workload and capture latency, throughput and errors.",
  ],
  [
    "cuda",
    "v2-serve-cuda",
    "GPU execution and memory model",
    "Calculate weight storage for a toy parameter count and precision.",
  ],
  [
    "vllm",
    "v2-vllm",
    "Serving and online benchmarking",
    "Plan one reproducible throughput and time-to-first-token comparison.",
  ],
] as const;

const referenceLessons: Record<string, string> = {
  pypdf: "v5-ingest-pdf-study",
  beautifulsoup: "v5-ingest-html-study",
  cs50: "0.1.8",
  ostep: "0.2.1",
  linux: "0.4.6",
  git: "0.5.5",
  python: "1.1.1",
  pytest: "1.5.10",
  algorithms: "2.8.2",
  postgres: "3.2.2",
  "linear-algebra": "2.5.8",
  statistics: "2.3.2",
  numpy: "4.1.4",
  pandas: "4.1.8",
  sklearn: "4.5.8",
  pytorch: "5.2.1",
  huggingface: "6.6.1",
  fastapi: "7.2.3",
  pydantic: "7.2.8",
  sqlalchemy: "v2-sqlalchemy-alembic",
  alembic: "v5-api-migrations-study",
  pgvector: "8.2.2",
  mcp: "8.8.6",
  "mcp-sdk": "v2-mcp-sdk",
  owasp: "10.2.1",
  builders: "9.5.19",
  redis: "9.2.1",
  kafka: "9.4.12",
  docker: "10.5.1",
  "github-actions": "10.7.4",
  terraform: "10.7.13",
  aws: "v2-aws-boundary",
  kubernetes: "10.7.14",
  mlflow: "10.9.4",
  otel: "10.8.8",
  prometheus: "10.8.9",
  grafana: "10.8.10",
  locust: "v2-locust-capacity",
  cuda: "v2-serve-cuda-exercise",
  vllm: "11.3.16",
};
const relatedProjects: Record<string, string[]> = {
  pypdf: ["portfolio-data-ingestion-rag-mcp"],
  mcp: ["portfolio-data-ingestion-rag-mcp"],
  owasp: ["portfolio-data-ingestion-rag-mcp", "portfolio-ccai"],
  docker: ["portfolio-postgres-api", "portfolio-ccai"],
  beautifulsoup: ["portfolio-data-ingestion-rag-mcp"],
  mlflow: ["portfolio-ml-pipeline"],
  python: ["portfolio-python-toolkit"],
  pytest: ["portfolio-python-toolkit", "portfolio-postgres-api"],
  postgres: ["portfolio-postgres-api", "portfolio-data-ingestion-rag-mcp"],
  fastapi: ["portfolio-postgres-api", "portfolio-data-ingestion-rag-mcp"],
  sqlalchemy: ["portfolio-postgres-api"],
  alembic: ["portfolio-postgres-api"],
  sklearn: ["portfolio-ml-pipeline"],
  pgvector: ["portfolio-data-ingestion-rag-mcp"],
  "mcp-sdk": ["portfolio-data-ingestion-rag-mcp"],
  redis: ["portfolio-ccai"],
  kafka: ["portfolio-ccai"],
  aws: ["portfolio-ccai"],
  locust: ["portfolio-ccai"],
  vllm: ["portfolio-ccai"],
};

const readingOverrides: Record<string, Partial<ResourceLearningMoment>> = {
  pypdf: {
    prerequisiteTopicIds: ["v5-ingest-design"],
    recommendedTiming: "Before implementing your first PDF extractor.",
    startWhen:
      "After defining the extraction record and learning how to read local binary files, open the page before parsing the two-page fixture.",
    learningObjectives: [
      "Use a page-level extractor and recognize when an empty result requires an OCR handoff.",
    ],
    whyAtThisStage:
      "Your normalized ingestion record needs a page locator and a status so empty text does not pass validation unnoticed.",
    completionCriteria: [
      "One record contains text and a page number. The scanned page produces a distinct review or OCR outcome.",
    ],
    nextStep:
      "Compare the PDF record with section-level extraction in the HTML topic.",
  },
  beautifulsoup: {
    prerequisiteTopicIds: ["v5-ingest-design", "v5-ingest-pdf"],
    recommendedTiming:
      "Before converting fixture HTML into section-level records.",
    startWhen:
      "After completing the PDF extraction comparison and identifying the main element, heading and navigation in the HTML fixture.",
    learningObjectives: [
      "Select a content subtree, remove boilerplate and extract readable text with stable section locators.",
    ],
    whyAtThisStage:
      "Flattening the entire page adds irrelevant text and discards the section identity needed for retrieval evidence.",
    completionCriteria: [
      "The fixture returns the expected section IDs and content. Assertions catch any text copied from scripts or navigation.",
    ],
    nextStep:
      "Compare the HTML records with Markdown and structured data in the formats topic.",
  },
};

const revisits: Record<
  string,
  {
    topic: string;
    previousLesson: string;
    section: string;
    task: string;
    criterion: string;
    advanced?: boolean;
  }
> = {
  "mcp-sdk": {
    topic: "v5-mcp-client",
    previousLesson: "v5-mcp-client-study",
    section: "Client examples, stdio clients, initialization and tool calls",
    task: "Connect to the fixture server, invoke the approved lookup and force one timeout.",
    criterion:
      "The client validates tool results and closes the session for both the successful and timed-out calls.",
  },
  redis: {
    topic: "v5-sys-redis-lua",
    previousLesson: "v2-redis-atomic",
    section: "Programmability, Scripting with Lua and atomic execution",
    task: "Run concurrent calls against one bounded Lua limiter and measure the accepted count.",
    criterion:
      "The accepted count respects the shared quota and the run records latency and key expiry behavior.",
    advanced: true,
  },
  docker: {
    topic: "v5-prod-compose",
    previousLesson: "v5-prod-compose-study",
    section:
      "Get started with Docker Compose, defining services, networking and persistence",
    task: "Start the fixture API, PostgreSQL and Redis and restart the API after writing one row.",
    criterion:
      "The API can reach both dependencies by service name and the test row remains after the restart.",
  },
};

export const resources = placements.flatMap(
  ([id, topicId, section, task], index): Resource[] => {
    const existing = legacyResources.find((item) => item.id === id);
    const added = newReferences.find(([key]) => key === id);
    if (
      (!existing && !added) ||
      (existing && existing.verificationStatus !== "verified")
    )
      return [];
    const phaseNumber = phaseForTopic(topicId)!;
    const source = existing ?? {
      id,
      title: added![1],
      provider: added![2],
      category: "Documentation",
      url: added![3],
      description: added![4],
      free: true,
      type: "official_docs" as const,
      contentType: "documentation" as const,
      verificationStatus: "verified" as const,
      verifiedAt: "2026-11-08",
      verificationNotes:
        "The official documentation page was opened and its relevant scope checked.",
    };
    const guidance = referenceGuidance[id];
    if (!guidance && !readingOverrides[id])
      throw new Error("Missing reference guidance for " + id);
    const moment: ResourceLearningMoment = {
      id: id + "-main",
      phaseId: "track-" + String(phaseNumber).padStart(2, "0"),
      phaseNumber,
      topicId,
      stageType: "during_topic",
      sequenceOrder: index + 1,
      isPrimaryMoment: true,
      recommendedTiming:
        "During the linked lesson and before its practical task.",
      startWhen: guidance?.[1] ?? "",
      prerequisiteTopicIds: [...(guidance?.[0] ?? [])],
      previousLessonIds: [referenceLessons[id]],
      focusSections: [section],
      learningObjectives: [task],
      whyAtThisStage: guidance?.[2] ?? "",
      practicalTask: task,
      completionCriteria: guidance ? [guidance[3]] : [],
      nextStep:
        "Use the result in the topic exercise and continue to the next lesson.",
      projectIds: relatedProjects[id] ?? [],
      estimatedMinutes: 30,
      ...readingOverrides[id],
    };
    const revisit = revisits[id];
    const learningMoments: ResourceLearningMoment[] = [moment];
    if (revisit) {
      const revisitPhase = phaseForTopic(revisit.topic)!;
      learningMoments.push({
        ...moment,
        id: id + "-revisit",
        phaseId: "track-" + String(revisitPhase).padStart(2, "0"),
        phaseNumber: revisitPhase,
        topicId: revisit.topic,
        stageType: "project",
        isPrimaryMoment: false,
        sequenceOrder: placements.length + index + 1,
        recommendedTiming:
          "Return to this reference when implementing the linked workflow.",
        startWhen:
          "Complete the first reading and its practice, then review the linked lesson before beginning this implementation.",
        prerequisiteTopicIds: [topicId],
        previousLessonIds: [revisit.previousLesson],
        focusSections: [revisit.section],
        learningObjectives: [revisit.task],
        whyAtThisStage:
          "The implementation exposes lifecycle and failure behavior that the first reading introduces.",
        practicalTask: revisit.task,
        completionCriteria: [revisit.criterion],
        nextStep:
          "Use the tested behavior as evidence in the associated project milestone.",
        advanced: revisit.advanced,
      });
    }
    return [
      {
        ...source,
        ...(id === "vllm"
          ? {
              description:
                "The serving engine used for controlled inference benchmarks in Phase 13.",
              verifiedAt: "2026-11-09",
              verificationNotes:
                "Official serving documentation and the benchmark CLI were inspected. The V5 HTTPS check reached the official documentation.",
            }
          : {}),
        priority: "core",
        phases: [...new Set(learningMoments.map((entry) => entry.phaseNumber))],
        relatedTopicIds: learningMoments.map((entry) => entry.topicId),
        learningMoments,
        supplementalUrls: [],
        usageNotes:
          "Read the listed section in the context of its linked topic.",
      },
    ];
  },
);
export const resourceById = Object.fromEntries(
  resources.map((resource) => [resource.id, resource]),
);
