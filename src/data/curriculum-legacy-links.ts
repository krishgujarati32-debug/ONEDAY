import legacyIndex from "./legacy-index.json";
import legacyProjects from "./projects-outline.json";
import { phaseForGroup } from "./course-sequence";
import { slugify } from "@/lib/slug";

export const projectSuccessors: Record<string, string> = {
  "project-1": "portfolio-python-toolkit",
  "project-2": "portfolio-ml-pipeline",
  "project-3": "portfolio-postgres-api",
  "project-4": "portfolio-data-ingestion-rag-mcp",
  "portfolio-rag-backend": "portfolio-data-ingestion-rag-mcp",
  "portfolio-mcp-orchestration": "portfolio-data-ingestion-rag-mcp",
  "project-6": "portfolio-ccai",
};
export const legacyPhaseAliases = Object.fromEntries(
  legacyIndex.map((phase) => [
    phase.slug,
    phase.topics
      .map((topic) => phaseForGroup.get(topic.id))
      .find((number) => number !== undefined),
  ]),
);
export const legacyTopicSlugs = new Set(
  legacyIndex.flatMap((phase) => phase.topics.map((topic) => topic.slug)),
);
export const legacyProjectBySlug: Record<string, string> = {
  ...Object.fromEntries(
    legacyProjects.map((project) => [
      slugify(project.title),
      "project-" + project.number,
    ]),
  ),
  "postgresql-backed-backend-service": "portfolio-postgres-api",
  "production-oriented-llm-and-rag-backend": "portfolio-rag-backend",
  "ai-orchestration-and-mcp-service": "portfolio-mcp-orchestration",
};
