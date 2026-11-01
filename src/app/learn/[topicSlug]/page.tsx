import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Flag } from "lucide-react";
import { topics, topicBySlug, topicById, phases } from "@/data/curriculum";
import { projects } from "@/data/projects";
import { BookmarkButton, PageHeading, Pill } from "@/components/ui";
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
  const topic = topicBySlug[(await params).topicSlug];
  if (!topic) notFound();
  const phase = phases[topic.phase];
  const i = topics.indexOf(topic);
  const prev = topics[i - 1],
    next = topics[i + 1];
  return (
    <>
      <Link className="back-link" href={"/roadmap/" + phase.slug}>
        <ArrowLeft size={14} />
        Phase {phase.number} · {phase.shortTitle}
      </Link>
      <PageHeading
        eyebrow="THE LEARNING ROOM"
        title={topic.title}
        description={topic.why}
        action={<BookmarkButton itemKey={"topic:" + topic.id} />}
      />
      <div className="topic-page-meta">
        <Pill tone={topic.priority === "core" ? "purple" : "amber"}>
          {topic.priority}
        </Pill>
        <span className="capitalize">{topic.difficulty}</span>
        <span>
          <Clock3 size={14} />
          {Number(topic.hours.toFixed(1))}h suggested study
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
          <strong>Recommended first</strong>
          {topic.prerequisites.map((id) => (
            <Link href={"/learn/" + topicById[id].slug} key={id}>
              {topicById[id].title}
              <ArrowRight size={13} />
            </Link>
          ))}
          <small>You can explore this topic freely.</small>
        </div>
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
