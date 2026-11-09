import { technologies } from "../src/data/technologies";

async function main() {
  const urls = [
    ...new Set(
      technologies
        .flatMap((tool) => [
          tool.officialUrl,
          tool.supportingUrl?.[1],
          tool.release?.versionSourceUrl,
        ])
        .filter((url): url is string => Boolean(url)),
    ),
  ];
  const failures: string[] = [];
  for (let offset = 0; offset < urls.length; offset += 8) {
    await Promise.all(
      urls.slice(offset, offset + 8).map(async (url) => {
        try {
          const response = await fetch(url, {
            redirect: "follow",
            signal: AbortSignal.timeout(18000),
            headers: { "User-Agent": "ONEDAY-technology-link-check/1.0" },
          });
          await response.body?.cancel();
          if (!response.ok)
            failures.push("HTTP " + response.status + " " + url);
        } catch (error) {
          failures.push(
            (error instanceof Error ? error.message : String(error)) +
              " " +
              url,
          );
        }
      }),
    );
  }
  for (const issue of failures.sort()) console.error(issue);
  console.log(
    urls.length -
      failures.length +
      "/" +
      urls.length +
      " official technology links reached.",
  );
  if (failures.length) process.exitCode = 1;
}

void main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
