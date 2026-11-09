import Link from "next/link";
import { Fragment } from "react";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flag,
} from "lucide-react";
import {
  phases,
  phaseBySlug,
  phaseByNumber,
  topicById,
  v5DeploymentSpan,
} from "@/data/curriculum";
import { legacyPhaseAliases } from "@/data/curriculum-legacy-links";
import { projects } from "@/data/projects";
import { jobReadyCriteria } from "@/data/job-ready";
import { JobReadyCheckpoint } from "@/components/job-ready-checkpoint";
import { phaseIndex } from "@/lib/progress";
import { TopicCard } from "@/components/roadmap";
import { LiveProgress, PageHeading } from "@/components/ui";
export function generateStaticParams() {
  return phases.map((p) => ({ phaseSlug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ phaseSlug: string }>;
}) {
  const p = phaseBySlug[(await params).phaseSlug];
  return { title: p?.shortTitle ?? "Phase not found" };
}
export default async function PhasePage({
  params,
}: {
  params: Promise<{ phaseSlug: string }>;
}) {
  const { phaseSlug } = await params;
  const phase = phaseBySlug[phaseSlug];
  if (!phase) {
    const alias = legacyPhaseAliases[phaseSlug];
    if (alias) redirect("/roadmap/" + phaseByNumber[alias].slug);
    notFound();
  }
  const summary = phaseIndex.find((p) => p.id === phase.id)!;
  const items = phase.topics.flatMap((t) => t.subtopics);
  const prev = phaseByNumber[phase.number - 1],
    next = phaseByNumber[phase.number + 1];
  return (
    <>
      <Link className="back-link" href="/roadmap">
        <ArrowLeft size={14} />
        The complete roadmap
      </Link>
      <PageHeading
        eyebrow={"PHASE " + String(phase.number).padStart(2, "0")}
        title={phase.title}
        description={phase.purpose}
      />
      <div className="detail-layout">
        <div>
          <div className="content-card">
            <h2>Build the right foundation.</h2>
            <p>{phase.why}</p>
            <h3>What you’ll be able to do</h3>
            <ul className="check-list">
              {phase.outcomes.map((x) => (
                <li key={x}>
                  <CheckCircle2 size={16} />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <h3>Recommended before this phase</h3>
            {phase.prerequisites.length ? (
              <div className="prerequisite-links">
                {phase.prerequisites.map((id) => {
                  const p = phases.find((p) => p.id === id)!;
                  return (
                    <Link href={"/roadmap/" + p.slug} key={id}>
                      Phase {p.number} · {p.shortTitle}
                      <ArrowRight size={14} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p>No prerequisites. This is your starting point.</p>
            )}
          </div>
          <div className="section-heading compact">
            <div>
              <span className="eyebrow">IN THE RECOMMENDED ORDER</span>
              <h2>Your topics in this phase</h2>
            </div>
            <span className="muted">{phase.topics.length} topics</span>
          </div>
          <div className="topic-list">
            {summary.topics.map((t, i) => (
              <Fragment key={t.id}>
                <TopicCard topic={t} number={i + 1} />
                {phase.number === 12 && i + 1 === v5DeploymentSpan[1] && (
                  <JobReadyCheckpoint
                    foundations={summary.topics.slice(0, v5DeploymentSpan[1])}
                    criteria={jobReadyCriteria.map(({ id, text, topicId }) => ({
                      id,
                      text,
                      href: "/learn/" + topicById[topicId].slug,
                    }))}
                    projects={projects
                      .filter((project) => project.targetDepth === "L3")
                      .map((project) => ({
                        id: project.id,
                        title: project.title,
                        href: "/projects/" + project.slug,
                        milestoneCount: project.milestones.length,
                      }))}
                  />
                )}
              </Fragment>
            ))}
          </div>
          <section className="content-card top-space">
            <h2>Put it into practice</h2>
            <p>
              Every topic has an assignment. Use these projects to connect the
              skills into working software.
            </p>
            <div className="related-links">
              {projects
                .filter((p) => p.phases.includes(phase.number))
                .map((p) => (
                  <Link key={p.id} href={"/projects/" + p.slug}>
                    <Flag size={17} />
                    <span>{p.title}</span>
                    <ArrowRight size={16} />
                  </Link>
                ))}
            </div>
            <h3>Phase completion criteria</h3>
            <ul className="plain-list">
              <li>
                Complete the lessons and reproduce their exercises without
                copying.
              </li>
              <li>
                Finish each topic’s assignment, test an edge case and explain
                the result.
              </li>
              <li>
                Document questions and revisit lessons marked for revision.
              </li>
              <li>
                Record completion after you reproduce the exercise and meet its
                criteria.
              </li>
            </ul>
          </section>
        </div>
        <aside className="detail-aside">
          <section className="content-card phase-summary">
            <span
              className="phase-icon"
              style={{ color: phase.color, background: phase.color + "15" }}
            >
              <BookOpen size={25} />
            </span>
            <h3>A phase at a glance</h3>
            <dl>
              <div>
                <dt>Suggested duration</dt>
                <dd>{phase.weeks}</dd>
              </div>
              <div>
                <dt>Difficulty</dt>
                <dd className="capitalize">{phase.difficulty}</dd>
              </div>
              <div>
                <dt>Topics</dt>
                <dd>{phase.topics.length}</dd>
              </div>
              <div>
                <dt>Trackable lessons</dt>
                <dd>{items.length}</dd>
              </div>
              <div>
                <dt>Suggested study time</dt>
                <dd>
                  {Math.round(phase.topics.reduce((n, t) => n + t.hours, 0))}{" "}
                  hours
                </dd>
              </div>
            </dl>
            <LiveProgress items={items} />
            <Link
              href={"/learn/" + phase.topics[0].slug}
              className="button button-primary full-width"
            >
              Start this phase
              <ArrowRight size={16} />
            </Link>
            <small>Phase progress uses the active lessons in this phase.</small>
          </section>
        </aside>
      </div>
      <nav className="prev-next" aria-label="Phase navigation">
        {prev ? (
          <Link href={"/roadmap/" + prev.slug}>
            <ArrowLeft size={17} />
            <span>
              <small>PREVIOUS PHASE</small>
              {prev.shortTitle}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={"/roadmap/" + next.slug}>
            <span>
              <small>NEXT PHASE</small>
              {next.shortTitle}
            </span>
            <ArrowRight size={17} />
          </Link>
        ) : (
          <Link href="/projects">
            Build your capstone
            <ArrowRight size={17} />
          </Link>
        )}
      </nav>
    </>
  );
}
