import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Flag,
} from "lucide-react";
import { phases, phaseBySlug } from "@/data/curriculum";
import { projects } from "@/data/projects";
import { phaseIndex } from "@/lib/progress";
import { TopicCard } from "@/components/roadmap";
import { LiveProgress, PageHeading, Pill } from "@/components/ui";
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
  const phase = phaseBySlug[(await params).phaseSlug];
  if (!phase) notFound();
  const summary = phaseIndex.find((p) => p.id === phase.id)!;
  const items = phase.topics.flatMap((t) => t.subtopics);
  const prev = phases[phase.number - 1],
    next = phases[phase.number + 1];
  return (
    <>
      <Link className="back-link" href="/roadmap">
        <ArrowLeft size={14} />
        The complete roadmap
      </Link>
      <PageHeading
        eyebrow={"PHASE " + String(phase.number).padStart(2, "0")}
        title={phase.shortTitle}
        description={phase.purpose}
        action={
          <Pill tone={phase.priority === "core" ? "purple" : "amber"}>
            {phase.priority === "core"
              ? "Core learning path"
              : "Advanced · optional"}
          </Pill>
        }
      />
      <div className="detail-layout">
        <div>
          <div className="content-card">
            <h2>Build the right foundation.</h2>
            <p>{phase.why}</p>
            {phase.number === 2 && (
              <div className="callout">
                This is a parallel learning track. Keep writing code while you
                study maths; revisit the relevant sections as ML concepts need
                them.
              </div>
            )}
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
              <TopicCard key={t.id} topic={t} number={i + 1} />
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
                Complete the core lessons and reproduce their exercises without
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
                Optional exploration does not block your core path. Elapsed time
                never marks a lesson complete.
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
            <small>
              Phase progress includes every lesson in this phase. Core progress
              on the dashboard excludes optional and advanced lessons.
            </small>
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
