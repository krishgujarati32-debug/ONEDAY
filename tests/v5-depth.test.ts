import { test } from "node:test";
import assert from "node:assert/strict";
import {
  phases,
  v5DeploymentSpan,
  v5TopicRedirects,
} from "../src/data/curriculum";
import { projectSuccessors } from "../src/data/curriculum-legacy-links";
import { jobReadyCriteria, jobReadyEvidenceId } from "../src/data/job-ready";
import { projects } from "../src/data/projects";
import v5Baseline from "../src/data/v5-baseline.json";
import {
  lessonNeighbors,
  nextLearningStep,
  topicEvidenceId,
  topicStatus,
} from "../src/lib/progress";
import { emptyState, parseImport } from "../src/lib/state";

const completed = {
  status: "completed",
  completedAt: "2026-11-08T09:00:00.000Z",
} as const;

test("completing existing lessons leads to separately recorded topic practice", () => {
  const first = phases[0].topics[0];
  const second = phases[0].topics[1];
  const state = emptyState();
  for (const lesson of first.subtopics) state.progress[lesson.id] = completed;
  assert.equal(topicStatus(first.subtopics, state, first.id), "in_progress");
  const pending = nextLearningStep(state);
  assert.equal(pending?.kind, "practice");
  assert.equal(pending?.href, "/learn/" + first.slug + "#assignment");

  const evidence = topicEvidenceId(first.id);
  assert.ok(evidence);
  state.progress[evidence] = completed;
  const restored = parseImport(
    JSON.stringify({
      version: 1,
      exportedAt: completed.completedAt,
      data: state,
    }),
  );
  assert.equal(topicStatus(first.subtopics, restored, first.id), "completed");
  assert.equal(nextLearningStep(restored)?.topic.id, second.id);
});

test("older lesson IDs still resolve and earlier project checks retain their own credit", () => {
  for (const phase of v5Baseline.phases) {
    for (const topic of phase.topics) {
      for (const lesson of topic.lessons)
        assert.ok(lessonNeighbors(lesson), lesson);
    }
  }
  assert.equal(v5TopicRedirects["foundation-tls"], "foundation-http-lifecycle");
  const state = emptyState();
  state.projectChecks["portfolio-rag-backend.0"] = true;
  state.projectChecks["portfolio-mcp-orchestration.0"] = true;
  const successor = projectSuccessors["portfolio-rag-backend"];
  assert.equal(successor, projectSuccessors["portfolio-mcp-orchestration"]);
  assert.ok(projects.some((project) => project.id === successor));
  const restored = parseImport(
    JSON.stringify({
      version: 1,
      exportedAt: completed.completedAt,
      data: state,
    }),
  );
  assert.deepEqual(restored.projectChecks, state.projectChecks);
  assert.equal(restored.projectChecks[successor + ".0"], undefined);
});

test("checkpoint evidence round-trips independently of lesson and topic completion", () => {
  const deployment = phases[11].topics.slice(0, v5DeploymentSpan[1]);
  assert.equal(deployment.at(-1)?.id, "v5-prod-secure-release");
  assert.ok(
    deployment.every((topic) => topic.depth && topicEvidenceId(topic.id)),
  );
  const state = emptyState();
  const ids = jobReadyCriteria.map(({ id }) => jobReadyEvidenceId(id));
  for (const id of ids) state.progress[id] = completed;
  const restored = parseImport(
    JSON.stringify({
      version: 1,
      exportedAt: completed.completedAt,
      data: state,
    }),
  );
  assert.deepEqual(Object.keys(restored.progress), ids);
  assert.equal(
    topicStatus(deployment[0].subtopics, restored, deployment[0].id),
    "not_started",
  );
  assert.equal(nextLearningStep(restored)?.kind, "lesson");
});
