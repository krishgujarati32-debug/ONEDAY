import type { Topic } from "@/lib/types";
import required from "./v5-targets.json";

export const depthLabels = {
  L1: "Conceptual Awareness",
  L2: "Foundation",
  L3: "Job-Ready Practical Implementation",
  L4: "Professional Practice",
  L5: "Advanced Production",
} as const;

export type TargetDepth = keyof typeof depthLabels;

export type TopicDepth = {
  targetDepth: TargetDepth;
  targetDepthLabel: string;
  whatToLearn: readonly string[];
  howDeepToLearn: string;
  whatTheLearnerMustBeAbleToDo: string;
  practiceEvidence: string;
  completionCriteria: readonly string[];
  outOfScopeAtThisLevel: string;
  estimatedStudyHours: readonly [number, number];
};

export type DepthRow = readonly [
  id: string,
  include: readonly string[],
  concepts: readonly string[],
  skill: string,
  boundary: string,
  practice: string,
  check: string,
  extraMinutes: readonly [number, number],
  workedExample?: string,
];

export const v5Requirements = required;

export function materializeDepthBatch(
  phase: number,
  rows: readonly DepthRow[],
  current: readonly Topic[],
): Topic[] {
  const expected = required.find((item) => item.phase === phase)?.topics;
  if (!expected || expected.length !== rows.length)
    throw new Error(
      "V5 batch has the wrong number of topics for Phase " + phase,
    );
  const sourceTopics = new Map(current.map((topic) => [topic.id, topic]));
  const sourceLessons = new Map(
    current.flatMap((topic) =>
      topic.subtopics.map((lesson) => [lesson.id, lesson] as const),
    ),
  );
  const detached = new Set(
    rows.flatMap(([, include]) =>
      include.filter((id) => sourceLessons.has(id)),
    ),
  );
  return rows.map(
    (
      [
        id,
        include,
        concepts,
        skill,
        boundary,
        practice,
        check,
        extraMinutes,
        example,
      ],
      index,
    ): Topic => {
      const [, rawTitle, rawLevel] = expected[index];
      const title = String(rawTitle);
      const targetDepth = rawLevel as TargetDepth;
      const currentTopic = sourceTopics.get(id);
      const subtopics = include.flatMap((source) => {
        const lesson = sourceLessons.get(source);
        if (lesson) return [lesson];
        const topic = sourceTopics.get(source);
        if (!topic)
          throw new Error("Unknown source in V5 topic " + id + ": " + source);
        return topic.subtopics.filter((item) => !detached.has(item.id));
      });
      if (example) {
        subtopics.push({
          id: id + "-study",
          title,
          explanation: example,
          why: skill,
          study: [...concepts],
          application: example,
          workedExample: example,
          exercise: practice,
          criteria: [skill, check],
          minutes: Math.max(10, Math.round(extraMinutes[0] / 2)),
          priority: "core",
          resources: [],
        });
      }
      if (!subtopics.length)
        throw new Error("V5 topic has no authored lessons: " + id);
      const worked = subtopics.find((lesson) => lesson.workedExample);
      const minutes = subtopics.reduce(
        (total, lesson) => total + lesson.minutes,
        0,
      );
      const depth: TopicDepth = {
        targetDepth,
        targetDepthLabel: depthLabels[targetDepth],
        whatToLearn: concepts,
        howDeepToLearn: skill + " " + boundary,
        whatTheLearnerMustBeAbleToDo: skill,
        outOfScopeAtThisLevel: boundary,
        practiceEvidence: practice,
        completionCriteria: [check],
        estimatedStudyHours: extraMinutes.map(
          (extra) => Math.ceil((minutes + extra) / 6) / 10,
        ) as [number, number],
      };
      return {
        id,
        slug: currentTopic?.slug ?? id,
        title,
        phase,
        explanation:
          example ?? currentTopic?.explanation ?? worked?.explanation ?? skill,
        why: skill,
        application:
          example ??
          currentTopic?.application ??
          worked?.application ??
          practice,
        assignment: practice,
        outcomes: [skill, check],
        prerequisites: [],
        difficulty: "beginner",
        priority: "core",
        subtopics,
        hours: minutes / 60,
        resources: [],
        guidance: [],
        depth,
      };
    },
  );
}
