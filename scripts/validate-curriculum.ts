import assert from "node:assert/strict";
import {
  phases,
  topics,
  subtopics,
  topicById,
  phaseByNumber,
} from "../src/data/curriculum";
import { projects } from "../src/data/projects";
import { resources, resourceById } from "../src/data/resources";
import { technologies } from "../src/data/technologies";
import {
  phases as previousPhases,
  subtopics as previousLessons,
} from "../src/data/legacy-curriculum";
import legacy from "../src/data/legacy-ids.json";
import index from "../src/data/index.json";
import ids from "../src/data/ids.json";
import migration from "../src/data/curriculum-migration-map.json";
import { buildManifest } from "./build-manifest";
import { validateResourceLearning } from "./validate-resource-learning";
import { validateDepthProfiles } from "./validate-v5-depth";
import { jobReadyCriteria } from "../src/data/job-ready";
import v5Migration from "../src/data/v5-migration-map.json";

export function validateCurriculum() {
  validateResourceLearning();
  validateDepthProfiles();
  const unique = (keys: string[], kind: string) =>
    assert.equal(new Set(keys).size, keys.length, "Duplicate " + kind);
  assert.deepEqual(
    phases.map(({ number }) => number),
    Array.from({ length: 14 }, (_, index) => index + 1),
  );
  unique(
    phases.map((phase) => phase.id),
    "phase IDs",
  );
  unique(
    phases.map((phase) => phase.slug),
    "phase slugs",
  );
  unique(
    topics.map((topic) => topic.id),
    "topic IDs",
  );
  unique(
    topics.map((topic) => topic.slug),
    "topic slugs",
  );
  unique(
    subtopics.map((lesson) => lesson.id),
    "lesson IDs",
  );
  unique(
    subtopics.map(
      (lesson) =>
        lesson.title.toLowerCase() + "|" + lesson.explanation.toLowerCase(),
    ),
    "lesson objectives",
  );
  unique(
    projects.map((project) => project.id),
    "project IDs",
  );
  unique(
    projects.map((project) => project.slug),
    "project slugs",
  );
  unique(
    resources.map((resource) => resource.id),
    "resource IDs",
  );
  unique(
    resources.map((resource) => resource.url),
    "resource URLs",
  );
  unique(
    technologies.map((technology) => technology.id),
    "technology IDs",
  );
  const positions = new Map(
    topics.map((topic, position) => [topic.id, position]),
  );
  const lessonPhases = new Map(
    topics.flatMap((topic) =>
      topic.subtopics.map((lesson) => [lesson.id, topic.phase] as const),
    ),
  );
  for (const phase of phases) {
    assert.ok(phase.purpose.length > 30 && phase.topics.length);
    assert.equal(phase.priority, "core");
    assert.deepEqual(
      phase.prerequisites,
      phase.number === 1 ? [] : [phaseByNumber[phase.number - 1].id],
    );
    for (const topic of phase.topics)
      assert.equal(topic.phase, phase.number, topic.id);
  }
  for (const [position, topic] of topics.entries()) {
    assert.equal(topic.priority, "core");
    assert.ok(
      topic.explanation.length > 75 &&
        topic.assignment.length > 60 &&
        topic.outcomes.length > 1 &&
        topic.subtopics.length,
      topic.id,
    );
    assert.deepEqual(
      topic.prerequisites,
      position ? [topics[position - 1].id] : [],
      topic.id,
    );
    assert.ok(
      topic.depth && topic.depth.estimatedStudyHours[0] >= topic.hours,
      "Missing topic depth or study estimate for " + topic.id,
    );
    for (const id of topic.resources) assert.ok(resourceById[id], id);
    for (const lesson of topic.subtopics) {
      assert.equal(lesson.priority, "core");
      assert.ok(
        lesson.targetDepth && lesson.targetDepth <= topic.depth.targetDepth,
        "Invalid lesson depth for " + lesson.id,
      );
      assert.ok(
        lesson.explanation.length > 25 &&
          lesson.exercise.length > 45 &&
          lesson.criteria.length >= 2 &&
          lesson.study.length >= 2 &&
          lesson.minutes > 0,
        lesson.id,
      );
      assert.doesNotMatch(
        lesson.title,
        /\b(?:frontend|javascript|typescript|java|cplusplus|langchain|langgraph|llamaindex|neo4j|celery|qdrant|weaviate|mongodb|triton|k6|elective|optional)\b/i,
      );
      for (const id of lesson.resources) assert.ok(resourceById[id], id);
    }
  }
  for (const resource of resources) {
    const url = new URL(resource.url);
    assert.equal(url.protocol, "https:");
    assert.ok(!url.username && !url.password);
    assert.equal(resource.verificationStatus, "verified");
    assert.match(resource.verifiedAt ?? "", /^\d{4}-\d{2}-\d{2}$/);
    assert.equal(
      resource.learningMoments.filter((moment) => moment.isPrimaryMoment)
        .length,
      1,
    );
    unique(
      resource.learningMoments.map((moment) => moment.id),
      "resource moments for " + resource.id,
    );
    assert.deepEqual(resource.relatedTopicIds, [
      ...new Set(resource.learningMoments.map((moment) => moment.topicId)),
    ]);
    assert.deepEqual(resource.phases, [
      ...new Set(resource.learningMoments.map((moment) => moment.phaseNumber)),
    ]);
    for (const moment of resource.learningMoments) {
      const topic = topicById[moment.topicId];
      assert.ok(
        topic && resource.relatedTopicIds.includes(topic.id),
        moment.id,
      );
      assert.equal(moment.phaseNumber, topic.phase);
      assert.equal(moment.phaseId, phaseByNumber[topic.phase].id);
      for (const id of moment.prerequisiteTopicIds)
        assert.ok(
          (positions.get(id) ?? Infinity) < positions.get(topic.id)!,
          id,
        );
      for (const id of moment.previousLessonIds)
        assert.ok(
          topic.subtopics.some((lesson) => lesson.id === id),
          moment.id + ": " + id,
        );
      for (const id of moment.projectIds)
        assert.ok(
          projects.some((project) => project.id === id),
          id,
        );
      assert.ok(
        moment.focusSections.length &&
          moment.completionCriteria.length &&
          moment.startWhen &&
          moment.whyAtThisStage &&
          moment.prerequisiteTopicIds.length &&
          moment.practicalTask &&
          moment.nextStep &&
          !moment.completionCriteria.includes(moment.practicalTask),
        moment.id,
      );
    }
  }
  unique(
    jobReadyCriteria.map(({ id }) => id),
    "checkpoint criteria IDs",
  );
  for (const { topicId } of jobReadyCriteria)
    assert.ok(topicById[topicId], topicId);
  assert.equal(projects.length, 5);
  assert.deepEqual(
    projects.map((project) => project.targetDepth),
    ["L3", "L3", "L3", "L3", "L5"],
  );
  const stack = new Set(technologies.map((tool) => tool.name));
  for (const project of projects) {
    assert.ok(
      project.architecture &&
        project.folderStructure &&
        project.checks?.length &&
        project.prerequisiteLessons?.length,
      project.id,
    );
    assert.ok(project.milestones.length >= 4 && project.deployment.length > 50);
    assert.deepEqual(project.requirements, project.milestones);
    unique(project.milestones, "milestones for " + project.id);
    for (const id of project.prerequisiteLessons!)
      assert.ok(
        (lessonPhases.get(id) ?? Infinity) <= project.phases[0],
        project.id + ": " + id,
      );
    for (const name of project.technologies) assert.ok(stack.has(name), name);
  }
  for (const technology of technologies)
    for (const id of technology.topicIds) {
      assert.equal(topicById[id]?.phase, technology.phase, technology.id);
    }
  assert.equal(topicById["1.1"].phase, 2);
  assert.equal(topicById["3.2"].phase, 4);
  assert.equal(topicById["7.2"].phase, 9);
  assert.equal(topicById["8.8"].phase, 10);
  assert.equal(topicById["9.3"].phase, 11);
  assert.equal(topicById["10.6"].phase, 12);
  assert.equal(topicById["11.3"].phase, 13);
  const expected = buildManifest();
  assert.deepEqual(
    v5Migration,
    expected.v5Migration,
    "Regenerate the V5 migration map",
  );
  assert.ok(
    Object.values(v5Migration.lessons).every(
      (record) => record.disposition === "preserved",
    ),
    "Previously active lessons must retain their completion IDs",
  );
  assert.ok(
    Object.values(v5Migration.resources).every(
      (record) => record === "preserved",
    ),
    "Previously active references must retain their IDs",
  );
  assert.deepEqual(index, expected.index, "Regenerate the lean index");
  assert.deepEqual(ids, expected.ids, "Regenerate active IDs");
  assert.deepEqual(
    migration,
    JSON.parse(JSON.stringify(expected.migration)),
    "Regenerate the migration map",
  );
  assert.deepEqual(
    Object.keys(migration.phases),
    previousPhases.map((phase) => phase.id),
  );
  assert.deepEqual(
    new Set(Object.keys(migration.topics)),
    new Set(legacy.topics),
  );
  assert.deepEqual(
    new Set(Object.keys(migration.lessons)),
    new Set(legacy.subtopics),
  );
  assert.deepEqual(
    new Set(Object.keys(migration.resources)),
    new Set(legacy.resources),
  );
  assert.deepEqual(
    new Set(Object.keys(migration.projects)),
    new Set(legacy.projects.map((project) => project.id)),
  );
  const originals = new Map(
    previousLessons.map((lesson) => [lesson.id, lesson.explanation]),
  );
  for (const lesson of subtopics) {
    if (originals.has(lesson.id))
      assert.equal(
        lesson.explanation,
        originals.get(lesson.id),
        "Changed objective under published ID " + lesson.id,
      );
  }
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
