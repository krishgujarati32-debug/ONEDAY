import index from "@/data/index.json";
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
export function topicStatus(items: TrackItem[], state: LearningState) {
  const p = progress(items, state);
  return p.completed === p.total && p.total > 0
    ? "completed"
    : p.revision
      ? "needs_revision"
      : p.inProgress || p.completed
        ? "in_progress"
        : "not_started";
}
export function recommend(state: LearningState) {
  return (
    topicIndex.find((t) =>
      t.subtopics.some(
        (s) =>
          s.priority === "core" && state.progress[s.id]?.status !== "completed",
      ),
    ) ??
    topicIndex.find((t) => progress(t.subtopics, state).remaining > 0) ??
    null
  );
}
export function continueTopic(state: LearningState) {
  return (
    topicIndex.find(
      (t) =>
        t.id === state.lastTopic && progress(t.subtopics, state).remaining > 0,
    ) ?? recommend(state)
  );
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
