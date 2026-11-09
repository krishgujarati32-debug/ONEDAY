"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { useLearning } from "./learning-provider";
import {
  formatPercent,
  nextLearningStep,
  phaseIndex,
  progress,
  subtopicIndex,
} from "@/lib/progress";
import { projects } from "@/data/projects";
import { ProgressBar } from "./ui";

export function Dashboard() {
  const { state, ready } = useLearning();
  const current = nextLearningStep(state);
  const overall = progress(subtopicIndex, state);
  const phaseNumber = current?.phase.number ?? phaseIndex.at(-1)?.number ?? 0;
  const project = projects.find(
    (item) =>
      item.phases[0] <= phaseNumber &&
      item.requirements.some(
        (_, index) => !state.projectChecks[item.id + "." + index],
      ),
  );
  const milestone = project?.requirements.find(
    (_, index) => !state.projectChecks[project.id + "." + index],
  );
  if (!ready)
    return (
      <section className="content-card" aria-busy="true">
        <h1>Your dashboard</h1>
        <p>Loading your progress…</p>
      </section>
    );
  return (
    <>
      <div className="dashboard-heading">
        <div>
          <span className="eyebrow">ONEDAY LEARNING PATH</span>
          <h1>
            {state.settings.name
              ? "Your dashboard, " + state.settings.name.split(" ")[0]
              : "Your dashboard"}
          </h1>
          <p>
            Continue the next unfinished lesson or practice in the AI Systems
            Engineering sequence.
          </p>
        </div>
      </div>
      <section className="content-card">
        <h2>{formatPercent(overall.percent)} complete</h2>
        <p>
          {overall.completed.toLocaleString()} of{" "}
          {overall.total.toLocaleString()} lessons completed
        </p>
        <ProgressBar value={overall.percent} label="Learning path completion" />
      </section>
      <section className="content-card top-space">
        <span className="eyebrow">CONTINUE LEARNING</span>
        {current ? (
          <>
            <h2>
              {current.kind === "practice"
                ? "Finish topic practice"
                : current.lesson.title}
            </h2>
            <p>
              Phase {String(current.phase.number).padStart(2, "0")} ·{" "}
              {current.phase.shortTitle} / {current.topic.title}
            </p>
            {current.kind === "lesson" && (
              <p>
                Lesson {current.number} · {current.lesson.minutes} minutes
                suggested
              </p>
            )}
            <Link href={current.href} className="button button-primary">
              {current.kind === "practice"
                ? "Open topic practice"
                : "Open lesson"}{" "}
              <ArrowRight size={16} />
            </Link>
          </>
        ) : (
          <>
            <h2>All lessons complete</h2>
            <p>Revisit the roadmap or review your portfolio evidence.</p>
            <Link href="/projects" className="button button-secondary">
              Review projects
            </Link>
          </>
        )}
      </section>
      {project && milestone && (
        <section className="content-card top-space">
          <span className="eyebrow">PORTFOLIO</span>
          <h2>{project.title}</h2>
          <p>{milestone}</p>
          <Link className="text-link" href={"/projects/" + project.slug}>
            Review milestone <ArrowRight size={14} />
          </Link>
        </section>
      )}
      <section className="content-card top-space">
        <h2>Progress by phase</h2>
        <div className="related-links">
          {phaseIndex.map((phase) => {
            const result = progress(
              phase.topics.flatMap((topic) => topic.subtopics),
              state,
            );
            return (
              <Link key={phase.id} href={"/roadmap/" + phase.slug}>
                <BookOpen size={17} />
                <span>
                  {String(phase.number).padStart(2, "0")}. {phase.shortTitle}
                </span>
                <span>
                  {result.completed}/{result.total}
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
