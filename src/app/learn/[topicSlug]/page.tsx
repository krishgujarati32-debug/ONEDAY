import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Flag } from "lucide-react";
import {
  topics,
  topicBySlug,
  topicById,
  phaseByNumber,
  v5TopicRedirects,
} from "@/data/curriculum";
import { legacyTopicSlugs } from "@/data/curriculum-legacy-links";
import { projects } from "@/data/projects";
import { BookmarkButton, PageHeading } from "@/components/ui";
import { LessonRoom } from "@/components/lesson-room";
export function generateStaticParams() {
  return topics.map((t) => ({ topicSlug: t.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const t = topicBySlug[(await params).topicSlug];
  return { title: t?.title ?? "Topic not found", description: t?.explanation };
}
export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicSlug: string }>;
}) {
  const { topicSlug } = await params;
  const topic = topicBySlug[topicSlug];
  if (!topic) {
    if (Object.hasOwn(v5TopicRedirects, topicSlug))
      redirect("/learn/" + v5TopicRedirects[topicSlug]);
    if (legacyTopicSlugs.has(topicSlug)) redirect("/roadmap");
    notFound();
  }
  const phase = phaseByNumber[topic.phase];
  const i = topics.indexOf(topic);
  const prev = topics[i - 1],
    next = topics[i + 1];
  return (
    <>
      <Link className="back-link" href={"/roadmap/" + phase.slug}>
        <ArrowLeft size={14} />
        Phase {String(phase.number).padStart(2, "0")} · {phase.shortTitle}
      </Link>
      <PageHeading
        eyebrow={
          "TOPIC " + String(phase.topics.indexOf(topic) + 1).padStart(2, "0")
        }
        title={topic.title}
        description={topic.why}
        action={<BookmarkButton itemKey={"topic:" + topic.id} />}
      />
      <div className="topic-page-meta">
        <span className="capitalize">{topic.difficulty}</span>
        <span>
          <Clock3 size={14} />
          {topic.depth
            ? topic.depth.estimatedStudyHours.join("–")
            : Number(topic.hours.toFixed(1))}
          h suggested study
        </span>
        <span>
          <BookOpen size={14} />
          {topic.subtopics.length} lessons
        </span>
        <span>
          <Flag size={14} />
          {topic.subtopics.length + 1} practical tasks
        </span>
      </div>
      {topic.prerequisites.length > 0 && (
        <div className="prerequisite-banner">
          <strong>Previous topic</strong>
          {topic.prerequisites.map((id) => (
            <Link href={"/learn/" + topicById[id].slug} key={id}>
              {topicById[id].title}
              <ArrowRight size={13} />
            </Link>
          ))}
          <small>Use the previous topic for prerequisite review.</small>
        </div>
      )}
      {topic.depth && (
        <section
          className="content-card top-space"
          aria-labelledby="mastery-target"
        >
          <p className="eyebrow">TOPIC DEPTH TARGET</p>
          <h2 id="mastery-target">
            {topic.depth.targetDepth} · {topic.depth.targetDepthLabel}
          </h2>
          <h3>How deeply you need to learn this topic</h3>
          <p>{topic.depth.howDeepToLearn}</p>
          <h3>What to learn</h3>
          <ul className="plain-list">
            {topic.depth.whatToLearn.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>What you should be able to do</h3>
          <p>{topic.depth.whatTheLearnerMustBeAbleToDo}</p>
          <h3>Out of scope at this level</h3>
          <p>{topic.depth.outOfScopeAtThisLevel}</p>
          <a className="text-link" href="#assignment">
            Review the practice evidence
          </a>
        </section>
      )}
      <LessonRoom topic={topic} />
      <section className="content-card top-space">
        <h3>Build with these skills</h3>
        <div className="related-links">
          {projects
            .filter((p) => p.phases.includes(topic.phase))
            .slice(0, 3)
            .map((p) => (
              <Link href={"/projects/" + p.slug} key={p.id}>
                <Flag size={17} />
                <span>{p.title}</span>
                <ArrowRight size={16} />
              </Link>
            ))}
        </div>
      </section>
      <nav className="prev-next" aria-label="Topic navigation">
        {prev ? (
          <Link href={"/learn/" + prev.slug}>
            <ArrowLeft size={17} />
            <span>
              <small>PREVIOUS TOPIC</small>
              {prev.title}
            </span>
          </Link>
        ) : (
          <Link href="/roadmap">Back to the roadmap</Link>
        )}
        {next ? (
          <Link href={"/learn/" + next.slug}>
            <span>
              <small>NEXT TOPIC</small>
              {next.title}
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
