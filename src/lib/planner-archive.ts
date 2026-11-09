import { z } from "zod";

const archiveShape = z.object({ version: z.literal(1) }).catchall(z.json());
const maxBytes = 3_000_000;
const maxDepth = 32;

// The current curriculum does not interpret planner data. Validate its version and
// JSON limits, then retain the original snapshot, including fields added by that build.
export const plannerArchiveSchema = z.custom<z.infer<typeof archiveShape>>(
  (value) => {
    try {
      const json = JSON.stringify(value);
      if (!json || new TextEncoder().encode(json).length > maxBytes)
        return false;
    } catch {
      return false;
    }

    const pending = [{ value, depth: 0 }];
    while (pending.length) {
      const { value, depth } = pending.pop()!;
      if (value === null || typeof value !== "object") continue;
      if (depth >= maxDepth) return false;
      for (const child of Object.values(value)) {
        pending.push({ value: child, depth: depth + 1 });
      }
    }
    return archiveShape.safeParse(value).success;
  },
  "Expected a version 1 planner snapshot within the supported JSON size and depth.",
);

export const personalSessionTopic = "planner:personal";
export const archivedPlannerResources = [
  "backend-first-principles",
  "mcp-developers",
  "mcp-integrations",
  "strapi-ai-saas",
];

export function samePlannerArchive(
  first: z.infer<typeof archiveShape>,
  second: z.infer<typeof archiveShape>,
) {
  const ordered = (value: z.infer<typeof archiveShape>) =>
    JSON.stringify(value, (_, entry) =>
      entry && typeof entry === "object" && !Array.isArray(entry)
        ? Object.fromEntries(
            Object.keys(entry)
              .sort()
              .map((key) => [key, entry[key]]),
          )
        : entry,
    );
  return ordered(first) === ordered(second);
}
