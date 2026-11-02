import { existsSync, writeFileSync } from "node:fs";
import { resources } from "../src/data/resources";
import { phases, topics } from "../src/data/curriculum";
import { technologies } from "../src/data/technologies";
import { projects } from "../src/data/projects";
if (existsSync("docs/resource-upgrade-baseline.json"))
  throw new Error(
    "The pre-upgrade baseline already exists and must not be overwritten.",
  );
const baseline = {
  capturedAt: "2026-11-03",
  resources: resources.map((r) => ({
    ...r,
    relatedTopicIds: topics
      .filter((t) => t.resources.includes(r.id))
      .map((t) => t.id),
  })),
  phases: phases.map((p) => ({
    id: p.id,
    number: p.number,
    title: p.shortTitle,
    slug: p.slug,
    priority: p.priority,
    topics: p.topics.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      priority: t.priority,
      resources: t.resources,
      subtopics: t.subtopics.map((s) => ({
        id: s.id,
        title: s.title,
        priority: s.priority,
      })),
    })),
  })),
  technologies,
  projects,
};
writeFileSync(
  "docs/resource-upgrade-baseline.json",
  JSON.stringify(baseline, null, 2) + "\n",
);
const lines = [
  "# Resource-learning upgrade: pre-change audit",
  "",
  `Repository status: clean. Baseline: ${resources.length} resources, ${topics.length} topics, ${topics.flatMap((t) => t.subtopics).length} lessons, ${technologies.length} technologies and ${projects.length} projects.`,
  "",
  "## Current schema",
  "",
  "`Resource = { id, title, provider, category, description, url, type, free, phases }`. There is no existing resource priority field. Topic relationships are stored separately in topicResources and topic.resources. Cards show only a provider, title, description, type/free label and bookmark. All resources lack explicit timing, prerequisites, selected reading sections, objectives, exercises, completion criteria and next-step guidance.",
  "",
  "## Every existing resource",
  "",
  "| ID | Title | Current URL | Phase tags | Actual topic IDs | Classification | Required upgrade |",
  "| --- | --- | --- | --- | --- | --- | --- |",
  ...baseline.resources.map(
    (r) =>
      `| ${r.id} | ${r.title} | ${r.url} | ${r.phases.map((n) => String(n).padStart(2, "0")).join(", ")} | ${r.relatedTopicIds.join(", ")} | Not defined on resource | Add verified learning moments; preserve identity and relationships |`,
  ),
  "",
  "## Current phase and topic identities",
  "",
  ...baseline.phases.flatMap((p) => [
    `### Phase ${String(p.number).padStart(2, "0")} — ${p.title}`,
    "",
    ...p.topics.map((t) => `- ${t.id} — ${t.title} (${t.priority})`),
    "",
  ]),
  "## Technology classifications",
  "",
  "| ID | Technology | Priority |",
  "| --- | --- | --- |",
  ...technologies.map((t) => `| ${t.id} | ${t.name} | ${t.priority} |`),
  "",
  "## Findings and intended changes",
  "",
  "- GitHub Actions and Celery are core; Terraform is optional; Kubernetes and vLLM/TGI/Triton are advanced. Preserve every existing classification.",
  "- MLflow currently appears only in Phase 10; add its first experiment-tracking moment in Phase 04 without duplicating its record.",
  "- The Builders Library supports AI Backend Reliability in Phase 07, not Phase 10; Observability is 10.8. Use actual topic IDs.",
  "- Go/Java/C++ topic links exist in actual generated topics even though they are absent from topicResources. Retain all three optional language topics.",
  "- vLLM is currently related to Scalable AI Systems in Phase 09; retain that relationship as a return-later reference rather than an early prerequisite.",
  "- Prompt/context coverage includes context windows and tool output but not systematic instruction hierarchy, few-shot design, prompt versioning or regression testing. Add one 22-lesson topic with new IDs after 6.4, preserving relative order and identity of all old topics.",
  "- Add nine catalog entries only: Ragas, DeepEval, Promptfoo, CUDA, Ray, Terraform, GitHub Actions, Celery and OpenAI prompt engineering. Existing technology entries are reused.",
  "- Preserve project requirement arrays and their indexed checklist IDs. Add milestone/extension guidance and catalog-derived resource connections only.",
  "- Omit optional resource study-status persistence in this release: it would unnecessarily change the coupled authenticated snapshot/RPC contract. Resource bookmarks already support returning later. No database migration is required.",
];
writeFileSync("docs/resource-upgrade-audit.md", lines.join("\n") + "\n");
