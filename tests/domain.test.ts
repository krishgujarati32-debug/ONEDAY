import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCurriculum } from "../scripts/validate-curriculum";
import {
  emptyState,
  mergeStates,
  parseImport,
  stateSchema,
} from "../src/lib/state";
import {
  continueTopic,
  formatPercent,
  progress,
  recommend,
  subtopicIndex,
  topicIndex,
  topicStatus,
  weeklyActivity,
} from "../src/lib/progress";
import { safeNextPath } from "../src/lib/slug";
test("all master topics, lesson order, educational content and references are valid", () => {
  const counts = validateCurriculum();
  assert.equal(counts.topics, 83);
  assert.equal(counts.lessons, 1313);
});
test("new learners start at a real zero and the first core topic", () => {
  const state = emptyState();
  assert.equal(progress(subtopicIndex, state).percent, 0);
  assert.equal(recommend(state)?.id, "0.1");
  assert.equal(state.sessions.length, 0);
});
test("progress has the requested fractional precision and revision is not completion", () => {
  const state = emptyState();
  const items = subtopicIndex.slice(0, 8);
  for (const s of items.slice(0, 5))
    state.progress[s.id] = {
      status: "completed",
      completedAt: new Date().toISOString(),
    };
  state.progress[items[5].id] = { status: "needs_revision", completedAt: null };
  const actual = progress(items, state);
  assert.equal(actual.percent, 62.5);
  assert.equal(actual.remaining, 3);
  assert.equal(actual.revision, 1);
  assert.equal(formatPercent(actual.percent), "62.5%");
});
test("optional completion cannot inflate core completion", () => {
  const state = emptyState();
  const optional = subtopicIndex.find((s) => s.priority !== "core")!;
  state.progress[optional.id] = {
    status: "completed",
    completedAt: new Date().toISOString(),
  };
  assert.equal(
    progress(
      subtopicIndex.filter((s) => s.priority === "core"),
      state,
    ).completed,
    0,
  );
  assert.equal(progress(subtopicIndex, state).completed, 1);
});
test("topic completion requires every actual lesson; revision takes precedence", () => {
  const state = emptyState();
  const t = topicIndex[0];
  for (const s of t.subtopics)
    state.progress[s.id] = {
      status: "completed",
      completedAt: new Date().toISOString(),
    };
  assert.equal(topicStatus(t.subtopics, state), "completed");
  assert.notEqual(recommend(state)?.id, t.id);
  state.progress[t.subtopics[0].id] = {
    status: "needs_revision",
    completedAt: null,
  };
  assert.equal(topicStatus(t.subtopics, state), "needs_revision");
});
test("continue resumes an incomplete last topic and skips a completed last topic", () => {
  const state = emptyState();
  const t = topicIndex[2];
  state.lastTopic = t.id;
  assert.equal(continueTopic(state)?.id, t.id);
  for (const s of t.subtopics)
    state.progress[s.id] = {
      status: "completed",
      completedAt: new Date().toISOString(),
    };
  assert.equal(continueTopic(state)?.id, topicIndex[0].id);
});
test("a completed curriculum has no invented next lesson", () => {
  const state = emptyState();
  for (const s of subtopicIndex)
    state.progress[s.id] = {
      status: "completed",
      completedAt: new Date().toISOString(),
    };
  assert.equal(recommend(state), null);
  assert.equal(progress(subtopicIndex, state).percent, 100);
});
test("weekly activity includes only real records in the local Monday-to-Sunday week", () => {
  const state = emptyState();
  state.sessions = [
    {
      id: crypto.randomUUID(),
      topicId: "0.1",
      minutes: 45,
      date: "2026-10-26",
      notes: "",
    },
    {
      id: crypto.randomUUID(),
      topicId: "0.1",
      minutes: 60,
      date: "2026-10-25",
      notes: "",
    },
  ];
  const week = weeklyActivity(state, new Date(2026, 10, 1, 12));
  assert.equal(week[0].date, "2026-10-26");
  assert.equal(week[6].date, "2026-11-01");
  assert.equal(
    week.reduce((n, d) => n + d.minutes, 0),
    45,
  );
});
test("exports round-trip progress, private notes, bookmarks and checklists", () => {
  const state = emptyState();
  state.notes["topic:0.1"] = "A useful note with Unicode: समझना";
  state.bookmarks = ["topic:0.1"];
  state.projectChecks["project-1.0"] = true;
  state.progress["0.1.1"] = {
    status: "completed",
    completedAt: "2026-11-01T05:00:00.000Z",
  };
  const text = JSON.stringify({
    version: 1,
    exportedAt: new Date().toISOString(),
    data: state,
  });
  assert.deepEqual(parseImport(text), state);
});
test("imports reject unknown IDs, malformed values, duplicates and excess privileges", () => {
  const bad = [
    {
      ...emptyState(),
      progress: {
        unknown: { status: "completed", completedAt: new Date().toISOString() },
      },
    },
    { ...emptyState(), settings: { ...emptyState().settings, dailyGoal: -1 } },
    { ...emptyState(), bookmarks: ["topic:0.1", "topic:0.1"] },
    { ...emptyState(), admin: true },
    { ...emptyState(), projectChecks: { "project-1.999": true } },
    {
      ...emptyState(),
      progress: { "0.1.1": { status: "completed", completedAt: null } },
    },
  ];
  for (const state of bad)
    assert.equal(stateSchema.safeParse(state).success, false);
  assert.throws(() => parseImport("{broken"));
  assert.throws(() => parseImport(" ".repeat(5_000_001)));
});
test("confirmed merging deduplicates sessions and preserves unrelated records", () => {
  const a = emptyState(),
    b = emptyState();
  const session = {
    id: crypto.randomUUID(),
    topicId: "0.1",
    minutes: 30,
    date: "2026-11-01",
    notes: "",
  };
  a.sessions = [session];
  b.sessions = [{ ...session, minutes: 45 }];
  a.notes["topic:0.1"] = "older";
  b.notes["topic:0.1"] = "newer";
  a.notes["topic:0.2"] = "keep";
  a.bookmarks = ["topic:0.1"];
  b.bookmarks = ["topic:0.1"];
  const merged = mergeStates(a, b);
  assert.equal(merged.sessions.length, 1);
  assert.equal(merged.sessions[0].minutes, 45);
  assert.equal(merged.notes["topic:0.2"], "keep");
  assert.equal(merged.notes["topic:0.1"], "newer");
  assert.deepEqual(merged.bookmarks, ["topic:0.1"]);
});
test("auth redirects reject external and backslash-based destinations", () => {
  for (const path of [
    "https://evil.example",
    "//evil.example",
    "/\\evil.example",
    "/foo\\bar",
    "/\n/evil.example",
    "/\t/evil.example",
    null,
  ])
    assert.equal(safeNextPath(path), "/dashboard");
  assert.equal(safeNextPath("/settings#study-goal"), "/settings#study-goal");
});
