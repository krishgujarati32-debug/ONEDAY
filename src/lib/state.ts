import { z } from "zod";
import ids from "@/data/ids.json";
const topicIds = new Set(ids.topics),
  subtopicIds = new Set(ids.subtopics);
const noteIds = new Set([
  ...ids.topics.map((x) => "topic:" + x),
  ...ids.subtopics.map((x) => "subtopic:" + x),
  ...ids.projects.map((x) => "project:" + x.id),
]);
const bookmarkIds = new Set([
  ...noteIds,
  ...ids.resources.map((x) => "resource:" + x),
]);
const checkIds = new Set(
  ids.projects.flatMap((p) =>
    Array.from({ length: p.count }, (_, i) => `${p.id}.${i}`),
  ),
);
const progressEntry = z
  .object({
    status: z.enum([
      "not_started",
      "in_progress",
      "completed",
      "needs_revision",
    ]),
    completedAt: z.string().datetime().nullable(),
  })
  .strict()
  .refine(
    (x) => (x.status === "completed") === (x.completedAt !== null),
    "Completion date must match completed status",
  );
export const stateSchema = z
  .object({
    progress: z.record(z.string(), progressEntry),
    notes: z.record(z.string(), z.string().max(30000)),
    bookmarks: z.array(z.string()).max(5000),
    projectChecks: z.record(z.string(), z.boolean()),
    sessions: z
      .array(
        z
          .object({
            id: z.string().uuid(),
            topicId: z.string().refine((x) => topicIds.has(x)),
            minutes: z.number().int().min(1).max(1440),
            date: z.iso.date(),
            notes: z.string().max(2000),
          })
          .strict(),
      )
      .max(20000),
    settings: z
      .object({
        name: z.string().max(80),
        dailyGoal: z.number().int().min(15).max(480),
        theme: z.enum(["light", "dark", "system"]),
        language: z.enum(["english", "hinglish"]),
      })
      .strict(),
    lastTopic: z
      .string()
      .nullable()
      .refine((x) => x === null || topicIds.has(x)),
  })
  .strict()
  .superRefine((x, ctx) => {
    for (const k of Object.keys(x.progress))
      if (!subtopicIds.has(k))
        ctx.addIssue({ code: "custom", message: "Unknown subtopic: " + k });
    for (const k of Object.keys(x.notes))
      if (!noteIds.has(k))
        ctx.addIssue({ code: "custom", message: "Unknown note target: " + k });
    for (const k of x.bookmarks)
      if (!bookmarkIds.has(k))
        ctx.addIssue({ code: "custom", message: "Unknown bookmark: " + k });
    for (const k of Object.keys(x.projectChecks))
      if (!checkIds.has(k))
        ctx.addIssue({
          code: "custom",
          message: "Unknown project checklist: " + k,
        });
    if (new Set(x.bookmarks).size !== x.bookmarks.length)
      ctx.addIssue({ code: "custom", message: "Duplicate bookmarks" });
    if (new Set(x.sessions.map((s) => s.id)).size !== x.sessions.length)
      ctx.addIssue({ code: "custom", message: "Duplicate study session IDs" });
    if (Object.keys(x.notes).length > 10000)
      ctx.addIssue({ code: "custom", message: "Too many notes" });
  });
export type LearningState = z.infer<typeof stateSchema>;
export const emptyState = (): LearningState => ({
  progress: {},
  notes: {},
  bookmarks: [],
  projectChecks: {},
  sessions: [],
  settings: { name: "", dailyGoal: 60, theme: "system", language: "english" },
  lastTopic: null,
});
export const exportSchema = z
  .object({
    version: z.literal(1),
    exportedAt: z.string().datetime(),
    data: stateSchema,
  })
  .strict();
export function parseImport(text: string): LearningState {
  if (text.length > 5_000_000)
    throw new Error("Import must be smaller than 5 MB.");
  const parsed = exportSchema.safeParse(JSON.parse(text));
  if (!parsed.success)
    throw new Error(
      "This file is not a valid version 1 learning export. " +
        parsed.error.issues[0]?.message,
    );
  return parsed.data.data;
}
export function mergeStates(
  current: LearningState,
  incoming: LearningState,
): LearningState {
  return stateSchema.parse({
    ...current,
    ...incoming,
    progress: { ...current.progress, ...incoming.progress },
    notes: { ...current.notes, ...incoming.notes },
    projectChecks: { ...current.projectChecks, ...incoming.projectChecks },
    bookmarks: [...new Set([...current.bookmarks, ...incoming.bookmarks])],
    sessions: [
      ...new Map(
        [...current.sessions, ...incoming.sessions].map((s) => [s.id, s]),
      ).values(),
    ],
  });
}
export function dateKey(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
