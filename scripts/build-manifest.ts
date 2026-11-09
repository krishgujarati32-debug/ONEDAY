import { writeFileSync } from "node:fs";
import {
  phases,
  topics,
  subtopics,
  v5TopicRedirects,
} from "../src/data/curriculum";
import {
  archivedTopics,
  excludedLessons,
  phaseForGroup,
  reviewedRetirements,
} from "../src/data/course-sequence";
import {
  legacyProjectBySlug,
  projectSuccessors,
} from "../src/data/curriculum-legacy-links";
import { projects, projectBySlug } from "../src/data/projects";
import { resources } from "../src/data/resources";
import legacy from "../src/data/legacy-index.json";
import legacyIds from "../src/data/legacy-ids.json";
import v5Baseline from "../src/data/v5-baseline.json";

export function buildManifest() {
  const index = phases.map(({ topics, ...phase }) => ({
    ...phase,
    topics: topics.map((topic) => ({
      id: topic.id,
      slug: topic.slug,
      title: topic.title,
      phase: topic.phase,
      priority: topic.priority,
      difficulty: topic.difficulty,
      hours: topic.hours,
      prerequisites: topic.prerequisites,
      description: topic.explanation,
      resources: topic.resources,
      subtopics: topic.subtopics.map(({ id, title, priority, minutes }) => ({
        id,
        title,
        priority,
        minutes,
      })),
    })),
  }));
  const ids = {
    topics: topics.map((topic) => topic.id),
    topicEvidence: Object.fromEntries(
      topics
        .filter((topic) => topic.depth)
        .map((topic) => [topic.id, "evidence:" + topic.id]),
    ),
    subtopics: subtopics.map((lesson) => lesson.id),
    projects: projects.map((project) => ({
      id: project.id,
      count: project.requirements.length,
    })),
    resources: resources.map((resource) => resource.id),
  };
  const topicIds = new Set(ids.topics);
  const lessonTopics = new Map(
    topics.flatMap((topic) =>
      topic.subtopics.map((lesson) => [lesson.id, topic] as const),
    ),
  );
  const resourceIds = new Set(ids.resources);
  const topicReasons = (id: string) =>
    archivedTopics[id] ??
    "Scope requires manual review. Keep the historical record without new credit.";
  const lessonReasons = (topic: string, id: string) =>
    reviewedRetirements[id] ??
    (excludedLessons.has(id)
      ? "Superseded by the fixed stack or by a new lesson with a broader objective. Historical completion remains on the old ID."
      : topicReasons(topic));
  const migration = {
    from: "5bb24de",
    progressRule:
      "Preserved lesson IDs retain their saved status. Other IDs stay readable and contribute no active credit.",
    phases: Object.fromEntries(
      legacy.map((phase) => {
        const targets = [
          ...new Set(
            phase.topics.flatMap((topic) => {
              const number = phaseForGroup.get(topic.id);
              return number ? [phases[number - 1].id] : [];
            }),
          ),
        ];
        return [
          phase.id,
          {
            disposition: "reorganized",
            targets,
            reason: "Topics are reordered into the single dependency sequence.",
          },
        ];
      }),
    ),
    topics: Object.fromEntries(
      legacyIds.topics.map((id) => [
        id,
        topicIds.has(id)
          ? {
              disposition: "preserved",
              target: id,
              phase: phaseForGroup.get(id),
            }
          : {
              disposition: archivedTopics[id] ? "retired" : "needs_review",
              reason: topicReasons(id),
            },
      ]),
    ),
    lessons: Object.fromEntries(
      legacy.flatMap((phase) =>
        phase.topics.flatMap((topic) =>
          topic.subtopics.map(({ id }) => [
            id,
            lessonTopics.has(id)
              ? {
                  disposition: "preserved",
                  target: id,
                  sourceTopic: topic.id,
                  targetTopic: lessonTopics.get(id)!.id,
                  phase: lessonTopics.get(id)!.phase,
                }
              : {
                  disposition:
                    excludedLessons.has(id) ||
                    reviewedRetirements[id] ||
                    archivedTopics[topic.id]
                      ? "retired"
                      : "needs_review",
                  reason: lessonReasons(topic.id, id),
                },
          ]),
        ),
      ),
    ),
    resources: Object.fromEntries(
      legacyIds.resources.map((id) => [
        id,
        resourceIds.has(id)
          ? { disposition: "preserved", target: id }
          : {
              disposition: "archived",
              reason:
                "The active reference set uses verified sources relevant to the fixed stack.",
            },
      ]),
    ),
    projects: Object.fromEntries(
      legacyIds.projects.map(({ id, count }) => [
        id,
        {
          disposition: projectSuccessors[id] ? "replaced" : "retired",
          successor: projectSuccessors[id] ?? null,
          historicalCheckCount: count,
          transferCompletion: false,
        },
      ]),
    ),
  };
  const v5Migration = {
    redirects: Object.fromEntries([
      ...Object.entries(v5TopicRedirects).map(([from, to]) => [
        "/learn/" + from,
        "/learn/" + to,
      ]),
      ...Object.entries(legacyProjectBySlug).flatMap(([slug, id]) => {
        if (Object.hasOwn(projectBySlug, slug)) return [];
        const successor = projects.find(
          (project) => project.id === (projectSuccessors[id] ?? id),
        );
        return successor
          ? [["/projects/" + slug, "/projects/" + successor.slug]]
          : [];
      }),
    ]),
    phases: Object.fromEntries(
      v5Baseline.phases.map((prior) => [prior.id, prior.id]),
    ),
    topics: Object.fromEntries(
      v5Baseline.phases.flatMap((phase) =>
        phase.topics.map((prior) => {
          const destinations = [
            ...new Set(
              prior.lessons
                .map((id) => lessonTopics.get(id)?.id)
                .filter(Boolean),
            ),
          ];
          return [
            prior.id,
            {
              disposition:
                destinations.length > 1
                  ? "split"
                  : topicIds.has(prior.id)
                    ? "preserved"
                    : destinations.length
                      ? "consolidated"
                      : "retired",
              retainedId: topicIds.has(prior.id),
              destinations,
            },
          ];
        }),
      ),
    ),
    lessons: Object.fromEntries(
      v5Baseline.phases.flatMap((phase) =>
        phase.topics.flatMap((prior) =>
          prior.lessons.map((id) => [
            id,
            {
              disposition: lessonTopics.has(id) ? "preserved" : "archived",
              targetTopic: lessonTopics.get(id)?.id ?? null,
              sourceTopic: prior.id,
            },
          ]),
        ),
      ),
    ),
    resources: Object.fromEntries(
      v5Baseline.resources.map((id) => [
        id,
        resourceIds.has(id) ? "preserved" : "archived",
      ]),
    ),
    projects: Object.fromEntries(
      v5Baseline.projects.map(({ id, count }) => [
        id,
        {
          disposition: ids.projects.some((project) => project.id === id)
            ? "preserved"
            : "archived",
          successor: projectSuccessors[id] ?? null,
          transferCompletion: false,
          historicalCheckCount: count,
        },
      ]),
    ),
  };
  return { index, ids, migration, v5Migration };
}

if (process.argv[1]?.endsWith("build-manifest.ts")) {
  const { index, ids, migration, v5Migration } = buildManifest();
  for (const [path, data] of [
    ["src/data/index.json", index],
    ["src/data/ids.json", ids],
    ["src/data/curriculum-migration-map.json", migration],
    ["src/data/v5-migration-map.json", v5Migration],
  ] as const)
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
  console.log(
    "Generated curriculum index, active IDs and old-to-new migration map.",
  );
}
