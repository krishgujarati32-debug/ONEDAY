import { test } from "node:test";
import assert from "node:assert/strict";
import { resources, resourceById } from "../src/data/resources";
import {
  filterResources,
  groupResourceMoments,
  topicResourceGroups,
  resourceSearchText,
  stageLabel,
} from "../src/lib/resource-learning";
import { emptyState, parseImport, stateSchema } from "../src/lib/state";
import { progress, subtopicIndex } from "../src/lib/progress";
import baseline from "../docs/resource-upgrade-baseline.json";
test("phase and timing filters intersect on the same learning moment", () => {
  const mlflow = resourceById.mlflow;
  assert.equal(
    filterResources([mlflow], { phase: "4", timing: "during_topic" }).length,
    0,
  );
  const first = filterResources([mlflow], {
    phase: "4",
    timing: "after_topic",
  });
  assert.equal(first.length, 1);
  assert.ok(
    first[0].moments.every(
      (m) => m.phaseNumber === 4 && m.stageType === "after_topic",
    ),
  );
  assert.equal(
    filterResources([mlflow], { phase: "10", timing: "during_topic" }).length,
    1,
  );
  assert.equal(filterResources([mlflow], { priority: "optional" }).length, 0);
});
test("library deduplicates resources and phase groups retain applicable visits", () => {
  const list = filterResources(resources);
  assert.equal(list.length, resources.length);
  assert.equal(new Set(list.map((e) => e.resource.id)).size, list.length);
  const groups = groupResourceMoments(list);
  assert.equal(groups.length, 12);
  assert.ok(groups.every((g) => g.entries.length > 0));
  for (const g of groups) {
    assert.equal(
      new Set(g.entries.map((e) => e.resource.id)).size,
      g.entries.length,
    );
    assert.ok(
      g.entries.every((e) =>
        e.moments.every((m) => m.phaseNumber === g.phase.number),
      ),
    );
  }
  assert.ok(groups[4].entries.some((e) => e.resource.id === "mlflow"));
  assert.ok(groups[10].entries.some((e) => e.resource.id === "mlflow"));
});
test("topics derive current guidance and deferred references from the catalog", () => {
  const queue = topicResourceGroups(resources, "9.4");
  assert.ok(
    queue
      .find(([g]) => g === "Learn now")?.[1]
      .some((e) => e.resource.id === "celery"),
  );
  assert.ok(
    queue
      .find(([g]) => g === "Read later")?.[1]
      .some(
        (e) =>
          e.resource.id === "ray" &&
          e.moments.every((m) => m.phaseNumber === 11),
      ),
  );
  const rag = topicResourceGroups(resources, "8.3").flatMap(([, e]) => e);
  assert.ok(
    rag.some(
      (e) =>
        e.resource.id === "ragas" && e.moments[0].stageType === "after_topic",
    ),
  );
  const evals = topicResourceGroups(resources, "10.4");
  assert.ok(
    evals
      .find(([g]) => g === "Security testing")?.[1]
      .some((e) => e.resource.id === "promptfoo"),
  );
  const ops = topicResourceGroups(resources, "10.7");
  assert.ok(
    ops
      .find(([g]) => g === "After first cloud deployment")?.[1]
      .some((e) => e.resource.id === "terraform"),
  );
});
test("search includes reading sections, prerequisites, tasks and exact topic names", () => {
  assert.ok(
    filterResources(resources, {
      query: "idempotency",
      phase: "9",
      priority: "core",
    }).some((e) => e.resource.id === "celery"),
  );
  assert.ok(
    filterResources(resources, {
      query: "faithfulness",
      priority: "optional",
    }).some((e) => e.resource.id === "ragas"),
  );
  assert.match(
    resourceSearchText(resourceById["prompt-engineering"]),
    /Prompt Engineering and Context Design/,
  );
});
test("introductory CUDA, optional tools and advanced visits keep distinct labels", () => {
  const c = resourceById.cuda;
  assert.equal(c.priority, "optional");
  assert.match(
    stageLabel(
      c,
      c.learningMoments.find((m) => m.phaseNumber === 11)!,
    ),
    /^ADVANCED/,
  );
  assert.doesNotMatch(
    stageLabel(
      c,
      c.learningMoments.find((m) => m.phaseNumber === 5)!,
    ),
    /^ADVANCED/,
  );
  assert.ok(
    resourceById.ray.learningMoments.every((m) => m.phaseNumber === 11),
  );
  assert.ok(
    resourceById.ragas.learningMoments.find((m) => m.isPrimaryMoment)
      ?.phaseNumber === 10,
  );
});
test("pre-upgrade version 1 exports retain every old lesson, bookmark, note and project check", () => {
  const state = emptyState();
  for (const p of baseline.phases)
    for (const t of p.topics) {
      state.notes["topic:" + t.id] = "Existing note";
      state.bookmarks.push("topic:" + t.id);
      for (const s of t.subtopics)
        state.progress[s.id] = {
          status: "completed",
          completedAt: "2026-11-01T10:00:00.000Z",
        };
    }
  for (const r of baseline.resources) state.bookmarks.push("resource:" + r.id);
  for (const p of baseline.projects)
    p.requirements.forEach(
      (_, i) => (state.projectChecks[`${p.id}.${i}`] = true),
    );
  state.lastTopic = "6.4";
  const imported = parseImport(
    JSON.stringify({
      version: 1,
      exportedAt: "2026-11-01T10:00:00.000Z",
      data: state,
    }),
  );
  assert.deepEqual(imported, state);
  const before = progress(subtopicIndex, imported);
  imported.bookmarks.push("resource:ragas");
  stateSchema.parse(imported);
  assert.deepEqual(progress(subtopicIndex, imported), before);
  assert.equal(
    Object.keys(imported.progress).length,
    baseline.phases.flatMap((p) => p.topics.flatMap((t) => t.subtopics)).length,
  );
  assert.equal(imported.progress["6.7.1"], undefined);
});

test("final audit keeps later topic references and advanced visits accurately labeled", () => {
  assert.ok(
    topicResourceGroups(resources, "1.6-bash")
      .find(([g]) => g === "Reference for this topic")?.[1]
      .some((e) => e.resource.id === "linux"),
  );
  assert.ok(
    topicResourceGroups(resources, "11.3")
      .find(([g]) => g === "Advanced resources")?.[1]
      .some((e) => e.resource.id === "ray"),
  );
  assert.ok(
    topicResourceGroups(resources, "8.3")
      .find(([g]) => g === "After this topic")?.[1]
      .some((e) => e.resource.id === "ragas"),
  );
});
test("source-specific revisits point to their intended implementation and project", () => {
  const oop = resourceById.python.learningMoments.find(
    (m) => m.topicId === "1.3",
  )!;
  assert.ok(oop.focusSections.includes("Classes"));
  assert.ok(oop.prerequisiteTopicIds.includes("1.2"));
  const neural = resourceById["ml-course"].learningMoments.find(
    (m) => m.topicId === "5.1",
  )!;
  assert.ok(neural.focusSections.some((s) => s.includes("Neural networks")));
  assert.ok(neural.prerequisiteTopicIds.includes("4.6"));
  const llm = resourceById.mlflow.learningMoments.find(
    (m) => m.topicId === "10.4",
  )!;
  assert.deepEqual(llm.projectIds, ["project-4", "project-6"]);
  assert.ok(llm.focusSections.some((s) => s.includes("LLMs and Agents")));
  const release = resourceById.git.learningMoments.find(
    (m) => m.topicId === "10.7",
  )!;
  assert.ok(release.practicalTask.includes("separate GitHub Actions resource"));
  const last = resourceById.builders.learningMoments.find(
    (m) => m.topicId === "11.5",
  )!;
  assert.equal(last.nextTopicId, undefined);
  assert.doesNotMatch(last.nextStep, /Caching and Redis/);
});
test("uninspected official content cannot inherit an old verified date", () => {
  const r = resourceById["privacy-india"];
  assert.equal(r.verificationStatus, "needs_review");
  assert.equal(r.verifiedAt, undefined);
  assert.match(r.verificationNotes, /could not be inspected/);
});

test("deferred optional languages wait for future prerequisites and first-use links select the earliest visit", () => {
  assert.ok(
    topicResourceGroups(resources, "1.7-go")
      .find(([g]) => g === "Read later")?.[1]
      .some((e) => e.resource.id === "go"),
  );
  assert.ok(
    topicResourceGroups(resources, "1.7-cpp")
      .find(([g]) => g === "Read later")?.[1]
      .some((e) => e.resource.id === "cpp"),
  );
  const hf = topicResourceGroups(resources, "6.1")
    .flatMap(([, entries]) => entries)
    .find((e) => e.resource.id === "huggingface")!;
  assert.equal(hf.moments[0].topicId, "6.2");
});
