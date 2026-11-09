import index from "@/data/index.json";
import ids from "@/data/ids.json";
import type { LearningState } from "./state";
export const phaseIndex = index;
export const topicIndex = index.flatMap((p) => p.topics);
export const subtopicIndex = topicIndex.flatMap((t) => t.subtopics);
export type TrackItem = { id: string; priority?: string };
export function progress(items: TrackItem[], state: LearningState) {
  const completed = items.filter(
    (s) => state.progress[s.id]?.status === "completed",
  ).length;
  const inProgress = items.filter(
    (s) => state.progress[s.id]?.status === "in_progress",
  ).length;
  const revision = items.filter(
    (s) => state.progress[s.id]?.status === "needs_revision",
  ).length;
  return {
    total: items.length,
    completed,
    inProgress,
    revision,
    remaining: items.length - completed,
    percent: items.length ? (completed / items.length) * 100 : 0,
  };
}
export function topicEvidenceId(id: string): string | undefined {
  return (ids.topicEvidence as Record<string, string>)[id];
}
export function topicStatus(
  items: TrackItem[],
  state: LearningState,
  topicId?: string,
) {
  const p = progress(items, state);
  const evidence = topicId ? topicEvidenceId(topicId) : undefined;
  return p.completed === p.total &&
    p.total > 0 &&
    (!evidence || state.progress[evidence]?.status === "completed")
    ? "completed"
    : p.revision
      ? "needs_revision"
      : p.inProgress || p.completed
        ? "in_progress"
        : "not_started";
}
export const orderedLessons = phaseIndex.flatMap((phase) =>
  phase.topics.flatMap((topic, topicIndex) =>
    topic.subtopics.map((lesson, lessonIndex) => ({
      lesson,
      topic,
      phase,
      number: [phase.number, topicIndex + 1, lessonIndex + 1]
        .map((part) => String(part).padStart(2, "0"))
        .join("."),
      href: "/learn/" + topic.slug + "#" + lesson.id,
    })),
  ),
);
const positions = new Map(
  orderedLessons.map((item, index) => [item.lesson.id, index]),
);

export function lessonNeighbors(id: string) {
  const index = positions.get(id);
  return index === undefined
    ? null
    : {
        current: orderedLessons[index],
        previous: orderedLessons[index - 1],
        next: orderedLessons[index + 1],
      };
}
export function nextLesson(state: LearningState, sequence = orderedLessons) {
  return (
    sequence.find(
      ({ lesson }) => state.progress[lesson.id]?.status !== "completed",
    ) ?? null
  );
}
export function nextLearningStep(state: LearningState) {
  for (const [i, current] of orderedLessons.entries()) {
    if (state.progress[current.lesson.id]?.status !== "completed")
      return { ...current, kind: "lesson" as const };
    if (current.topic.id === orderedLessons[i + 1]?.topic.id) continue;
    const evidence = topicEvidenceId(current.topic.id);
    if (evidence && state.progress[evidence]?.status !== "completed") {
      return {
        ...current,
        kind: "practice" as const,
        href: "/learn/" + current.topic.slug + "#assignment",
      };
    }
  }
  return null;
}
export function recommend(state: LearningState) {
  return nextLesson(state)?.topic ?? null;
}
export function continueTopic(state: LearningState) {
  return recommend(state);
}
export function formatPercent(n: number) {
  return `${Number(n.toFixed(1))}%`;
}
export function weeklyActivity(state: LearningState, now = new Date()) {
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  day.setDate(day.getDate() - ((day.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(day);
    d.setDate(d.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    return {
      date: key,
      label: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
      minutes: state.sessions
        .filter((s) => s.date === key)
        .reduce((n, s) => n + s.minutes, 0),
      completed: Object.values(state.progress).filter(
        (s) =>
          s.completedAt &&
          new Date(s.completedAt).toLocaleDateString("en-CA") ===
            d.toLocaleDateString("en-CA"),
      ).length,
    };
  });
}
