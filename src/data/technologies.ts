import { phaseByNumber, topicById } from "./curriculum";
import type { TechnologyCategory } from "./technology-card-types";
import { foundationCategories } from "./technology-foundations";
import { modelCategories } from "./technology-models";
import { serviceCategories } from "./technology-services";
import { operationCategories } from "./technology-operations";
import { releases } from "./technology-releases";

const categories: readonly TechnologyCategory[] = [
  ...foundationCategories,
  ...modelCategories,
  ...serviceCategories,
  ...operationCategories,
];

function learningLink(id: string) {
  const topic = topicById[id];
  const lesson =
    topic?.subtopics.find((item) => item.workedExample) ?? topic?.subtopics[0];
  const phase = topic && phaseByNumber[topic.phase];
  if (!topic || !lesson || !phase) {
    throw new Error("Technology catalog has an invalid learning topic: " + id);
  }
  return {
    phaseId: phase.id,
    phaseNumber: phase.number,
    phaseTitle: phase.title,
    phaseHref: "/roadmap/" + phase.slug,
    topicId: topic.id,
    topicTitle: topic.title,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    href: "/learn/" + topic.slug + "#" + lesson.id,
  };
}

function monogram(name: string) {
  return name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export const technologyGroups = categories.map(([categoryId, label, rows]) => ({
  id: categoryId,
  label,
  cards: rows.map(
    (
      [
        id,
        name,
        status,
        depthLevel,
        topic,
        prerequisite,
        description,
        purpose,
        requiredDepth,
        firstTask,
        officialUrl,
        options,
      ],
      index,
    ) => ({
      id,
      name,
      categoryId,
      sequence: index + 1,
      status,
      depthLevel,
      description,
      purpose,
      requiredDepth,
      firstTask,
      officialUrl,
      release: releases[id],
      iconKey: monogram(name),
      start: learningLink(topic),
      prerequisites: prerequisite ? [learningLink(prerequisite)] : [],
      revisit: (options?.revisit ?? []).map(learningLink),
      practice: options?.practice ?? false,
      related: options?.related ?? [],
      names: options?.names ?? [],
      anchors: options?.anchors ?? [],
      supportingUrl: options?.supportingUrl,
      compatibility: options?.compatibility,
    }),
  ),
}));

export const technologies = technologyGroups.flatMap(
  (category) => category.cards,
);
export type StackTechnology = (typeof technologies)[number];
export const technologyByName = new Map(
  technologies.flatMap((card) =>
    [card.name, ...card.names].map((name) => [name, card] as const),
  ),
);
