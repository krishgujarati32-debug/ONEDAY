export type Priority = "core" | "optional" | "advanced";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Status =
  "not_started" | "in_progress" | "completed" | "needs_revision";
export type ResourceStage =
  "start_here" | "during_topic" | "after_topic" | "project" | "later_reference";
export type ResourceLearningMoment = {
  id: string;
  phaseId: string;
  phaseNumber: number;
  topicId: string;
  stageType: ResourceStage;
  sequenceOrder: number;
  isPrimaryMoment: boolean;
  recommendedTiming: string;
  startWhen: string;
  prerequisiteTopicIds: string[];
  previousLessonIds: string[];
  focusSections: string[];
  learningObjectives: string[];
  whyAtThisStage: string;
  practicalTask: string;
  completionCriteria: string[];
  nextStep: string;
  nextTopicId?: string;
  projectIds: string[];
  advanced?: boolean;
  security?: boolean;
  estimatedMinutes: number;
};
export type Resource = {
  id: string;
  title: string;
  provider: string;
  category: string;
  description: string;
  url: string;
  type: "official_docs" | "course";
  contentType:
    | "course"
    | "documentation"
    | "book"
    | "tutorial"
    | "articles"
    | "legal_reference";
  free: boolean;
  phases: number[];
  priority: Priority;
  relatedTopicIds: string[];
  learningMoments: ResourceLearningMoment[];
  verificationStatus: "verified" | "needs_review";
  verifiedAt?: string;
  verificationNotes: string;
  usageNotes: string;
  supplementalUrls: { title: string; url: string }[];
};
export type Subtopic = {
  targetDepth?: import("@/data/course-v5-types").TargetDepth;
  contributesToJobReadyCheckpoint?: boolean;
  workedExample?: string;
  id: string;
  title: string;
  explanation: string;
  why: string;
  study: string[];
  application: string;
  exercise: string;
  criteria: string[];
  minutes: number;
  priority: Priority;
  resources: string[];
};
export type Topic = {
  depth?: import("@/data/course-v5-types").TopicDepth;
  id: string;
  slug: string;
  title: string;
  phase: number;
  explanation: string;
  why: string;
  application: string;
  assignment: string;
  outcomes: string[];
  prerequisites: string[];
  difficulty: Difficulty;
  priority: Priority;
  subtopics: Subtopic[];
  hours: number;
  resources: string[];
  guidance: string[];
};
export type Phase = {
  id: string;
  slug: string;
  number: number;
  title: string;
  shortTitle: string;
  purpose: string;
  why: string;
  weeks: string;
  difficulty: Difficulty;
  priority: Priority;
  prerequisites: string[];
  outcomes: string[];
  topics: Topic[];
  color: string;
};
export type Project = {
  targetDepth?: import("@/data/course-v5-types").TargetDepth;
  prerequisiteLessons?: string[];
  architecture?: string;
  folderStructure?: string;
  checks?: string[];
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  purpose: string;
  difficulty: Difficulty;
  phases: number[];
  technologies: string[];
  requirements: string[];
  milestones: string[];
  extensions: string[];
  deployment: string;
  result: string;
};
export type Technology = {
  id: string;
  name: string;
  category: string;
  description: string;
  why: string;
  phase: number;
  priority: Priority;
  topicIds: string[];
};
