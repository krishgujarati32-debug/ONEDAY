"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Layers3,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { phaseIndex, progress, topicStatus } from "@/lib/progress";
import { useLearning } from "./learning-provider";
import { Empty, LiveProgress, Pill, Time } from "./ui";
export type PhaseSummary = (typeof phaseIndex)[number];
export type TopicSummary = PhaseSummary["topics"][number];
export function PhaseCard({ phase }: { phase: PhaseSummary }) {
  const items = phase.topics.flatMap((t) => t.subtopics);
  return (
    <article className="phase-card">
      <div className="between">
        <span
          className="phase-icon"
          style={{ color: phase.color, background: phase.color + "16" }}
        >
          <Layers3 size={22} />
        </span>
        <Pill tone={phase.priority === "core" ? "purple" : "amber"}>
          {phase.priority === "core" ? "Core path" : "Advanced · optional"}
        </Pill>
      </div>
      <span className="eyebrow phase-eyebrow">
        PHASE {String(phase.number).padStart(2, "0")}
      </span>
      <h2>
        <Link href={"/roadmap/" + phase.slug}>
          {phase.shortTitle}
          <ArrowUpRight size={19} />
        </Link>
      </h2>
      <p>{phase.purpose}</p>
      <div className="phase-card-metadata">
        <span>
          <BookOpen size={14} />
          {phase.topics.length} topics
        </span>
        <span>
          <Clock3 size={14} />
          {phase.weeks}
        </span>
      </div>
      <small className="phase-why">Why: {phase.why}</small>
      <div className="between phase-card-tags">
        <span className="capitalize">{phase.difficulty}</span>
        <span>{items.length} lessons</span>
      </div>
      <LiveProgress items={items} />
      <div className="phase-card-bottom">
        <span>
          {phase.number === 2
            ? "Study alongside programming"
            : phase.prerequisites.length
              ? `Recommended after Phase ${phase.prerequisites.map((x) => x.split("-")[1]).join(", ")}`
              : "No prerequisites · start here"}
        </span>
        <Link
          href={"/roadmap/" + phase.slug}
          aria-label={"Explore " + phase.shortTitle}
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
export function TopicCard({
  topic,
  number,
}: {
  topic: TopicSummary;
  number?: number;
}) {
  const { state } = useLearning();
  const status = topicStatus(topic.subtopics, state);
  return (
    <article className="topic-card">
      <div className="topic-order">
        {number !== undefined ? (
          String(number).padStart(2, "0")
        ) : (
          <BookOpen size={19} />
        )}
      </div>
      <div className="topic-card-content">
        <div className="topic-card-top">
          <Pill tone={topic.priority === "core" ? "purple" : "amber"}>
            {topic.priority}
          </Pill>
          <span className="tiny-text capitalize">
            {status.replaceAll("_", " ")}
          </span>
        </div>
        <h3>
          <Link href={"/learn/" + topic.slug}>{topic.title}</Link>
        </h3>
        <p>{topic.description}</p>
        <div className="topic-meta">
          <span>{topic.subtopics.length} lessons</span>
          <span>·</span>
          <Time hours={topic.hours} />
          <span>·</span>
          <span className="capitalize">{topic.difficulty}</span>
        </div>
        <LiveProgress items={topic.subtopics} />
      </div>
      <Link
        className="topic-arrow"
        href={"/learn/" + topic.slug}
        aria-label={"Learn " + topic.title}
      >
        <ChevronRight size={21} />
      </Link>
    </article>
  );
}
export function RoadmapExplorer() {
  const { state } = useLearning();
  const [view, setView] = useState<"phases" | "topics">("phases"),
    [query, setQuery] = useState(""),
    [phase, setPhase] = useState("all"),
    [difficulty, setDifficulty] = useState("all"),
    [priority, setPriority] = useState("all"),
    [status, setStatus] = useState("all"),
    [sort, setSort] = useState("recommended");
  const clear = () => {
    setQuery("");
    setPhase("all");
    setDifficulty("all");
    setPriority("all");
    setStatus("all");
    setSort("recommended");
  };
  const filtered = useMemo(() => {
    const list = phaseIndex
      .filter((p) => phase === "all" || p.number === Number(phase))
      .map((p) => ({
        ...p,
        topics: p.topics.filter((t) => {
          const haystack = (
            t.title +
            " " +
            t.description +
            " " +
            t.subtopics.map((s) => s.title).join(" ")
          ).toLowerCase();
          return (
            (!query ||
              haystack.includes(query.toLowerCase()) ||
              p.shortTitle.toLowerCase().includes(query.toLowerCase())) &&
            (difficulty === "all" || t.difficulty === difficulty) &&
            (priority === "all" ||
              t.priority === priority ||
              t.subtopics.some((s) => s.priority === priority)) &&
            (status === "all" || topicStatus(t.subtopics, state) === status)
          );
        }),
      }))
      .filter((p) => p.topics.length);
    const value = (p: PhaseSummary | TopicSummary) =>
      "number" in p ? p.topics.reduce((n, t) => n + t.hours, 0) : p.hours;
    const getItems = (p: PhaseSummary | TopicSummary) =>
      "number" in p ? p.topics.flatMap((t) => t.subtopics) : p.subtopics;
    const compare = (
      a: PhaseSummary | TopicSummary,
      b: PhaseSummary | TopicSummary,
    ) =>
      sort === "az"
        ? a.title.localeCompare(b.title)
        : sort === "shortest"
          ? value(a) - value(b)
          : sort === "longest"
            ? value(b) - value(a)
            : sort === "completion"
              ? progress(getItems(b), state).percent -
                progress(getItems(a), state).percent
              : 0;
    return {
      phases: list.sort(compare),
      topics: list.flatMap((p) => p.topics).sort(compare),
    };
  }, [query, phase, difficulty, priority, status, sort, state]);
  const filterActive =
    query ||
    phase !== "all" ||
    difficulty !== "all" ||
    priority !== "all" ||
    status !== "all";
  return (
    <>
      <div className="roadmap-toolbar">
        <div className="view-tabs" role="tablist" aria-label="Roadmap view">
          <button
            role="tab"
            aria-selected={view === "phases"}
            onClick={() => setView("phases")}
          >
            <Layers3 size={15} />
            Phases<span>{phaseIndex.length}</span>
          </button>
          <button
            role="tab"
            aria-selected={view === "topics"}
            onClick={() => setView("topics")}
          >
            <BookOpen size={15} />
            All topics
          </button>
        </div>
        <div className="toolbar-controls">
          <label className="search-field">
            <Search size={16} />
            <input
              aria-label="Search roadmap"
              placeholder="Find a topic or concept…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <details className="filter-details">
            <summary className="button button-secondary button-small">
              <SlidersHorizontal size={15} />
              Filters{filterActive && <span className="status-dot" />}
            </summary>
            <div className="filter-panel">
              <label>
                Phase
                <select
                  value={phase}
                  onChange={(e) => setPhase(e.target.value)}
                >
                  <option value="all">All phases</option>
                  {phaseIndex.map((p) => (
                    <option key={p.id} value={p.number}>
                      Phase {p.number} · {p.shortTitle}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Difficulty
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="all">All levels</option>
                  {["beginner", "intermediate", "advanced"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Priority
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="all">Core + optional</option>
                  {["core", "optional", "advanced"].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <label>
                Learning status
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="all">Every status</option>
                  {[
                    "not_started",
                    "in_progress",
                    "completed",
                    "needs_revision",
                  ].map((x) => (
                    <option key={x} value={x}>
                      {x.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </label>
              <button className="text-link" onClick={clear}>
                Reset filters
              </button>
            </div>
          </details>
          <select
            className="sort-select"
            aria-label="Sort roadmap"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recommended">Recommended order</option>
            <option value="az">Alphabetical</option>
            <option value="shortest">Shortest first</option>
            <option value="longest">Longest first</option>
            <option value="completion">Completion</option>
          </select>
        </div>
      </div>
      <div className="results-label">
        <span>
          {view === "phases"
            ? filtered.phases.length + " phases"
            : filtered.topics.length + " topics"}{" "}
          in your learning journey
        </span>
        <span>Core first. Explore freely.</span>
      </div>
      {filterActive && (
        <button className="text-link filter-clear" onClick={clear}>
          Clear all filters
        </button>
      )}
      {(view === "phases" ? filtered.phases.length : filtered.topics.length) ===
      0 ? (
        <Empty
          title="No matching lessons"
          description="Try a broader search or reset your filters."
        />
      ) : view === "phases" ? (
        <div className="phase-grid">
          {filtered.phases.map((p) => (
            <PhaseCard
              phase={phaseIndex.find((x) => x.id === p.id)!}
              key={p.id}
            />
          ))}
        </div>
      ) : (
        <div className="topic-list">
          {filtered.topics.map((t) => (
            <TopicCard topic={t} key={t.id} />
          ))}
        </div>
      )}
    </>
  );
}
