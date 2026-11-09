export const jobReadyCriteria = [
  {
    id: "python-linux-git",
    topicId: "v2-py-package",
    text: "Run and test a maintainable Python CLI in a clean environment. Use Linux to inspect an execution failure and show the Git diff for the fix.",
  },
  {
    id: "problem-solving",
    topicId: "v2-dsa-selection",
    text: "Solve an array or hash-table problem and a traversal problem. Explain complexity, boundary cases and why each structure fits.",
  },
  {
    id: "database-api",
    topicId: "v5-api-postgres",
    text: "Build and test a FastAPI endpoint backed by PostgreSQL. Show schema constraints, a parameterized query, validation and a denied cross-tenant request.",
  },
  {
    id: "concurrency",
    topicId: "v5-async-limits",
    text: "Explain sync versus async I/O and test a concurrent fixture with a deadline, a measured in-flight cap and cleanup on timeout.",
  },
  {
    id: "llm-rag",
    topicId: "v5-ingest-replay",
    text: "Call an LLM through a server-side credential, ingest PDF or HTML, retrieve authorized evidence and evaluate a cited answer and an unanswerable case.",
  },
  {
    id: "redis",
    topicId: "v5-sys-redis-cache",
    text: "Implement a small Redis cache or rate limiter and demonstrate expiration plus behavior when Redis is unavailable.",
  },
  {
    id: "deployment",
    topicId: "v5-prod-aws-compute",
    text: "Package the service with Docker and deploy an approved small AWS fixture. Show health, a narrow IAM role, private secrets, rollback evidence and cleanup.",
  },
  {
    id: "operations",
    topicId: "v5-prod-cloud-health",
    text: "Explain the service's authentication, authorization, structured logs, latency, usage cost and behavior during one tested dependency failure.",
  },
] as const;

export function jobReadyEvidenceId(criterionId: string): string {
  return "job-ready:" + criterionId;
}
