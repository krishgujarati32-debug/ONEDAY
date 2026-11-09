"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Boxes, Braces, Search } from "lucide-react";
import { resources } from "@/data/resources";
import { projects } from "@/data/projects";
import { topicIndex, formatPercent } from "@/lib/progress";
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
export function ProjectLibrary() {
  const { state } = useLearning();
  return (
    <>
      <PageHeading
        eyebrow="KNOWLEDGE BECOMES CAPABILITY WHEN YOU BUILD"
        title="Your ideas, engineered."
        description="Five backend and engineering builds that lead to the CCAI capstone."
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
          href={"/projects/" + projects.at(-1)!.slug}
          className="button button-secondary"
        >
          Explore the flagship
          <ArrowUpRight size={16} />
        </Link>
      </div>
      <div className="projects-grid">
        {projects.map((p, index) => {
          const complete = p.requirements.filter(
            (_, i) => state.projectChecks[`${p.id}.${i}`],
          ).length;
          return (
            <article className="build-card" key={p.id}>
              <div className="build-card-visual">
                <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
                <div className="build-icon">
                  {index === projects.length - 1 ? (
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
                <p>{p.purpose}</p>
                <div className="tech-tags">
                  {p.technologies.slice(0, 4).map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="build-progress">
                  <div className="between">
                    <span>
                      {complete}/{p.requirements.length} milestones
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
          <h2>Your milestones</h2>
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
