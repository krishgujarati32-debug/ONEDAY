import { readFileSync } from "node:fs";
import plans from "../src/data/resource-plans.json";
import revisits from "../src/data/resource-revisits.json";
import assert from "node:assert/strict";
import { phases, topics, subtopics } from "../src/data/curriculum";
import { resources } from "../src/data/resources";
import { technologies } from "../src/data/technologies";
import { projects } from "../src/data/projects";
import baseline from "../docs/resource-upgrade-baseline.json";
import verification from "../src/data/resource-verification.json";
export function validateResourceLearning() {
  const unique = (ids: string[], label: string) =>
    assert.equal(new Set(ids).size, ids.length, `Duplicate ${label}`);
  unique(
    resources.map((r) => r.url),
    "resource URLs",
  );
  unique(
    resources.flatMap((r) => r.learningMoments.map((m) => m.id)),
    "learning-moment IDs",
  );
  unique(
    technologies.map((t) => t.id),
    "technology IDs",
  );
  unique(
    projects.map((p) => p.id),
    "project IDs",
  );
  const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));
  const topicOrder = Object.fromEntries(topics.map((t, i) => [t.id, i]));
  const lessonIds = new Set(subtopics.map((s) => s.id));
  const projectIds = new Set(projects.map((p) => p.id));
  const stages = [
    "start_here",
    "during_topic",
    "after_topic",
    "project",
    "later_reference",
  ];
  const priorities = ["core", "optional", "advanced"];
  for (const r of resources) {
    assert.ok(
      [
        "course",
        "documentation",
        "book",
        "tutorial",
        "articles",
        "legal_reference",
      ].includes(r.contentType),
      `Missing content type ${r.id}`,
    );
    assert.ok(
      priorities.includes(r.priority),
      `Invalid resource priority ${r.id}`,
    );
    assert.ok(r.learningMoments.length > 0, `Missing learning moments ${r.id}`);
    assert.equal(
      r.learningMoments.filter((m) => m.isPrimaryMoment).length,
      1,
      `Primary moment ${r.id}`,
    );
    unique(r.relatedTopicIds, `related topics ${r.id}`);
    for (const id of r.relatedTopicIds)
      assert.ok(topicById[id], `Invalid resource relationship ${r.id}:${id}`);
    assert.ok(r.usageNotes.length > 30, `Missing usage boundaries ${r.id}`);
    assert.ok(["verified", "needs_review"].includes(r.verificationStatus));
    if (r.verificationStatus === "verified") {
      assert.match(r.verifiedAt ?? "", /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(
        verification.some(
          (v) =>
            v.id === r.id &&
            v.url === r.url &&
            v.verificationStatus === "verified" &&
            v.verifiedAt === r.verifiedAt,
        ),
        `Missing verification evidence ${r.id}`,
      );
    } else
      assert.equal(
        r.verifiedAt,
        undefined,
        "Unverified links cannot claim a verified date",
      );
    for (const link of r.supplementalUrls) {
      assert.equal(new URL(link.url).protocol, "https:");
      assert.ok(
        verification.some(
          (v) => v.url === link.url && v.verificationStatus === "verified",
        ),
        `Unverified supplement ${link.url}`,
      );
    }
    let previous = -1;
    for (const m of r.learningMoments) {
      const t = topicById[m.topicId];
      assert.ok(t, `Unknown moment topic ${m.id}`);
      assert.ok(
        phases.some((p) => p.id === m.phaseId && p.number === m.phaseNumber),
        `Unknown moment phase ${m.id}`,
      );
      assert.equal(t.phase, m.phaseNumber, `Topic/phase mismatch ${m.id}`);
      assert.ok(r.phases.includes(m.phaseNumber));
      assert.ok(r.relatedTopicIds.includes(m.topicId));
      assert.ok(stages.includes(m.stageType), `Invalid stage ${m.id}`);
      assert.ok(
        Number.isInteger(m.sequenceOrder) && m.sequenceOrder > 0,
        `Invalid sequence ${m.id}`,
      );
      assert.ok(m.sequenceOrder >= previous, `Unsorted moments ${r.id}`);
      previous = m.sequenceOrder;
      for (const field of [
        "recommendedTiming",
        "startWhen",
        "whyAtThisStage",
        "practicalTask",
        "nextStep",
      ] as const)
        assert.ok(m[field].length > 30, `Missing ${field} ${m.id}`);
      for (const field of [
        "focusSections",
        "learningObjectives",
        "completionCriteria",
      ] as const) {
        assert.ok(m[field].length >= 2, `Missing ${field} ${m.id}`);
        assert.ok(m[field].every((s) => s.trim().length > 3));
      }
      assert.ok(
        m.sequenceOrder >= m.phaseNumber * 10000 &&
          m.sequenceOrder < (m.phaseNumber + 1) * 10000,
        `Sequence outside phase ${m.id}`,
      );
      assert.ok(
        m.prerequisiteTopicIds.length > 0 ||
          m.previousLessonIds.length > 0 ||
          m.stageType === "start_here",
        `Missing prerequisite guidance ${m.id}`,
      );
      if (t.priority === "advanced")
        assert.equal(
          m.advanced,
          true,
          `Unlabeled advanced learning moment ${m.id}`,
        );
      unique(m.prerequisiteTopicIds, `prerequisites ${m.id}`);
      unique(m.projectIds, `project links ${m.id}`);
      for (const id of m.prerequisiteTopicIds) {
        if (id === m.topicId)
          assert.equal(
            m.stageType,
            "after_topic",
            `Circular prerequisite ${m.id}`,
          );
        if (m.stageType !== "later_reference" && id !== m.topicId)
          assert.ok(
            topicOrder[id] < topicOrder[m.topicId],
            `Future prerequisite presented as learn-now ${m.id}:${id}`,
          );
      }
      assert.ok(
        !m.practicalTask.startsWith("Produce the topic exercise"),
        `Placeholder activity ${m.id}`,
      );
      if (m.id.includes("-reference-"))
        assert.ok(
          `${r.id}:${m.topicId}` in revisits,
          `Unauthored contextual visit ${m.id}`,
        );
      assert.ok(m.estimatedMinutes > 0);
      assert.ok(m.projectIds.length > 0, `No project connection ${m.id}`);
      for (const id of m.prerequisiteTopicIds)
        assert.ok(topicById[id], `Unknown prerequisite ${m.id}:${id}`);
      for (const id of m.previousLessonIds)
        assert.ok(lessonIds.has(id), `Unknown prior lesson ${m.id}:${id}`);
      for (const id of m.projectIds)
        assert.ok(projectIds.has(id), `Unknown project ${m.id}:${id}`);
      if (m.nextTopicId)
        assert.ok(topicById[m.nextTopicId], `Unknown next topic ${m.id}`);
    }
  }
  // Editorial sources are checked so later edits cannot silently restore generic visits.
  const splitList = (value: string) =>
    value ? value.split(";").map((s) => s.trim()) : [];
  const primaryRows = readFileSync(
    new URL("../src/data/resource-plans.psv", import.meta.url),
    "utf8",
  )
    .trim()
    .split(/\r?\n/);
  assert.equal(primaryRows.length, Object.keys(plans).length);
  for (const row of primaryRows) {
    const f = row.split("|");
    assert.equal(f.length, 14);
    const p = plans[f[0] as keyof typeof plans];
    assert.ok(p);
    assert.deepEqual(
      p,
      {
        priority: f[1],
        topicId: f[2],
        stageType: f[3],
        prerequisites: f[4] ? f[4].split(",") : [],
        focusSections: splitList(f[5]),
        objectives: splitList(f[6]),
        startWhen: f[7],
        why: f[8],
        task: f[9],
        criteria: splitList(f[10]),
        nextTopicId: f[11],
        projects: f[12].split(",").map((n) => "project-" + n),
        notes: f[13],
      },
      `Primary JSON/PSV drift ${f[0]}`,
    );
  }
  const revisitRows = readFileSync(
    new URL("../src/data/resource-revisits.psv", import.meta.url),
    "utf8",
  )
    .trim()
    .split(/\r?\n/);
  assert.equal(revisitRows.length, Object.keys(revisits).length);
  for (const row of revisitRows) {
    const f = row.split("|");
    assert.equal(f.length, 12);
    const p = revisits[(f[0] + ":" + f[1]) as keyof typeof revisits];
    assert.ok(p);
    assert.deepEqual(
      p,
      {
        prerequisiteTopicIds: f[2].split(","),
        focusSections: splitList(f[3]),
        startWhen: f[4],
        whyAtThisStage: f[5],
        practicalTask: f[6],
        learningObjectives: splitList(f[7]),
        completionCriteria: splitList(f[8]),
        projectIds: f[9].split(",").map((n) => "project-" + n),
        nextTopicId: f[10],
        stageType: f[11],
      },
      `Revisit JSON/PSV drift ${f[0]}:${f[1]}`,
    );
  }
  // The captured pre-edit baseline is deliberately immutable.
  for (const old of baseline.phases) {
    const p = phases.find((p) => p.id === old.id);
    assert.ok(p);
    assert.equal(p.number, old.number);
    assert.equal(p.shortTitle, old.title);
    assert.equal(p.slug, old.slug);
    assert.equal(p.priority, old.priority);
    const retainedOrder = p.topics
      .filter((t) => old.topics.some((o) => o.id === t.id))
      .map((t) => t.id);
    assert.deepEqual(
      retainedOrder,
      old.topics.map((t) => t.id),
      "Existing topic order changed",
    );
    for (const original of old.topics) {
      const t = topicById[original.id];
      assert.ok(t);
      assert.equal(t.slug, original.slug);
      assert.equal(t.title, original.title);
      assert.equal(t.priority, original.priority);
      assert.deepEqual(
        t.subtopics.map(({ id, title, priority }) => ({ id, title, priority })),
        original.subtopics,
        `Old lessons changed ${t.id}`,
      );
      for (const id of original.resources)
        assert.ok(
          t.resources.includes(id),
          `Removed topic resource ${t.id}:${id}`,
        );
    }
  }
  for (const old of baseline.resources) {
    const r = resources.find((r) => r.id === old.id);
    assert.ok(r, `Removed resource ${old.id}`);
    assert.equal(r.title, old.title);
    assert.equal(r.url, old.url);
    for (const id of old.relatedTopicIds)
      assert.ok(
        r.relatedTopicIds.includes(id),
        `Removed relationship ${old.id}:${id}`,
      );
  }
  for (const old of baseline.technologies) {
    const t = technologies.find((t) => t.id === old.id);
    assert.ok(t);
    assert.equal(t.priority, old.priority, `Reclassified ${old.name}`);
    assert.equal(t.phase, old.phase);
    for (const id of old.topicIds) assert.ok(t.topicIds.includes(id));
  }
  for (const old of baseline.projects) {
    const p = projects.find((p) => p.id === old.id);
    assert.ok(p);
    assert.equal(p.slug, old.slug);
    assert.deepEqual(
      p.requirements,
      old.requirements,
      `Persisted checklist changed ${old.id}`,
    );
  }
  const technologyAliases: Record<string, string> = {
    cpp: "c-",
    typescript: "javascript-typescript",
    postgres: "postgresql",
    sklearn: "scikit-learn",
    huggingface: "hugging-face-transformers",
    otel: "opentelemetry",
    git: "git-github",
    vllm: "vllm-tgi-triton",
  };
  for (const r of resources) {
    const t = technologies.find(
      (t) => t.id === (technologyAliases[r.id] ?? r.id),
    );
    if (t)
      assert.equal(
        r.priority,
        t.priority,
        `Conflicting resource/technology priority ${r.id}`,
      );
  }
  const phase6 = phases.find((p) => p.number === 6)!;
  const ids = phase6.topics.map((t) => t.id);
  assert.equal(ids.indexOf("6.7"), ids.indexOf("6.4") + 1);
  assert.equal(ids.indexOf("6.5"), ids.indexOf("6.7") + 1);
  assert.equal(topicById["6.7"].priority, "core");
}
