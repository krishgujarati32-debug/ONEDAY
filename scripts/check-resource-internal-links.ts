/** Checks the actual built HTML behind every link emitted by resource learning plans. */
import { writeFileSync } from "node:fs";
import { resources } from "../src/data/resources";
import { phases, topics } from "../src/data/curriculum";
import { projects } from "../src/data/projects";
async function main() {
  const origin = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
  const refs: {
    resourceId: string;
    sourceId: string;
    kind: string;
    href: string;
  }[] = [];
  const topicById = Object.fromEntries(topics.map((t) => [t.id, t]));
  const topicHref = (id: string) => "/learn/" + topicById[id].slug;
  for (const r of resources) {
    const add = (kind: string, href: string, sourceId = r.id) =>
      refs.push({ resourceId: r.id, sourceId, kind, href });
    add("resource bookmark anchor", "/resources#" + r.id);
    for (const id of r.relatedTopicIds) add("related topic", topicHref(id));
    for (const m of r.learningMoments) {
      add(
        "phase",
        "/roadmap/" + phases.find((p) => p.id === m.phaseId)!.slug,
        m.id,
      );
      add("learning topic", topicHref(m.topicId), m.id);
      for (const id of m.prerequisiteTopicIds)
        add("prerequisite topic", topicHref(id), m.id);
      for (const id of m.previousLessonIds) {
        const t = topics.find((t) => t.subtopics.some((s) => s.id === id))!;
        add("previous lesson", topicHref(t.id) + "#" + id, m.id);
      }
      if (m.nextTopicId) add("next topic", topicHref(m.nextTopicId), m.id);
      for (const id of m.projectIds)
        add(
          "project",
          "/projects/" + projects.find((p) => p.id === id)!.slug,
          m.id,
        );
    }
  }
  const paths = [...new Set(refs.map((r) => r.href.split("#")[0]))];
  const pages = new Map<
    string,
    { status: number; html: string; error?: string }
  >();
  for (let i = 0; i < paths.length; i += 6)
    await Promise.all(
      paths.slice(i, i + 6).map(async (path) => {
        try {
          const response = await fetch(new URL(path, origin), {
            signal: AbortSignal.timeout(15000),
          });
          pages.set(path, {
            status: response.status,
            html: await response.text(),
          });
        } catch (error) {
          pages.set(path, {
            status: 0,
            html: "",
            error: error instanceof Error ? error.message : String(error),
          });
        }
      }),
    );
  const failures: {
    resourceId: string;
    sourceId: string;
    kind: string;
    href: string;
    reason: string;
  }[] = [];
  for (const ref of refs) {
    const [path, anchor] = ref.href.split("#");
    const page = pages.get(path)!;
    if (page.status !== 200 || !page.html.includes("<main"))
      failures.push({
        ...ref,
        reason: page.error ?? `Unusable HTML / HTTP ${page.status}`,
      });
    else if (anchor && !page.html.includes('id="' + anchor + '"'))
      failures.push({ ...ref, reason: "Missing target HTML anchor" });
  }
  const resourceHtml = pages.get("/resources")?.html ?? "";
  for (const r of resources) {
    const count = resourceHtml.split('id="' + r.id + '"').length - 1;
    if (count !== 1)
      failures.push({
        resourceId: r.id,
        sourceId: r.id,
        kind: "canonical resource uniqueness",
        href: "/resources#" + r.id,
        reason: `Expected one canonical anchor, found ${count}`,
      });
  }
  const report = {
    checkedAt: new Date().toISOString(),
    origin,
    resources: resources.length,
    learningMoments: resources.reduce(
      (n, r) => n + r.learningMoments.length,
      0,
    ),
    references: refs.length,
    uniqueTargets: new Set(refs.map((r) => r.href)).size,
    uniquePages: paths.length,
    lessonFragments: new Set(
      refs.filter((r) => r.kind === "previous lesson").map((r) => r.href),
    ).size,
    failures,
  };
  if (process.argv.includes("--write"))
    writeFileSync(
      "docs/resource-internal-link-audit.json",
      JSON.stringify(report, null, 2) + "\n",
    );
  console.log(
    `${report.references} resource references; ${report.uniqueTargets} unique targets across ${report.uniquePages} pages; ${report.lessonFragments} lesson fragments; ${failures.length} failures.`,
  );
  if (failures.length) {
    console.error(failures);
    process.exitCode = 1;
  }
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
