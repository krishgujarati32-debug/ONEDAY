import assert from "node:assert/strict";
import {
  phases,
  v5AuthoredPhases,
  v5IngestionSpan,
  v5DeploymentSpan,
} from "../src/data/curriculum";
import { depthLabels, v5Requirements } from "../src/data/course-v5-types";

export function validateDepthProfiles() {
  const requiredCount = v5Requirements.reduce(
    (sum, phase) => sum + phase.topics.length,
    0,
  );
  assert.equal(requiredCount, 484);
  const scope = new Set<string>();
  const evidence = new Set<string>();
  const criteria = new Set<string>();
  const missing: number[] = [];
  let published = 0;
  for (const { phase: number, title, topics: expected } of v5Requirements) {
    const phase = phases.find((item) => item.number === number);
    assert.ok(phase, "Missing Phase " + number);
    assert.equal(phase.title, title);
    for (const [index, entry] of expected.entries()) {
      assert.equal(entry[0], index + 1);
      assert.ok(
        Object.hasOwn(depthLabels, entry[2]),
        "Invalid required depth for " + entry[1],
      );
    }
    const complete = v5AuthoredPhases.includes(number);
    if (!complete) missing.push(number);
    else
      assert.equal(
        phase.topics.length,
        expected.length,
        "V5 phase has extra topics for " + number,
      );
    if (!complete) continue;
    if (number === 10) {
      assert.equal(
        phase.topics[v5IngestionSpan[0] - 1]?.id,
        "v5-ingest-sources",
      );
      assert.equal(
        phase.topics[v5IngestionSpan[1] - 1]?.id,
        "v5-ingest-observability",
      );
      assert.equal(
        phase.topics[v5IngestionSpan[1]]?.id,
        "8.1",
        "Ingestion must lead into embeddings",
      );
    }
    if (number === 12)
      assert.equal(
        phase.topics[v5DeploymentSpan[1] - 1]?.id,
        "v5-prod-secure-release",
        "The deployment foundation precedes professional topics",
      );
    for (const [i, topic] of phase.topics.entries()) {
      const profile = topic.depth;
      assert.ok(profile, "Missing V5 topic profile for " + topic.id);
      assert.equal(
        topic.title,
        expected[i][1],
        "V5 topic order for " + topic.id,
      );
      assert.equal(
        profile.targetDepth,
        expected[i][2],
        "V5 target depth for " + topic.id,
      );
      assert.equal(profile.targetDepthLabel, depthLabels[profile.targetDepth]);
      assert.ok(
        topic.subtopics.every(
          (lesson) =>
            lesson.targetDepth && lesson.targetDepth <= profile.targetDepth,
        ),
        "Missing or excessive lesson depth for " + topic.id,
      );
      const fields = [
        profile.howDeepToLearn,
        profile.whatTheLearnerMustBeAbleToDo,
        profile.outOfScopeAtThisLevel,
        profile.practiceEvidence,
        ...profile.completionCriteria,
      ];
      assert.ok(
        profile.whatToLearn.length >= 2 &&
          profile.whatToLearn.every(
            (concept) =>
              concept.trim().length > 1 &&
              !/\b(?:TBD|TODO|placeholder)\b/i.test(concept),
          ) &&
          profile.completionCriteria.length > 0,
        topic.id,
      );
      assert.ok(
        fields.every(
          (value) =>
            value.trim().length >= 12 &&
            !/\b(?:TBD|TODO|placeholder)\b/i.test(value),
        ),
        "Incomplete V5 profile for " + topic.id,
      );
      for (const [set, value] of [
        [scope, profile.howDeepToLearn],
        [evidence, profile.practiceEvidence],
        [criteria, profile.completionCriteria.join(" ")],
      ] as const) {
        const normalized = value.trim().toLowerCase().replace(/\s+/g, " ");
        assert.ok(
          !set.has(normalized),
          "Copied V5 profile content for " + topic.id,
        );
        set.add(normalized);
      }
      const [min, max] = profile.estimatedStudyHours;
      assert.ok(
        Number.isFinite(min) &&
          Number.isFinite(max) &&
          min >= topic.hours &&
          max > min,
        "Invalid V5 time estimate for " + topic.id,
      );
      published++;
    }
  }
  return { published, requiredCount, missing };
}

if (process.argv[1]?.endsWith("validate-v5-depth.ts")) {
  const { published, requiredCount, missing } = validateDepthProfiles();
  console.log(
    "V5 depth profiles published: " + published + "/" + requiredCount,
  );
  if (missing.length) {
    console.error(
      "V5 release incomplete. Outstanding phases: " + missing.join(", "),
    );
    process.exitCode = 1;
  }
}
