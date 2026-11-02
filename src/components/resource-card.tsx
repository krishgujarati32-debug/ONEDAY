"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Resource, ResourceLearningMoment } from "@/lib/types";
import {
  resourceContentTypes,
  phaseNumber,
  resourcePhase,
  resourceTopicById,
  stageLabel,
} from "@/lib/resource-learning";
import { projects } from "@/data/projects";
import { BookmarkButton, Pill } from "./ui";
function TopicLink({ id }: { id: string }) {
  const t = resourceTopicById[id];
  return t ? <Link href={"/learn/" + t.slug}>{t.title}</Link> : null;
}
function MomentPlan({
  resource,
  moment: m,
  later = false,
  expanded = false,
}: {
  resource: Resource;
  moment: ResourceLearningMoment;
  later?: boolean;
  expanded?: boolean;
}) {
  const topic = resourceTopicById[m.topicId];
  return (
    <details className="resource-moment" open={expanded || undefined}>
      <summary>
        {later ? "Read later · " : ""}Phase {phaseNumber(m.phaseNumber)} ·{" "}
        {topic.title}
        {m.isPrimaryMoment ? " · Primary" : ""}
      </summary>
      <div className="resource-plan">
        <Pill tone={m.advanced ? "amber" : "purple"}>
          {stageLabel(resource, m)}
        </Pill>
        <p>
          <strong>Open when:</strong> {m.startWhen}
        </p>
        <h4>Before you start</h4>
        {m.prerequisiteTopicIds.length ? (
          <ul>
            {m.prerequisiteTopicIds.map((id) => (
              <li key={id}>
                <TopicLink id={id} />
              </li>
            ))}
          </ul>
        ) : (
          <p>
            No prior roadmap topic is required. Start with this topic’s
            introduction.
          </p>
        )}
        {m.previousLessonIds.length > 0 && (
          <>
            <h4>Read these lessons first</h4>
            <ul>
              {m.previousLessonIds.map((id) => {
                const t = Object.values(resourceTopicById).find((t) =>
                  t.subtopics.some((s) => s.id === id),
                );
                const lesson = t?.subtopics.find((s) => s.id === id);
                return t && lesson ? (
                  <li key={id}>
                    <Link href={"/learn/" + t.slug + "#" + id}>
                      {lesson.title}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </>
        )}
        <h4>Read in this order</h4>
        <ol>
          {m.focusSections.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <h4>What to learn</h4>
        <ul>
          {m.learningObjectives.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h4>Why this resource now</h4>
        <p>{m.whyAtThisStage}</p>
        <h4>After reading, try this</h4>
        <p>{m.practicalTask}</p>
        <h4>You are finished when</h4>
        <ul>
          {m.completionCriteria.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h4>What comes next</h4>
        <p>{m.nextStep}</p>
        {m.nextTopicId && <TopicLink id={m.nextTopicId} />}
        {m.projectIds.length > 0 && (
          <>
            <h4>Use it in a project</h4>
            <ul>
              {m.projectIds.map((id) => {
                const p = projects.find((p) => p.id === id)!;
                return (
                  <li key={id}>
                    <Link href={"/projects/" + p.slug}>{p.title}</Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <p className="muted">
          Suggested focused session: about {m.estimatedMinutes} minutes. These
          are recommendations, not lesson locks.
        </p>
      </div>
    </details>
  );
}
export function ResourceCard({
  resource: r,
  moments = r.learningMoments,
  showUpcoming = false,
  id,
}: {
  resource: Resource;
  moments?: ResourceLearningMoment[];
  showUpcoming?: boolean;
  id?: string;
}) {
  const [guideOpen, setGuideOpen] = useState(false);
  const first = moments[0];
  const primary = r.learningMoments.find((m) => m.isPrimaryMoment)!;
  const upcoming = showUpcoming
    ? r.learningMoments.filter(
        (m) =>
          !moments.some((s) => s.id === m.id) &&
          m.sequenceOrder > first.sequenceOrder,
      )
    : [];
  return (
    <article className="resource-card resource-learning-card" id={id}>
      <div className="between">
        <span className="eyebrow">{r.provider}</span>
        <BookmarkButton itemKey={"resource:" + r.id} small />
      </div>
      <h3>
        <a href={r.url} target="_blank" rel="noreferrer">
          {r.title}
          <ArrowUpRight size={17} />
        </a>
      </h3>
      <p>{r.description}</p>
      <div className="resource-badges">
        <Pill tone={r.priority === "core" ? "purple" : "amber"}>
          {r.priority}
        </Pill>
        <Pill>Phase {phaseNumber(first.phaseNumber)}</Pill>
        <span>{stageLabel(r, first)}</span>
      </div>
      <div className="resource-placement">
        <Link href={"/roadmap/" + resourcePhase(first.phaseNumber).slug}>
          {resourcePhase(first.phaseNumber).shortTitle}
        </Link>
        <TopicLink id={first.topicId} />
      </div>
      <p>
        <strong>When to open:</strong> {first.recommendedTiming}
      </p>
      <p>
        <strong>Why now:</strong> {first.whyAtThisStage}
      </p>
      <div className="resource-meta">
        <Pill
          tone={
            r.verificationStatus === "verified" && r.free ? "green" : "amber"
          }
        >
          {r.verificationStatus !== "verified"
            ? "Reading access needs review"
            : r.free
              ? "Free to read"
              : "Paid material"}
        </Pill>
        <span>{resourceContentTypes[r.contentType]}</span>
      </div>
      <details
        className="resource-guide"
        onToggle={(e) => setGuideOpen(e.currentTarget.open)}
      >
        <summary>
          Learning guide · {moments.length}
          {moments.length !== r.learningMoments.length
            ? " matching"
            : ""} of {r.learningMoments.length} learning{" "}
          {r.learningMoments.length === 1 ? "moment" : "moments"}
        </summary>
        {guideOpen && (
          <>
            {moments.map((m, i) => (
              <MomentPlan
                resource={r}
                moment={m}
                expanded={i === 0}
                key={m.id}
              />
            ))}
            {upcoming.map((m) => (
              <MomentPlan resource={r} moment={m} later key={m.id} />
            ))}
            <div className="resource-plan resource-catalog-notes">
              <h4>Primary placement</h4>
              <p>
                Phase {phaseNumber(primary.phaseNumber)} ·{" "}
                {resourcePhase(primary.phaseNumber).shortTitle}
              </p>
              <TopicLink id={primary.topicId} />
              <h4>Related topics</h4>
              <div className="resource-topic-links">
                {r.relatedTopicIds.map((id) => (
                  <TopicLink id={id} key={id} />
                ))}
              </div>
              <h4>Scope and usage</h4>
              <p>{r.usageNotes}</p>
              {r.supplementalUrls.length > 0 && (
                <>
                  <h4>Selected official guides</h4>
                  <ul>
                    {r.supplementalUrls.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noreferrer">
                          {s.title} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <p className="muted">
                {r.verificationStatus === "verified"
                  ? `Official link verified ${r.verifiedAt}.`
                  : "Link needs review."}{" "}
                {r.verificationNotes}
              </p>
              {moments.length !== r.learningMoments.length && (
                <Link
                  href={"/resources#" + r.id}
                  target="_blank"
                  rel="noreferrer"
                >
                  See every learning moment in the library (new tab)
                </Link>
              )}
            </div>
          </>
        )}
      </details>
      <a
        className="text-link resource-open"
        href={r.url}
        target="_blank"
        rel="noreferrer"
      >
        Open resource
        <ArrowUpRight size={13} />
      </a>
    </article>
  );
}
