import assert from "node:assert/strict";
import { test } from "node:test";
import {
  emptyState,
  mergeStates,
  parseImport,
  preservePlanner,
  stateSchema,
  type LearningState,
} from "../src/lib/state";

const planner = {
  version: 1 as const,
  custom: { record: { title: "Planner task", tags: ["exam"] } },
  unknownFromPlannerBuild: ["keep me", { notes: "नोट" }],
};

test("planner-bearing version 1 snapshots retain the archive and related historical IDs", () => {
  const snapshot: LearningState = {
    ...emptyState(),
    planner,
    progress: {
      "0.1.1": { status: "completed", completedAt: "2026-11-06T10:15:00.000Z" },
      "0.1.2": { status: "in_progress", completedAt: null },
    },
    notes: { "topic:0.1": "study notes" },
    bookmarks: ["resource:mcp-developers"],
    projectChecks: { "project-1.0": true },
    sessions: [
      {
        id: "b66ced90-bada-478f-b96a-b13c69a91d40",
        topicId: "planner:personal",
        minutes: 15,
        date: "2026-11-06",
        notes: "personal study",
      },
    ],
  };
  const imported = parseImport(
    JSON.stringify({
      version: 1,
      exportedAt: "2026-11-06T11:00:00.000Z",
      data: snapshot,
    }),
  );
  assert.deepEqual(imported, snapshot);
  assert.deepEqual(preservePlanner(imported, emptyState()).planner, planner);
  assert.equal(
    preservePlanner(imported, { ...emptyState(), planner: null }).planner,
    null,
  );
  assert.deepEqual(
    mergeStates(imported, { ...emptyState(), planner: null }).planner,
    planner,
  );
  const reordered = {
    unknownFromPlannerBuild: planner.unknownFromPlannerBuild,
    custom: planner.custom,
    version: 1 as const,
  };
  assert.deepEqual(
    mergeStates(imported, { ...emptyState(), planner: reordered }).planner,
    planner,
  );
  assert.throws(
    () =>
      mergeStates(imported, {
        ...emptyState(),
        planner: { version: 1, custom: {} },
      }),
    /different planner snapshots/,
  );
  assert.deepEqual(stateSchema.parse(emptyState()), emptyState());
});

test("malformed or unknown archives and other unknown state fields still fail validation", () => {
  let tooDeep: unknown = "leaf";
  for (let i = 0; i < 40; i++) tooDeep = { child: tooDeep };
  for (const invalid of [
    { planner: [] },
    { planner: "plan" },
    { planner: { version: 2 } },
    { planner: { version: 1, invalid: () => "not JSON" } },
    { planner: { version: 1, tooDeep } },
    { planner: { version: 1, large: "x".repeat(3_000_000) } },
    { unknownRoot: true },
  ])
    assert.equal(
      stateSchema.safeParse({ ...emptyState(), ...invalid }).success,
      false,
    );
  assert.equal(
    stateSchema.safeParse({ ...emptyState(), planner: null }).success,
    true,
  );
});
