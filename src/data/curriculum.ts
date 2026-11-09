import type { Phase, Subtopic, Topic } from "@/lib/types";
import { topics as previousTopics } from "./legacy-curriculum";
import { resources, resourceById } from "./resources";
import { sequence, excludedLessons } from "./course-sequence";
import { labs, type Lab } from "./course-labs";
import { foundations } from "./course-foundations";
import { pythonTopics } from "./course-python";
import { softwareTopics, databaseTopics } from "./course-software-data";
import { mathTopics, servingTopics } from "./course-math-serving";
import { v5Foundations } from "./course-v5-foundations";
import { v5Python } from "./course-v5-python";
import { v5MachineLearning } from "./course-v5-ml";
import { v5DeepLearning } from "./course-v5-deep-learning";
import { v5LanguageModels } from "./course-v5-nlp";
import { v5Backend } from "./course-v5-backend";
import { v5Systems } from "./course-v5-systems";
import { v5Deployment } from "./course-v5-deployment";
import { v5Production } from "./course-v5-production";
import { v5Ingestion } from "./course-v5-ingestion";
import { v5ProviderIntegration } from "./course-v5-provider";
import { v5Retrieval } from "./course-v5-retrieval";
import { v5Agents, v5Mcp } from "./course-v5-agents";
import { v5AiEvaluation, v5AiSafety } from "./course-v5-ai-evaluation";
import { servingDepth } from "./course-v5-serving";
import {
  refineExistingTopics,
  softwareDepth,
  databaseDepth,
  mathDepth,
} from "./course-v5-refinements";
import {
  depthLabels,
  materializeDepthBatch,
  v5Requirements,
  type DepthRow,
} from "./course-v5-types";
import v5Baseline from "./v5-baseline.json";
import { jobReadyCriteria } from "./job-ready";

const colors = [
  "#7360d9",
  "#4f82cb",
  "#c78c38",
  "#4b9c8c",
  "#9b68b6",
  "#cc6b7b",
  "#587cb9",
  "#60967b",
  "#9a77bd",
  "#c78c51",
  "#5d929a",
  "#746fbc",
];
const phaseId = (number: number) => "track-" + String(number).padStart(2, "0");
const previousById = new Map(previousTopics.map((topic) => [topic.id, topic]));
const validResources = (ids: string[]) => ids.filter((id) => resourceById[id]);

function labLesson(lab: Lab): Subtopic {
  return {
    id: lab.id,
    title: lab.title,
    explanation: lab.explanation,
    why: lab.why,
    application: lab.example,
    study: [
      "Identify these concepts in the worked example: " +
        lab.concepts.join(", ") +
        ".",
      "Predict the outcome before starting the exercise.",
    ],
    exercise: lab.exercise,
    criteria: lab.criteria,
    minutes: lab.minutes,
    priority: "core",
    resources: validResources(lab.resources),
    workedExample: lab.example,
  };
}

const portfolio: Topic = {
  id: "v2-portfolio",
  slug: "ccai-production-capstone",
  title: "CCAI integration and operational evidence",
  phase: 14,
  explanation:
    "Integrate the preceding API, model, retrieval and orchestration work. Prove routing, tenant isolation and recovery with repeatable tests and recorded measurements.",
  why: "A portfolio capstone should expose how the system behaves when its assumptions fail.",
  application:
    "Operate a documented backend that chooses one eligible model, handles a bounded failure and measures the result.",
  assignment:
    "Deliver a repeatable capstone evidence pack with the architecture, a measured workload, tenant isolation tests, one bounded provider failure and a verified rollback.",
  depth: {
    targetDepth: "L5",
    targetDepthLabel: depthLabels.L5,
    whatToLearn: [
      "Policy-based model routing",
      "Cross-service failure recovery",
      "Reproducible capacity evidence",
      "Operational handoff",
    ],
    howDeepToLearn:
      "Integrate a bounded multi-provider backend and show which performance and failure properties you can reproduce.",
    whatTheLearnerMustBeAbleToDo:
      "Explain and reproduce the routing, access-control, load and rollback evidence for the capstone.",
    practiceEvidence:
      "Deliver a repeatable capstone evidence pack with the architecture, a measured workload, tenant isolation tests, one bounded provider failure and a verified rollback.",
    completionCriteria: [
      "An independent reader can replay the tests, find measured limits, reproduce a denied cross-tenant operation and see the service recover to a verified version.",
    ],
    outOfScopeAtThisLevel:
      "Use an owned fixture environment or approved deployment with documented scale, provider and hardware assumptions.",
    estimatedStudyHours: [3, 6],
  },
  outcomes: [
    "Trace a request through the routing policy.",
    "Produce repeatable evidence for failure handling and capacity.",
  ],
  prerequisites: [],
  difficulty: "advanced",
  priority: "core",
  subtopics: [],
  hours: 0,
  resources: [],
  guidance: [],
};

const oldLessons = new Map(
  previousTopics.flatMap((topic) =>
    topic.subtopics.map((lesson) => [lesson.id, lesson] as const),
  ),
);
type TopicBatch = readonly (readonly [
  string,
  string,
  readonly string[],
  string,
  string,
])[];
function materializeTopics(
  specs: TopicBatch,
  phase: number,
  slugPrefix: string,
): Topic[] {
  return specs.map(([id, title, lessonIds, workedExample, exercise]) => {
    const old = previousById.get(id);
    const lessons = lessonIds.map((lessonId) => {
      const lab = labs.find((item) => item.id === lessonId);
      return lab ? labLesson(lab) : oldLessons.get(lessonId)!;
    });
    if (!lessons.some((lesson) => lesson.workedExample)) {
      lessons.push(
        labLesson({
          id: id + "-exercise",
          group: id,
          title: title + " · worked exercise",
          explanation: workedExample,
          why: "The exercise tests whether you can predict the behavior before depending on it in a service.",
          concepts: [title],
          example: workedExample,
          exercise,
          minutes: 25,
          resources: [],
          criteria: [
            "Record the input, expected behavior and actual result or reasoning.",
            "Explain the failure or boundary case requested in the exercise.",
          ],
        }),
      );
    }
    return {
      id,
      title,
      slug: old?.slug ?? id.replace(/^v2-/, slugPrefix),
      phase,
      explanation: workedExample + " " + exercise,
      why: workedExample,
      application: workedExample,
      assignment: exercise,
      outcomes: [
        "Predict the behavior described in the example.",
        "Produce and explain the evidence requested in the assignment.",
      ],
      prerequisites: [],
      difficulty: "beginner",
      priority: "core",
      subtopics: lessons,
      hours: 0,
      resources: [],
      guidance: [],
    };
  });
}
const batches: Partial<Record<number, Topic[]>> = {
  1: materializeTopics(foundations, 1, "foundation-"),
  2: materializeTopics(pythonTopics, 2, "python-"),
  3: materializeTopics(softwareTopics, 3, "software-"),
  4: materializeTopics(databaseTopics, 4, "database-"),
  5: materializeTopics(mathTopics, 5, "math-data-"),
  13: materializeTopics(servingTopics, 13, "serving-"),
};

const authoredDepthBatches: Partial<Record<number, readonly DepthRow[]>> = {
  1: v5Foundations,
  2: v5Python,
  3: refineExistingTopics(batches[3]!, softwareDepth),
  4: refineExistingTopics(batches[4]!, databaseDepth),
  5: refineExistingTopics(batches[5]!, mathDepth),
  6: v5MachineLearning,
  7: v5DeepLearning,
  8: v5LanguageModels,
  9: v5Backend,
  10: [
    ...v5ProviderIntegration,
    ...v5Ingestion,
    ...v5Retrieval,
    ...v5Agents,
    ...v5Mcp,
    ...v5AiEvaluation,
    ...v5AiSafety,
  ],
  11: v5Systems,
  12: [...v5Deployment, ...v5Production],
  13: servingDepth(batches[13]!),
};
export const v5AuthoredPhases = Object.keys(authoredDepthBatches).map(Number);
export const v5IngestionSpan = [16, 29] as const;
export const v5DeploymentSpan = [1, 16] as const;
const checkpointTopics = new Set([
  ...v5Deployment.map(([id]) => id),
  ...jobReadyCriteria.map(({ topicId }) => topicId),
]);

function withPublishedLessons(source: Topic): Topic {
  return {
    ...source,
    subtopics: [
      ...source.subtopics.filter((lesson) => !excludedLessons.has(lesson.id)),
      ...labs.filter((lab) => lab.group === source.id).map(labLesson),
    ],
  };
}

let precedingTopic: Topic | undefined;
export const phases: Phase[] = sequence.map((entry, index) => {
  const number = index + 1;
  const difficulty =
    number <= 5 ? "beginner" : number <= 10 ? "intermediate" : "advanced";
  const existingSources =
    batches[number] ??
    (entry.groups.length
      ? entry.groups.map((id) => previousById.get(id)!)
      : [portfolio]);
  const depthRows = authoredDepthBatches[number];
  const published = batches[number]
    ? existingSources
    : existingSources.map(withPublishedLessons);
  const sources = depthRows
    ? materializeDepthBatch(number, depthRows, published)
    : [...published];
  const topics = sources.map((source): Topic => {
    const topicResources = resources.filter((resource) =>
      resource.relatedTopicIds.includes(source.id),
    );
    const ownedResources = topicResources.map((resource) => resource.id);
    const subtopics: Subtopic[] = source.subtopics
      .filter((lesson) => !excludedLessons.has(lesson.id))
      .map((lesson) => ({
        ...lesson,
        ...(source.depth ? { targetDepth: source.depth.targetDepth } : {}),
        contributesToJobReadyCheckpoint: checkpointTopics.has(source.id),
        priority: "core",
        resources: [
          ...new Set([
            ...(lesson.workedExample ? lesson.resources : []),
            ...topicResources
              .filter((resource) =>
                resource.learningMoments.some(
                  (moment) =>
                    moment.topicId === source.id &&
                    moment.previousLessonIds.includes(lesson.id),
                ),
              )
              .map((resource) => resource.id),
          ]),
        ],
      }));
    const topic: Topic = {
      ...source,
      phase: number,
      difficulty,
      priority: "core",
      prerequisites: precedingTopic ? [precedingTopic.id] : [],
      guidance: [],
      resources: ownedResources,
      subtopics,
      hours:
        subtopics.reduce((total, lesson) => total + lesson.minutes, 0) / 60,
    };
    precedingTopic = topic;
    return topic;
  });
  return {
    id: phaseId(number),
    slug: entry.slug,
    number,
    title:
      v5Requirements.find((phase) => phase.phase === number)?.title ??
      entry.title,
    shortTitle: entry.shortTitle,
    purpose: entry.purpose,
    why: entry.purpose,
    difficulty,
    priority: "core",
    prerequisites: index ? [phaseId(index)] : [],
    outcomes: topics.at(-1)!.outcomes,
    weeks: "Self-paced",
    topics,
    color: colors[index % colors.length],
  };
});
export const topics = phases.flatMap((phase) => phase.topics);
export const subtopics = topics.flatMap((topic) => topic.subtopics);
export const topicBySlug = Object.fromEntries(
  topics.map((topic) => [topic.slug, topic]),
);
export const topicById = Object.fromEntries(
  topics.map((topic) => [topic.id, topic]),
);
const currentTopicByLesson = new Map(
  topics.flatMap((topic) =>
    topic.subtopics.map((lesson) => [lesson.id, topic] as const),
  ),
);
export const v5TopicRedirects = Object.fromEntries(
  v5Baseline.phases.flatMap((phase) =>
    phase.topics.flatMap((prior) => {
      if (Object.hasOwn(topicBySlug, prior.slug)) return [];
      const target = prior.lessons
        .map((id) => currentTopicByLesson.get(id))
        .find(Boolean);
      return target ? [[prior.slug, target.slug] as const] : [];
    }),
  ),
);
export const phaseBySlug = Object.fromEntries(
  phases.map((phase) => [phase.slug, phase]),
);
export const phaseByNumber = Object.fromEntries(
  phases.map((phase) => [phase.number, phase]),
);
export const lessonCounts = {
  phases: phases.length,
  topics: topics.length,
  subtopics: subtopics.length,
  core: subtopics.length,
};
