import index from "@/data/index.json";
import type { Resource, ResourceLearningMoment, ResourceStage } from "./types";
export const resourceContentTypes: Record<Resource["contentType"], string> = {
  course: "Course",
  documentation: "Official documentation",
  book: "Free book",
  tutorial: "Official tutorial",
  articles: "Engineering articles",
  legal_reference: "Official legal reference",
};
export const resourceTopics = index.flatMap((p) => p.topics);
export const resourceTopicById = Object.fromEntries(
  resourceTopics.map((t) => [t.id, t]),
);
const topicPosition = Object.fromEntries(
  resourceTopics.map((t, i) => [t.id, i]),
);
export const resourcePhase = (n: number) => index.find((p) => p.number === n)!;
export const phaseNumber = (n: number) => String(n).padStart(2, "0");
export const resourceStages: Record<ResourceStage, string> = {
  start_here: "Start here",
  during_topic: "During topic",
  after_topic: "After topic",
  project: "Project resource",
  later_reference: "Later reference",
};
export function stageLabel(resource: Resource, m: ResourceLearningMoment) {
  if (m.advanced || resource.priority === "advanced")
    return "ADVANCED — RETURN LATER";
  return {
    start_here: "START HERE",
    during_topic: "LEARN DURING THIS TOPIC",
    after_topic: "READ AFTER COMPLETING THIS TOPIC",
    project: "USE DURING PROJECT",
    later_reference: "OPTIONAL REFERENCE",
  }[m.stageType];
}
export function resourceSearchText(r: Resource) {
  return [
    r.title,
    r.provider,
    r.description,
    r.category,
    resourceContentTypes[r.contentType],
    r.priority,
    r.usageNotes,
    ...r.relatedTopicIds.map((id) => resourceTopicById[id]?.title ?? id),
    ...r.learningMoments.flatMap((m) => [
      resourcePhase(m.phaseNumber).shortTitle,
      `Phase ${phaseNumber(m.phaseNumber)}`,
      resourceTopicById[m.topicId]?.title,
      m.startWhen,
      m.recommendedTiming,
      m.whyAtThisStage,
      m.practicalTask,
      m.nextStep,
      ...m.prerequisiteTopicIds.map((id) => resourceTopicById[id]?.title ?? id),
      ...m.focusSections,
      ...m.learningObjectives,
      ...m.completionCriteria,
    ]),
  ].join(" ");
}
export type ResourceFilters = {
  query?: string;
  categoryIds?: string[];
  phase?: string;
  priority?: string;
  timing?: string;
};
export type ResourceMatch = {
  resource: Resource;
  moments: ResourceLearningMoment[];
};
export function filterResources(
  catalog: Resource[],
  f: ResourceFilters = {},
): ResourceMatch[] {
  const words = (f.query ?? "")
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  return catalog
    .flatMap((resource) => {
      if (f.categoryIds && !f.categoryIds.includes(resource.id)) return [];
      if (
        f.priority &&
        f.priority !== "all" &&
        resource.priority !== f.priority
      )
        return [];
      if (
        !words.every((w) =>
          resourceSearchText(resource).toLowerCase().includes(w),
        )
      )
        return [];
      // Phase and timing must describe the same visit, rather than two unrelated visits.
      const moments = resource.learningMoments.filter(
        (m) =>
          (!f.phase ||
            f.phase === "all" ||
            m.phaseNumber === Number(f.phase)) &&
          (!f.timing || f.timing === "all" || m.stageType === f.timing),
      );
      return moments.length ? [{ resource, moments }] : [];
    })
    .sort(
      (a, b) =>
        a.moments[0].sequenceOrder - b.moments[0].sequenceOrder ||
        a.resource.title.localeCompare(b.resource.title),
    );
}
export function groupResourceMoments(matches: ResourceMatch[]) {
  return index.map((phase) => ({
    phase,
    entries: matches
      .flatMap(({ resource, moments }) => {
        const scoped = moments.filter((m) => m.phaseNumber === phase.number);
        return scoped.length ? [{ resource, moments: scoped }] : [];
      })
      .sort((a, b) => a.moments[0].sequenceOrder - b.moments[0].sequenceOrder),
  }));
}
export function topicResourceGroups(catalog: Resource[], topicId: string) {
  const groups: Record<string, ResourceMatch[]> = {};
  for (const resource of catalog.filter((r) =>
    r.relatedTopicIds.includes(topicId),
  )) {
    const exact = resource.learningMoments.filter((m) => m.topicId === topicId);
    const currentPosition = topicPosition[topicId];
    const upcoming = resource.learningMoments.find(
      (m) => topicPosition[m.topicId] >= currentPosition,
    );
    const moments = exact.length
      ? exact
      : [upcoming ?? resource.learningMoments.at(-1)!];
    const m = moments[0];
    const deferred = !exact.length
      ? Boolean(upcoming)
      : moments.every((m) =>
          m.prerequisiteTopicIds.some(
            (id) => topicPosition[id] > currentPosition,
          ),
        );
    const group = deferred
      ? "Read later"
      : m.security
        ? "Security testing"
        : m.advanced || resource.priority === "advanced"
          ? "Advanced resources"
          : m.stageType === "after_topic"
            ? "After this topic"
            : m.stageType === "project"
              ? "After first cloud deployment"
              : !exact.length ||
                  moments.every((m) => m.stageType === "later_reference")
                ? "Reference for this topic"
                : "Learn now";
    (groups[group] ??= []).push({ resource, moments });
  }
  return Object.entries(groups).sort(
    ([a], [b]) =>
      [
        "Learn now",
        "After this topic",
        "Security testing",
        "After first cloud deployment",
        "Advanced resources",
        "Reference for this topic",
        "Read later",
      ].indexOf(a) -
      [
        "Learn now",
        "After this topic",
        "Security testing",
        "After first cloud deployment",
        "Advanced resources",
        "Reference for this topic",
        "Read later",
      ].indexOf(b),
  );
}
