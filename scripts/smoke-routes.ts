import { phaseIndex, topicIndex } from "../src/lib/progress";
import { projects } from "../src/data/projects";
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
          else completed++;
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
  const state = await fetch(new URL("/api/state", origin));
  if (![200, 401].includes(state.status))
    failures.push("State endpoint failed");
  console.log(
    `${completed}/${paths.length} public/page routes returned usable HTML. 404, lesson search and state endpoint checked.`,
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
