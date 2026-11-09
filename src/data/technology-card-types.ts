import type { TargetDepth } from "./course-v5-types";

export const technologyStatuses = {
  core: "Core",
  supporting: "Supporting",
  advanced: "Advanced",
} as const;

export type TechnologyStatus = keyof typeof technologyStatuses;

type CardOptions = {
  practice?: boolean;
  revisit?: readonly string[];
  related?: readonly string[];
  names?: readonly string[];
  anchors?: readonly string[];
  supportingUrl?: readonly [label: string, url: string];
  compatibility?: string;
};

type Card = readonly [
  id: string,
  name: string,
  status: TechnologyStatus,
  depth: TargetDepth,
  startTopic: string,
  prerequisiteTopic: string | null,
  summary: string,
  purpose: string,
  requiredDepth: string,
  firstTask: string,
  officialUrl: string,
  options?: CardOptions,
];

export type TechnologyCategory = readonly [
  id: string,
  label: string,
  cards: readonly Card[],
];
