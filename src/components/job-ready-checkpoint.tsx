"use client";

import Link from "next/link";
import { useLearning } from "./learning-provider";
import { jobReadyEvidenceId } from "@/data/job-ready";
import { topicStatus, type TrackItem } from "@/lib/progress";

type Props = {
  foundations: { id: string; subtopics: TrackItem[] }[];
  criteria: { id: string; text: string; href: string }[];
  projects: {
    id: string;
    title: string;
    href: string;
    milestoneCount: number;
  }[];
};

export function JobReadyCheckpoint({ foundations, criteria, projects }: Props) {
  const { state, ready, pending, mode, setStatus } = useLearning();
  const skillsDone = criteria.filter(
    ({ id }) => state.progress[jobReadyEvidenceId(id)]?.status === "completed",
  ).length;
  const foundationsDone = foundations.filter(
    (topic) => topicStatus(topic.subtopics, state, topic.id) === "completed",
  ).length;
  const finishedProjects = projects.filter(({ id, milestoneCount }) =>
    Array.from(
      { length: milestoneCount },
      (_, i) => state.projectChecks[id + "." + i],
    ).every(Boolean),
  );
  const complete =
    foundationsDone === foundations.length &&
    skillsDone === criteria.length &&
    finishedProjects.length >= 2;

  return (
    <section className="content-card" id="job-ready-foundation">
      <h2>Job-Ready Foundation Checkpoint</h2>
      <p>
        Use this checkpoint after the Phase 12 deployment and security
        foundation. Reproduce the evidence and demonstrate two working portfolio
        projects. The checklist records your preparation and self-assessment.
      </p>
      <ul className="plain-list">
        <li>
          {foundationsDone}/{foundations.length} deployment foundation topics
          complete
        </li>
        <li>
          {skillsDone}/{criteria.length} skill demonstrations recorded
        </li>
        <li>
          {finishedProjects.length} portfolio projects with all milestones
          recorded · 2 required
        </li>
      </ul>
      <div className="project-checklist">
        {criteria.map(({ id, text, href }) => {
          const key = jobReadyEvidenceId(id);
          return (
            <div key={id}>
              <label
                className={
                  state.progress[key]?.status === "completed" ? "checked" : ""
                }
              >
                <input
                  type="checkbox"
                  checked={state.progress[key]?.status === "completed"}
                  disabled={
                    !ready || pending || mode === "guest" || mode === "error"
                  }
                  onChange={(event) =>
                    void setStatus(
                      key,
                      event.currentTarget.checked ? "completed" : "not_started",
                    )
                  }
                />
                <span>{text}</span>
              </label>
              <Link className="text-link" href={href}>
                Review related topic
              </Link>
            </div>
          );
        })}
      </div>
      <h3>Project demonstrations</h3>
      <div className="related-links">
        {projects.map(({ id, title, href }) => (
          <Link key={id} href={href}>
            {title}
          </Link>
        ))}
      </div>
      <p>
        {complete
          ? "Foundation checkpoint recorded."
          : "Complete the foundation topics, skill demonstrations and two project builds to record the checkpoint."}
      </p>
      <p>
        Kubernetes, Terraform, advanced production operations and the CCAI
        capstone follow later in the curriculum.
      </p>
    </section>
  );
}
