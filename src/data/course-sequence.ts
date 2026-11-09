import { foundations } from "./course-foundations";
import { pythonTopics } from "./course-python";
import { softwareTopics, databaseTopics } from "./course-software-data";
import { mathTopics, servingTopics } from "./course-math-serving";
/** Published groups are reused only for their existing objectives. Phase numbers are display order. */
export const sequence = [
  {
    title: "Computer Science and Engineering Foundations",
    shortTitle: "CS and engineering foundations",
    slug: "computer-science-foundations",
    purpose:
      "Trace a program from the machine to the shell and follow a request from client to server.",
    groups: ["0.1", "0.2", "0.4", "1.6-bash", "0.5", "0.3"],
  },
  {
    title: "Python Programming: Beginner to Advanced",
    shortTitle: "Python engineering",
    slug: "python-programming",
    purpose:
      "Write, test, package and maintain Python programs that handle real inputs and failures.",
    groups: ["1.1", "1.2", "1.3", "1.4", "1.5"],
  },
  {
    title: "Data Structures, Algorithms, and Software Engineering",
    shortTitle: "Algorithms and software design",
    slug: "algorithms-and-software-engineering",
    purpose:
      "Choose representations and algorithms, measure their cost and verify behavior through tests.",
    groups: ["2.8", "2.2", "3.1", "10.3"],
  },
  {
    title: "SQL, PostgreSQL, and Database Engineering",
    shortTitle: "PostgreSQL and database engineering",
    slug: "postgresql-database-engineering",
    purpose:
      "Model relational data, write SQL and verify integrity, isolation and query performance.",
    groups: ["1.6-sql", "3.2", "3.5"],
  },
  {
    title: "Mathematics, Statistics, and Data Analysis for AI",
    shortTitle: "Mathematics and data analysis",
    slug: "mathematics-statistics-data-analysis",
    purpose:
      "Use small numerical experiments to reason about data, uncertainty and optimization before training a model.",
    groups: ["2.1", "2.5", "2.6", "2.4", "2.3", "2.7", "4.1", "3.4"],
  },
  {
    title: "Machine Learning Engineering",
    shortTitle: "Machine learning engineering",
    slug: "data-science-machine-learning",
    purpose:
      "Build repeatable scikit-learn pipelines and measure where their predictions fail.",
    groups: ["4.2", "4.3", "4.4", "4.5", "4.6"],
  },
  {
    title: "Deep Learning and Neural Networks",
    shortTitle: "Deep learning with PyTorch",
    slug: "deep-learning-pytorch",
    purpose:
      "Trace a training step, inspect tensor shapes and train and restore a small PyTorch model.",
    groups: ["5.1", "5.2", "5.4", "5.3"],
  },
  {
    title: "NLP, LLM Internals, and Transformer Engineering",
    shortTitle: "NLP, transformers and LLMs",
    slug: "nlp-transformers-llms",
    purpose:
      "Explain how text becomes model inputs and how transformer inference produces new tokens.",
    groups: ["6.1", "6.2", "6.3", "6.4", "6.6", "6.5"],
  },
  {
    title: "Python Backend Engineering for AI Systems",
    shortTitle: "FastAPI backend engineering",
    slug: "python-backend-engineering",
    purpose:
      "Build and test a documented, authenticated FastAPI service backed by PostgreSQL.",
    groups: ["7.3", "7.1", "7.2"],
  },
  {
    title: "LLM Application Engineering, RAG, Agents, MCP, and AI Safety",
    shortTitle: "LLM applications, retrieval and MCP",
    slug: "llm-applications-rag-agents-mcp",
    purpose:
      "Ship a bounded AI workflow with provider adapters, authorized retrieval, tools, safety and regression evaluation.",
    groups: [
      "7.4",
      "6.7",
      "7.5",
      "7.6",
      "11.2",
      "8.1",
      "8.2",
      "8.3",
      "8.4",
      "8.7",
      "8.8",
      "10.4",
      "10.2",
    ],
  },
  {
    title: "System Design and Distributed Systems",
    shortTitle: "Distributed systems",
    slug: "system-design-scalability",
    purpose:
      "Use measured workloads and failure scenarios to design caches, limits, queues and service boundaries.",
    groups: ["9.1", "9.5", "9.2", "9.3", "9.4", "9.6", "9.7", "11.1", "11.5"],
  },
  {
    title:
      "Production Engineering, Cloud, MLOps, LLMOps, Security, and Observability",
    shortTitle: "Production engineering and AWS",
    slug: "production-security-mlops",
    purpose:
      "Deploy, measure and recover an AI service with containers, AWS, infrastructure as code and operational controls.",
    groups: [
      "10.5",
      "10.7",
      "10.6",
      "10.9",
      "10.8",
      "10.1",
      "10.10",
      "11.4",
      "9.8",
    ],
  },
  {
    title: "Model Serving, GPU Infrastructure, and Inference Optimization",
    shortTitle: "Model serving and inference",
    slug: "model-serving-and-inference",
    purpose:
      "Measure throughput, latency, memory and cost when operating a model endpoint with vLLM.",
    groups: ["11.3"],
  },
  {
    title: "Portfolio Engineering and CCAI Production Capstone",
    shortTitle: "Portfolio and CCAI capstone",
    slug: "portfolio-and-ccai-capstone",
    purpose:
      "Integrate the portfolio services into CCAI, then demonstrate reliability and capacity with recorded evidence.",
    groups: [],
  },
] as const;

export const phaseForGroup = new Map<string, number>([
  ...sequence.flatMap((phase, index) =>
    phase.groups.map((group) => [group, index + 1] as const),
  ),
  ...[
    [1, foundations],
    [2, pythonTopics],
    [3, softwareTopics],
    [4, databaseTopics],
    [5, mathTopics],
    [13, servingTopics],
  ].flatMap(([number, rows]) =>
    (rows as readonly (readonly [string, ...unknown[]])[]).map(
      ([id]) => [id, Number(number)] as const,
    ),
  ),
]);

export function phaseForTopic(id: string): number | undefined {
  if (id.startsWith("v5-ml-")) return 6;
  if (id.startsWith("v5-api-")) return 9;
  if (id.startsWith("v5-ingest-") || id.startsWith("v5-mcp-")) return 10;
  if (id.startsWith("v5-sys-")) return 11;
  if (id.startsWith("v5-prod-")) return 12;
  return phaseForGroup.get(id);
}

/** IDs have published completion semantics. Exclude specific obsolete lessons by identity. */
export const reviewedRetirements: Record<string, string> = {
  "3.4.16":
    "Standalone streaming introduction overlaps the Kafka and event-driven sequence in 9.4.12–13.",
  "3.4.18":
    "Warehouse specialization is outside the PostgreSQL and AI service path.",
  "3.4.19":
    "Data-lake architecture is outside the active course. Phase 12 still teaches object storage.",
  "3.5.3":
    "Vector persistence is already taught in 8.1.7 and 8.2.6. The old storage record stays historical.",
  "3.5.4": "Vector index trade-offs remain in 8.2.9.",
  "3.5.5": "Ranking by distance is already taught in 8.1.9 and 8.2.7.",
  "3.5.6": "Metadata and tenant filters remain in 8.1.10 and 8.2.8.",
  "3.5.7":
    "Lexical and vector retrieval remain in the hybrid search lesson 8.4.2.",
  "4.1.18":
    "Seaborn is removed as a separate plotting library. Basic visualization remains in Phase 05.",
};

export const excludedLessons = new Set([
  "3.5.2", // Dedicated document modeling is outside the PostgreSQL sequence.
  "1.2.14",
  "1.4.17", // Recursion is taught in DSA; regex is outside this Python batch.
  "0.3.17",
  "0.3.18", // Covered later in API engineering and system design.
  "0.4.11",
  "1.6-bash.1",
  "1.6-bash.6", // Duplicate shell or environment introductions.
  "3.4.24", // Spark.
  "8.2.3",
  "8.2.4",
  "8.2.10", // Alternative vector stores.
  "8.8.1",
  "8.8.2",
  "8.8.3",
  "8.8.4", // Alternative AI frameworks.
  "9.4.10",
  "9.4.11", // Celery and RabbitMQ.
  "9.8.13", // k6.
  "11.3.17",
  "11.3.18", // TGI and Triton.
]);

export const archivedTopics: Record<string, string> = {
  "1.6-javascript": "Frontend curriculum is outside the current learning path.",
  "1.7-java": "Parallel programming-language track retired.",
  "1.7-go": "Parallel programming-language track retired.",
  "1.7-cpp": "Parallel programming-language track retired.",
  "3.3": "Parallel document and graph database material retired.",
  "8.5":
    "Dedicated knowledge-graph track retired. Graph traversal remains in the algorithms phase.",
  "8.6": "Dedicated Graph RAG track retired.",
};
