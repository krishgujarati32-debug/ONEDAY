"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Braces,
  ChevronRight,
  Search,
} from "lucide-react";
import { technologies } from "@/data/technologies";
import {
  filterResources,
  groupResourceMoments,
  phaseNumber,
  resourceStages,
} from "@/lib/resource-learning";
import { ResourceCard } from "./resource-card";
import { resources, resourceGroups } from "@/data/resources";
import { projects } from "@/data/projects";
import { phaseIndex, topicIndex, formatPercent } from "@/lib/progress";
import type { Project } from "@/lib/types";
import { useLearning } from "./learning-provider";
import {
  BookmarkButton,
  Empty,
  NotesEditor,
  PageHeading,
  Pill,
  ProgressBar,
} from "./ui";
export function TechnologyLibrary() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all"),
    [priority, setPriority] = useState("all");
  const list = technologies.filter(
    (t) =>
      (category === "all" || t.category === category) &&
      (priority === "all" || t.priority === priority) &&
      (t.name + " " + t.description)
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const categories = [...new Set(technologies.map((t) => t.category))];
  return (
    <>
      <PageHeading
        eyebrow="A TOOLBOX, NOT A TO-DO LIST"
        title="Learn the right tool, at the right time."
        description="Start with Python, SQL and one practical stack. Add alternatives only when a project gives you a reason."
        action={
          <Pill tone="purple">
            {technologies.length} connected technologies
          </Pill>
        }
      />
      <div className="library-toolbar">
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search technologies"
            placeholder="Find a tool or technology…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Technology category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Every category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Technology priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="all">Core + optional</option>
          {["core", "optional", "advanced"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <span className="muted">{list.length} tools</span>
      </div>
      {!list.length && (
        <Empty
          title="No tools match that search"
          description="Try a broader term or choose every category."
        />
      )}
      {categories
        .filter((c) => list.some((t) => t.category === c))
        .map((c) => (
          <section className="technology-group" key={c}>
            <div className="section-heading compact">
              <h2>{c}</h2>
              <span className="muted">
                {list.filter((t) => t.category === c).length} tools
              </span>
            </div>
            <div className="technology-grid">
              {list
                .filter((t) => t.category === c)
                .map((t) => (
                  <article className="technology-card" id={t.id} key={t.id}>
                    <div className="between">
                      <span className="technology-monogram">
                        {t.name
                          .split(/[ /-]/)
                          .map((x) => x[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <Pill tone={t.priority === "core" ? "purple" : "amber"}>
                        {t.priority}
                      </Pill>
                    </div>
                    <h3>{t.name}</h3>
                    <p>{t.description}</p>
                    <div className="technology-phase">
                      <span>LEARN IN</span>
                      <Link href={"/roadmap/" + phaseIndex[t.phase].slug}>
                        Phase {t.phase}
                        <ArrowRight size={13} />
                      </Link>
                    </div>
                    <details>
                      <summary>
                        Why this tool & where to start
                        <ChevronRight size={13} />
                      </summary>
                      <p>{t.why}</p>
                      <div className="technology-topic-links">
                        {t.topicIds.map((id) => {
                          const topic = topicIndex.find((x) => x.id === id)!;
                          return (
                            <Link href={"/learn/" + topic.slug} key={id}>
                              {topic.title}
                              <ArrowUpRight size={13} />
                            </Link>
                          );
                        })}
                      </div>
                    </details>
                  </article>
                ))}
            </div>
          </section>
        ))}
    </>
  );
}
export function ResourceLibrary() {
  const [query, setQuery] = useState(""),
    [category, setCategory] = useState("all"),
    [phase, setPhase] = useState("all"),
    [priority, setPriority] = useState("all"),
    [timing, setTiming] = useState("all"),
    [view, setView] = useState("library");
  const list = filterResources(resources, {
    query,
    categoryIds: category === "all" ? undefined : resourceGroups[category],
    phase,
    priority,
    timing,
  });
  const groups = groupResourceMoments(list);
  return (
    <>
      <PageHeading
        eyebrow="LESS NOISE. BETTER SOURCES."
        title="Your learning library."
        description="Know when to open each guide, which sections to read and what to build next. Follow the roadmap at your own pace."
        action={<Pill tone="green">{resources.length} curated resources</Pill>}
      />
      <div
        className="view-tabs resource-view-tabs"
        role="tablist"
        aria-label="Resource view"
      >
        <button
          role="tab"
          id="resource-library-tab"
          aria-controls="resource-results"
          aria-selected={view === "library"}
          onClick={() => setView("library")}
        >
          Resource Library
        </button>
        <button
          role="tab"
          id="resource-order-tab"
          aria-controls="resource-results"
          aria-selected={view === "order"}
          onClick={() => setView("order")}
        >
          Recommended Learning Order
        </button>
      </div>
      <div className="library-toolbar resource-toolbar">
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search resources"
            placeholder="Search topics, prerequisites, exercises…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Resource category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Every subject</option>
          {Object.keys(resourceGroups).map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Resource phase"
          value={phase}
          onChange={(e) => setPhase(e.target.value)}
        >
          <option value="all">All phases</option>
          {phaseIndex.map((p) => (
            <option key={p.id} value={p.number}>
              Phase {phaseNumber(p.number)} · {p.shortTitle}
            </option>
          ))}
        </select>
        <select
          aria-label="Resource priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="all">Every priority</option>
          {["core", "optional", "advanced"].map((p) => (
            <option key={p} value={p}>
              {p[0].toUpperCase() + p.slice(1)}
            </option>
          ))}
        </select>
        <select
          aria-label="Resource timing"
          value={timing}
          onChange={(e) => setTiming(e.target.value)}
        >
          <option value="all">Every timing</option>
          {Object.entries(resourceStages).map(([id, label]) => (
            <option key={id} value={id}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <p className="muted resource-results-count" aria-live="polite">
        {list.length} resources ·{" "}
        {list.reduce((sum, r) => sum + r.moments.length, 0)} learning moments.
        One bookmark per resource, across every visit.
      </p>
      <div
        id="resource-results"
        role="tabpanel"
        aria-labelledby={
          view === "library" ? "resource-library-tab" : "resource-order-tab"
        }
      >
        {view === "library" ? (
          <div className="resources-grid">
            {list.map(({ resource, moments }) => (
              <ResourceCard
                id={resource.id}
                key={resource.id}
                resource={resource}
                moments={moments}
              />
            ))}
          </div>
        ) : (
          groups
            .filter((g) => g.entries.length)
            .map(({ phase, entries }) => (
              <section className="resource-phase-group" key={phase.id}>
                <div className="section-heading compact">
                  <div>
                    <span className="eyebrow">
                      PHASE {phaseNumber(phase.number)}
                    </span>
                    <h2>{phase.shortTitle}</h2>
                  </div>
                  <Link className="text-link" href={"/roadmap/" + phase.slug}>
                    Review phase <ArrowRight size={13} />
                  </Link>
                </div>
                <div className="resources-grid">
                  {entries.map(({ resource, moments }) => (
                    <ResourceCard
                      id={resource.id + "-phase-" + phase.number}
                      key={resource.id}
                      resource={resource}
                      moments={moments}
                    />
                  ))}
                </div>
              </section>
            ))
        )}
      </div>
      {!list.length && (
        <Empty
          title="No resources found"
          description="Try a broader search or change the phase, priority or timing filter."
        />
      )}
      <div className="resource-footnote">
        Verification dates appear in each guide. Free to read refers to the
        linked material; hosted services, hardware and API calls may have
        separate costs. Resource reading does not change lesson completion.
      </div>
    </>
  );
}
export function ProjectLibrary() {
  const { state } = useLearning();
  const [query, setQuery] = useState(""),
    [difficulty, setDifficulty] = useState("all");
  const list = projects.filter(
    (p) =>
      (difficulty === "all" || p.difficulty === difficulty) &&
      (p.title + " " + p.purpose).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="KNOWLEDGE BECOMES CAPABILITY WHEN YOU BUILD"
        title="Your ideas, engineered."
        description="Seven increasingly ambitious builds. Each comes with requirements, milestones and a clear definition of done."
      />
      <div className="flagship-banner">
        <div className="flagship-mark">
          <Braces size={33} />
        </div>
        <div>
          <span className="eyebrow">THE NORTH-STAR PROJECT</span>
          <h2>CCAI — Centralized Contextual AI</h2>
          <p>A model-routing platform that connects everything you learn.</p>
        </div>
        <Link
          href={"/projects/" + projects[5].slug}
          className="button button-secondary"
        >
          Explore the flagship
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="library-toolbar">
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search projects"
            placeholder="Find your next build…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <select
          aria-label="Project difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="all">Every difficulty</option>
          {["beginner", "intermediate", "advanced"].map((x) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <span className="muted">{list.length} projects</span>
      </div>
      <div className="projects-grid">
        {list.map((p) => {
          const complete = p.requirements.filter(
            (_, i) => state.projectChecks[`${p.id}.${i}`],
          ).length;
          return (
            <article className="build-card" key={p.id}>
              <div className="build-card-visual">
                <span>PROJECT {p.id.split("-")[1].padStart(2, "0")}</span>
                <div className="build-icon">
                  {p.id === "project-6" ? (
                    <Braces size={42} strokeWidth={1.3} />
                  ) : (
                    <Boxes size={42} strokeWidth={1.3} />
                  )}
                </div>
                <Pill tone="purple">{p.difficulty}</Pill>
              </div>
              <div className="build-card-body">
                <h2>
                  <Link href={"/projects/" + p.slug}>{p.title}</Link>
                </h2>
                <p>{p.subtitle}</p>
                <div className="tech-tags">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="build-progress">
                  <div className="between">
                    <span>
                      {complete}/{p.requirements.length} requirements
                    </span>
                    <span>
                      {formatPercent((complete / p.requirements.length) * 100)}
                    </span>
                  </div>
                  <ProgressBar
                    value={(complete / p.requirements.length) * 100}
                    label={p.title + " requirements"}
                  />
                </div>
                <Link className="text-link" href={"/projects/" + p.slug}>
                  Open the build plan
                  <ArrowRight size={15} />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
      {!list.length && (
        <Empty
          title="No matching projects"
          description="Try another term or choose every difficulty."
        />
      )}
    </>
  );
}
export function ProjectWorkspace({ project }: { project: Project }) {
  const { state, ready, pending, mutate } = useLearning();
  const done = project.requirements.filter(
    (_, i) => state.projectChecks[`${project.id}.${i}`],
  ).length;
  return (
    <>
      <section className="content-card">
        <div className="between">
          <h2>Your functional checklist</h2>
          <span className="muted">
            {done}/{project.requirements.length}
          </span>
        </div>
        <p>
          Check a requirement after you have built and verified it. This
          checklist tracks your self-assessment independently of curriculum
          lessons.
        </p>
        <ProgressBar
          value={(done / project.requirements.length) * 100}
          label="Project requirements"
        />
        <div className="project-checklist">
          {project.requirements.map((r, i) => (
            <label
              className={
                state.projectChecks[`${project.id}.${i}`] ? "checked" : ""
              }
              key={r}
            >
              <input
                type="checkbox"
                checked={Boolean(state.projectChecks[`${project.id}.${i}`])}
                disabled={!ready || pending}
                onChange={(e) =>
                  void mutate(
                    (s) => ({
                      ...s,
                      projectChecks: {
                        ...s.projectChecks,
                        [`${project.id}.${i}`]: e.target.checked,
                      },
                    }),
                    "Project checklist saved.",
                  )
                }
              />
              <span>{r}</span>
            </label>
          ))}
        </div>
      </section>
      <section className="content-card top-space">
        <NotesEditor
          itemKey={"project:" + project.id}
          label="Build journal & project notes"
        />
      </section>
    </>
  );
}
export function SavedLibrary() {
  const { state } = useLearning();
  const [tab, setTab] = useState("bookmarks"),
    [query, setQuery] = useState("");
  const records = [
    ...topicIndex.map((t) => ({
      key: "topic:" + t.id,
      title: t.title,
      description: "Topic · Phase " + t.phase,
      href: "/learn/" + t.slug,
    })),
    ...topicIndex.flatMap((t) =>
      t.subtopics.map((s) => ({
        key: "subtopic:" + s.id,
        title: s.title,
        description: "Lesson · " + t.title,
        href: "/learn/" + t.slug + "#" + s.id,
      })),
    ),
    ...projects.map((p) => ({
      key: "project:" + p.id,
      title: p.title,
      description: "Project",
      href: "/projects/" + p.slug,
    })),
    ...resources.map((r) => ({
      key: "resource:" + r.id,
      title: r.title,
      description: "Resource · " + r.provider,
      href: r.url,
    })),
  ];
  const list = records.filter(
    (r) =>
      (tab === "bookmarks"
        ? state.bookmarks.includes(r.key)
        : Boolean(state.notes[r.key]?.trim())) &&
      (
        r.title +
        " " +
        r.description +
        " " +
        (tab === "notes" ? state.notes[r.key] : "")
      )
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="KEEP THE USEFUL THINGS CLOSE"
        title="A space for your future self."
        description="Your bookmarked lessons, resources and projects, alongside the notes you have written in your own words."
      />
      <div className="library-toolbar">
        <div className="view-tabs" role="tablist" aria-label="Saved content">
          <button
            role="tab"
            aria-selected={tab === "bookmarks"}
            onClick={() => setTab("bookmarks")}
          >
            Bookmarks<span>{state.bookmarks.length}</span>
          </button>
          <button
            role="tab"
            aria-selected={tab === "notes"}
            onClick={() => setTab("notes")}
          >
            My notes
            <span>
              {Object.values(state.notes).filter((x) => x.trim()).length}
            </span>
          </button>
        </div>
        <label className="search-field">
          <Search size={16} />
          <input
            aria-label="Search saved items"
            placeholder="Find something you saved…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      {list.length ? (
        <div className="saved-list">
          {list.map((r) => (
            <article className="saved-card" key={r.key}>
              <div>
                <span className="eyebrow">{r.description}</span>
                <h3>
                  <Link href={r.href}>
                    {r.title}
                    <ArrowUpRight size={16} />
                  </Link>
                </h3>
                {tab === "notes" && <p>{state.notes[r.key]}</p>}
              </div>
              {tab === "bookmarks" && <BookmarkButton itemKey={r.key} small />}
            </article>
          ))}
        </div>
      ) : (
        <Empty
          title={
            query
              ? "No saved items match"
              : "Your collection starts with a bookmark."
          }
          description={
            tab === "notes"
              ? "Write notes in any topic, lesson or project. They will be collected here."
              : "Save a useful concept or resource as you explore. Your future self will thank you."
          }
          href="/roadmap"
          label="Explore the roadmap"
        />
      )}
    </>
  );
}
