import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BrainCircuit,
  Braces,
  Check,
  Compass,
  Cpu,
  Flag,
  Database,
  GitBranch,
  GraduationCap,
  Layers3,
  Network,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
} from "lucide-react";
import { phases, lessonCounts } from "@/data/curriculum";
import { projects } from "@/data/projects";
import { Pill } from "@/components/ui";
const icons = [
  Terminal,
  Braces,
  GitBranch,
  Database,
  BrainCircuit,
  Layers3,
  Blocks,
  Server,
  Network,
  Route,
  ShieldCheck,
  Compass,
  Cpu,
  Flag,
];
const roles = [
  [
    "Software Developer",
    "Builds and maintains software features across many application types.",
  ],
  [
    "Backend Developer",
    "Focuses on server-side logic, APIs, databases and service reliability.",
  ],
  [
    "Data Scientist",
    "Explores data, designs experiments and uses models to answer questions.",
  ],
  [
    "Machine Learning Engineer",
    "Builds, deploys and maintains data-driven prediction systems.",
  ],
  [
    "AI Engineer",
    "Integrates model capabilities into usable applications and workflows.",
  ],
  [
    "LLM Engineer",
    "Focuses on language models, prompting, retrieval, adaptation and evaluation.",
  ],
  [
    "AI Systems Engineer",
    "Connects models, data and software into secure, reliable, scalable systems.",
  ],
];
export default function Home() {
  return (
    <div className="home-page">
      <div className="page-kicker">
        <span className="status-dot" />
        YOUR AMBITION, WITH A DIRECTION
        <span className="kicker-line" />
      </div>
      <section className="home-hero">
        <div className="hero-copy">
          <Pill tone="purple">
            <Sparkles size={12} /> A practical path from curiosity to capability
          </Pill>
          <h1>
            Become an
            <br />
            <span>AI Systems</span>
            <br />
            Engineer<span className="heading-period">.</span>
          </h1>
          <p>
            From programming fundamentals to intelligent, scalable AI systems.
            One structured roadmap. A lifetime of possibilities.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/roadmap">
              Explore the roadmap
              <ArrowRight size={17} />
            </Link>
            <a className="button button-text" href="#career">
              Understand the career
              <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="hero-caption">
            <span className="mini-check">
              <Check size={11} />
            </span>
            Learn at your pace<span>·</span>Build with purpose<span>·</span>
            Track real progress
          </div>
        </div>
        <div
          className="system-illustration"
          aria-label="Learning journey: code foundations connect to intelligence and production systems"
        >
          <div className="diagram-topline">
            <span className="tiny-dot" />
            THE BIG PICTURE<span>01 — ∞</span>
          </div>
          <svg
            className="diagram-lines"
            viewBox="0 0 480 380"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="dotgrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <circle
                  cx="1"
                  cy="1"
                  r=".8"
                  fill="currentColor"
                  opacity=".12"
                />
              </pattern>
            </defs>
            <rect width="480" height="380" fill="url(#dotgrid)" />
            <path
              d="M115 105V170H235V210M365 105V170H235M235 270V305H115V330M235 305H365V330"
              fill="none"
              stroke="currentColor"
              opacity=".27"
              strokeDasharray="4 5"
            />
            <circle cx="235" cy="170" r="5" fill="#a999ef" />
            <circle cx="235" cy="305" r="5" fill="#a999ef" />
          </svg>
          <Link
            className="diagram-node node-code"
            href={"/roadmap/" + phases[0].slug}
          >
            <span className="node-icon">
              <Braces size={23} />
            </span>
            <span>
              <small>01 / FOUNDATIONS</small>
              <strong>Think in code</strong>
              <em>Python · Maths · CS</em>
            </span>
          </Link>
          <Link
            className="diagram-node node-model"
            href={"/roadmap/" + phases[5].slug}
          >
            <span className="node-icon blue">
              <BrainCircuit size={23} />
            </span>
            <span>
              <small>02 / INTELLIGENCE</small>
              <strong>Understand models</strong>
              <em>ML · Deep learning · LLMs</em>
            </span>
          </Link>
          <div className="diagram-center">
            <div className="center-orbit" />
            <div className="center-icon">
              <CommandMark />
            </div>
            <span>AI SYSTEMS ENGINEER</span>
          </div>
          <Link
            className="diagram-node node-system"
            href={"/roadmap/" + phases[10].slug}
          >
            <span className="node-icon green">
              <Network size={23} />
            </span>
            <span>
              <small>03 / SYSTEMS</small>
              <strong>Design for scale</strong>
              <em>APIs · RAG · Infrastructure</em>
            </span>
          </Link>
          <Link
            className="diagram-node node-production"
            href={"/roadmap/" + phases[11].slug}
          >
            <span className="node-icon amber">
              <Server size={23} />
            </span>
            <span>
              <small>04 / PRODUCTION</small>
              <strong>Ship with confidence</strong>
              <em>Security · Cloud · MLOps</em>
            </span>
          </Link>
          <div className="diagram-caption">
            <span className="status-dot" />
            Strong foundations. Connected thinking. Real systems.
          </div>
        </div>
      </section>
      <section className="home-stats" aria-label="Curriculum at a glance">
        {[
          [String(lessonCounts.phases).padStart(2, "0"), "Connected phases"],
          [String(lessonCounts.topics), "In-depth topics"],
          [lessonCounts.subtopics.toLocaleString(), "Trackable lessons"],
          [String(projects.length).padStart(2, "0"), "Hands-on projects"],
        ].map(([number, label]) => (
          <div key={label}>
            <strong>
              {number}
              <span>↗</span>
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </section>
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">THE LEARNING JOURNEY</span>
            <h2>A clear path. A serious skill set.</h2>
            <p>
              Start with the fundamentals. Connect the dots. Build something
              that matters.
            </p>
          </div>
          <Link href="/roadmap" className="text-link">
            View complete roadmap
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="journey-grid">
          {phases.map((p, i) => {
            const Icon = icons[i] ?? Compass;
            return (
              <Link
                className="journey-phase"
                href={"/roadmap/" + p.slug}
                key={p.id}
              >
                <div className="between">
                  <span
                    className="phase-icon"
                    style={{ color: p.color, background: p.color + "12" }}
                  >
                    <Icon size={21} />
                  </span>
                  <span className="phase-number">
                    PHASE {String(p.number).padStart(2, "0")}
                  </span>
                </div>
                <h3>{p.shortTitle}</h3>
                <p>{p.purpose}</p>
                <div className="journey-phase-footer">
                  <span>{p.weeks}</span>
                  <ArrowUpRight size={17} />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="career-section home-section" id="career">
        <div className="career-intro">
          <span className="eyebrow">THE CAREER, EXPLAINED</span>
          <h2>
            Beyond the model.
            <br />
            Think about the
            <br />
            <span>whole system.</span>
          </h2>
          <p>
            An AI Systems Engineer connects software, data, models and
            infrastructure to solve real problems. You learn to make AI useful,
            then make it reliable.
          </p>
          <p>
            You do not need to memorize every library or become an expert in
            every research area. Strong fundamentals and practical judgment come
            first.
          </p>
          <Pill tone="purple">
            <Network size={13} /> Models + software + systems thinking
          </Pill>
        </div>
        <div className="role-list">
          {roles.map(([title, description], i) => (
            <div
              className={i === 6 ? "role-item role-highlight" : "role-item"}
              key={title}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              {i === 6 && <ArrowUpRight size={19} />}
            </div>
          ))}
          <small>
            Job titles overlap and vary between organizations. Responsibilities
            matter more than the label.
          </small>
        </div>
      </section>
      <section className="home-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">LESS WATCHING. MORE BUILDING.</span>
            <h2>Turn understanding into working software.</h2>
            <p>
              Five projects that grow with your skills, from a Python app to a
              production AI platform.
            </p>
          </div>
          <Link href="/projects" className="text-link">
            Explore projects
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="project-preview-grid">
          {[projects[0], projects[3], projects.at(-1)!].map((p, i) => (
            <Link
              className={`project-preview project-preview-${i}`}
              key={p.id}
              href={"/projects/" + p.slug}
            >
              <div className="project-mini-visual">
                {i === 0 ? (
                  <Terminal size={45} strokeWidth={1.3} />
                ) : i === 1 ? (
                  <Network size={45} strokeWidth={1.3} />
                ) : (
                  <Route size={45} strokeWidth={1.3} />
                )}
                <span>{p.subtitle.toUpperCase()}</span>
              </div>
              <div className="project-preview-body">
                <Pill tone={i === 2 ? "purple" : "neutral"}>
                  {i === 2 ? "Flagship project" : p.difficulty}
                </Pill>
                <h3>{p.title}</h3>
                <p>{p.purpose}</p>
                <span className="text-link">
                  See the build plan
                  <ArrowUpRight size={15} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="how-section home-section" id="how-it-works">
        <div>
          <span className="eyebrow">MAKE THE ROADMAP YOUR OWN</span>
          <h2>
            One concept at a time.
            <br />
            One step further.
          </h2>
          <p>
            A learning workflow that values what you can do, not just what you
            have watched.
          </p>
          <Link
            className="button button-primary"
            href={"/learn/" + phases[0].topics[0].slug}
          >
            Start with Phase 01
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="how-steps">
          {[
            [
              "Find your starting point",
              "Begin at Phase 01. Read the overview and follow the recommended topic order.",
            ],
            [
              "Understand, then practice",
              "Open a lesson, study the explanation and official resources, and complete the exercise.",
            ],
            [
              "Make your progress visible",
              "Track individual lessons, save your own notes and log honest study sessions.",
            ],
            [
              "Build, review, move forward",
              "Complete the project, revisit difficult concepts and continue to the next recommendation.",
            ],
          ].map(([title, text], i) => (
            <div key={title}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="philosophy">
        <GraduationCap size={25} />
        <div>
          <h3>Build understanding that lasts.</h3>
          <p>
            Understand before memorizing. Practice before moving forward. Build
            real projects. Learn fundamentals before frameworks. Use AI to
            support your thinking. Revisit what is difficult.
          </p>
        </div>
        <a href="#how-it-works" aria-label="Review the learning workflow">
          <ArrowUpRight size={22} />
        </a>
      </section>
    </div>
  );
}
function CommandMark() {
  return (
    <svg
      width="43"
      height="43"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M16 12h16v24H16V12Zm0 0c0-9-12-9-12-2s12 6 12 2Zm16 0c0-9 12-9 12-2s-12 6-12 2ZM16 36c0 9-12 9-12 2s12-6 12-2Zm16 0c0 9 12 9 12 2s-12-6-12-2Z"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
