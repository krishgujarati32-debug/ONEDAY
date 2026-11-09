import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects, projectBySlug } from "@/data/projects";
import {
  legacyProjectBySlug,
  projectSuccessors,
} from "@/data/curriculum-legacy-links";
import { technologies } from "@/data/technologies";
import { depthLabels } from "@/data/course-v5-types";
import { resources } from "@/data/resources";
import { lessonNeighbors } from "@/lib/progress";
import { PageHeading } from "@/components/ui";
import { ProjectWorkspace } from "@/components/libraries";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ projectSlug: slug }));
}
type Props = { params: Promise<{ projectSlug: string }> };
export async function generateMetadata({ params }: Props) {
  return {
    title:
      projectBySlug[(await params).projectSlug]?.title ?? "Project not found",
  };
}

export default async function ProjectPage({ params }: Props) {
  const { projectSlug } = await params;
  const project = projectBySlug[projectSlug];
  if (!project) {
    const legacy = legacyProjectBySlug[projectSlug];
    if (legacy) {
      const successor = projects.find(
        (candidate) => candidate.id === (projectSuccessors[legacy] ?? legacy),
      );
      redirect(successor ? "/projects/" + successor.slug : "/projects");
    }
    notFound();
  }
  const position = projects.indexOf(project);
  const relatedTopics = new Set(
    project.prerequisiteLessons?.map(
      (id) => lessonNeighbors(id)?.current.topic.id,
    ),
  );
  const references = resources.filter(
    (resource) =>
      resource.relatedTopicIds.some((id) => relatedTopics.has(id)) ||
      resource.learningMoments.some((moment) =>
        moment.projectIds.includes(project.id),
      ),
  );
  return (
    <>
      <Link className="back-link" href="/projects">
        <ArrowLeft size={14} /> All projects
      </Link>
      <PageHeading
        eyebrow={project.subtitle.toUpperCase()}
        title={project.title}
        description={project.purpose}
      />
      <div className="detail-layout">
        <div>
          <section className="content-card">
            <h2>Expected outcome</h2>
            {project.targetDepth && (
              <p>
                Target depth {project.targetDepth} ·{" "}
                {depthLabels[project.targetDepth]}
              </p>
            )}
            <p>{project.result}</p>
            <h3>Architecture and data flow</h3>
            <p>{project.architecture}</p>
            <h3>Repository structure</h3>
            <p>
              <code>{project.folderStructure}</code>
            </p>
            <h3>Acceptance tests</h3>
            <ul className="plain-list">
              {project.checks?.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </section>
          <div className="top-space">
            <ProjectWorkspace project={project} />
          </div>
          <section className="content-card top-space">
            <h2>Delivery and review</h2>
            <p>{project.deployment}</p>
            <p>
              Document the problem, API or CLI contract, setup, configuration
              names, security boundaries, tests, measured results and
              limitations. Include failure recovery for services that retain
              data.
            </p>
          </section>
        </div>
        <aside className="detail-aside">
          <section className="content-card">
            <h2>Prerequisite lessons</h2>
            <div className="related-links">
              {project.prerequisiteLessons?.map((id) => {
                const entry = lessonNeighbors(id)?.current;
                return (
                  entry && (
                    <Link href={entry.href} key={id}>
                      <span>
                        {entry.number} · {entry.lesson.title}
                      </span>
                      <ArrowRight size={14} />
                    </Link>
                  )
                );
              })}
            </div>
            <h3>Technology stack</h3>
            <ul className="plain-list">
              {project.technologies.map((name) => (
                <li key={name}>
                  <strong>{name}</strong> ·{" "}
                  {technologies.find((tool) => tool.name === name)?.description}
                </li>
              ))}
            </ul>
            {references.length > 0 && (
              <>
                <h3>Reference documentation</h3>
                <ul className="plain-list">
                  {references.map((item) => (
                    <li key={item.id}>
                      <a
                        className="text-link"
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </aside>
      </div>
      <nav className="prev-next" aria-label="Project navigation">
        {position > 0 ? (
          <Link href={"/projects/" + projects[position - 1].slug}>
            <ArrowLeft size={14} /> {projects[position - 1].title}
          </Link>
        ) : (
          <span />
        )}
        {position < projects.length - 1 ? (
          <Link href={"/projects/" + projects[position + 1].slug}>
            {projects[position + 1].title} <ArrowRight size={14} />
          </Link>
        ) : (
          <Link href="/dashboard">
            Back to your dashboard <ArrowRight size={14} />
          </Link>
        )}
      </nav>
    </>
  );
}
