import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Flag } from "lucide-react";
import { projects, projectBySlug } from "@/data/projects";
import { phases } from "@/data/curriculum";
import { BookmarkButton, PageHeading } from "@/components/ui";
import { ProjectWorkspace } from "@/components/libraries";
export function generateStaticParams() {
  return projects.map((p) => ({ projectSlug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const p = projectBySlug[(await params).projectSlug];
  return { title: p?.title ?? "Project not found" };
}
export default async function Page({
  params,
}: {
  params: Promise<{ projectSlug: string }>;
}) {
  const project = projectBySlug[(await params).projectSlug];
  if (!project) notFound();
  const i = projects.indexOf(project);
  return (
    <>
      <Link className="back-link" href="/projects">
        <ArrowLeft size={14} />
        All build projects
      </Link>
      <PageHeading
        eyebrow={
          "PROJECT " +
          String(i + 1).padStart(2, "0") +
          " · " +
          project.difficulty.toUpperCase()
        }
        title={project.title}
        description={project.purpose}
        action={<BookmarkButton itemKey={"project:" + project.id} />}
      />
      <div className="detail-layout">
        <div>
          <section className="content-card">
            <span className="eyebrow">BUILD WITH INTENTION</span>
            <h2>{project.subtitle}</h2>
            <h3>What you are working toward</h3>
            <p>{project.result}</p>
            <h3>Why this project matters</h3>
            <p>{project.purpose}</p>
            <h3>Step-by-step milestones</h3>
            <ol className="project-milestones">
              {project.milestones.map((m, i) => (
                <li key={m}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <p>{m}</p>
                </li>
              ))}
            </ol>
            <h3>Learning objectives</h3>
            <ul className="check-list">
              {project.milestones.map((m) => (
                <li key={m}>
                  <CheckCircle2 size={15} />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>
          <div className="top-space">
            <ProjectWorkspace project={project} />
          </div>
          <section className="content-card top-space">
            <h2>Make the result reviewable.</h2>
            <h3>Your GitHub documentation should contain</h3>
            <ul className="plain-list">
              <li>The problem, intended user and scope of the solution.</li>
              <li>
                Architecture and data flow, plus important design decisions.
              </li>
              <li>
                Reproducible setup commands and environment variable names
                without credentials.
              </li>
              <li>
                Examples, test commands, evaluation results and known
                limitations.
              </li>
              <li>Dataset and model provenance and licenses where relevant.</li>
            </ul>
            <h3>Deployment requirements</h3>
            <p>{project.deployment}</p>
            <h3>Completion criteria</h3>
            <p>
              {project.result} Verify every functional requirement, demonstrate
              failure handling, run your tests and explain the choices in your
              README.
            </p>
            <h3>Optional extensions</h3>
            <ul className="plain-list">
              {project.extensions.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        </div>
        <aside className="detail-aside">
          <section className="content-card">
            <span className="phase-icon">
              <Flag size={22} />
            </span>
            <h3>Your project toolkit</h3>
            <div className="tech-tags">
              {project.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <h3>Required skills & topics</h3>
            <p>
              Review the relevant skills before each milestone; you can explore
              the plan at any time.
            </p>
            <div className="project-prerequisites">
              {project.phases.map((n) => (
                <details key={n}>
                  <summary>
                    Phase {n} · {phases[n].shortTitle}
                  </summary>
                  <Link
                    className="text-link"
                    href={"/roadmap/" + phases[n].slug}
                  >
                    Review phase
                    <ArrowRight size={12} />
                  </Link>
                  {phases[n].topics
                    .filter((t) => t.priority === "core" || n === 11)
                    .map((t) => (
                      <Link key={t.id} href={"/learn/" + t.slug}>
                        {t.title}
                        <ArrowRight size={11} />
                      </Link>
                    ))}
                </details>
              ))}
            </div>
          </section>
        </aside>
      </div>
      <nav className="prev-next" aria-label="Project navigation">
        {i > 0 ? (
          <Link href={"/projects/" + projects[i - 1].slug}>
            <ArrowLeft size={16} />
            <span>
              <small>PREVIOUS BUILD</small>
              {projects[i - 1].title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {i < projects.length - 1 ? (
          <Link href={"/projects/" + projects[i + 1].slug}>
            <span>
              <small>NEXT BUILD</small>
              {projects[i + 1].title}
            </span>
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Link href="/dashboard">
            Review your journey
            <ArrowRight size={16} />
          </Link>
        )}
      </nav>
    </>
  );
}
