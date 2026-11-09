"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronRight, Search } from "lucide-react";
import { Empty, PageHeading, Pill } from "@/components/ui";
import { depthLabels } from "@/data/course-v5-types";
import {
  technologyStatuses,
  type TechnologyStatus,
} from "@/data/technology-card-types";
import type { StackTechnology, technologyGroups } from "@/data/technologies";

const tones = {
  core: "purple",
  supporting: "green",
  advanced: "amber",
} as const;
const statusDescription = {
  core: "Required on the main learning path.",
  supporting: "Helps implement or operate the core stack.",
  advanced: "Taught later in the same sequence after its foundations.",
} as const;
const statuses = Object.keys(technologyStatuses) as TechnologyStatus[];
const dateFormat = new Intl.DateTimeFormat("en", {
  dateStyle: "long",
  timeZone: "UTC",
});
const phaseLabel = (phase: number) => "Phase " + String(phase).padStart(2, "0");

type ToolLink = Pick<StackTechnology, "id" | "name">;

function LearningLink({ link }: { link: StackTechnology["start"] }) {
  return (
    <Link href={link.href} prefetch={false}>
      {phaseLabel(link.phaseNumber)} · {link.lessonTitle}
      <ArrowUpRight size={13} aria-hidden="true" />
    </Link>
  );
}

function Card({
  tool,
  related,
  reveal,
}: {
  tool: StackTechnology;
  related: ToolLink[];
  reveal: (id: string) => void;
}) {
  return (
    <article
      className="technology-card"
      id={tool.id}
      aria-labelledby={tool.id + "-title"}
    >
      {tool.anchors.map((id) => (
        <span
          key={id}
          id={id}
          className="technology-anchor"
          aria-hidden="true"
        />
      ))}
      <div className="between">
        <span className="technology-monogram" aria-hidden="true">
          {tool.iconKey}
        </span>
        <Pill tone={tones[tool.status]}>{technologyStatuses[tool.status]}</Pill>
      </div>
      <h3 id={tool.id + "-title"}>{tool.name}</h3>
      <p className="technology-description">{tool.description}</p>
      <div className="technology-phase">
        <span>LEARN IN</span>
        <Link
          href={tool.start.href}
          prefetch={false}
          aria-label={
            "Learn " + tool.name + " in " + phaseLabel(tool.start.phaseNumber)
          }
        >
          {phaseLabel(tool.start.phaseNumber)}
          <ArrowRight size={13} aria-hidden="true" />
        </Link>
      </div>
      <details>
        <summary>
          Why this tool &amp; where to start
          <ChevronRight size={14} aria-hidden="true" />
        </summary>
        <dl className="technology-details">
          <div>
            <dt>Why we use it</dt>
            <dd>{tool.purpose}</dd>
          </div>
          <div>
            <dt>
              {tool.practice
                ? "Roadmap foundation for this stack exercise"
                : "Where it fits"}
            </dt>
            <dd className="technology-topic-links">
              <Link href={tool.start.phaseHref} prefetch={false}>
                {phaseLabel(tool.start.phaseNumber)} · {tool.start.phaseTitle}
              </Link>
              <Link href={tool.start.href} prefetch={false}>
                {tool.start.topicTitle}
                <ArrowUpRight size={13} aria-hidden="true" />
              </Link>
            </dd>
          </div>
          <div>
            <dt>Prerequisite lessons</dt>
            <dd className="technology-topic-links">
              {tool.prerequisites.length > 0
                ? tool.prerequisites.map((link) => (
                    <LearningLink link={link} key={link.lessonId} />
                  ))
                : "Start here. No prior lesson is required."}
            </dd>
          </div>
          <div>
            <dt>How deeply to learn it</dt>
            <dd>
              <strong>
                {tool.depthLevel} · {depthLabels[tool.depthLevel]}
              </strong>
              <p>{tool.requiredDepth}</p>
            </dd>
          </div>
          <div>
            <dt>Start with</dt>
            <dd>{tool.firstTask}</dd>
          </div>
          {(tool.revisit.length > 0 || related.length > 0) && (
            <div>
              <dt>Related lessons &amp; tools</dt>
              <dd className="technology-topic-links">
                {tool.revisit.map((link) => (
                  <LearningLink link={link} key={link.lessonId} />
                ))}
                {related.map(({ id, name }) => (
                  <a key={id} href={"#" + id} onClick={() => reveal(id)}>
                    {name}
                    <ArrowRight size={13} aria-hidden="true" />
                  </a>
                ))}
              </dd>
            </div>
          )}
          <div>
            <dt>Official documentation</dt>
            <dd className="technology-topic-links">
              <a href={tool.officialUrl} target="_blank" rel="noreferrer">
                Primary reference <ArrowUpRight size={13} aria-hidden="true" />
              </a>
              {tool.supportingUrl && (
                <a
                  href={tool.supportingUrl[1]}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tool.supportingUrl[0]}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              )}
            </dd>
          </div>
          {tool.release && (
            <div>
              <dt>Verified release</dt>
              <dd className="technology-topic-links">
                <a
                  href={tool.release.versionSourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {tool.release.component ?? "Latest stable"}{" "}
                  {tool.release.version}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <time dateTime={tool.release.versionCheckedAt}>
                  {dateFormat.format(new Date(tool.release.versionCheckedAt))}
                </time>
              </dd>
            </div>
          )}
          {tool.compatibility && (
            <div>
              <dt>Compatibility</dt>
              <dd>{tool.compatibility}</dd>
            </div>
          )}
        </dl>
      </details>
    </article>
  );
}

export function TechnologyLibrary({
  groups,
  verifiedAt,
}: {
  groups: typeof technologyGroups;
  verifiedAt: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [anchor, setAnchor] = useState<{ id: string } | null>(null);
  const all = groups.flatMap((group) => group.cards);
  const byId = new Map(all.map((card) => [card.id, card]));
  const words = query.toLowerCase().trim().split(/\s+/);
  const visible = groups
    .filter((group) => category === "all" || group.id === category)
    .map((group) => ({
      ...group,
      cards: group.cards.filter((card) => {
        const haystack = [
          group.label,
          card.name,
          card.description,
          ...card.names,
        ]
          .join(" ")
          .toLowerCase();
        return words.every((word) => haystack.includes(word));
      }),
    }))
    .filter((group) => group.cards.length);
  const count = visible.reduce((sum, group) => sum + group.cards.length, 0);

  function reveal(id: string) {
    setQuery("");
    setCategory("all");
    setAnchor({ id });
  }

  useEffect(() => {
    if (!anchor) return;
    document.getElementById(anchor.id)?.scrollIntoView({ block: "start" });
  }, [anchor]);

  return (
    <div className="technology-library">
      <PageHeading
        eyebrow="ENGINEERING STACK"
        title="Technology stack"
        description="See where each tool fits in the AI Systems Engineer roadmap and which exercise to start with."
        action={<Pill tone="purple">{all.length} tools</Pill>}
      />
      <div className="technology-legend">
        {statuses.map((status) => (
          <div key={status}>
            <Pill tone={tones[status]}>{technologyStatuses[status]}</Pill>
            <span>{statusDescription[status]}</span>
          </div>
        ))}
      </div>
      <p className="technology-verified muted">
        Last verified{" "}
        <time dateTime={verifiedAt}>
          {dateFormat.format(new Date(verifiedAt))}
        </time>
        . Release numbers describe individual tools. Use the compatibility notes
        to choose a shared environment.
      </p>
      <div className="library-toolbar">
        <label className="search-field">
          <Search size={16} aria-hidden="true" />
          <input
            aria-label="Search technologies"
            placeholder="Find a tool or technology…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
        <select
          aria-label="Technology category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="all">Every category</option>
          {groups.map(({ id, label }) => (
            <option value={id} key={id}>
              {label}
            </option>
          ))}
        </select>
        <span className="muted" role="status">
          {count} {count === 1 ? "tool" : "tools"}
        </span>
      </div>
      {count === 0 && (
        <Empty
          title="No tools match that search"
          description="Try a broader term or choose every category."
        />
      )}
      {visible.map((group) => (
        <section
          className="technology-group"
          aria-labelledby={"stack-" + group.id}
          key={group.id}
        >
          <div className="section-heading compact">
            <h2 id={"stack-" + group.id}>{group.label}</h2>
            <span className="muted technology-count">
              {group.cards.length} {group.cards.length === 1 ? "tool" : "tools"}
            </span>
          </div>
          <div className="technology-grid">
            {group.cards.map((tool) => (
              <Card
                tool={tool}
                related={tool.related.flatMap((id) => byId.get(id) ?? [])}
                reveal={reveal}
                key={tool.id}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
