import assert from "node:assert/strict";
import { phases, topics, subtopics } from "../src/data/curriculum";
import outline from "../src/data/outline.json";
import { projects } from "../src/data/projects";
import { resources, resourceById } from "../src/data/resources";
import { technologies } from "../src/data/technologies";
import index from "../src/data/index.json";
export function validateCurriculum() {
  const unique = (items: string[], name: string) =>
    assert.equal(new Set(items).size, items.length, `Duplicate ${name}`);
  assert.equal(phases.length, 12);
  assert.deepEqual(
    phases.map((p) => p.number),
    Array.from({ length: 12 }, (_, i) => i),
  );
  unique(
    phases.map((p) => p.id),
    "phase IDs",
  );
  unique(
    phases.map((p) => p.slug),
    "phase slugs",
  );
  unique(
    topics.map((t) => t.id),
    "topic IDs",
  );
  unique(
    topics.map((t) => t.slug),
    "topic slugs",
  );
  unique(
    subtopics.map((s) => s.id),
    "lesson IDs",
  );
  unique(
    resources.map((r) => r.id),
    "resource IDs",
  );
  unique(
    projects.map((p) => p.slug),
    "project slugs",
  );
  for (const phase of outline)
    for (const expected of phase.topics) {
      const actual = topics.find((t) => t.id === expected.id);
      assert.ok(actual, `Missing topic ${expected.id}`);
      assert.deepEqual(
        actual.subtopics.map((s) => s.title),
        expected.subtopics,
        `Changed learning order in ${expected.id}`,
      );
    }
  for (const p of phases) {
    assert.ok(p.purpose.length > 30);
    for (const id of p.prerequisites)
      assert.ok(
        phases.some((x) => x.id === id),
        `Invalid phase prerequisite ${id}`,
      );
  }
  for (const t of topics) {
    assert.ok(t.explanation.length > 75, `Missing topic explanation ${t.id}`);
    assert.ok(t.assignment.length > 60, `Missing assignment ${t.id}`);
    assert.ok(t.why.length > 25);
    assert.ok(t.outcomes.length > 1);
    assert.ok(t.subtopics.length > 0);
    for (const id of t.prerequisites) {
      const dependency = topics.find((x) => x.id === id);
      assert.ok(dependency, `Invalid prerequisite ${id}`);
      assert.notEqual(id, t.id);
      if (t.priority === "core")
        assert.equal(
          dependency.priority,
          "core",
          `Optional dependency blocks core topic ${t.id}`,
        );
    }
    for (const id of t.resources)
      assert.ok(resourceById[id], `Invalid resource ${id}`);
    for (const s of t.subtopics) {
      assert.ok(s.explanation.length > 25, `Missing definition ${s.id}`);
      assert.ok(s.exercise.length > 45);
      assert.ok(s.criteria.length >= 2);
      assert.ok(s.study.length >= 2);
      assert.ok(s.minutes > 0);
      for (const id of s.resources) assert.ok(resourceById[id]);
    }
  }
  for (const r of resources) {
    const u = new URL(r.url);
    assert.equal(u.protocol, "https:");
    assert.ok(r.description.length > 20);
    assert.ok(r.phases.every((n) => phases.some((p) => p.number === n)));
  }
  for (const p of projects) {
    assert.ok(p.requirements.length >= 7);
    assert.ok(p.milestones.length >= 4);
    assert.ok(p.deployment.length > 50);
    assert.ok(p.phases.every((n) => phases.some((p) => p.number === n)));
  }
  for (const t of technologies)
    for (const id of t.topicIds)
      assert.ok(
        topics.some((t) => t.id === id),
        `Broken technology topic ${id}`,
      );
  assert.deepEqual(
    index.map((p) => ({
      id: p.id,
      topics: p.topics.map((t) => ({
        id: t.id,
        ids: t.subtopics.map((s) => s.id),
      })),
    })),
    phases.map((p) => ({
      id: p.id,
      topics: p.topics.map((t) => ({
        id: t.id,
        ids: t.subtopics.map((s) => s.id),
      })),
    })),
    "Regenerate the lean index after editing the curriculum",
  );
  return {
    phases: phases.length,
    topics: topics.length,
    lessons: subtopics.length,
    resources: resources.length,
    projects: projects.length,
    technologies: technologies.length,
  };
}
if (process.argv[1]?.includes("validate-curriculum"))
  console.log(validateCurriculum());
