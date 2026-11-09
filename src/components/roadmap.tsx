"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronRight,
  Clock3,
  Layers3,
} from "lucide-react";
import { phaseIndex, topicStatus } from "@/lib/progress";
import { useLearning } from "./learning-provider";
import { LiveProgress, Time } from "./ui";
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
      </div>
      <span className="eyebrow phase-eyebrow">
        PHASE {String(phase.number).padStart(2, "0")}
      </span>
      <h2>
        <Link href={"/roadmap/" + phase.slug}>
          {phase.title}
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
          {phase.number === 1
            ? "Start here"
            : "After Phase " + String(phase.number - 1).padStart(2, "0")}
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
  const status = topicStatus(topic.subtopics, state, topic.id);
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
  return (
    <div className="phase-grid">
      {phaseIndex.map((phase) => (
        <PhaseCard key={phase.id} phase={phase} />
      ))}
    </div>
  );
}
