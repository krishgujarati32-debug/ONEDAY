import assert from "node:assert/strict";
import { orderedLessons } from "../src/lib/progress";
import { technologies, technologyGroups } from "../src/data/technologies";
import { technologyStatuses } from "../src/data/technology-card-types";
import { releases, stackVerifiedAt } from "../src/data/technology-releases";

const positions = new Map(
  orderedLessons.map((entry, index) => [entry.lesson.id, index]),
);
const lessons = new Map(
  orderedLessons.map((entry) => [entry.lesson.id, entry]),
);

export function validateTechnologyStack() {
  const categoryIds = new Set(technologyGroups.map((group) => group.id));
  const ids = new Set(technologies.map((tool) => tool.id));
  assert.equal(
    categoryIds.size,
    technologyGroups.length,
    "Duplicate technology category",
  );
  assert.equal(ids.size, technologies.length, "Duplicate technology card");
  const anchors = technologies.flatMap(({ id, anchors }) => [id, ...anchors]);
  assert.equal(
    new Set(anchors).size,
    anchors.length,
    "Duplicate technology anchor",
  );
  const names = technologies.flatMap((tool) =>
    [tool.name, ...tool.names].map((name) => name.toLowerCase()),
  );
  assert.equal(
    new Set(names).size,
    names.length,
    "Duplicate technology display name or alias",
  );
  assert.ok(
    anchors.every((id) => /^[a-z\d]+(?:-[a-z\d]+)*$/.test(id)),
    "Invalid technology anchor",
  );
  assert.ok(
    Object.keys(releases).every((id) => ids.has(id)),
    "Unassigned release metadata",
  );

  for (const group of technologyGroups) {
    assert.ok(
      group.label && group.cards.length,
      "Empty technology category " + group.id,
    );
    for (const [index, tool] of group.cards.entries()) {
      assert.equal(tool.categoryId, group.id, tool.id);
      assert.equal(tool.sequence, index + 1, tool.id);
      assert.ok(
        Object.hasOwn(technologyStatuses, tool.status),
        tool.id + " status",
      );
      assert.match(tool.depthLevel, /^L[1-5]$/, tool.id);
      for (const detail of [
        tool.description,
        tool.purpose,
        tool.requiredDepth,
        tool.firstTask,
      ]) {
        assert.ok(
          detail.trim().length >= 20,
          "Incomplete technology card " + tool.id,
        );
      }
      assert.ok(new Set(tool.related).size === tool.related.length);
      for (const id of tool.related)
        assert.ok(
          id !== tool.id && ids.has(id),
          tool.id + " related tool " + id,
        );

      for (const link of [tool.start, ...tool.prerequisites, ...tool.revisit]) {
        const entry = lessons.get(link.lessonId);
        assert.ok(entry, "Missing lesson " + link.lessonId);
        assert.equal(link.topicId, entry.topic.id);
        assert.equal(link.href, entry.href);
        assert.equal(link.phaseId, entry.phase.id);
        assert.equal(link.phaseNumber, entry.phase.number);
        assert.equal(link.phaseHref, "/roadmap/" + entry.phase.slug);
      }
      for (const { lessonId } of tool.prerequisites) {
        assert.ok(
          positions.get(lessonId)! < positions.get(tool.start.lessonId)!,
          tool.id + " prerequisite order",
        );
      }

      if (tool.release) {
        assert.match(
          tool.release.version,
          /^\d+(?:\.\d+){1,3}$/,
          tool.id + " stable version",
        );
        assert.match(tool.release.versionCheckedAt, /^\d{4}-\d{2}-\d{2}$/);
        assert.ok(tool.release.versionCheckedAt <= stackVerifiedAt);
      }
      for (const link of [
        tool.officialUrl,
        tool.supportingUrl?.[1],
        tool.release?.versionSourceUrl,
      ]) {
        if (link === undefined) continue;
        const url = new URL(link);
        assert.ok(
          url.protocol === "https:" && !url.username && !url.password,
          tool.id + " documentation URL",
        );
      }
    }
  }

  const cloud = technologyGroups.find((group) => group.id === "cloud");
  assert.deepEqual(
    cloud?.cards.map((tool) => tool.id),
    [
      "aws",
      "aws-iam",
      "ecs-fargate",
      "amazon-ecr",
      "amazon-s3",
      "rds-postgresql",
      "cloudwatch",
    ],
  );
  const queues = technologyGroups.find(
    (group) => group.id === "message-queues",
  );
  assert.deepEqual(
    queues?.cards.map((tool) => [tool.id, tool.status]),
    [
      ["celery", "core"],
      ["rabbitmq", "supporting"],
      ["kafka", "advanced"],
    ],
  );
  assert.equal(
    technologies.find((tool) => tool.id === "redis")?.categoryId,
    "cache",
  );
  assert.equal(
    technologies.find((tool) => tool.id === "pgvector")?.start.phaseNumber,
    10,
  );
}
