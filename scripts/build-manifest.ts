import { writeFileSync } from "node:fs";
import { phases } from "../src/data/curriculum";
import { projects } from "../src/data/projects";
import { resources } from "../src/data/resources";
const index = phases.map(({ topics, ...p }) => ({
  ...p,
  topics: topics.map((t) => ({
    id: t.id,
    slug: t.slug,
    title: t.title,
    phase: t.phase,
    priority: t.priority,
    difficulty: t.difficulty,
    hours: t.hours,
    prerequisites: t.prerequisites,
    description: t.explanation,
    resources: t.resources,
    subtopics: t.subtopics.map(({ id, title, priority, minutes }) => ({
      id,
      title,
      priority,
      minutes,
    })),
  })),
}));
writeFileSync("src/data/index.json", JSON.stringify(index, null, 2) + "\n");
writeFileSync(
  "src/data/ids.json",
  JSON.stringify(
    {
      topics: phases.flatMap((p) => p.topics.map((t) => t.id)),
      subtopics: phases.flatMap((p) =>
        p.topics.flatMap((t) => t.subtopics.map((s) => s.id)),
      ),
      projects: projects.map((p) => ({
        id: p.id,
        count: p.requirements.length,
      })),
      resources: resources.map((r) => r.id),
    },
    null,
    2,
  ) + "\n",
);
console.log("Generated lean curriculum index.");
