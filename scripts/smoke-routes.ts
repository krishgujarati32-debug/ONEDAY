import { phaseIndex, topicIndex } from "../src/lib/progress";
import { projects } from "../src/data/projects";
import migration from "../src/data/v5-migration-map.json";
async function main() {
  const origin = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";
  const paths = [
    "/",
    "/dashboard",
    "/roadmap",
    "/projects",
    "/resources",
    "/technology-stack",
    "/settings",
    "/saved",
    ...["sign-in", "sign-up", "reset-password", "update-password"].map(
      (x) => "/auth/" + x,
    ),
    ...phaseIndex.map((p) => "/roadmap/" + p.slug),
    ...topicIndex.map((t) => "/learn/" + t.slug),
    ...projects.map((p) => "/projects/" + p.slug),
  ];
  const failures: string[] = [];
  let completed = 0;
  for (let i = 0; i < paths.length; i += 6) {
    await Promise.all(
      paths.slice(i, i + 6).map(async (path) => {
        try {
          const r = await fetch(new URL(path, origin));
          const html = await r.text();
          if (r.status !== 200 || !html.includes("<main"))
            failures.push(`${path}: ${r.status}`);
          else {
            const topic = topicIndex.find(
              (entry) => path === "/learn/" + entry.slug,
            );
            const absent =
              topic?.subtopics.filter(
                (lesson) => !html.includes('id="' + lesson.id + '"'),
              ) ?? [];
            if (absent.length)
              failures.push(
                path +
                  " missing lesson anchors: " +
                  absent.map((item) => item.id).join(", "),
              );
            else completed++;
          }
        } catch (e) {
          failures.push(
            `${path}: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }),
    );
  }
  const missing = await fetch(new URL("/learn/does-not-exist", origin));
  if (missing.status !== 404) failures.push("Unknown topic did not return 404");
  const search = await fetch(new URL("/api/search?q=self-attention", origin));
  const results = await search.json();
  if (
    !search.ok ||
    !results.results?.some((r: { href: string }) =>
      r.href.includes("/learn/transformer-architecture#"),
    )
  )
    failures.push("Search does not link to the specific self-attention lesson");
  for (const [query, resourceId] of [
    ["consumer group", "kafka"],
    ["migration environment", "alembic"],
    ["stdio clients", "mcp-sdk"],
  ]) {
    const response = await fetch(
      new URL("/api/search?q=" + encodeURIComponent(query), origin),
    );
    const data = await response.json();
    if (
      !response.ok ||
      !data.results?.some(
        (r: { type: string; href: string }) =>
          r.type === "Resource" && r.href === "/resources#" + resourceId,
      )
    )
      failures.push("Resource metadata search failed: " + query);
  }
  const resourceHtml = await (
    await fetch(new URL("/resources", origin))
  ).text();
  if (
    !resourceHtml.includes("Curriculum references") ||
    !resourceHtml.includes('id="mcp-sdk"')
  )
    failures.push("Missing reference index or canonical anchor");
  const oldLesson = await fetch(
    new URL("/learn/javascript-and-typescript", origin),
    { redirect: "manual" },
  );
  if (
    oldLesson.status !== 307 ||
    !oldLesson.headers.get("location")?.endsWith("/roadmap")
  )
    failures.push("Retired frontend route did not lead to the roadmap");
  for (const [before, after] of Object.entries(migration.redirects)) {
    const prior = await fetch(new URL(before, origin), { redirect: "manual" });
    const destination = prior.headers.get("location");
    if (
      prior.status !== 307 ||
      !destination ||
      new URL(destination, origin).href !== new URL(after, origin).href
    )
      failures.push(
        "Historical redirect " +
          before +
          " returned " +
          prior.status +
          " with destination " +
          destination,
      );
  }
  const production = await (
    await fetch(new URL("/roadmap/production-security-mlops", origin))
  ).text();
  const foundationEnd = production.indexOf(
    'href="/learn/v5-prod-secure-release"',
  );
  const checkpoint = production.indexOf('id="job-ready-foundation"');
  const laterTopics = production.indexOf('href="/learn/docker-and-containers"');
  if (
    foundationEnd < 0 ||
    checkpoint <= foundationEnd ||
    laterTopics <= checkpoint
  )
    failures.push(
      "The checkpoint must follow deployment fundamentals and precede advanced production topics",
    );
  const state = await fetch(new URL("/api/state", origin));
  if (![200, 401].includes(state.status))
    failures.push("State endpoint failed");
  console.log(
    `${completed}/${paths.length} public/page routes returned usable HTML. 404, lesson/resource metadata search, resource controls and state endpoint checked.`,
  );
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exitCode = 1;
  }
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
