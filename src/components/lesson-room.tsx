"use client";
import { useEffect, useRef, useState } from "react";
import {
  Check,
  CheckCircle2,
  ChevronDown,
  FileText,
  Flag,
  Play,
  RotateCcw,
} from "lucide-react";
import type { Topic, Status } from "@/lib/types";
import { useLearning } from "./learning-provider";
import { progress, formatPercent } from "@/lib/progress";
import { BookmarkButton, LiveProgress, Modal, NotesEditor, Pill } from "./ui";
import { TopicResourcePanel } from "./topic-resource-panel";
import { resourceById } from "@/data/resources";
const statuses: [Status, string][] = [
  ["not_started", "Not started"],
  ["in_progress", "In progress"],
  ["completed", "Completed"],
  ["needs_revision", "Needs revision"],
];
const hinglish: Record<string, string> = {
  "0.1":
    "Computer mein CPU instructions chalata hai, RAM abhi ka data rakhti hai, aur storage data ko permanently save karta hai. GPU ek saath bahut saari similar calculations karta hai — isi liye AI mein useful hai.",
  "1.1":
    "Python mein pehle variables, conditions, loops aur collections ko chhote programs bana kar samjho. Library ka naam yaad karne se zyada zaroori hai ki code ka result khud predict kar pao.",
  "1.2":
    "Function ek reusable kaam hai: input do, processing hoti hai, output milta hai. Modules related functions ko alag files mein organize karte hain, jisse code test aur maintain karna aasaan hota hai.",
  "2.5":
    "Vector numbers ki ordered list hai; matrix numbers ka table. Neural network mein data inhi forms mein move hota hai. Chhote examples haath se solve karo, phir NumPy se verify karo.",
  "6.3":
    "Attention mein har token doosre relevant tokens se information leta hai. Query aur key se relevance score banta hai, phir us score se values combine hoti hain. Causal mask future tokens ko chhupata hai.",
  "8.3":
    "RAG mein model ko answer dene se pehle relevant documents ka context diya jata hai. Model ke weights change nahi hote. Galat retrieval ho to answer bhi galat ho sakta hai, isliye sources aur evaluation zaroori hain.",
  "9.5":
    "Multiple servers hone par ek server fail ho sakta hai jab doosra chal raha ho. Timeout ka matlab yeh nahi ki kaam hua hi nahi. Isliye retries ke saath idempotency aur recovery plan zaroori hain.",
  "11.2":
    "Router har request ke liye suitable model choose karta hai. Sirf cheapest model nahi: task capability, quality, context limit, speed aur provider availability bhi check karni hoti hai.",
};
export function LessonRoom({ topic }: { topic: Topic }) {
  const { state, ready, pending, mode, mutate, setStatus } = useLearning();
  const visit = useRef(false);
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [noteLesson, setNoteLesson] = useState<string | null>(null);
  const [previousStatuses, setPreviousStatuses] = useState<
    typeof state.progress | null
  >(null);
  useEffect(() => {
    if (
      !ready ||
      pending ||
      visit.current ||
      (mode !== "preview" && mode !== "cloud")
    )
      return;
    visit.current = true;
    if (state.lastTopic !== topic.id)
      void mutate((s) => ({ ...s, lastTopic: topic.id }));
  }, [ready, pending, mode, mutate, state.lastTopic, topic.id]);
  useEffect(() => {
    const openHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (target?.tagName === "DETAILS") {
        target.setAttribute("open", "");
        target.scrollIntoView({ block: "start" });
      }
    };
    const timeout = setTimeout(openHash, 60);
    window.addEventListener("hashchange", openHash);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("hashchange", openHash);
    };
  }, [topic.id]);
  const p = progress(topic.subtopics, state);
  return (
    <>
      <div className="lesson-intro content-card">
        <span className="eyebrow">THE IDEA, IN PLAIN ENGLISH</span>
        <h2>What is {topic.title.toLowerCase()}?</h2>
        <p className="lead-paragraph">{topic.explanation}</p>
        {state.settings.language === "hinglish" && hinglish[topic.id] && (
          <div className="hinglish">
            <span className="eyebrow">HINGLISH LEARNING AID</span>
            <p>{hinglish[topic.id]}</p>
          </div>
        )}
        <div className="two-columns">
          <div>
            <h3>Why learn it?</h3>
            <p>{topic.why}</p>
          </div>
          <div>
            <h3>Where you’ll use it</h3>
            <p>{topic.application}</p>
          </div>
        </div>
        <h3>By the end, you can…</h3>
        <ul className="check-list">
          {topic.outcomes.map((x) => (
            <li key={x}>
              <CheckCircle2 size={16} />
              <span>{x}</span>
            </li>
          ))}
        </ul>
        {topic.guidance
          .filter((x) => !x.startsWith("-") && !x.startsWith("Practical"))
          .map((x) => (
            <p className="curriculum-guidance" key={x}>
              {x.replaceAll("**", "")}
            </p>
          ))}
      </div>
      <div className="detail-layout lesson-layout">
        <div>
          <nav className="lesson-tabs" aria-label="Topic sections">
            <a href="#lessons">
              Curriculum <span>{topic.subtopics.length}</span>
            </a>
            <a href="#assignment">Practice</a>
            <a href="#resources">Resources</a>
            <a href="#notes">My notes</a>
          </nav>
          <div className="section-heading compact" id="lessons">
            <div>
              <span className="eyebrow">
                SMALL CONCEPTS. STRONG FOUNDATIONS.
              </span>
              <h2>Your lessons</h2>
            </div>
            <span className="muted">
              {p.completed}/{p.total} completed
            </span>
          </div>
          <div className="lesson-list">
            {topic.subtopics.map((s, i) => {
              const status = state.progress[s.id]?.status ?? "not_started";
              return (
                <details
                  id={s.id}
                  className={`lesson-item ${status === "completed" ? "lesson-complete" : ""}`}
                  key={s.id}
                  open={i === 0}
                >
                  <summary>
                    <label
                      className="lesson-check"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        aria-label={"Complete " + s.title}
                        checked={status === "completed"}
                        disabled={!ready || pending}
                        onChange={(e) =>
                          void setStatus(
                            s.id,
                            e.target.checked ? "completed" : "not_started",
                          )
                        }
                      />
                      <span>
                        {status === "completed" ? (
                          <Check size={14} />
                        ) : (
                          String(i + 1).padStart(2, "0")
                        )}
                      </span>
                    </label>
                    <span className="lesson-summary-title">
                      <strong>{s.title}</strong>
                      <small>
                        {s.minutes} min · {s.priority}
                        {status === "needs_revision" ? " · Needs revision" : ""}
                      </small>
                    </span>
                    <ChevronDown size={17} className="lesson-chevron" />
                  </summary>
                  <div className="lesson-body">
                    <p className="lesson-definition">{s.explanation}</p>
                    <div className="two-columns">
                      <div>
                        <h4>What to study</h4>
                        <ul className="plain-list">
                          {s.study.map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Why it matters</h4>
                        <p>{s.why}</p>
                        <h4>In real engineering</h4>
                        <p>{s.application}</p>
                      </div>
                    </div>
                    <div className="practice-callout">
                      <span className="practice-icon">
                        <CodePractice />
                      </span>
                      <div>
                        <span className="eyebrow">TRY IT YOURSELF</span>
                        <p>{s.exercise}</p>
                      </div>
                    </div>
                    <h4>You’re ready when you can…</h4>
                    <ul className="check-list">
                      {s.criteria.map((x) => (
                        <li key={x}>
                          <CheckCircle2 size={14} />
                          <span>{x}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="lesson-resource-links">
                      <span className="tiny-text">Read with this lesson</span>
                      {s.resources.map((id) => {
                        const r = resourceById[id];
                        return (
                          <a
                            href={r.url}
                            key={id}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {r.title} ↗
                          </a>
                        );
                      })}
                    </div>
                    <div className="lesson-controls">
                      <label>
                        Status
                        <select
                          aria-label={"Status for " + s.title}
                          value={status}
                          disabled={!ready || pending}
                          onChange={(e) =>
                            void setStatus(s.id, e.target.value as Status)
                          }
                        >
                          {statuses.map(([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <div className="button-group">
                        <BookmarkButton itemKey={"subtopic:" + s.id} small />
                        <button
                          className="button button-secondary button-small"
                          onClick={() =>
                            setNoteLesson(noteLesson === s.id ? null : s.id)
                          }
                          aria-expanded={noteLesson === s.id}
                        >
                          <FileText size={14} />
                          Lesson notes
                        </button>
                      </div>
                    </div>
                    {noteLesson === s.id && (
                      <NotesEditor
                        itemKey={"subtopic:" + s.id}
                        label={"Notes · " + s.title}
                      />
                    )}
                    <p className="next-concept">
                      Next:{" "}
                      {topic.subtopics[i + 1]?.title ??
                        "Put the topic into practice with the assignment below."}
                    </p>
                  </div>
                </details>
              );
            })}
          </div>
          <section className="assignment-card" id="assignment">
            <div className="assignment-heading">
              <span className="phase-icon">
                <Flag size={22} />
              </span>
              <div>
                <span className="eyebrow">CONNECT THE CONCEPTS</span>
                <h2>Your practical assignment</h2>
              </div>
              <Pill tone="purple">1 integrated build</Pill>
            </div>
            <p>{topic.assignment}</p>
            <h3>Completion criteria</h3>
            <ul className="check-list">
              <li>
                <CheckCircle2 size={16} />
                <span>
                  Produce a working artifact: code, a calculation, a diagram or
                  a reproducible experiment appropriate to this assignment.
                </span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>
                  Demonstrate the normal case and at least one error or boundary
                  case.
                </span>
              </li>
              <li>
                <CheckCircle2 size={16} />
                <span>
                  Explain your decisions, verify the output and document what
                  you would improve.
                </span>
              </li>
            </ul>
            <small>
              Mark lessons complete only after you can demonstrate the skill.
              Assignment completion is your self-assessment, not an automatic
              score.
            </small>
          </section>
          <section id="resources" className="top-space">
            <div className="section-heading compact">
              <div>
                <span className="eyebrow">GO TO THE SOURCE</span>
                <h2>Read. Try. Come back stronger.</h2>
              </div>
            </div>
            <TopicResourcePanel topicId={topic.id} />
          </section>
          <section className="content-card top-space" id="notes">
            <NotesEditor itemKey={"topic:" + topic.id} />
          </section>
        </div>
        <aside className="detail-aside">
          <div className="content-card lesson-overview">
            <div className="between">
              <span className="eyebrow">YOUR TOPIC PROGRESS</span>
              <BookOpenIcon />
            </div>
            <div className="topic-big-progress">{formatPercent(p.percent)}</div>
            <LiveProgress items={topic.subtopics} />
            <div className="lesson-counts">
              <div>
                <b>{p.completed}</b>
                <small>Completed</small>
              </div>
              <div>
                <b>{p.inProgress}</b>
                <small>In progress</small>
              </div>
              <div>
                <b>{p.remaining}</b>
                <small>Remaining</small>
              </div>
            </div>
            <a
              className="button button-primary full-width"
              href={
                "#" +
                (
                  topic.subtopics.find(
                    (s) => state.progress[s.id]?.status !== "completed",
                  ) ?? topic.subtopics[0]
                ).id
              }
            >
              <Play size={14} />
              Continue this topic
            </a>
            <button
              className="button button-secondary full-width"
              disabled={pending || !ready}
              onClick={() => setRevisionOpen(true)}
            >
              <RotateCcw size={14} />
              Mark topic for revision
            </button>
            {previousStatuses && (
              <button
                className="text-link"
                onClick={async () => {
                  const prior = previousStatuses;
                  if (
                    await mutate(
                      (s) => ({ ...s, progress: { ...s.progress, ...prior } }),
                      "Revision change undone.",
                    )
                  )
                    setPreviousStatuses(null);
                }}
              >
                Undo revision change
              </button>
            )}
            <div className="aside-divider" />
            <h4>Recommended order</h4>
            <ol className="topic-outline">
              {topic.subtopics.map((s, i) => (
                <li key={s.id}>
                  <a href={"#" + s.id}>
                    <span
                      className={
                        state.progress[s.id]?.status === "completed"
                          ? "outline-completed"
                          : ""
                      }
                    >
                      {state.progress[s.id]?.status === "completed" ? (
                        <Check size={10} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            <small>
              Estimates are flexible. All lessons count toward this topic;
              dashboard core progress excludes optional lessons.
            </small>
          </div>
        </aside>
      </div>
      <Modal
        open={revisionOpen}
        onClose={() => setRevisionOpen(false)}
        title="Revisit this topic"
      >
        <p>
          Mark all {topic.subtopics.length} lessons as Needs Revision. Their
          completion dates will be cleared, and core progress will adjust. Your
          notes and bookmarks stay available.
        </p>
        <div className="modal-actions">
          <button
            className="button button-secondary"
            onClick={() => setRevisionOpen(false)}
          >
            Keep learning
          </button>
          <button
            className="button button-primary"
            disabled={pending}
            onClick={async () => {
              const before = Object.fromEntries(
                topic.subtopics.map((x) => [
                  x.id,
                  state.progress[x.id] ?? {
                    status: "not_started" as const,
                    completedAt: null,
                  },
                ]),
              );
              const ok = await mutate(
                (s) => ({
                  ...s,
                  progress: {
                    ...s.progress,
                    ...Object.fromEntries(
                      topic.subtopics.map((x) => [
                        x.id,
                        {
                          status: "needs_revision" as const,
                          completedAt: null,
                        },
                      ]),
                    ),
                  },
                }),
                "Topic added to your revision list.",
              );
              if (ok) {
                setPreviousStatuses(before);
                setRevisionOpen(false);
              }
            }}
          >
            Mark for revision
          </button>
        </div>
      </Modal>
    </>
  );
}
function CodePractice() {
  return <span className="code-practice">&lt;/&gt;</span>;
}
function BookOpenIcon() {
  return <FileText size={16} />;
}
