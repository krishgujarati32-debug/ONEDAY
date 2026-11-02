/** Explicit network check; intentionally excluded from build and curriculum validation. */
import { writeFileSync } from "node:fs";
import { resources } from "../src/data/resources";
async function main() {
  const links = [
    ...new Set(
      resources.flatMap((r) => [
        r.url,
        ...r.supplementalUrls.map((s) => s.url),
      ]),
    ),
  ];
  const results: {
    url: string;
    status: number | null;
    finalUrl?: string;
    result: string;
  }[] = [];
  for (let i = 0; i < links.length; i += 6) {
    await Promise.all(
      links.slice(i, i + 6).map(async (url) => {
        try {
          const response = await fetch(url, {
            redirect: "follow",
            signal: AbortSignal.timeout(20000),
            headers: { "User-Agent": "ONEDAY-resource-link-check/1.0" },
          });
          await response.body?.cancel();
          results.push({
            url,
            status: response.status,
            finalUrl: response.url,
            result: response.ok
              ? "reachable"
              : `needs_review: HTTP ${response.status}`,
          });
        } catch (error) {
          results.push({
            url,
            status: null,
            result:
              "needs_review: " +
              (error instanceof Error ? error.message : String(error)),
          });
        }
      }),
    );
  }
  const report = {
    checkedAt: new Date().toISOString(),
    note: "Reachability is not a content/access-price audit. Bot blocks and network restrictions need manual official-page review. This command does not modify catalog verification dates.",
    results: results.sort((a, b) => a.url.localeCompare(b.url)),
  };
  if (process.argv.includes("--write"))
    writeFileSync(
      "docs/resource-link-check.json",
      JSON.stringify(report, null, 2) + "\n",
    );
  for (const r of report.results) console.log(`${r.result} ${r.url}`);
  const failed = results.filter((r) => r.result !== "reachable").length;
  console.log(
    `${links.length - failed}/${links.length} URLs reachable; ${failed} need review.`,
  );
  if (failed) process.exitCode = 1;
}
void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
